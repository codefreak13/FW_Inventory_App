import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {COLORS, hp} from '../utils/Utils';
import {BoldText, Button, MediumText} from '../ui';

type ModalProps = {
  toggleModal: () => void;
  isVisible: boolean;
  title: string;
  content: string;
  bodyStyle?: ViewStyle;
  bodyTextStyle?: TextStyle;
  primaryOnPress?: () => void;
  secondaryOnPress?: () => void;
  buttonStyle?: ViewStyle;
  primaryText?: string;
  secondaryText?: string;
  buttonTextStyle?: TextStyle;
  secondaryOnPressID?: string;
  modalTestID?: string;
};

const FW_Modal = ({
  isVisible,
  toggleModal,
  title,
  content,
  bodyStyle,
  bodyTextStyle,
  primaryOnPress,
  secondaryOnPress,
  buttonStyle,
  primaryText,
  secondaryText,
  buttonTextStyle,
  secondaryOnPressID,
  modalTestID,
}: ModalProps) => {
  return (
    <Modal
      testID={modalTestID}
      isVisible={isVisible}
      hasBackdrop={true}
      style={{margin: 20}}
      onBackButtonPress={() => {
        toggleModal();
      }}
      onBackdropPress={() => {
        toggleModal();
      }}
      animationIn="slideInUp"
      animationInTiming={350}
      coverScreen={true}
      animationOut="slideOutDown"
      useNativeDriver={true}>
      <View style={styles.main}>
        <BoldText customstyle={styles.header}>{title}</BoldText>
        <View style={[styles.body, bodyStyle]}>
          <MediumText customstyle={bodyTextStyle}>{content}</MediumText>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={primaryOnPress}
            customstyle={{...styles.buttonStyle, ...buttonStyle}}
            title={primaryText}
            textStyle={{...buttonTextStyle, ...styles.buttonTextStyle}}
          />
          <Button
            testID={secondaryOnPressID}
            onPress={secondaryOnPress}
            customstyle={{...styles.buttonStyle, ...buttonStyle}}
            title={secondaryText}
            textStyle={{...buttonTextStyle, ...styles.buttonTextStyle}}
          />
        </View>
      </View>
    </Modal>
  );
};

export default FW_Modal;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.White,
    maxHeight: hp(300),
    borderRadius: hp(10),
    paddingTop: hp(20),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  body: {
    margin: hp(30),
  },
  header: {
    textAlign: 'center',
    marginTop: hp(20),
  },
  buttonContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonStyle: {
    backgroundColor: COLORS.DarkGrey,
    minWidth: hp(80),
    borderRadius: hp(15),
    padding: hp(7),
  },
  buttonTextStyle: {
    color: COLORS.White,
    alignSelf: 'center',
  },
});
