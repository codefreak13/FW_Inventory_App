import React from 'react';
import {EditInventoryForm} from '../../components';
import {EditInventoryRouteProp} from '../../navigation/types';
import {useEditInventory} from '../../hooks';

const EditInventory = (props: EditInventoryRouteProp) => {
  const {modalVisible, formik, deleteEntry, toggleModal, navigation} =
    useEditInventory(props);

  return (
    <EditInventoryForm
      headerText="Edit Inventory"
      toggleModal={toggleModal}
      deleteEntry={deleteEntry}
      modalVisible={modalVisible}
      formik={formik}
      goBack={() => navigation.goBack()}
      primaryText="Delete Entry"
      secondaryText="Edit Entry"
      modalTitle="CONFIRM DELETE"
      modalDescription="Entry Deletion is non-reversible"
    />
  );
};

export default EditInventory;
