import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import Colors, {Fonts, PixelPerfect} from '../../styles/stylesConstants';
import MainInput from '../../components/inputs/MainInput';
import ColoredButton from '../../components/touchables/ColoredButton';

import {useTranslation} from 'react-i18next';
import {LockIcon, PhoneIcon} from '../../assets/svg/icons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {loginNormal} from '../../store/actions/authActions';

import {showMessage} from 'react-native-flash-message';
import {regexSaudiNumber} from '../../constants/helpers';

const LoginScreen = () => {
  const {t} = useTranslation();
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: __DEV__ ? '0512345678' : '',
    password: __DEV__ ? '12345' : '',
    loader: false,
  });

  const [hide, setHide] = useState(true);

  const toggleLoader = (isLoading: boolean) =>
    setState(s => ({...s, loader: isLoading}));

  const loginHandler = () => {
    toggleLoader(true);
    if (regexSaudiNumber.test(state.email)) {
      dispatch(
        loginNormal(state, success => {
          toggleLoader(false);
          success && navigation.navigate('HomeScreen');
        }),
      );
    } else {
      toggleLoader(false);
      showMessage({
        message: t('invalidPhone'),
        type: 'danger',
      });
    }
  };

  const passRef = useRef();

  return (
    <SafeView>
      <MainHeader noArrow />
      <View style={styles.centerView}>
        <Image
          source={require('../../assets/main/logo-title.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.loginText}>{t('login')}</Text>
        <MainInput
          value={state.email}
          onChangeText={inputText =>
            setState(old => ({...old, email: inputText}))
          }
          mainIcon={<PhoneIcon />}
          placeholder={t('phone')}
          keyboardType="numeric"
          onSubmitEditing={() => passRef.current.focus()}
        />
        <MainInput
          inputRef={passRef}
          secureTextEntry={hide}
          onEyePress={() => setHide(!hide)}
          value={state.password}
          onChangeText={inputText =>
            setState(old => ({...old, password: inputText}))
          }
          mainIcon={<LockIcon />}
          placeholder={t('password')}
          endIcon
          style={styles.input}
          onSubmitEditing={loginHandler}
        />
        <Text
          style={styles.forgetText}
          onPress={() => navigation.navigate('ForgetPass')}>
          {t('passForgot')}
        </Text>
        {/* <Button title="stop" onPress={() => dispatch(EndLoading())} /> */}
        <ColoredButton
          loading={state.loader}
          title={t('enter')}
          onPress={loginHandler}
        />
        <View style={{flexDirection: 'row', marginVertical: 20}}>
          <Text style={styles.noAccountText}>{t('haveNoAccount')}</Text>
          <Text
            style={styles.registerText}
            onPress={() => navigation.navigate('RegisterScreen')}>
            {t('registerNow')}
          </Text>
        </View>
        <Text
          style={styles.vistorText}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}>
          {t('vistorEnter')}
        </Text>
      </View>
    </SafeView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  logo: {
    marginBottom: 40,
    height: PixelPerfect(140),
    width: PixelPerfect(360),
    marginTop: 25,
  },
  centerView: {
    alignItems: 'center',
    paddingHorizontal: PixelPerfect(32),
  },
  loginText: {
    color: Colors.black,
    fontSize: PixelPerfect(32),
    marginBottom: 22,
    fontFamily: Fonts.Bold,
  },
  forgetText: {
    fontFamily: Fonts.Medium,
    color: Colors.medGray,
    fontSize: PixelPerfect(26),
    marginBottom: 31,
  },
  input: {
    marginTop: 16,
    marginBottom: 23,
  },
  noAccountText: {
    fontFamily: Fonts.Medium,
    fontSize: PixelPerfect(28),
    color: Colors.black,
    marginHorizontal: 3,
  },
  registerText: {
    fontFamily: Fonts.Medium,
    fontSize: PixelPerfect(28),
    color: Colors.black,
    textDecorationLine: 'underline',
  },
  vistorText: {
    fontFamily: Fonts.Medium,
    color: Colors.medGray,
    fontSize: PixelPerfect(28),
  },
});
