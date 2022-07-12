import React from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  ViewStyle,
} from 'react-native';
import {hp} from '../utils/Utils';
import {FloatingLabelInput} from 'react-native-floating-label-input';

type InputProps = {
  label: string;
  staticLabel?: boolean;
  customstyle?: ViewStyle;
  containerStyles?: ViewStyle;
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
    label,
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
    containerStyles,
    staticLabel,
    ...rest
  } = Props;

  return (
    <FloatingLabelInput
      label={label}
      value={value}
      staticLabel={staticLabel}
      onChangeText={text => setValue && setValue(text)}
      style={customstyle}
      placeholder={placeholder}
      numberOfLines={numberOfLines}
      multiline={multiline}
      testID={testID}
      editable={editable}
      keyboardType={keyboardType}
      onBlur={onBlur}
      containerStyles={{...styles.input, ...containerStyles}}
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
