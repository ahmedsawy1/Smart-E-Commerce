import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useCallback} from 'react';
import {t} from 'i18next';
import Colors, {Fonts, PixelPerfect} from '../styles/stylesConstants';
import ColoredButton from '../components/touchables/ColoredButton';
import {useDispatch} from 'react-redux';
import {logOut} from '../store/actions/authActions';
import {useNavigation} from '@react-navigation/native';
import {axiosAPI} from '../api/config';
import {AsyncKeys, GetCookie, getItem} from '../constants/helpers';
import {showMessage} from 'react-native-flash-message';

const DeleteAccountContent: FC<{onCancelPress: () => void}> = ({
  onCancelPress,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const deleteAccountHandler = async () => {
    let cookie = await GetCookie();
    const customer_id = await getItem(AsyncKeys.CUSTOMER_ID);

    axiosAPI
      .post(`ocapi/account/deleteaccount&cookie=${cookie}`, {customer_id})
      .then(res => {
        if (res.data.hasOwnProperty('success')) {
          dispatch(
            logOut(success => {
              success && navigation.navigate('LoginScreen');
            }),
          );

          showMessage({
            type: 'success',
            message: t('accountDeleted'),
          });
        }
      })
      .catch(err => {
        console.log('deleteAccount error' + err);
      });

    // showMessage({
    //   type: 'danger',
    //   message: 'not deleted',
    // });
  };

  return (
    <View>
      <Text style={styles.alertTitle}>{t('areUSureUWantDeleteUrAccount')}</Text>
      <Text style={styles.alertMessage}>{t('byDelete')}</Text>

      <View style={styles.buttonsCont}>
        <ColoredButton
          title={t('Delete')}
          style={styles.confirmButton}
          isLinear={false}
          styleTitle={{fontSize: PixelPerfect(30)}}
          onPress={deleteAccountHandler}
        />

        <ColoredButton
          title={t('Cancel')}
          style={styles.cancelButton}
          isLinear={false}
          onPress={onCancelPress}
          styleTitle={{fontSize: PixelPerfect(30)}}
        />
      </View>
    </View>
  );
};

export default DeleteAccountContent;

const styles = StyleSheet.create({
  alertTitle: {
    fontSize: PixelPerfect(32),
    fontFamily: Fonts.Medium,
    color: Colors.red,
    textAlign: 'center',
    marginVertical: 5,
  },
  alertMessage: {
    fontSize: PixelPerfect(28),
    fontFamily: Fonts.Medium,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: PixelPerfect(52),
  },
  buttonsCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: PixelPerfect(40),
  },
  cancelButton: {
    width: '48%',
    backgroundColor: Colors.lightGray,
    height: PixelPerfect(80),
  },
  confirmButton: {
    width: '48%',
    backgroundColor: Colors.red,
    height: PixelPerfect(80),
  },
});
