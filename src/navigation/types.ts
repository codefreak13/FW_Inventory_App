import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {InventoryItemProps} from '../types';

/// We use enums to prevent the use of strings across the application - i.e, write once
export const enum INVENTORY_ROUTES {
  INVENTORY_LIST = 'INVENTORY_LIST',
  CREATE_INVENTORY_ITEM = 'CREATE_INVENTORY_ITEM',
  EDIT_INVENTORY_ITEM = 'EDIT_INVENTORY_ITEM',
}

export const enum AUTHENTICATION_ROUTE {
  LOGIN = 'LOGIN',
}

/// Specify which screens are available in the stack and what props they expect
export type InventoryStackParamList = {
  [INVENTORY_ROUTES.INVENTORY_LIST]: undefined;
  [INVENTORY_ROUTES.CREATE_INVENTORY_ITEM]: undefined;
  [INVENTORY_ROUTES.EDIT_INVENTORY_ITEM]: InventoryItemProps;
};

export type AuthenticationStackParamList = {
  [AUTHENTICATION_ROUTE.LOGIN]: undefined;
};

export type InventoryListScreenNavigationProp = NativeStackNavigationProp<
  InventoryStackParamList,
  INVENTORY_ROUTES.INVENTORY_LIST
>;

export type EditInventoryRouteProp = NativeStackScreenProps<
  InventoryStackParamList,
  INVENTORY_ROUTES.EDIT_INVENTORY_ITEM
>;
