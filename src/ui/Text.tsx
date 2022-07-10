import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {hp} from '../utils/Utils';

type TextProps = {
  children?: string | number;
  customstyle?: TextStyle;
  testID?: string;
};

const textStyle = (style: {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: any;
}) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: style.fontSize,
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight,
    },
  });

  return styles;
};

const BaseText =
  (style: ReturnType<typeof textStyle>) => (Props: TextProps) => {
    const {children, customstyle, ...rest} = Props;

    return (
      <>
        <Text style={[style.text, customstyle]} {...rest}>
          {children}
        </Text>
      </>
    );
  };

export const RegularText = BaseText(textStyle({}));

export const MediumText = BaseText(
  textStyle({
    fontFamily: 'Roboto-Medium',
    fontSize: hp(16),
  }),
);

export const BoldText = BaseText(
  textStyle({
    fontFamily: 'Roboto-Bold',
    fontSize: hp(16),
    fontWeight: 'bold',
  }),
);
