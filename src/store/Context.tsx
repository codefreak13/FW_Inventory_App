import React, {createContext, useState, useEffect, ReactNode} from 'react';
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
  addUserInventory: (a: InventoryItemProps) => void;
  EditUserInventory: (a: InventoryItemProps, b: InventoryItemProps) => void;
  loading: boolean;
}>({
  allUsersData: {},
  LoginIfUserExists: () => {},
  token: false,
  persistLoggedInUser: () => {},
  logOut: () => {},
  loggedInUser: '',
  addUserInventory: () => {},
  EditUserInventory: () => {},
  loading: true,
});

const AppContextProvider = ({children}: Props) => {
  const [allUsersData, setAllUsersData] = useState<allUsersDataProps>({});
  const [token, setToken] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [loggedInUser, setLoggedInUser] = useState<string>('');

  const saveLoggedInUser = async (email: string) => {
    await AsyncStorage.setItem('USER_LOGGED_IN', email);
  };

  const getLoggedInUser = () => {
    AsyncStorage.getItem('USER_LOGGED_IN').then(value => {
      if (value) {
        setLoggedInUser(value);
      }
    });
  };

  const addUserInventory = (inventoryItem: InventoryItemProps) => {
    const clonedData = {...allUsersData};

    const userInventory = clonedData[loggedInUser].inventory;
    const userInventoryNames = userInventory.map(item => item.name);
    if (userInventoryNames.includes(inventoryItem.name)) {
      Alert.alert('Duplicate Item', 'Item already exists');
      return;
    }
    userInventory.push(inventoryItem);
    setAllUsersData(clonedData);
  };

  const EditUserInventory = (
    oldInventoryItem: InventoryItemProps,
    editedInventoryItem: InventoryItemProps,
  ) => {
    const clonedData = {...allUsersData};
    const updatedUserInventory = clonedData[loggedInUser].inventory.filter(
      item => item.name !== oldInventoryItem.name,
    );
    clonedData[loggedInUser].inventory = updatedUserInventory;
    clonedData[loggedInUser].inventory.push(editedInventoryItem);
    setAllUsersData(clonedData);
  };

  const persistLoggedInUser = async () => {
    setToken(!token);
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('USER_LOGGED_IN');
    persistLoggedInUser();
  };

  const addUser = async ({email, password}: addUserProps) => {
    const user = {[email]: {password, inventory: []}};
    const newData = {...allUsersData, ...user};
    await saveLoggedInUser(email);
    setAllUsersData(newData);
    console.log(newData, 'newData');
    persistLoggedInUser();
  };

  const LoginIfUserExists = async ({email, password}: addUserProps) => {
    const allUsers = Object.keys(allUsersData);
    if (allUsers.includes(email) && password === allUsersData[email].password) {
      console.log(allUsers, 'userExists');
      await saveLoggedInUser(email);
      persistLoggedInUser();
    } else {
      addUser({email, password});
    }
  };

  const saveUserData = async () => {
    await AsyncStorage.setItem('ALL_USERS_DATA', JSON.stringify(allUsersData));
    setLoading(false);
  };

  const getUserData = () => {
    AsyncStorage.getItem('ALL_USERS_DATA').then(value => {
      if (value) {
        setAllUsersData(JSON.parse(value));
      }
    });
  };

  useEffect(() => {
    if (Object.keys(allUsersData).length !== 0) {
      saveUserData();
    }
  }, [JSON.stringify(allUsersData)]);

  useEffect(() => {
    const removeAll = async () => {
      await AsyncStorage.removeItem('USER_LOGGED_IN');
    };
    // removeAll();
    getUserData();
  }, []);

  useEffect(() => {
    getLoggedInUser();
    console.log('getLoggedInUser....');
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
        addUserInventory,
        EditUserInventory,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
