import React, {useContext} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {InventoryList, Header, Loader} from '../../components';
import {
  InventoryListScreenNavigationProp,
  INVENTORY_ROUTES,
} from '../../navigation/types';
import {COLORS, hp} from '../../utils/Utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {BoldText, Button} from '../../ui';
import {InventoryItemProps} from '../../types';
import {AppContext} from '../../store/Context';
import AsyncStorage from '@react-native-community/async-storage';

type Props = {
  navigation: InventoryListScreenNavigationProp;
};

const Inventory = (props: Props) => {
  const {
    navigation: {navigate},
  } = props;

  const {allUsersData, loggedInUser, logOut, loading} = useContext(AppContext);
  const inventory = allUsersData[loggedInUser]?.inventory;
  console.log(allUsersData, loggedInUser, 'loggedInUser', inventory);
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
              child: <FontAwesome name="ellipsis-v" size={16} />,
              onclick: () => {
                Alert.alert('Log Out', 'Proceed to Logout?', [
                  {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => logOut()},
                ]);
              },
            }}
          />
          <InventoryList
            onPress={item => {
              navigate(INVENTORY_ROUTES.EDIT_INVENTORY_ITEM, item);
            }}
            inventory={inventory}
          />
          <Button
            onPress={() => navigate(INVENTORY_ROUTES.CREATE_INVENTORY_ITEM)}
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
  },
  addInventoryText: {
    color: COLORS.White,
    paddingLeft: 10,
  },
});

export default Inventory;
