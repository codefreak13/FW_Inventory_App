import {useContext, useState} from 'react';
import {useFormik} from 'formik';
import {AppContext} from '../store/Context';
import {EditInventoryRouteProp} from '../navigation/types';
import {validationSchema} from '../utils/Utils';
import {useRoute, useNavigation} from '@react-navigation/native';

const useEditInventory = () => {
  const route = useRoute<EditInventoryRouteProp>();
  const {params} = route;
  const navigation = useNavigation();

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
    validationSchema: validationSchema,
    onSubmit: values => {
      editUserInventoryItem(params, values) && navigation.goBack();
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
