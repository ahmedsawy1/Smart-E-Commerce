import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import MainInput from '../../components/inputs/MainInput';
import ColoredButton from '../../components/touchables/ColoredButton';
import {useDispatch} from 'react-redux';
import {resetPasswordAction} from '../../store/actions/authActions';
import qs from 'qs';
import {showMessage} from 'react-native-flash-message';

const ResetPass = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [hide, setHide] = useState({
    pass: true,
    confirmPass: true,
  });

  const [state, setState] = useState({
    password: '',
    confirm: '',
  });

  const urlObj = qs.parse(route.params);
  console.log(urlObj);

  const onResetPass = () => {
    if (state.confirm.length == 0 || state.password.length == 0) {
      showMessage({
        type: 'danger',
        message: t('fillAllFields'),
      });
    } else if (state.confirm != state.password) {
      showMessage({
        type: 'danger',
        message: t("passwordsDon'tMatch"),
      });
    } else {
      dispatch(
        resetPasswordAction(
          state,
          urlObj.cookie,
          urlObj.code,
          success => success && navigation.navigate('LoginScreen'),
        ),
      );
    }
  };

  return (
    <SafeView>
      <MainHeader title={t('resetPass')} />
      <View style={styles.centerView}>
        <MainInput
          onChangeText={t => setState(s => ({...s, password: t}))}
          value={state.password}
          secureTextEntry={hide.pass}
          onEyePress={() => setHide(old => ({...old, pass: !hide.pass}))}
          endIcon
          placeholder={t('newPass')}
          style={styles.input}
        />
        <MainInput
          onChangeText={t => setState(s => ({...s, confirm: t}))}
          value={state.confirm}
          secureTextEntry={hide.confirmPass}
          onEyePress={() =>
            setHide(old => ({...old, confirmPass: !hide.confirmPass}))
          }
          endIcon
          placeholder={t('confirmNewPass')}
          style={styles.input}
        />
        <ColoredButton
          title={t('reset')}
          style={styles.button}
          onPress={onResetPass}
        />
      </View>
    </SafeView>
  );
};

export default ResetPass;

const styles = StyleSheet.create({
  centerView: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 39,
  },
  input: {
    marginBottom: 10,
    paddingLeft: 25,
  },
  button: {
    marginTop: 10,
  },
});
