import React, {ReactNode} from 'react';
import {ViewStyle, Pressable, TextStyle} from 'react-native';
import {BoldText} from './Text';

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
      style={customstyle}
      onPress={onPress}
      disabled={disabled}
      {...rest}>
      {!!title ? (
        <BoldText customstyle={textStyle}>{title}</BoldText>
      ) : (
        children
      )}
    </Pressable>
  );
};

export default Button;
