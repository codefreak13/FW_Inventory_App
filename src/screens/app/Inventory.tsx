import React from 'react';
import {View, StyleSheet} from 'react-native';
import {INVENTORY_ROUTES} from '../../navigation/types';
import {useCreateInventory} from '../../hooks';
import {InventoryList, Header, Loader, Modal} from '../../components';
import {COLORS, hp} from '../../utils/Utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {BoldText, Button} from '../../ui';

const Inventory = () => {
  const {inventory, logOut, loading, navigation, toggleModal, modalVisible} =
    useCreateInventory();
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.main}>
          <Header
            title="Inventory Manager"
            customMiddleIcon
            customHeaderStyles={styles.headerStyle}
            middleIconStyle={styles.middleIconStyle}
            rightButton={{
              child: (
                <FontAwesome name="ellipsis-h" size={16} color={COLORS.White} />
              ),
              onclick: () => toggleModal(),
            }}
          />
          <InventoryList
            onPress={item =>
              navigation.navigate(INVENTORY_ROUTES.EDIT_INVENTORY_ITEM, item)
            }
            inventory={inventory}
          />
          <Button
            onPress={() =>
              navigation.navigate(INVENTORY_ROUTES.CREATE_INVENTORY_ITEM)
            }
            customstyle={styles.addInventory}
            children={
              <View style={styles.addInventoryView}>
                <FontAwesome name="plus" size={16} color={COLORS.White} />
                <BoldText customstyle={styles.addInventoryText}>
                  Add Inventory
                </BoldText>
              </View>
            }
          />
          <Modal
            title="Log Out"
            content="Proceed to Logout?"
            isVisible={modalVisible}
            toggleModal={() => toggleModal()}
            secondaryText="Continue?"
            primaryText="Cancel"
            primaryOnPress={() => toggleModal()}
            secondaryOnPress={() => logOut()}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.Grey,
  },
  headerStyle: {
    backgroundColor: COLORS.DarkGrey,
    marginBottom: hp(20),
  },
  middleIconStyle: {
    color: COLORS.White,
    fontSize: hp(18),
  },
  addInventory: {
    position: 'relative',
    bottom: 10,
    backgroundColor: COLORS.DarkGrey,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 15,
  },
  addInventoryView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addInventoryText: {
    color: COLORS.White,
    paddingLeft: 10,
  },
});

export default Inventory;
