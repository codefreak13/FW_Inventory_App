import {useContext} from 'react';
import {AppContext} from '../store/Context';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const useLogin = () => {
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

  return {
    formik,
  };
};

export default useLogin;
