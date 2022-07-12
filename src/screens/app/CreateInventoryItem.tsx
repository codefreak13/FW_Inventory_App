import React from 'react';
import {InventoryListScreenNavigationProp} from '../../navigation/types';
import {useCreateInventory} from '../../hooks';
import {View, StyleSheet} from 'react-native';
import {Header} from '../../components';
import {Input, RegularText, BoldText, Button} from '../../ui';
import {COLORS, hp} from '../../utils/Utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const CreateInventoryItem = () => {
  const {
    formik: {values, handleChange, handleBlur, handleSubmit, errors, touched},
    navigation,
  } = useCreateInventory();

  return (
    <KeyboardAwareScrollView>
      <View style={styles.main}>
        <Header
          title="Create Inventory"
          middleIconStyle={styles.titleStyle}
          customMiddleIcon
          leftButton={{
            child: (
              <FontAwesome name="arrow-left" size={16} color={COLORS.Black} />
            ),
            onclick: () => navigation.goBack(),
          }}
        />
        <View style={styles.bodyStyle}>
          <Input
            value={values.name}
            customstyle={styles.inputStyle}
            placeholder="Name"
            setValue={handleChange('name')}
            onBlur={handleBlur('name')}
          />
          {touched.name && errors.name ? (
            <RegularText customstyle={styles.errorText}>
              {errors.name}
            </RegularText>
          ) : null}
          <Input
            value={values.price}
            customstyle={styles.inputStyle}
            placeholder="Price"
            keyboardType={'number-pad'}
            setValue={handleChange('price')}
            onBlur={handleBlur('price')}
          />
          {touched.price && errors.price ? (
            <RegularText customstyle={styles.errorText}>
              {errors.price}
            </RegularText>
          ) : null}
          <Input
            value={values.total}
            customstyle={styles.inputStyle}
            placeholder="Total"
            keyboardType={'number-pad'}
            setValue={handleChange('total')}
            onBlur={handleBlur('total')}
          />
          {touched.total && errors.total ? (
            <RegularText customstyle={styles.errorText}>
              {errors.total}
            </RegularText>
          ) : null}
          <Input
            value={values.description}
            customstyle={styles.inputStyle}
            placeholder="Description"
            numberOfLines={3}
            setValue={handleChange('description')}
            onBlur={handleBlur('description')}
          />
          {touched.description && errors.description ? (
            <RegularText customstyle={styles.errorText}>
              {errors.description}
            </RegularText>
          ) : null}
        </View>
        <Button
          onPress={() => {
            handleSubmit();
          }}
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
    </KeyboardAwareScrollView>
  );
};

export default CreateInventoryItem;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  bodyStyle: {
    marginTop: hp(20),
    marginHorizontal: hp(15),
  },
  inputStyle: {
    borderWidth: hp(0.5),
    borderColor: COLORS.Black,
    marginTop: hp(50),
  },
  titleStyle: {
    color: COLORS.Black,
    fontSize: hp(18),
  },
  errorText: {
    color: COLORS.Danger,
  },
  addInventory: {
    marginTop: hp(50),
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
