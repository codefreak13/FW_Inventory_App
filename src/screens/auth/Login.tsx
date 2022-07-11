import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, RegularText, BoldText, Button} from '../../ui';
import {COLORS, hp} from '../../utils/Utils';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {AppContext} from '../../store/Context';

const Login = () => {
  const {LoginIfUserExists} = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required').email(),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: values => {
      LoginIfUserExists({
        email: values.email.toLowerCase(),
        password: values.password,
      });
    },
  });

  return (
    <View style={styles.main}>
      <View style={styles.bodyStyle}>
        <Input
          value={formik.values.email}
          customstyle={styles.inputStyle}
          placeholder="Email"
          setValue={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
        />
        {formik.touched.email && formik.errors.email ? (
          <RegularText customstyle={styles.errorText}>
            {formik.errors.email}
          </RegularText>
        ) : null}
        <Input
          value={formik.values.password}
          customstyle={styles.inputStyle}
          placeholder="Password"
          setValue={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
        />
        {formik.touched.password && formik.errors.password ? (
          <RegularText customstyle={styles.errorText}>
            {formik.errors.password}
          </RegularText>
        ) : null}
      </View>
      <Button
        onPress={() => {
          formik.handleSubmit();
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
    borderWidth: hp(0.5),
    borderColor: COLORS.Black,
    marginTop: hp(50),
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
});
