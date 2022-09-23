import {useNavigation, useRoute} from '@react-navigation/native';
import {t} from 'i18next';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import WebView from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import LogoHeader from '../../../components/headers/LogoHeader';
import Loader from '../../../components/other/Loader';
import CheckBoxRound from '../../../components/touchables/CheckBoxRound';
import ColoredButton from '../../../components/touchables/ColoredButton';
import PopUp from '../../../components/views/PopUp';
import SafeView from '../../../components/views/SafeView';
import {regex} from '../../../constants/helpers';
import {
  getAddressessList,
  initCheckout,
  initCheckoutAnotherAddress,
  initGuestCheckout,
  submitCheckout,
} from '../../../store/actions/CheckoutActions';
import {RootState} from '../../../store/store';
import {SharedStyles} from '../../../styles/sharedStyles';
import Colors, {
  ColorWithOpacity,
  Fonts,
  phoneHeight,
  PixelPerfect,
} from '../../../styles/stylesConstants';
import {CartAndMethods} from './CartAndMethods';

const CheckoutScreen = ({}) => {
  let inStockArray: [] = [];
  const {params}: any = useRoute();

  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const {isSignedIn} = useSelector((state: RootState) => state.authReducer);
  const {addressData, loader} = useSelector(
    (state: RootState) => state.checkoutReducer,
  );

  const selectedAddress = isSignedIn
    ? //
      //
      addressData?.addresses == undefined || addressData?.addresses?.length == 0
      ? // Signed In - Not Have Addressess
        t('noAddressess')
      : //
        //
        // Signed In - Have Addressess
        addressData?.addresses[0]?.address?.split(regex).join(' - ')
    : //
      //
      // Not Signed In
      `${params.address_1} - ${params.city} - ${params.zoneName} - ${params.countryName}`;

  const [state, setState] = useState({
    loader: false,
    ListAddressOpen: false,
    iWantReg: false,
    approve: false,
    webView: false,
    completeUrl: '',
    countryPopUp: false,
    zonesPopUp: false,
    countryName: '',
    zoneName: '',
    selectedAddressState: selectedAddress,
    webviewLoader: false,
  });

  useEffect(() => {
    setState(old => ({...old, selectedAddressState: selectedAddress}));
  }, [selectedAddress]);

  const changeApprove = () =>
    setState(old => ({...old, approve: !state.approve}));

  useEffect(() => {
    if (isSignedIn) {
      dispatch(initCheckout());
    } else {
      dispatch(initGuestCheckout());
    }
  }, []);

  let callBackWithUrl = (url: string) => {
    setState(old => ({...old, webView: true, completeUrl: url}));
  };

  const {paymentSetted, shippingSetted} = useSelector(
    (state: RootState) => state.checkoutReducer,
  );

  const handleCkeckoutPress = () => {
    if (paymentSetted && shippingSetted) {
      dispatch(
        submitCheckout(
          'any comment',
          callBackWithUrl,
          success => success && navigation.navigate('OrderSuccess'),
        ),
      );
    } else if (inStockArray.includes(false)) {
      showMessage({
        type: 'danger',
        message: t('plzReduceQty'),
      });
    }
  };

  const _onNavigationStateChange = webViewState => {
    if (webViewState.url.indexOf('checkout/success') > -1) {
      setState(old => ({...old, webView: false}));
      navigation.navigate('OrderSuccess');
    }
  };

  useEffect(() => {
    if (
      addressData?.addresses?.length != 0 ||
      addressData?.addresses?.length != undefined
    ) {
      if (addressData?.addresses) {
        dispatch(
          initCheckoutAnotherAddress(addressData?.addresses[0]?.address_id),
        );
      }
    }
  }, [addressData?.addresses?.length]);

  return (
    <>
      <SafeView>
        <LogoHeader noShare style={{paddingHorizontal: 16}} />
        <ScrollView contentContainerStyle={{paddingBottom: phoneHeight / 10}}>
          <View style={styles.centerView}>
            <Text style={styles.title}>{t('accountAndBilling')}</Text>

            <View>
              {addressData?.addresses?.length == 0 ? (
                <Text style={styles.address}>
                  {t("You don't have addressess")}
                </Text>
              ) : (
                <Text style={styles.address}>
                  {state.selectedAddressState == '' ||
                  state.selectedAddressState == undefined
                    ? selectedAddress
                    : state.selectedAddressState}
                </Text>
              )}

              {addressData?.addresses?.length == 0 ? (
                <ColoredButton
                  isLinear={false}
                  title={t('Add')}
                  style={styles.addressButton}
                  styleTitle={styles.addressButtonTitle}
                  onPress={() => navigation.navigate('AddAddress')}
                />
              ) : (
                <ColoredButton
                  isLinear={false}
                  title={t('changeAddress')}
                  style={styles.addressButton}
                  styleTitle={styles.addressButtonTitle}
                  onPress={() => {
                    if (isSignedIn) {
                      dispatch(getAddressessList());
                      setState(old => ({...old, ListAddressOpen: true}));
                    } else {
                      navigation?.goBack();
                    }
                  }}
                />
              )}
            </View>
          </View>

          <CartAndMethods inStockArray={inStockArray} />
        </ScrollView>
      </SafeView>

      <PopUp
        visible={state.ListAddressOpen}
        onRequestClose={() =>
          setState(old => ({...old, ListAddressOpen: false}))
        }>
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
          data={addressData?.addresses}
          renderItem={({item}) => (
            <CheckBoxRound
              title={item.address.split(regex).join(' ')}
              onPress={() => {
                dispatch(initCheckoutAnotherAddress(item.address_id));
                console.log(item.address_id);

                setState(old => ({
                  ...old,
                  selectedAddress: item.address.split(regex).join(' '),
                  ListAddressOpen: false,
                }));
              }}
            />
          )}
        />
      </PopUp>

      <PopUp
        visible={state.webView}
        onRequestClose={() => setState(old => ({...old, webView: false}))}>
        {state.webviewLoader && (
          <Loader style={{flex: 1, marginTop: phoneHeight / 4}} />
        )}

        <WebView
          source={{uri: state.completeUrl}}
          onNavigationStateChange={state => _onNavigationStateChange(state)}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onLoadEnd={() => {
            console.log('End');
            setState(s => ({...s, webviewLoader: false}));
          }}
          onLoad={() => setState(s => ({...s, webviewLoader: true}))}
          onLoadStart={() => setState(s => ({...s, webviewLoader: true}))}
        />
      </PopUp>

      <View style={styles.buttonCon}>
        {paymentSetted && shippingSetted && (
          <ColoredButton
            isLinear={!loader}
            style={[
              loader && {
                backgroundColor: Colors.lightGray,
              },
            ]}
            title={t('checkout')}
            onPress={handleCkeckoutPress}
          />
        )}
      </View>
    </>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  title: {
    marginBottom: 12,
    marginTop: 15,
    color: Colors.black,
    fontSize: PixelPerfect(32),
    fontFamily: Fonts.SemiBold,
    textAlign: 'left',
  },
  centerView: {
    paddingHorizontal: 16,
  },
  sharedSelectors: {
    backgroundColor: Colors.mainBack,
    marginBottom: 10,
    height: 50,
  },
  sharedInputs: {
    marginBottom: 10,
  },
  buttonCon: {
    backgroundColor: Colors.mainBack,
    ...SharedStyles.centred,
    ...SharedStyles.shadow,
    paddingTop: 9,
    paddingBottom: Platform.OS === 'ios' ? 24 : 9,
    paddingHorizontal: 16,
  },
  mapCon: {
    height: PixelPerfect(260),
    width: '100%',
    borderRadius: 25,
    marginBottom: 14,
    overflow: 'hidden',
  },
  address: {
    fontFamily: Fonts.Regular,
    fontSize: PixelPerfect(30),
    color: Colors.medGray,
    textAlign: 'left',
  },
  addressButton: {
    backgroundColor: Colors.black,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    height: PixelPerfect(60),
    marginTop: 14,
    width: PixelPerfect(300),
    marginBottom: 20,
  },
  addressButtonTitle: {
    color: Colors.mainBack,
    fontSize: PixelPerfect(22),
    fontFamily: Fonts.Medium,
  },
  selectCountryText: {
    fontSize: PixelPerfect(30),
    fontFamily: Fonts.Medium,
    textAlign: 'center',
  },
});
