import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Header} from '../components';
import {Input, RegularText, BoldText, Button} from '../ui';
import {COLORS, hp} from '../utils/Utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FormikValues} from 'formik';

type Props = {
  headerText: string;
  goBack: () => void;
  formik: FormikValues;
  createText: string;
};

const CreateInventoryForm = (props: Props) => {
  const {headerText, goBack, formik, createText} = props;

  return (
    <KeyboardAwareScrollView>
      <View style={styles.main}>
        <Header
          title={headerText}
          middleIconStyle={styles.titleStyle}
          customMiddleIcon
          leftButton={{
            child: (
              <FontAwesome name="arrow-left" size={16} color={COLORS.Black} />
            ),
            onclick: () => goBack(),
          }}
        />
        <View style={styles.bodyStyle}>
          <Input
            value={formik.values.name}
            customstyle={styles.inputStyle}
            placeholder="Name"
            setValue={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
          />
          {formik.touched.name && formik.errors.name ? (
            <RegularText customstyle={styles.errorText}>
              {formik.errors.name}
            </RegularText>
          ) : null}
          <Input
            value={formik.values.price}
            customstyle={styles.inputStyle}
            placeholder="Price"
            keyboardType={'number-pad'}
            setValue={formik.handleChange('price')}
            onBlur={formik.handleBlur('price')}
          />
          {formik.touched.price && formik.errors.price ? (
            <RegularText customstyle={styles.errorText}>
              {formik.errors.price}
            </RegularText>
          ) : null}
          <Input
            value={formik.values.total}
            customstyle={styles.inputStyle}
            placeholder="Total"
            keyboardType={'number-pad'}
            setValue={formik.handleChange('total')}
            onBlur={formik.handleBlur('total')}
          />
          {formik.touched.total && formik.errors.total ? (
            <RegularText customstyle={styles.errorText}>
              {formik.errors.total}
            </RegularText>
          ) : null}
          <Input
            value={formik.values.description}
            customstyle={styles.inputStyle}
            placeholder="Description"
            numberOfLines={3}
            setValue={formik.handleChange('description')}
            onBlur={formik.handleBlur('description')}
          />
          {formik.touched.description && formik.errors.description ? (
            <RegularText customstyle={styles.errorText}>
              {formik.errors.description}
            </RegularText>
          ) : null}
        </View>
        <Button
          onPress={() => {
            formik.handleSubmit();
          }}
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
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CreateInventoryForm;

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
