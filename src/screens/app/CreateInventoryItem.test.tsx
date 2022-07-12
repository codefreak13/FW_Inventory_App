import React from 'react';
import {render} from '@testing-library/react-native';
import CreateInventoryItem from './CreateInventoryItem';
import AppContextProvider from '../../store/Context';
import {NavigationContainer} from '@react-navigation/native';

// jest.mock('../../hooks/useCreateInventory', () => {
//   const actualImp = jest.requireActual('../../hooks/useCreateInventory');
//   return {
//     __esModule: true,
//     ...actualImp,
//   };
// });

describe('CreateInventoryItem', () => {
  it('renders CreateInventoryItem correctly', () => {
    const {toJSON} = render(
      <AppContextProvider
        value={{
          addUserInventoryItem: () => {
            return true;
          },
        }}>
        <NavigationContainer>
          <CreateInventoryItem />
        </NavigationContainer>
      </AppContextProvider>,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
