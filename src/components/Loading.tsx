import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {COLORS} from '../utils/Utils';

type Props = {
  color?: string;
};

const LoadingIcon = (props: Props) => {
  const {color} = props;

  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={color ? color : COLORS.Black} />
    </View>
  );
};

export default LoadingIcon;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
