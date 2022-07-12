import React, {useContext} from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import AppContextProvider, {AppContext} from '../store/Context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {InventoryStackParamList} from '../navigation/types';
import AsyncStorage from '@react-native-community/async-storage';
import {useEditInventory} from '../hooks';
import {View, Text} from 'react-native';
import {Button} from '../ui';

const Stack = createNativeStackNavigator<
  InventoryStackParamList & {MOCK_COMPONENT: undefined}
>();

describe('CRUD operations', () => {
  let MockComponent: () => JSX.Element;
  beforeEach(() => {
    MockComponent = () => {
      const {deleteEntry} = useEditInventory();
      const {addUserInventoryItem, allUsersData, editUserInventoryItem} =
        useContext(AppContext);
      const inventory = allUsersData['b@asf.acom']?.inventory || [];

      const inventoryItem = {
        name: 'agbado',
        price: '20',
        total: '10',
        description: 'agbado and cassava',
      };

      const newInventoryItem = {
        name: 'rice',
        price: '50',
        total: '15',
        description: 'chicken and rice',
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
          <Button
            onPress={() =>
              editUserInventoryItem(inventoryItem, newInventoryItem)
            }
            testID="editEntry"
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

  it('updates an item (U)', async () => {
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

    const {getByTestId, getByText} = render(
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
    fireEvent.press(getByTestId('editEntry'));
    expect(AsyncStorage.setItem as any).toBeCalled();
    expect(getByText('rice')).toBeDefined();
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
