//  Note >> This screen to add address and Update address too.

import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import RoundSelector from '../../components/touchables/RoundSelector';
import MainInput from '../../components/inputs/MainInput';
import Colors, {
  ColorWithOpacity,
  Fonts,
  PixelPerfect,
} from '../../styles/stylesConstants';
import CheckBox from '../../components/touchables/CheckBox';
import ColoredButton from '../../components/touchables/ColoredButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  addAddress,
  getAddresses,
  getZones,
  updateAddress,
} from '../../store/actions/accountActions';
import PopUp from '../../components/views/PopUp';
import {RootState} from '../../store/store';
import {useNavigation, useRoute} from '@react-navigation/native';
import {axiosAPI} from '../../api/config';
import {GetCookie} from '../../constants/helpers';
import {
  getAddressessList,
  initCheckoutAnotherAddress,
} from '../../store/actions/CheckoutActions';

const AddAddress = () => {
  const dispatch = useDispatch();
  const {addressData} = useSelector(
    (state: RootState) => state.checkoutReducer,
  );
  const {params}: any = useRoute();
  const navigation: any = useNavigation();

  const [pupUp, setpupUp] = useState({
    country: false,
    zone: false,
  });

  const {countries} = useSelector((state: RootState) => state.authReducer);
  const {zones} = useSelector((state: RootState) => state.accountReducer);

  const getAddress = async () => {
    const cookie = await GetCookie();

    if (params.address_id) {
      const {data} = await axiosAPI.get(
        `account/address/edit&address_id=${params.address_id}&cookie=${cookie}`,
      );

      setState(old => ({
        ...old,
        zone_id: data.zone_id,
        country_id: data.country_id,
      }));
    }
  };

  //  Note >> This screen to add address and Update address too.  params if want to update address
  const [state, setState] = useState({
    firstname: params?.firstname ? params.firstname : __DEV__ ? 'DSADSAD' : '',
    lastname: params?.lastname ? params.lastname : __DEV__ ? 'DSADSAD' : '',
    address_1: params?.address_1 ? params.address_1 : __DEV__ ? 'DSADSAD' : '',
    city: params?.city ? params.city : __DEV__ ? 'DSADSAD' : '',
    country_id: params?.country_id ? params?.country_id : __DEV__ ? '184' : 0,
    zone_id: params?.zone_id ? params?.zone_id : __DEV__ ? '2877' : '',
    default: params?.default ? params.default : '0',
  });

  const selectedCountry = countries?.find((item: any) => {
    return item.country_id == state.country_id;
  });

  const selectedZone = zones?.find((item: any) => {
    return item.zone_id == state.zone_id;
  });

  const [names, setNames] = useState({
    countryName: t('Country'),
    zoneName: t('regionProvince'),
    // countryName: params?.country ? params.country : t('Country'),
    // zoneName: params?.zone ? params.zone : t('regionProvince'),
  });

  useEffect(() => {
    getAddress();
  }, []);

  useEffect(() => {
    dispatch(getZones(state.country_id));
  }, [state.country_id]);

  const sharedCallBack = () => {
    dispatch(getAddresses());
    dispatch(getAddressessList());
    navigation.goBack();
  };

  const addOrEditAddress = () => {
    try {
      if (params?.firstname) {
        dispatch(
          updateAddress(
            state,
            params.address_id,
            success => success && sharedCallBack(),
          ),
        );
      } else {
        dispatch(addAddress(state, success => success && sharedCallBack()));
      }
    } catch (error) {
      console.log('err');
    }
  };

  // useEffect(() => {
  //   console.log('Effect');
  //   dispatch(initCheckoutAnotherAddress(addressData?.addresses?.address_id));
  // }, [addressData?.addresses]);

  // Search
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
  const cityRef = useRef(null);
  const addressRef = useRef(null);

  return (
    <SafeView>
      <MainHeader title={params ? t('Edit') : t('addAddress')} />
      <View style={styles.centred}>
        <MainInput
          style={styles.sharedInputs}
          placeholder={t('firstName')}
          value={state.firstname}
          onChangeText={text => setState(old => ({...old, firstname: text}))}
          onSubmitEditing={() => lastNameRef.current.focus()}
        />
        <MainInput
          inputRef={lastNameRef}
          style={styles.sharedInputs}
          placeholder={t('lastName')}
          value={state.lastname}
          onChangeText={text => setState(old => ({...old, lastname: text}))}
          onSubmitEditing={() => cityRef.current.focus()}
        />
        <RoundSelector
          onPress={() => setpupUp(old => ({...old, country: true}))}
          styleTitle={{
            color:
              state.country_id == 0
                ? ColorWithOpacity('#0D0E10', 0.5)
                : 'black',
            fontFamily: Fonts.Regular,
          }}
          style={styles.sharedSelectors}
          title={
            state?.country_id != 0 ? selectedCountry?.name : names.countryName
          }
          iconColor={'#B7B7B7'}
        />
        <RoundSelector
          title={state?.zone_id != 0 ? selectedZone?.name : names.zoneName}
          onPress={() => setpupUp(old => ({...old, zone: true}))}
          styleTitle={{
            color:
              state.zone_id == 0 ? ColorWithOpacity('#0D0E10', 0.5) : 'black',
            fontFamily: Fonts.Regular,
          }}
          style={styles.sharedSelectors}
          iconColor={'#B7B7B7'}
        />
        <MainInput
          inputRef={cityRef}
          style={styles.sharedInputs}
          placeholder={t('city')}
          value={state.city}
          onChangeText={text => setState(old => ({...old, city: text}))}
          onSubmitEditing={() => addressRef.current.focus()}
        />
        <MainInput
          inputRef={addressRef}
          style={styles.sharedInputs}
          placeholder={t('detailedAddress')}
          value={state.address_1}
          onChangeText={text => setState(old => ({...old, address_1: text}))}
          onSubmitEditing={addOrEditAddress}
        />
        <CheckBox
          title={t('setAsDefault')}
          checked={state.default == '0' ? false : true}
          style={{marginTop: 10, marginBottom: 30}}
          onPress={() => {
            if (state.default == '0') {
              setState(old => ({...old, default: '1'}));
            } else {
              setState(old => ({...old, default: '0'}));
            }
          }}
        />
        <ColoredButton title={t('save')} onPress={addOrEditAddress} />

        <PopUp
          visible={pupUp.country}
          onRequestClose={() => setpupUp(old => ({...old, country: false}))}>
          <FlatList
            contentContainerStyle={{paddingHorizontal: 16}}
            data={countries}
            keyExtractor={item => item.country_id}
            renderItem={({item}) => (
              <CheckBox
                title={item.name}
                onPress={() => {
                  setState(old => ({...old, country_id: item.country_id}));
                  setNames(old => ({...old, countryName: item.name}));
                  setpupUp(old => ({...old, country: false}));
                }}
              />
            )}
          />
        </PopUp>

        <PopUp
          visible={pupUp.zone}
          onRequestClose={() => setpupUp(old => ({...old, zone: false}))}>
          {state.country_id == 0 ? (
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
                      setState(old => ({...old, zone_id: item.zone_id}));
                      setNames(old => ({...old, zoneName: item.name}));
                      setpupUp(old => ({...old, zone: false}));
                    }}
                  />
                )}
              />
            </View>
          )}
        </PopUp>
      </View>
    </SafeView>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  centred: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sharedInputs: {
    marginBottom: 10,
  },
  sharedSelectors: {
    backgroundColor: Colors.mainBack,
    marginBottom: 10,
    height: 50,
  },
  selectCountryText: {
    fontSize: PixelPerfect(30),
    fontFamily: Fonts.Medium,
    textAlign: 'center',
  },
});
