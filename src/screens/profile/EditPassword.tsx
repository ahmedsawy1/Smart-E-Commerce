import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import MainInput from '../../components/inputs/MainInput';
import Colors, {ColorWithOpacity} from '../../styles/stylesConstants';
import ColoredButton from '../../components/touchables/ColoredButton';
import {useDispatch} from 'react-redux';
import {changePassword} from '../../store/actions/accountActions';
import {useNavigation} from '@react-navigation/native';

const EditPassword = () => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();

  const [state, setState] = useState({
    oldPassword: '',
    password: '',
    confirm: '',
  });
  const [hide, setHide] = useState({
    oldPassword: true,
    password: true,
    confirm: true,
  });

  return (
    <SafeView>
      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        <MainHeader title={t('changePassword')} />
        <View style={styles.centerView}>
          {/* <MainInput
            placeholder={t('oldPass')}
            style={styles.oldPass}
            endIcon
            secureTextEntry={hide.oldPassword}
            onEyePress={() =>
              setHide(old => ({...old, oldPassword: !hide.oldPassword}))
            }
          /> */}

          <MainInput
            placeholder={t('newPass')}
            style={styles.newPass}
            endIcon
            value={state.password}
            secureTextEntry={hide.password}
            onEyePress={() =>
              setHide(old => ({...old, password: !hide.password}))
            }
            onChangeText={txt => setState(old => ({...old, password: txt}))}
          />

          <MainInput
            placeholder={t('confirmNewPass')}
            style={styles.newPass}
            endIcon
            value={state.confirm}
            onEyePress={() =>
              setHide(old => ({...old, confirm: !hide.confirm}))
            }
            secureTextEntry={hide.confirm}
            onChangeText={txt => setState(old => ({...old, confirm: txt}))}
          />
          <ColoredButton
            title={t('reset')}
            style={{marginTop: 10}}
            onPress={() =>
              dispatch(
                changePassword(
                  state,
                  success => success && navigation.navigate('MyProfile'),
                ),
              )
            }
          />
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default EditPassword;

const styles = StyleSheet.create({
  centerView: {
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 12,
  },
  oldPass: {
    marginTop: 26,
    marginBottom: 30,
  },
  newPass: {
    marginBottom: 10,
  },
  input: {
    color: ColorWithOpacity(Colors.black, 0.5),
  },
});
