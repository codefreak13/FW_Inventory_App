import React from 'react';
import {View, StyleSheet} from 'react-native';
import {InventoryList, Header, Loader, Modal} from '../components';
import {COLORS, hp} from '../utils/Utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {BoldText, Button} from '../ui';
import {InventoryItemProps} from '../types';

type Props = {
  loading: boolean;
  headerText: string;
  toggleModal: () => void;
  onEditPress: (item: InventoryItemProps) => void;
  onCreatePress: () => void;
  inventory: InventoryItemProps[];
  createText: string;
  logOut: () => void;
  modalVisible: boolean;
  logOutTitle: string;
  logOutDescription: string;
};

const InventoryForm = (props: Props) => {
  const {
    loading,
    headerText,
    toggleModal,
    onEditPress,
    inventory,
    onCreatePress,
    createText,
    logOutTitle,
    logOutDescription,
    logOut,
    modalVisible,
  } = props;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.main}>
          <Header
            title={headerText}
            customMiddleIcon
            customHeaderStyles={styles.headerStyle}
            middleIconStyle={styles.middleIconStyle}
            rightButton={{
              child: (
                <FontAwesome name="ellipsis-v" size={16} color={COLORS.White} />
              ),
              onclick: () => toggleModal(),
            }}
          />
          <InventoryList
            onPress={item => onEditPress(item)}
            inventory={inventory}
          />
          <Button
            onPress={() => onCreatePress()}
            customstyle={styles.addInventory}
            children={
              <View style={styles.addInventoryView}>
                <FontAwesome name="plus" size={16} color={COLORS.White} />
                <BoldText customstyle={styles.addInventoryText}>
                  {createText}
                </BoldText>
              </View>
            }
          />
          <Modal
            title={logOutTitle}
            content={logOutDescription}
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
  },
  addInventoryText: {
    color: COLORS.White,
    paddingLeft: 10,
  },
});

export default InventoryForm;
