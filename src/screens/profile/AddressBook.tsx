import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import {PlusIcon} from '../../assets/svg/icons';
import Colors, {
  Fonts,
  phoneHeight,
  PixelPerfect,
} from '../../styles/stylesConstants';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAddress, getAddresses} from '../../store/actions/accountActions';
import {RootState} from '../../store/store';
import AddressCard from '../../components/cards/AddressCard';
import {getAddressessList} from '../../store/actions/CheckoutActions';
import Loader from '../../components/other/Loader';

const AddressBook = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const {addresses, loader} = useSelector(
    (state: RootState) => state.accountReducer,
  );

  console.log(addresses);

  useEffect(() => {
    dispatch(getAddresses());
  }, []);

  return (
    <SafeView>
      <MainHeader
        title={t('bookAddresses')}
        otherIcon={<PlusIcon color={Colors.lightGray} />}
        onOtherIconPress={() => navigation.navigate('AddAddress')}
      />
      <View style={styles.centerView}>
        {addresses.length == 0 && loader && <Loader />}
        {addresses.length == 0 && !loader && (
          <Text style={styles.textNoAddressess}>{t('noAddressess')}</Text>
        )}

        {addresses.length != 0 && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={addresses}
            keyExtractor={item => item.address_id}
            renderItem={({item}) => (
              <AddressCard
                title={`${item.firstname} ${item.lastname}, ${item.address_1} - ${item.zone}, ${item.city}, ${item.country}`}
                onDeletePress={() => dispatch(deleteAddress(item.address_id))}
                onEditAddress={() => navigation.navigate('AddAddress', item)}
              />
            )}
          />
        )}
      </View>
    </SafeView>
  );
};

export default AddressBook;

const styles = StyleSheet.create({
  centerView: {
    paddingHorizontal: 16,
    paddingTop: 7,
    flex: 1,
  },
  textNoAddressess: {
    alignSelf: 'center',
    color: Colors.black,
    fontSize: PixelPerfect(30),
    fontFamily: Fonts.Medium,
    marginTop: 20,
  },
});
