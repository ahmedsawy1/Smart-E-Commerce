import {
  Modal,
  StyleSheet,
  Image,
  View,
  Pressable,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {XIcon} from '../../assets/svg/icons';
import Selector from '../touchables/Selector';
import {t} from 'i18next';
import ColoredButton from '../touchables/ColoredButton';
import Colors, {phoneWidth} from '../../styles/stylesConstants';
import SafeView from './SafeView';
import PopUp from './PopUp';

const FilterModal = ({
  visible,
  onClose,
  onRequestClose,
  onFilterPress,
  children,
}) => {
  const [popUp, setPopUp] = useState(false);

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onRequestClose}>
      <SafeView>
        <View style={styles.header}>
          <View style={{flex: 1}}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require('../../assets/main/logo.png')}
            />
          </View>
          <Pressable onPress={onClose}>
            <XIcon />
          </Pressable>
        </View>

        <View style={styles.centerView}>{children}</View>
        <View style={styles.bottomView}>
          <ColoredButton
            isLinear={false}
            title={t('reset')}
            style={styles.resetButton}
            styleTitle={{
              color: Colors.medGray,
            }}
          />
          <ColoredButton
            title={t('searchFilters')}
            style={{width: '55%', marginBottom: Platform.OS === 'ios' ? 30 : 0}}
            onPress={onFilterPress}
          />
        </View>
      </SafeView>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: phoneWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  centerView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 20,
  },
  image: {
    height: 37,
    width: 34,
  },
  bottomView: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  resetButton: {
    width: '40%',
    backgroundColor: Colors.mainBack,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
});
