import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import Colors, {Fonts, PixelPerfect} from '../../styles/stylesConstants';
import MainInput from '../../components/inputs/MainInput';
import ColoredButton from '../../components/touchables/ColoredButton';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {forgetPassword} from '../../store/actions/authActions';

const ForgetPass = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  return (
    <SafeView>
      <MainHeader title={t('passForgot')} />

      <View style={styles.centred}>
        <Text style={styles.forgetText}>{t('enterEmail')}</Text>
        <MainInput
          placeholder={t('email')}
          style={styles.input}
          onChangeText={(inputText: string) => setEmail(inputText)}
          keyboardType="email-address"
          value={email}
        />
        <ColoredButton
          title={t('send')}
          onPress={() =>
            dispatch(
              forgetPassword(
                {email: email},
                success => success && navigation.navigate('EmailSent'),
              ),
            )
          }
        />
      </View>
    </SafeView>
  );
};

export default ForgetPass;

const styles = StyleSheet.create({
  forgetText: {
    fontSize: PixelPerfect(35),
    fontFamily: Fonts.Bold,
    color: Colors.black,
    marginTop: 51,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  centred: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 32,
  },
  input: {
    marginVertical: 21,
    paddingHorizontal: 25,
  },
});
