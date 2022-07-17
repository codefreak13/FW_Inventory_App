import {useContext, useState} from 'react';
import {useFormik} from 'formik';
import {AppContext} from '../store/Context';
import {InventoryListScreenNavigationProp} from '../navigation/types';
import {validationSchema} from '../utils/Utils';
import {useNavigation} from '@react-navigation/native';

const useCreateInventory = () => {
  const navigation = useNavigation<InventoryListScreenNavigationProp>();

  const {addUserInventoryItem, allUsersData, loggedInUser, logOut, loading} =
    useContext(AppContext);

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      total: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      addUserInventoryItem(values) && navigation.goBack();
    },
  });

  const inventory = allUsersData[loggedInUser]?.inventory;

  return {
    navigation,
    formik,
    inventory,
    logOut,
    loading,
    modalVisible,
    toggleModal,
  };
};

export default useCreateInventory;
