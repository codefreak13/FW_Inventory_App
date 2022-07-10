import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {InventoryItemProps} from '../types';
import {Button, BoldText, RegularText, Input, MediumText} from '../ui';
import {COLORS, hp} from '../utils/Utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

type InventoryListItemProps = {
  onPress: () => void;
} & InventoryItemProps;

const InventoryListItem = (props: InventoryListItemProps) => {
  const {name, price, total, description, onPress} = props;

  return (
    <Button
      customstyle={styles.mainStyle}
      onPress={() => onPress()}
      testID="inventoryItem">
      <View style={styles.detailContainerStyle}>
        <View style={styles.rowView}>
          <MediumText customstyle={{}}>{name}</MediumText>
          <MediumText>{price}</MediumText>
          <MediumText>{total}</MediumText>
        </View>
        <Input
          value={description}
          multiline
          numberOfLines={2}
          editable={false}
        />
      </View>
      <FontAwesome
        name="edit"
        size={16}
        color={COLORS.Black}
        style={styles.editIconStyle}
      />
    </Button>
  );
};

export default InventoryListItem;

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    justifyContent: 'space-between',
    margin: hp(10),
    backgroundColor: COLORS.White,
    padding: hp(13),
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowOffset: {width: hp(10), height: hp(10)},
        shadowColor: COLORS.Grey,
        shadowOpacity: 1,
        zIndex: 999,
      },
    }),
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailContainerStyle: {},
  detailViewStyle: {
    marginLeft: hp(10),
  },
  editIconStyle: {
    alignSelf: 'flex-end',
  },
});
