import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import RootNavigator from './navigation/RootNavigator';
import AppContextProvider from './store/Context';

const App = () => {
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={'light-content'} />
      <AppContextProvider>
        <RootNavigator />
      </AppContextProvider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
});
