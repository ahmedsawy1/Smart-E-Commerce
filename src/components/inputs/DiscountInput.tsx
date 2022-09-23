import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainInput from './MainInput';
import ColoredButton from '../touchables/ColoredButton';
import Colors, {PixelPerfect} from '../../styles/stylesConstants';
import {t} from 'i18next';

const DiscountInput = ({
  style,
  value,
  onChangeText,
  onPress,
  placeholder,
  loading,
}: any) => {
  return (
    <View style={[styles.con, style]}>
      <View style={styles.inputCon}>
        <MainInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      <View style={styles.buttonCon}>
        <ColoredButton
          loading={loading}
          isLinear={false}
          title={t('apply')}
          style={styles.button}
          styleTitle={{fontSize: PixelPerfect(28)}}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default DiscountInput;

const styles = StyleSheet.create({
  con: {
    backgroundColor: Colors.darkWhite,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  inputCon: {
    flex: 3.4,
    paddingRight: 6,
  },
  buttonCon: {
    flex: 1,
  },
  button: {
    backgroundColor: Colors.medGray,
  },
});
