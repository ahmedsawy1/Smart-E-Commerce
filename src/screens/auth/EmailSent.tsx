import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import Colors, {Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {TickMarkIcon} from '../../assets/svg/icons';
import ColoredButton from '../../components/touchables/ColoredButton';
import {useNavigation} from '@react-navigation/native';

const EmailSent = ({}) => {
  const navigation: any = useNavigation();
  return (
    <SafeView>
      <MainHeader title={t('resetPass')} noArrow />
      <View style={styles.centerView}>
        <View style={styles.cyrcle}>
          <TickMarkIcon />
        </View>
        <Text style={styles.successText}>{t('resetLinkSent')}</Text>
        <Text style={styles.youCanText}>{t('spamNote')}</Text>
      </View>
    </SafeView>
  );
};

export default EmailSent;

const styles = StyleSheet.create({
  centerView: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  cyrcle: {
    height: 111,
    width: 111,
    backgroundColor: Colors.medGreen,
    borderRadius: 100,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: PixelPerfect(40),
    fontFamily: Fonts.Bold,
    color: Colors.black,
    marginTop: 30,
    textAlign: 'center',
  },
  youCanText: {
    fontSize: PixelPerfect(33),
    fontFamily: Fonts.Regular,
    color: Colors.red,
    marginTop: 5,
    textAlign: 'center',
    marginBottom: 30,
  },
});
