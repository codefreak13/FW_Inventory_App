import React from 'react';
import {InventoryForm} from '../../components';
import {
  InventoryListScreenNavigationProp,
  INVENTORY_ROUTES,
} from '../../navigation/types';
import {useCreateInventory} from '../../hooks';

type Props = {
  navigation: InventoryListScreenNavigationProp;
};

const Inventory = (props: Props) => {
  const {inventory, logOut, loading, navigation, toggleModal, modalVisible} =
    useCreateInventory(props);

  return (
    <InventoryForm
      loading={loading}
      headerText="Inventory Manager"
      toggleModal={toggleModal}
      onEditPress={item =>
        navigation.navigate(INVENTORY_ROUTES.EDIT_INVENTORY_ITEM, item)
      }
      onCreatePress={() =>
        navigation.navigate(INVENTORY_ROUTES.CREATE_INVENTORY_ITEM)
      }
      inventory={inventory}
      createText="Add Inventory"
      logOut={logOut}
      modalVisible={modalVisible}
      logOutTitle="Log Out"
      logOutDescription="Proceed to Logout?"
    />
  );
};

export default Inventory;
