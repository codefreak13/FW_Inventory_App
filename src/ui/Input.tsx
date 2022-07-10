import React from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  ViewStyle,
} from 'react-native';
import {hp} from '../utils/Utils';

type InputProps = {
  customstyle?: ViewStyle;
  value?: string;
  setValue?: (x: string) => void;
  placeholder?: string;
  numberOfLines?: number;
  multiline?: boolean;
  testID?: string;
  editable?: boolean;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad';
};

const Input = (Props: InputProps) => {
  const {
    customstyle,
    value,
    setValue,
    placeholder,
    numberOfLines,
    multiline,
    testID,
    editable,
    keyboardType,
    onBlur,
    ...rest
  } = Props;

  return (
    <TextInput
      value={value}
      onChangeText={text => setValue && setValue(text)}
      style={[styles.input, customstyle]}
      placeholder={placeholder}
      numberOfLines={numberOfLines}
      multiline={multiline}
      testID={testID}
      editable={editable}
      keyboardType={keyboardType}
      onBlur={onBlur}
      {...rest}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    minHeight: hp(50),
  },
});
