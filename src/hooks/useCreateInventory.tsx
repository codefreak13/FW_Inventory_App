import {useContext, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {AppContext} from '../store/Context';
import {InventoryListScreenNavigationProp} from '../navigation/types';

type Props = {
  navigation: InventoryListScreenNavigationProp;
};

const useCreateInventory = (props: Props) => {
  const {navigation} = props;

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
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      price: Yup.number().required('Required'),
      total: Yup.number().required('Required'),
      description: Yup.string()
        .matches(/\S+\s+\S+\s+\S+/, 'Must have atleast 3 words')
        .required('Required'),
    }),
    onSubmit: values => {
      addUserInventoryItem(values);
      navigation.goBack();
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
