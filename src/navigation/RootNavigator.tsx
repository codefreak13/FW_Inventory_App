import React, {useContext} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AppStack from './app/App';
import AuthStack from './auth/Auth';
import {AppContext} from '../store/Context';
import AsyncStorage from '@react-native-community/async-storage';
import {STORAGE_VALUES} from '../types';

const RootNavigator: React.FC = () => {
  // React Navigation defaults to a gray background - we want white
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  const {token, persistLoggedInUser} = useContext(AppContext);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const loggedInUser = await AsyncStorage.getItem(
          STORAGE_VALUES.USER_LOGGED_IN,
        );
        loggedInUser && persistLoggedInUser();
      } catch (e) {}
    };
    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer theme={theme}>
      {token ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
