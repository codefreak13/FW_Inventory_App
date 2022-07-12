import React, {createContext, ProviderProps, ReactNode} from 'react';
import {InventoryItemProps} from '../types';
import {useContextHook} from '../hooks';

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
  addUserInventoryItem: (a: InventoryItemProps) => boolean;
  editUserInventoryItem: (
    a: InventoryItemProps,
    b: InventoryItemProps,
  ) => boolean;
  deleteUserInventoryItem: (a: InventoryItemProps) => void;
  loading: boolean;
}>({
  allUsersData: {},
  LoginIfUserExists: () => {},
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
    LoginIfUserExists,
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
        LoginIfUserExists,
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
