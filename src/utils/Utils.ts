import {Dimensions} from 'react-native';
import {
  widthPercentageToDP as wdp,
  heightPercentageToDP as hdp,
} from 'react-native-responsive-screen';
import * as COLORS from './colors';
import * as Yup from 'yup';

const CustomHeight = 812;
const CustomWidth = 375;

export const hp = (value: number) => {
  const dimension = (value / CustomHeight) * 100;
  return hdp(`${dimension}%`);
};

export const wp = (value: number) => {
  const dimension = (value / CustomWidth) * 100;
  return wdp(`${dimension}%`);
};

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;

export const validationSchema = Yup.object({
  name: Yup.string().required('Please provide name'),
  price: Yup.number().required('Please provide price'),
  total: Yup.number().required('Please provide stock'),
  description: Yup.string()
    .matches(/\S+\s+\S+\s+\S+/, 'Description must have atleast 3 words')
    .required('Please provide description'),
});

export {COLORS};
