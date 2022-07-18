import React from 'react';
import {render} from '@testing-library/react-native';
import Login from './Login';
import AppContextProvider from '../../store/Context';
import {NavigationContainer} from '@react-navigation/native';

describe('CreateInventoryItem', () => {
  it('renders CreateInventoryItem correctly', () => {
    const {toJSON} = render(
      <AppContextProvider>
        <NavigationContainer>
          <Login />
        </NavigationContainer>
      </AppContextProvider>,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
