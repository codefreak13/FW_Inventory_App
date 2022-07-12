/* eslint-disable no-undef */
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

// const mockAsyncStorage = require('@react-native-community/async-storage/jest/async-storage-mock');
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const platform = jest.requireActual(
    'react-native/Libraries/Utilities/Platform',
  );
  return {
    ...platform,
    constants: {
      ...platform.constants,
      reactNativeVersion: {
        major: 0,
        minor: 65,
        patch: 1,
      },
    },
  };
});
