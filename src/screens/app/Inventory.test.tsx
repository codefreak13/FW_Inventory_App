import React from 'react';
import {render} from '@testing-library/react-native';
import Inventory from './Inventory';
import AppContextProvider from '../../store/Context';
import {NavigationContainer} from '@react-navigation/native';

describe('Inventory', () => {
  it('renders Inventory correctly', () => {
    const {toJSON} = render(
      <AppContextProvider>
        <NavigationContainer>
          <Inventory />
        </NavigationContainer>
      </AppContextProvider>,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
