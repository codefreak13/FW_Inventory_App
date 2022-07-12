import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useLogin} from '../../hooks';
import {Input, RegularText, BoldText, Button} from '../../ui';
import {COLORS, hp} from '../../utils/Utils';

const Login = () => {
  const {
    formik: {values, handleChange, handleBlur, handleSubmit, errors, touched},
  } = useLogin();

  return (
    <View style={styles.main}>
      <View style={styles.bodyStyle}>
        <Input
          label="Email"
          value={values.email}
          containerStyles={styles.inputStyle}
          setValue={handleChange('email')}
          onBlur={handleBlur('email')}
          staticLabel
        />
        {touched.email && errors.email ? (
          <RegularText customstyle={styles.errorText}>
            {errors.email}
          </RegularText>
        ) : null}
        <View style={styles.spacing} />
        <Input
          label="Password"
          value={values.password}
          setValue={handleChange('password')}
          onBlur={handleBlur('password')}
          containerStyles={styles.inputStyle}
          staticLabel
        />
        {touched.password && errors.password ? (
          <RegularText customstyle={styles.errorText}>
            {errors.password}
          </RegularText>
        ) : null}
      </View>
      <Button
        onPress={() => {
          handleSubmit();
        }}
        customstyle={styles.addInventory}
        children={
          <BoldText customstyle={styles.addInventoryText}>Login</BoldText>
        }
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  bodyStyle: {
    marginTop: hp(20),
    marginHorizontal: hp(15),
  },
  inputStyle: {
    borderWidth: hp(0.7),
    borderColor: COLORS.Black,
    backgroundColor: COLORS.White,
    borderRadius: hp(8),
    marginTop: hp(30),
  },
  errorText: {
    color: COLORS.Danger,
  },
  addInventory: {
    marginTop: hp(50),
    backgroundColor: COLORS.DarkGrey,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 15,
  },
  addInventoryText: {
    color: COLORS.White,
    paddingHorizontal: hp(30),
  },
  spacing: {
    marginVertical: hp(30),
  },
});
