import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import SafeView from '../../components/views/SafeView';
import LogoHeader from '../../components/headers/LogoHeader';
import Colors, {
  Fonts,
  phoneHeight,
  PixelPerfect,
} from '../../styles/stylesConstants';
import ProfileSection from '../../components/touchables/ProfileSection';
import {t} from 'i18next';
import ColoredButton from '../../components/touchables/ColoredButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from '../../store/actions/authActions';
import {getMyOrders, getMyReturns} from '../../store/actions/accountActions';
import {RootState} from '../../store/store';
import CustomAlert from '../../components/views/CustomAlert';
import DeleteAccountContent from '../../content/DeleteAccount';

const MyProfile = () => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const logOutHandler = () => {
    dispatch(logOut(success => success && navigation.navigate('LoginScreen')));
  };

  const {isSignedIn} = useSelector((state: RootState) => state.authReducer);
  const [alertVisiable, setAlertVisiable] = useState(false);

  useEffect(() => {
    dispatch(getMyReturns());
    dispatch(getMyOrders());
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => setAlertVisiable(false);
    }, []),
  );

  return (
    <SafeView
      style={{
        backgroundColor: isSignedIn ? Colors.mainBack : Colors.darkWhite,
      }}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: phoneHeight / 4,
          backgroundColor: Colors.darkWhite,
        }}>
        <LogoHeader
          noArrow
          noShare
          style={{backgroundColor: Colors.mainBack}}
        />
        {isSignedIn ? (
          <>
            <View style={styles.titleCon}>
              <Text style={styles.title}>{t('myAccount')}</Text>
            </View>
            <View
              style={[styles.centerView, {backgroundColor: Colors.mainBack}]}>
              <ProfileSection
                title={t('EditAccountInformation')}
                onPress={() => navigation.navigate('EditInfoScreen')}
              />
              <ProfileSection
                title={t('changePassword')}
                onPress={() => navigation.navigate('EditPassword')}
              />
              <ProfileSection
                title={t('bookAddresses')}
                onPress={() => navigation.navigate('AddressBook')}
              />
              <ProfileSection
                title={t('productsCompare')}
                onPress={() => navigation.navigate('CompareProducts')}
              />
              <ProfileSection
                title={t('WishList')}
                onPress={() => navigation.navigate('FavoriteScreen')}
              />
              <ProfileSection
                title={t('MailingList')}
                onPress={() => navigation.navigate('MailingList')}
              />

              <ProfileSection
                noBorder
                title={t('delAccount')}
                iconColor="red"
                styleTitle={{color: 'red'}}
                onPress={() => setAlertVisiable(true)}
              />
            </View>

            {alertVisiable && (
              <CustomAlert
                onClosePress={() => setAlertVisiable(false)}
                styleCont={{backgroundColor: 'rgba(255, 0, 0, 0.2)'}}>
                <DeleteAccountContent
                  onCancelPress={() => setAlertVisiable(false)}
                />
              </CustomAlert>
            )}

            {/* My Orders */}
            <View style={styles.titleCon}>
              <Text style={styles.title}>{t('myOrders')}</Text>
            </View>

            <View
              style={[styles.centerView, {backgroundColor: Colors.mainBack}]}>
              <ProfileSection
                title={t('orderBook')}
                onPress={() => {
                  dispatch(getMyOrders());
                  navigation.navigate('MyOrders');
                }}
              />
              <ProfileSection
                title={t('RewardsPoints')}
                onPress={() => {
                  // dispatch(getRewards())
                  navigation.navigate('MyRewards');
                }}
              />
              <ProfileSection
                title={t('ReturnRequests')}
                noBorder
                onPress={() => {
                  dispatch(getMyReturns());
                  navigation.navigate('ReturnsScreen');
                }}
              />
            </View>
            <View style={[styles.centerView]}>
              <ColoredButton
                title={t('Logout')}
                style={styles.button}
                isLinear={false}
                onPress={logOutHandler}
              />
            </View>
          </>
        ) : (
          <View style={styles.loginCont}>
            <Text style={styles.successText}>{t('mustBeLoggedIn')}</Text>
            <Text style={styles.youCanText}>{t('toAccessThisPage')}</Text>
            <ColoredButton
              title={t('login')}
              onPress={() => navigation.navigate('LoginScreen')}
            />
          </View>
        )}
      </ScrollView>
    </SafeView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  con: {},
  centerView: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  button: {
    marginTop: 12,
    backgroundColor: Colors.lightGray,
  },
  titleCon: {
    paddingHorizontal: 16,
    width: '100%',
    paddingTop: 20,
    paddingBottom: 13,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: PixelPerfect(32),
    color: '#B8B8B8',
    fontFamily: Fonts.SemiBold,
  },
  successText: {
    fontSize: PixelPerfect(40),
    fontFamily: Fonts.Bold,
    color: Colors.black,
    marginTop: 30,
  },
  youCanText: {
    fontSize: PixelPerfect(33),
    fontFamily: Fonts.Regular,
    color: Colors.black,
    marginTop: 5,
    textAlign: 'center',
    marginBottom: 30,
  },
  loginCont: {
    alignItems: 'center',
    paddingTop: PixelPerfect(400),
    paddingHorizontal: 16,
    flex: 1,
  },
});
