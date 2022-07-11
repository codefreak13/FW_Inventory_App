import React from 'react';
import {CreateInventoryForm} from '../../components';
import {InventoryListScreenNavigationProp} from '../../navigation/types';
import {useCreateInventory} from '../../hooks';

type Props = {
  navigation: InventoryListScreenNavigationProp;
};

const CreateInventory = (props: Props) => {
  const {formik, navigation} = useCreateInventory(props);

  return (
    <CreateInventoryForm
      headerText="Create Inventory"
      goBack={() => navigation.goBack()}
      formik={formik}
      createText="Add Inventory"
    />
  );
};

export default CreateInventory;
