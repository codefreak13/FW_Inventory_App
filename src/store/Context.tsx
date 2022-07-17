import React, {createContext, ProviderProps} from 'react';
import {InventoryItemProps, AddUserProps, AllUsersDataProps} from '../types';
import {useContextHook} from '../hooks';

export const AppContext = createContext<{
  allUsersData: AllUsersDataProps;
  loginIfUserExists: (a: AddUserProps) => void;
  token: boolean;
  persistLoggedInUser: () => void;
  logOut: () => void;
  loggedInUser: string;
  addUserInventoryItem: (a: InventoryItemProps) => boolean;
  editUserInventoryItem: (
    a: InventoryItemProps,
    b: InventoryItemProps,
  ) => boolean;
  deleteUserInventoryItem: (a: InventoryItemProps) => void;
  loading: boolean;
}>({
  allUsersData: {},
  loginIfUserExists: () => {},
  token: false,
  persistLoggedInUser: () => {},
  logOut: () => {},
  loggedInUser: '',
  addUserInventoryItem: () => true,
  editUserInventoryItem: () => true,
  deleteUserInventoryItem: () => {},
  loading: true,
});

const AppContextProvider = ({
  children,
  value,
}: Partial<ProviderProps<Partial<ReturnType<typeof useContextHook>>>>) => {
  const {
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
  } = useContextHook();

  return (
    <AppContext.Provider
      value={{
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
        ...value,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
