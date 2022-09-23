import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import React from 'react';
import {StyleSheet, ScrollView, View, Linking, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LogoHeader from '../../components/headers/LogoHeader';
import ColoredButton from '../../components/touchables/ColoredButton';
import ProfileSection from '../../components/touchables/ProfileSection';
import SafeView from '../../components/views/SafeView';
import {onShareFN} from '../../constants/helpers';
import {logOut} from '../../store/actions/authActions';
import {
  getAboutUsPage,
  getPrivacyPage,
  getReturnPolicyPage,
  getShipingDliveryPage,
  getTermsPage,
} from '../../store/actions/initActions';
import {RootState} from '../../store/store';
import Colors, {PixelPerfect, phoneHeight} from '../../styles/stylesConstants';

const MoreScreen = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(
      logOut(success => {
        success && navigation.navigate('LoginScreen');
      }),
    );
  };

  const {isSignedIn, contact, settingsData} = useSelector(
    (state: RootState) => state.authReducer,
  );

  const appStorURL =
    Platform.OS == 'ios' ? contact?.ios_url : contact.android_url;

  return (
    <SafeView>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: phoneHeight / 4,
        }}>
        <LogoHeader noArrow noShare />
        <View style={styles.centerView}>
          <ProfileSection
            title={t('AboutUs')}
            onPress={() => {
              dispatch(getAboutUsPage());
              navigation.navigate('AboutUs');
            }}
          />
          <ProfileSection
            title={t('ShippingandDelivery')}
            onPress={() => {
              dispatch(getShipingDliveryPage());
              navigation.navigate('ShippingAndDliver');
            }}
          />
          <ProfileSection
            title={t('ReturnPolicy')}
            onPress={() => {
              dispatch(getReturnPolicyPage());
              navigation.navigate('ReturnsPolicy');
            }}
          />
          <ProfileSection
            title={t('TermsConditions')}
            onPress={() => {
              dispatch(getTermsPage());
              navigation.navigate('TermsConditions');
            }}
          />
          <ProfileSection
            title={t('PrivacyPolicy')}
            onPress={() => {
              dispatch(getPrivacyPage());
              navigation.navigate('Privacy');
            }}
          />

          <ProfileSection
            title={t('ContactUs')}
            onPress={() => navigation.navigate('ContactUs')}
          />
          <ProfileSection
            title={t('Settings')}
            onPress={() => navigation.navigate('SettingsScreen')}
          />
          <ProfileSection
            title={t('SharetheApp')}
            onPress={() => onShareFN(`${contact?.sharing} \n ${appStorURL}`)}
          />
          <ProfileSection
            title={t('RateApp')}
            onPress={() => Linking.openURL(appStorURL)}
          />

          {isSignedIn && (
            <ColoredButton
              title={t('Logout')}
              style={styles.button}
              onPress={logOutHandler}
              isLinear={false}
              // loading={loader}
            />
          )}
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  centerView: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  button: {
    marginTop: 64,
    backgroundColor: Colors.lightGray,
  },
});
