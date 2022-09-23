import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import MainInput from '../../components/inputs/MainInput';
import ColoredButton from '../../components/touchables/ColoredButton';
import Colors, {Fonts, PixelPerfect} from '../../styles/stylesConstants';
import CheckBox from '../../components/touchables/CheckBox';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {registerAction} from '../../store/actions/authActions';
import {showMessage} from 'react-native-flash-message';
import {regexSaudiNumber} from '../../constants/helpers';
import {getTermsPage} from '../../store/actions/initActions';

const tempInput = '0513123123';
const RegisterScreen = () => {
  const [state, setState] = useState({
    firstname: __DEV__ ? `${tempInput}@gmail.com` : '',
    lastname: __DEV__ ? `${tempInput}@gmail.com` : '',
    email: __DEV__ ? `${tempInput}@gmail.com` : '',
    telephone: __DEV__ ? tempInput : '',
    password: __DEV__ ? tempInput : '',
    confirm: __DEV__ ? tempInput : '',
    agree: '1',
    approve: true,
  });

  const [hide, setHide] = useState({
    pass: true,
    confirmPass: true,
  });
  const dispatch = useDispatch();
  const navigation: any = useNavigation();

  const changeApprove = () => {
    setState(old => ({...old, approve: !state.approve}));
  };

  const registerHandler = () => {
    if (regexSaudiNumber.test(state.telephone)) {
      if (!state.approve) {
        showMessage({
          message: t('plaseApprove'),
          type: 'danger',
        });
      } else {
        dispatch(
          registerAction(
            state,
            success => success && navigation.navigate('HomeScreen'),
          ),
        );
      }
    } else {
      showMessage({
        message: t('invalidPhone'),
        type: 'danger',
      });
    }
  };

  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const confirmPassRef = useRef(null);

  return (
    <SafeView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: PixelPerfect(200)}}>
        <MainHeader title={t('addNewAccount')} />

        <View style={styles.centerView}>
          <Image
            source={require('../../assets/main/logo-title.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <MainInput
            value={state.firstname}
            placeholder={t('firstName')}
            onChangeText={inputText =>
              setState(old => ({...old, firstname: inputText}))
            }
            style={styles.input}
            onSubmitEditing={() => lastNameRef.current.focus()}
          />
          <MainInput
            inputRef={lastNameRef}
            value={state.lastname}
            placeholder={t('lastName')}
            onChangeText={inputText =>
              setState(old => ({...old, lastname: inputText}))
            }
            style={styles.input}
            onSubmitEditing={() => phoneRef.current.focus()}
          />

          <MainInput
            inputRef={phoneRef}
            value={state.telephone}
            placeholder={t('phone')}
            keyboardType="numeric"
            style={styles.input}
            onChangeText={inputText =>
              setState(old => ({...old, telephone: inputText}))
            }
            onSubmitEditing={() => emailRef.current.focus()}
          />
          <MainInput
            inputRef={emailRef}
            value={state.email}
            keyboardType="email-address"
            placeholder={t('email')}
            style={styles.input}
            onChangeText={inputText =>
              setState(old => ({...old, email: inputText}))
            }
            onSubmitEditing={() => passRef.current.focus()}
          />
          <MainInput
            value={state.password}
            inputRef={passRef}
            placeholder={t('password')}
            style={styles.input}
            onChangeText={inputText =>
              setState(old => ({...old, password: inputText}))
            }
            endIcon
            secureTextEntry={hide.pass}
            onEyePress={() => setHide(old => ({...old, pass: !hide.pass}))}
            onSubmitEditing={() => confirmPassRef.current.focus()}
          />
          <MainInput
            // multiline
            value={state.confirm}
            inputRef={confirmPassRef}
            placeholder={t('confirmPassword')}
            onChangeText={inputText =>
              setState(old => ({...old, confirm: inputText}))
            }
            style={styles.input}
            endIcon
            secureTextEntry={hide.confirmPass}
            onEyePress={() =>
              setHide(old => ({...old, confirmPass: !hide.confirmPass}))
            }
            onSubmitEditing={registerHandler}
          />
          <CheckBox
            style={{marginTop: 20}}
            checked={state.approve}
            onPress={changeApprove}
            title={t('iRead')}
            diffrentTitle={t('terms')}
            onDiffrentTitlePress={() => {
              dispatch(getTermsPage());
              navigation.navigate('TermsConditions');
            }}
          />
          <ColoredButton
            title={t('Register')}
            style={styles.button}
            // onPress={() => navigation.navigate('RegisterSuccess')}
            onPress={registerHandler}
          />
          <View style={styles.textsCon}>
            <Text
              style={[
                styles.text,
                {
                  color: Colors.black,
                },
              ]}>
              {t('ifHave')}{' '}
            </Text>
            <Text
              onPress={() => navigation.navigate('LoginScreen')}
              style={[
                styles.text,
                {
                  color: Colors.black,
                  textDecorationLine: 'underline',
                },
              ]}>
              {t('Login')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  centerView: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logo: {
    marginTop: 25,
    marginBottom: 50,
    height: PixelPerfect(140),
    width: PixelPerfect(360),
  },
  input: {
    marginTop: 10,
  },
  button: {
    marginVertical: 22,
  },
  textsCon: {
    flexDirection: 'row',
  },
  text: {
    fontFamily: Fonts.Medium,
  },
});
