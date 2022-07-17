import {useState, useEffect, useLayoutEffect} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {InventoryItemProps, AddUserProps, AllUsersDataProps} from '../types';

const useAppContext = () => {
  const [allUsersData, setAllUsersData] = useState<AllUsersDataProps>({});
  const [token, setToken] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [loggedInUser, setLoggedInUser] = useState<string>('');

  //Adds inventory item
  const addUserInventoryItem = (inventoryItem: InventoryItemProps) => {
    const clonedData = {...allUsersData};
    const userInventory = clonedData[loggedInUser].inventory;
    const userInventoryNames = userInventory.map(item => item.name);
    if (userInventoryNames.includes(inventoryItem.name)) {
      Alert.alert('Duplicate Item', 'Item already exists');
      return false;
    }
    userInventory.unshift(inventoryItem);
    setAllUsersData(clonedData);
    return true;
  };

  //Edits inventory item
  const editUserInventoryItem = (
    oldInventoryItem: InventoryItemProps,
    editedInventoryItem: InventoryItemProps,
  ) => {
    const clonedData = {...allUsersData};
    const updatedUserInventory = clonedData[loggedInUser].inventory.filter(
      item => item.name !== oldInventoryItem.name,
    );
    const inventoryNames = updatedUserInventory.map(item => item.name);
    if (inventoryNames.includes(editedInventoryItem.name)) {
      Alert.alert('Duplicate Item', 'Item already exists');
      return false;
    }
    clonedData[loggedInUser].inventory = updatedUserInventory;
    clonedData[loggedInUser].inventory.unshift(editedInventoryItem);
    setAllUsersData(clonedData);
    return true;
  };

  //Deleting inventory item
  const deleteUserInventoryItem = (inventoryItem: InventoryItemProps) => {
    const clonedData = {...allUsersData};
    const updatedUserInventory = clonedData[loggedInUser].inventory.filter(
      item => item.name !== inventoryItem.name,
    );
    clonedData[loggedInUser].inventory = updatedUserInventory;
    setAllUsersData(clonedData);
  };

  //Saves all user information
  const saveAllUsersData = async () => {
    await AsyncStorage.setItem('ALL_USERS_DATA', JSON.stringify(allUsersData));
  };

  //Getting all saved users and their data
  const getAllUsersData = async () => {
    const value = await AsyncStorage.getItem('ALL_USERS_DATA');
    if (value) {
      setAllUsersData(JSON.parse(value));
    }
    setLoading(false);
  };

  //adds a new user
  const addUser = async ({email, password}: AddUserProps) => {
    const user = {[email]: {password, inventory: []}};
    const newData = {...allUsersData, ...user};
    setAllUsersData(newData);
    await saveLoggedInUser(email);
  };

  //logs in an existing user
  const loginIfUserExists = async ({email, password}: AddUserProps) => {
    const allUsers = Object.keys(allUsersData);
    if (allUsers.includes(email) && password === allUsersData[email].password) {
      await saveLoggedInUser(email);
    } else if (
      allUsers.includes(email) &&
      password !== allUsersData[email].password
    ) {
      Alert.alert(
        'Ooops!',
        'This user name already exists.\nLogin with the password you signed up with.',
      );
    } else {
      addUser({email, password});
    }
  };

  //automatically logs in an existing user
  const persistLoggedInUser = async () => {
    setToken(!token);
  };

  //logs out a user
  const logOut = async () => {
    await AsyncStorage.removeItem('USER_LOGGED_IN');
    persistLoggedInUser();
    setLoggedInUser('');
  };

  //persists logged in user to Asynstorage
  const saveLoggedInUser = async (email: string) => {
    await AsyncStorage.setItem('USER_LOGGED_IN', email);
    await getLoggedInUser();
    setToken(true);
  };

  //gets the logged in user from Asynstorage
  const getLoggedInUser = async () => {
    const value = await AsyncStorage.getItem('USER_LOGGED_IN');

    if (value) {
      setLoggedInUser(value);
    }
  };

  useEffect(() => {
    if (Object.keys(allUsersData).length !== 0) {
      saveAllUsersData();
    }
  }, [JSON.stringify(allUsersData)]);

  useLayoutEffect(() => {
    getLoggedInUser();
    getAllUsersData();
  }, [token]);

  return {
    loading,
    token,
    allUsersData,
    loginIfUserExists,
    persistLoggedInUser,
    logOut,
    loggedInUser,
    addUserInventoryItem,
    editUserInventoryItem,
    deleteUserInventoryItem,
  };
};

export default useAppContext;
