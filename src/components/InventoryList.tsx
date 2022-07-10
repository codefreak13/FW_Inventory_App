import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {InventoryItemProps} from '../types';
import {BoldText} from '../ui';
import {hp} from '../utils/Utils';
import Header from './Header';
import InventoryListItem from './InventoryListItem';

type InventoryListProps = {
  onPress: (item: any) => void;
  inventory: InventoryItemProps[];
};

const InventoryList = (props: InventoryListProps) => {
  const {inventory, onPress} = props;
  return (
    <>
      <FlatList
        data={inventory}
        testID="inventoryList"
        style={styles.listStyle}
        keyExtractor={(item, index) => item.name + index}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyListStyle}>
            <BoldText>No Inventory</BoldText>
          </View>
        }
        ListHeaderComponent={
          <>
            {inventory.length > 0 && (
              <Header
                title={`Price(\u20A6)`}
                customMiddleIcon
                leftButton={{
                  child: <BoldText>Name</BoldText>,
                  onclick: () => null,
                }}
                rightButton={{
                  child: <BoldText>Total</BoldText>,
                  onclick: () => null,
                }}
              />
            )}
          </>
        }
        renderItem={({item}) => (
          <InventoryListItem {...item} onPress={() => onPress(item)} />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    flex: 1,
    width: '100%',
  },
  emptyListStyle: {
    alignItems: 'center',
    marginTop: hp(250),
  },
});

export default InventoryList;
