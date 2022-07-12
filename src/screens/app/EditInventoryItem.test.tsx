import React, {useContext} from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import EditInventoryItem from './EditInventoryItem';
import AppContextProvider, {AppContext} from '../../store/Context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  InventoryStackParamList,
  INVENTORY_ROUTES,
} from '../../navigation/types';
import AsyncStorage from '@react-native-community/async-storage';
import Inventory from './Inventory';
import {useEditInventory} from '../../hooks';
import {View, Text} from 'react-native';
import {Button} from '../../ui';

const Stack = createNativeStackNavigator<
  InventoryStackParamList & {MOCK_COMPONENT: undefined}
>();

describe('EditInventoryItem', () => {
  it('renders EditInventoryItem correctly', () => {
    const {toJSON} = render(
      <AppContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={INVENTORY_ROUTES.EDIT_INVENTORY_ITEM}>
            <Stack.Screen
              name={INVENTORY_ROUTES.EDIT_INVENTORY_ITEM}
              component={EditInventoryItem}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContextProvider>,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('confirmation pop up is shown when trying to delete an existing item', () => {
    const {getByText} = render(
      <AppContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={INVENTORY_ROUTES.EDIT_INVENTORY_ITEM}>
            <Stack.Screen
              name={INVENTORY_ROUTES.EDIT_INVENTORY_ITEM}
              component={EditInventoryItem}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContextProvider>,
    );
    fireEvent.press(getByText('Delete Entry'));
    expect(getByText('CONFIRM DELETE')).toBeDefined();
  });

  it('it navigates to edit screen when inventory item is pressed', async () => {
    await AsyncStorage.setItem('USER_LOGGED_IN', 'b@asf.acom');

    await AsyncStorage.setItem(
      'ALL_USERS_DATA',
      JSON.stringify({
        'b@asf.acom': {
          password: 'lsfsd',
          inventory: [
            {
              name: 'agbado',
              price: 20,
              total: 10,
              description: 'agbado and cassava',
            },
          ],
        },
      }),
    );
    const {getByTestId, getByText} = render(
      <AppContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={INVENTORY_ROUTES.INVENTORY_LIST}>
            <Stack.Screen
              name={INVENTORY_ROUTES.INVENTORY_LIST}
              component={Inventory}
            />
            <Stack.Screen
              name={INVENTORY_ROUTES.EDIT_INVENTORY_ITEM}
              component={EditInventoryItem}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContextProvider>,
    );
    await waitFor(() => getByTestId('inventoryList'));
    fireEvent.press(getByTestId('inventoryList'));
    expect(() => getByText('EDIT INVENTORY')).toBeDefined();
  });

  describe('CRUD operations', () => {
    let MockComponent: () => JSX.Element;
    beforeEach(() => {
      MockComponent = () => {
        const {deleteEntry} = useEditInventory();
        const {addUserInventoryItem, allUsersData} = useContext(AppContext);
        const inventory = allUsersData['b@asf.acom']?.inventory || [];

        const inventoryItem = {
          name: 'agbado',
          price: '20',
          total: '10',
          description: 'agbado and cassava',
        };

        return (
          <View>
            {inventory.map(item => (
              <Text key={item.name}>{item.name}</Text>
            ))}
            <Button
              onPress={() => addUserInventoryItem(inventoryItem)}
              testID="addEntry"
            />
            <Button onPress={() => deleteEntry()} testID="deleteEntry" />
          </View>
        );
      };
    });
    it('creates an item (C)', async () => {
      await AsyncStorage.setItem(
        'ALL_USERS_DATA',
        JSON.stringify({
          'b@asf.acom': {
            password: 'lsfsd',
            inventory: [],
          },
        }),
      );

      await AsyncStorage.setItem('USER_LOGGED_IN', 'b@asf.acom');

      const {getByTestId} = render(
        <AppContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{headerShown: false}}
              initialRouteName={'MOCK_COMPONENT'}>
              <Stack.Screen name={'MOCK_COMPONENT'} component={MockComponent} />
            </Stack.Navigator>
          </NavigationContainer>
        </AppContextProvider>,
      );

      // wait for ui to finish rendering
      await waitFor(() => {});
      fireEvent.press(getByTestId('addEntry'));
      expect(AsyncStorage.setItem as any).toBeCalled();
    });

    it('reads an item (R)', async () => {
      await AsyncStorage.setItem('USER_LOGGED_IN', 'b@asf.acom');
      await AsyncStorage.setItem(
        'ALL_USERS_DATA',
        JSON.stringify({
          'b@asf.acom': {
            password: 'lsfsd',
            inventory: [
              {
                name: 'agbado',
                price: '20',
                total: '10',
                description: 'agbado and cassava',
              },
            ],
          },
        }),
      );

      const {getByText} = render(
        <AppContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{headerShown: false}}
              initialRouteName={'MOCK_COMPONENT'}>
              <Stack.Screen name={'MOCK_COMPONENT'} component={MockComponent} />
            </Stack.Navigator>
          </NavigationContainer>
        </AppContextProvider>,
      );

      // wait for ui to finish rendering
      await waitFor(() => {});
      expect(getByText('agbado')).toBeDefined();
    });

    it('deletes an item (D)', async () => {
      await AsyncStorage.setItem(
        'ALL_USERS_DATA',
        JSON.stringify({
          'b@asf.acom': {
            password: 'lsfsd',
            inventory: [],
          },
        }),
      );

      await AsyncStorage.setItem('USER_LOGGED_IN', 'b@asf.acom');

      const {getByTestId} = render(
        <AppContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{headerShown: false}}
              initialRouteName={'MOCK_COMPONENT'}>
              <Stack.Screen name={'MOCK_COMPONENT'} component={MockComponent} />
            </Stack.Navigator>
          </NavigationContainer>
        </AppContextProvider>,
      );

      // wait for ui to finish rendering
      await waitFor(() => {});
      fireEvent.press(getByTestId('deleteEntry'));
      expect(AsyncStorage.setItem as any).toBeCalled();
      const data = await AsyncStorage.getItem('ALL_USERS_DATA');
      let parsedData = null;
      if (data) {
        parsedData = JSON.parse(data);
      }
      expect(parsedData['b@asf.acom'].inventory.length).toBe(0);
    });
  });
});
