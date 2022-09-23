import {I18nManager, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors, {Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {t} from 'i18next';
import {SharedStyles} from '../../styles/sharedStyles';

const {isRTL} = I18nManager;
const TableView = () => {
  return (
    <View style={styles.con}>
      <View style={[styles.cel, {backgroundColor: '#FBF8EE'}]}>
        <Text style={styles.key}>{t('tall')}</Text>
        <Text style={styles.value}>120 {t('CM')}</Text>
      </View>
      <View style={[styles.cel]}>
        <Text style={styles.key}>{t('width')}</Text>
        <Text style={styles.value}>70 {t('CM')}</Text>
      </View>
      <View style={[styles.cel, {backgroundColor: '#FBF8EE'}]}>
        <Text style={styles.key}>{t('height')}</Text>
        <Text style={styles.value}>20 {t('CM')}</Text>
      </View>
      <View style={[styles.cel]}>
        <Text style={styles.key}>{t('material')}</Text>
        <Text style={styles.value}>{t('wood')}</Text>
      </View>
    </View>
  );
};

export default TableView;

const styles = StyleSheet.create({
  con: {
    marginTop: 11,
    marginBottom: 24,
  },
  cel: {
    flexDirection: 'row',
    paddingTop: 7,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  key: {
    flex: 1,
    fontSize: PixelPerfect(30),
    fontFamily: Fonts.SemiBold,
    color: Colors.black,
    ...SharedStyles.textAlign,
  },
  value: {
    flex: 1,
    fontSize: PixelPerfect(30),
    fontFamily: Fonts.Regular,
    color: Colors.darkGray,
    ...SharedStyles.textAlign,
  },
});
