export interface InventoryItemProps {
  name: string;
  total: string;
  price: string;
  description: string;
}

export interface AddUserProps {
  email: string;
  password: string;
}

export interface AllUsersDataProps {
  [key: string]: {password: string; inventory: InventoryItemProps[]};
}

export const enum STORAGE_VALUES {
  ALL_USERS_DATA = 'ALL_USERS_DATA',
  USER_LOGGED_IN = 'USER_LOGGED_IN',
}
