import {Modal, Pressable, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import Colors from '../../styles/stylesConstants';
import {BlurView} from '@react-native-community/blur';

interface IPopUp {
  visible: boolean;
  onRequestClose: () => void;
  animationType?: any;
  children: JSX.Element | JSX.Element[] | object;
}

const PopUp: FC<IPopUp> = ({
  visible,
  onRequestClose,
  animationType,
  children,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType={animationType ? animationType : 'fade'}
      onRequestClose={onRequestClose}>
      <Pressable
        style={{
          flex: 1,
          // backgroundColor: 'rgba(113, 113, 113, 0.5)',
        }}
        onPress={onRequestClose}>
        <BlurView style={styles.blurView} blurType="dark" blurAmount={1} />
      </Pressable>

      <View
        style={{
          flex: 1.5,
          backgroundColor: 'blue',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
        }}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </Modal>
  );
};

export default PopUp;

const styles = StyleSheet.create({
  modalView: {
    flex: 1.5,
    backgroundColor: Colors.mainBack,
    paddingTop: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // backgroundColor: 'rgba(113, 113, 113, .5)',
  },
});
