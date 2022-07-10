import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Inventory,
  CreateInventoryItem,
  EditInventoryItem,
} from '../../screens/app';
import {InventoryStackParamList, INVENTORY_ROUTES} from '../types';

const Stack = createNativeStackNavigator<InventoryStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={INVENTORY_ROUTES.INVENTORY_LIST}>
      <Stack.Screen
        name={INVENTORY_ROUTES.INVENTORY_LIST}
        component={Inventory}
      />
      <Stack.Screen
        name={INVENTORY_ROUTES.CREATE_INVENTORY_ITEM}
        component={CreateInventoryItem}
      />
      <Stack.Screen
        name={INVENTORY_ROUTES.EDIT_INVENTORY_ITEM}
        component={EditInventoryItem}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
