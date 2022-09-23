import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import MainInput from '../../components/inputs/MainInput';
import Colors, {
  ColorWithOpacity,
  Fonts,
  PixelPerfect,
} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';
import ColoredButton from '../../components/touchables/ColoredButton';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {editProfile} from '../../store/actions/authActions';
import {useNavigation} from '@react-navigation/native';
import {regexSaudiNumber} from '../../constants/helpers';
import {showMessage} from 'react-native-flash-message';

const EditInfoScreen = () => {
  const {userData, loader} = useSelector(
    (state: RootState) => state.authReducer,
  );
  const dispatch = useDispatch();
  const navigation: any = useNavigation();

  const [state, setState] = useState({
    firstname: userData.firstname,
    lastname: userData.lastname,
    telephone: userData.telephone,
    email: userData.email,
  });

  const editProfileHandler = () => {
    if (regexSaudiNumber.test(state.telephone)) {
      dispatch(
        editProfile(
          state,
          success => success && navigation.navigate('MyProfile'),
        ),
      );
    } else {
      showMessage({
        message: t('invalidPhone'),
        type: 'danger',
      });
    }
  };

  return (
    <SafeView>
      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        <MainHeader title={t('EditAccountInformation')} />
        <View style={styles.centerView}>
          <View style={styles.titleCon}>
            <Text style={styles.title}>{t('firstName')}</Text>
          </View>
          <MainInput
            value={state.firstname}
            onChangeText={inputText =>
              setState(old => ({...old, firstname: inputText}))
            }
            styleInput={styles.input}
          />
          <View style={styles.titleCon}>
            <Text style={styles.title}>{t('lastName')}</Text>
          </View>
          <MainInput
            value={state.lastname}
            onChangeText={inputText =>
              setState(old => ({...old, lastname: inputText}))
            }
            styleInput={styles.input}
          />
          <View style={styles.titleCon}>
            <Text style={styles.title}>{t('phone')}</Text>
          </View>
          <MainInput
            value={state.telephone}
            onChangeText={inputText =>
              setState(old => ({...old, telephone: inputText}))
            }
            keyboardType="numeric"
            styleInput={styles.input}
          />
          <View style={styles.titleCon}>
            <Text style={styles.title}>{t('email')}</Text>
          </View>
          <MainInput
            value={state.email}
            onChangeText={inputText =>
              setState(old => ({...old, email: inputText}))
            }
            styleInput={styles.input}
          />
          <ColoredButton
            title={t('saveChanges')}
            style={{marginTop: 20}}
            onPress={editProfileHandler}
            // loading={loader}
          />
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default EditInfoScreen;

const styles = StyleSheet.create({
  con: {},
  centerView: {
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 12,
  },
  titleCon: {
    paddingHorizontal: 25,
    width: '100%',
    marginTop: 10,
  },
  title: {
    fontSize: PixelPerfect(30),
    fontFamily: Fonts.Regular,
    color: Colors.black,
    marginBottom: 8,
    ...SharedStyles.textAlign,
  },
  input: {
    color: ColorWithOpacity(Colors.black, 0.5),
  },
});
