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
