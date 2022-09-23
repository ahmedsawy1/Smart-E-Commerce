import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import LogoHeader from '../../../components/headers/LogoHeader';
import MainInput from '../../../components/inputs/MainInput';
import CheckBox from '../../../components/touchables/CheckBox';
import ColoredButton from '../../../components/touchables/ColoredButton';
import RoundSelector from '../../../components/touchables/RoundSelector';
import PopUp from '../../../components/views/PopUp';
import SafeView from '../../../components/views/SafeView';
import {getZones} from '../../../store/actions/accountActions';
import {validateGuest} from '../../../store/actions/CheckoutActions';
import {RootState} from '../../../store/store';
import {SharedStyles} from '../../../styles/sharedStyles';
import Colors, {
  ColorWithOpacity,
  Fonts,
  phoneHeight,
  PixelPerfect,
} from '../../../styles/stylesConstants';

const GuestCheckoutScreen = ({}) => {
  let inStockArray = [];

  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const {countries} = useSelector((state: RootState) => state.authReducer);
  const {zones} = useSelector((state: RootState) => state.accountReducer);

  const [error, setError] = useState({
    firstname: '',
    lastname: '',
    email: '',
    telephone: '',
    address_1: '',
    city: '',
    country_id: '',
    zone_id: '',
  });

  let tempData = '';
  tempData = 'ahmed@gmail.com';

  const [state, setState] = useState({
    firstname: __DEV__ ? tempData : '',
    lastname: __DEV__ ? tempData : '',
    email: __DEV__ ? tempData : '',
    telephone: __DEV__ ? '0512345678' : '',
    address_1: __DEV__ ? tempData : '',
    city: __DEV__ ? tempData : '',
    country_id: __DEV__ ? '184' : '',
    zone_id: __DEV__ ? '2877' : '',
    shipping_address: '1',
    loader: false,
    approve: false,
    countryPopUp: false,
    zonesPopUp: false,
    countryName: '',
    zoneName: '',
  });

  const [location, setLocation] = useState({
    permession: false,
    lang: 0,
    lat: 0,
  });

  const changeApprove = () =>
    setState(old => ({...old, approve: !state.approve}));

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setLocation(old => ({...old, permession: true}));
      } else {
        setLocation(old => ({...old, permession: false}));
      }
    } catch (err) {
      console.warn(err);
    }

    if (location.permession) {
      Geolocation.getCurrentPosition(
        position => {
          setLocation(old => ({
            ...old,
            lat: position.coords.latitude,
            lang: position.coords.longitude,
          }));
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }

  useEffect(() => {
    if (Platform.OS == 'android') {
      requestLocationPermission();
    }
  }, [location.permession]);

  const handleCkeckoutPress = () => {
    setState(old => ({...old, loader: true}));

    dispatch(
      validateGuest(
        state,
        success => {
          setState(old => ({...old, loader: false}));
          navigation?.navigate('CheckoutScreen', state);
        },
        error => {
          setState(old => ({...old, loader: false}));
          setError(old => ({
            ...old,
            firstname: error.firstname,
            address_1: error.address_1,
            email: error.email,
            lastname: error.lastname,
            city: error.city,
            telephone: error.telephone,
            country_id: error.country_id,
            zone_id: error.zone_id,
          }));
        },
      ),
    );
  };

  // Search Zones
  const [search, setSearch] = useState('');
  const [filteredZones, setFilteredZones] = useState(zones);

  const searchZonesFunction = (text: string) => {
    if (text) {
      const newFilteredZones = zones.filter(function (item: {name: string}) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredZones(newFilteredZones);
      setSearch(text);
    } else {
      setFilteredZones(zones);
      setSearch(text);
    }
  };

  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const cityRef = useRef(null);
  const addressRef = useRef(null);

  return (
    <>
      <SafeView>
        <ScrollView contentContainerStyle={{paddingBottom: phoneHeight / 10}}>
          <View style={styles.centerView}>
            <LogoHeader noShare />
            <Text style={styles.title}>{t('accountAndBilling')}</Text>
            <View>
              <MainInput
                style={styles.sharedInputs}
                placeholder={t('firstName')}
                value={state.firstname}
                onChangeText={(txt: string) => {
                  setState(old => ({...old, firstname: txt}));
                  setError(old => ({...old, firstname: ''}));
                }}
                errorText={error.firstname}
                onSubmitEditing={() => lastNameRef.current.focus()}
              />
              <MainInput
                style={styles.sharedInputs}
                placeholder={t('lastName')}
                value={state.lastname}
                onChangeText={(txt: string) => {
                  setState(old => ({...old, lastname: txt}));
                  setError(old => ({...old, lastname: ''}));
                }}
                errorText={error.lastname}
                inputRef={lastNameRef}
                onSubmitEditing={() => phoneRef.current.focus()}
              />

              <MainInput
                inputRef={phoneRef}
                keyboardType="numeric"
                style={styles.sharedInputs}
                placeholder={t('phone')}
                value={state.telephone}
                onChangeText={(txt: string) => {
                  setState(old => ({...old, telephone: txt}));
                  setError(old => ({...old, telephone: ''}));
                }}
                errorText={error.telephone}
                onSubmitEditing={() => emailRef.current.focus()}
              />
              <MainInput
                style={styles.sharedInputs}
                placeholder={t('email')}
                keyboardType="email-address"
                value={state.email}
                onChangeText={(txt: string) => {
                  setState(old => ({...old, email: txt}));
                  setError(old => ({...old, email: ''}));
                }}
                errorText={error.email}
                inputRef={emailRef}
                onSubmitEditing={() => cityRef.current.focus()}
              />

              <RoundSelector
                styleTitle={{
                  color: ColorWithOpacity('#0D0E10', 0.5),
                  fontFamily: Fonts.Regular,
                }}
                style={styles.sharedSelectors}
                title={
                  state.countryName == '' ? t('Country') : state.countryName
                }
                iconColor={'#B7B7B7'}
                onPress={() => {
                  setState(old => ({...old, countryPopUp: true}));
                  setError(old => ({...old, country_id: ''}));
                }}
                errorText={
                  error.country_id == undefined ? t('select') : error.country_id
                }
              />
              <RoundSelector
                styleTitle={{
                  color: ColorWithOpacity('#0D0E10', 0.5),
                  fontFamily: Fonts.Regular,
                }}
                style={styles.sharedSelectors}
                title={
                  state.zoneName == '' ? t('regionProvince') : state.zoneName
                }
                iconColor={'#B7B7B7'}
                onPress={() => {
                  setState(old => ({...old, zonesPopUp: true}));
                  setError(old => ({...old, zone_id: ''}));
                }}
                errorText={
                  error.zone_id == undefined ? t('select') : error.zone_id
                }
              />
              <MainInput
                style={styles.sharedInputs}
                placeholder={t('city')}
                value={state.city}
                onChangeText={(txt: string) => {
                  setState(old => ({...old, city: txt}));
                  setError(old => ({...old, city: ''}));
                }}
                errorText={error.city}
                inputRef={cityRef}
                onSubmitEditing={() => addressRef.current.focus()}
              />
              <MainInput
                style={styles.sharedInputs}
                placeholder={t('detailedAddress')}
                value={state.address_1}
                onChangeText={(txt: string) => {
                  setState(old => ({...old, address_1: txt}));
                  setError(old => ({...old, address_1: ''}));
                }}
                errorText={error.address_1}
                inputRef={addressRef}
                onSubmitEditing={handleCkeckoutPress}
              />
              <View style={styles.mapCon}>
                <MapView
                  region={{
                    latitude: location.lat,
                    longitude: location.lang,
                    latitudeDelta: 0.0001,
                    longitudeDelta: 0.0001,
                  }}
                  provider={PROVIDER_GOOGLE}
                  style={{height: '100%', width: '100%'}}>
                  {location.lang != 0 && (
                    <Marker
                      coordinate={{
                        latitude: location.lat,
                        longitude: location.lang,
                      }}
                      title={'marker'}
                      description={'marker'}
                    />
                  )}
                </MapView>
              </View>
              <CheckBox
                title={t('myShippingAddress')}
                checked={!state.approve}
                onPress={changeApprove}
                style={{
                  marginBottom: 30,
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeView>

      <PopUp
        visible={state.countryPopUp}
        onRequestClose={() => setState(old => ({...old, countryPopUp: false}))}>
        <FlatList
          contentContainerStyle={{paddingHorizontal: 16}}
          data={countries}
          keyExtractor={(item: any) => item.country_id}
          renderItem={({item}) => (
            <CheckBox
              title={item.name}
              onPress={() => {
                console.log('country_id = ', item.country_id);

                dispatch(getZones(item.country_id));
                setState(old => ({
                  ...old,
                  country_id: item.country_id,
                }));
                setState(old => ({
                  ...old,
                  countryName: item.name,
                  countryPopUp: false,
                }));
              }}
            />
          )}
        />
      </PopUp>

      <PopUp
        visible={state.zonesPopUp}
        onRequestClose={() => setState(old => ({...old, zonesPopUp: false}))}>
        {state.country_id == '0' ? (
          <Text style={styles.selectCountryText}>{t('selectCountry')}</Text>
        ) : (
          <View>
            <MainInput
              style={{width: '94%', alignSelf: 'center', marginBottom: 10}}
              placeholder={t('Search')}
              value={search}
              onChangeText={text => searchZonesFunction(text)}
            />
            <FlatList
              contentContainerStyle={{paddingHorizontal: 16}}
              data={filteredZones}
              keyExtractor={item => item.zone_id}
              renderItem={({item}) => (
                <CheckBox
                  title={item.name}
                  onPress={() => {
                    setState(old => ({
                      ...old,
                      zoneName: item.name,
                      zonesPopUp: false,
                    }));

                    setState(old => ({
                      ...old,
                      zone_id: item.zone_id,
                    }));

                    console.log('zone_id = ', item.zone_id);
                  }}
                />
              )}
            />
          </View>
        )}
      </PopUp>

      <View style={styles.buttonCon}>
        <ColoredButton
          isLinear={!state?.loader}
          style={[
            state?.loader && {
              backgroundColor: Colors.lightGray,
            },
          ]}
          title={t('continue')}
          onPress={handleCkeckoutPress}
        />
      </View>
    </>
  );
};

export default GuestCheckoutScreen;

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
    backgroundColor: ColorWithOpacity(Colors.black, 0.3),
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
    color: Colors.black,
    fontSize: PixelPerfect(22),
    fontFamily: Fonts.Medium,
  },
  selectCountryText: {
    fontSize: PixelPerfect(30),
    fontFamily: Fonts.Medium,
    textAlign: 'center',
  },
});
