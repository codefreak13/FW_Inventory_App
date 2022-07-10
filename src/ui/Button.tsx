import React, {ReactNode} from 'react';
import {StyleSheet, ViewStyle, Pressable, TextStyle} from 'react-native';
import {MediumText} from './Text';

type ButtonProps = {
  customstyle?: ViewStyle;
  title?: string;
  onPress?: () => void;
  textStyle?: TextStyle;
  testID?: string;
  disabled?: boolean;
  children?: ReactNode;
};

const Button = (Props: ButtonProps) => {
  const {
    customstyle,
    onPress,
    title,
    textStyle,
    children,
    testID,
    disabled,
    ...rest
  } = Props;

  return (
    <Pressable
      testID={testID}
      style={[styles.button, customstyle]}
      onPress={onPress}
      disabled={disabled}
      {...rest}>
      {!!title ? (
        <MediumText customstyle={textStyle}>{title}</MediumText>
      ) : (
        children
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {},
});
