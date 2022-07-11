import {useContext, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {AppContext} from '../store/Context';
import {EditInventoryRouteProp} from '../navigation/types';

const useEditInventory = (props: EditInventoryRouteProp) => {
  const {
    navigation,
    route: {params},
  } = props;

  const {editUserInventoryItem, deleteUserInventoryItem} =
    useContext(AppContext);

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const deleteEntry = () => {
    deleteUserInventoryItem(params);
    toggleModal();
    navigation.goBack();
  };

  const formik = useFormik({
    initialValues: {
      ...params,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Please provide name'),
      price: Yup.number().required('Please provide price'),
      total: Yup.number().required('Please provide stock'),
      description: Yup.string()
        .matches(/\S+\s+\S+\s+\S+/, 'Must have atleast 3 words')
        .required('Required'),
    }),
    onSubmit: values => {
      editUserInventoryItem(params, values);
      navigation.goBack();
    },
  });

  return {
    modalVisible,
    formik,
    deleteEntry,
    toggleModal,
    navigation,
  };
};

export default useEditInventory;
