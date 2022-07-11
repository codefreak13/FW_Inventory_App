import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useLayoutEffect,
} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {InventoryItemProps} from '../types';

type Props = {
  children: ReactNode;
};

interface addUserProps {
  email: string;
  password: string;
}

interface allUsersDataProps {
  [key: string]: {password: string; inventory: InventoryItemProps[]};
}

export const AppContext = createContext<{
  allUsersData: allUsersDataProps;
  LoginIfUserExists: (a: addUserProps) => void;
  token: boolean;
  persistLoggedInUser: () => void;
  logOut: () => void;
  loggedInUser: string;
  addUserInventoryItem: (a: InventoryItemProps) => void;
  editUserInventoryItem: (a: InventoryItemProps, b: InventoryItemProps) => void;
  deleteUserInventoryItem: (a: InventoryItemProps) => void;
  loading: boolean;
}>({
  allUsersData: {},
  LoginIfUserExists: () => {},
  token: false,
  persistLoggedInUser: () => {},
  logOut: () => {},
  loggedInUser: '',
  addUserInventoryItem: () => {},
  editUserInventoryItem: () => {},
  deleteUserInventoryItem: () => {},
  loading: true,
});

const AppContextProvider = ({children}: Props) => {
  const [allUsersData, setAllUsersData] = useState<allUsersDataProps>({});
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
      return;
    }
    userInventory.unshift(inventoryItem);
    setAllUsersData(clonedData);
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
    clonedData[loggedInUser].inventory = updatedUserInventory;
    clonedData[loggedInUser].inventory.unshift(editedInventoryItem);
    setAllUsersData(clonedData);
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
    await AsyncStorage.getItem('ALL_USERS_DATA').then(value => {
      if (value) {
        setAllUsersData(JSON.parse(value));
      }
    });
    setLoading(false);
  };

  //adds a new user
  const addUser = async ({email, password}: addUserProps) => {
    const user = {[email]: {password, inventory: []}};
    const newData = {...allUsersData, ...user};
    setAllUsersData(newData);
    await saveLoggedInUser(email);
  };

  //logs in an existing user
  const LoginIfUserExists = async ({email, password}: addUserProps) => {
    const allUsers = Object.keys(allUsersData);
    if (allUsers.includes(email) && password === allUsersData[email].password) {
      await saveLoggedInUser(email);
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
    await AsyncStorage.getItem('USER_LOGGED_IN').then(value => {
      if (value) {
        setLoggedInUser(value);
      }
    });
  };

  useEffect(() => {
    if (Object.keys(allUsersData).length !== 0) {
      saveAllUsersData();
    }
  }, [JSON.stringify(allUsersData)]);

  useLayoutEffect(() => {
    getAllUsersData();
  }, []);

  useLayoutEffect(() => {
    getLoggedInUser();
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        loading,
        token,
        allUsersData,
        LoginIfUserExists,
        persistLoggedInUser,
        logOut,
        loggedInUser,
        addUserInventoryItem,
        editUserInventoryItem,
        deleteUserInventoryItem,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
