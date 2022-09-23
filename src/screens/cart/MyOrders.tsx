import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import Order from '../../components/cart/Order';
import {useNavigation} from '@react-navigation/native';
import Colors, {Fonts, phoneHeight} from '../../styles/stylesConstants';
import {useDispatch, useSelector} from 'react-redux';
import {getMyOrders, getSingleOrder} from '../../store/actions/accountActions';
import {RootState} from '../../store/store';
import Loader from '../../components/other/Loader';

const MyOrders = () => {
  const navigation: any = useNavigation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyOrders());
  }, []);

  const {orders, loader} = useSelector(
    (state: RootState) => state.accountReducer,
  );

  return (
    <SafeView style={styles.con}>
      <MainHeader title={t('orderBook')} />

      {!orders && loader ? (
        <Loader />
      ) : (
        <FlatList
          contentContainerStyle={{paddingBottom: phoneHeight / 10}}
          data={orders}
          keyExtractor={item => item.order_id}
          ListEmptyComponent={
            <View style={styles.noOrdersCon}>
              <Text
                style={{
                  fontFamily: Fonts.Regular,
                }}>
                {t('No Orders')}
              </Text>
            </View>
          }
          renderItem={({item}) => (
            <Order
              style={{marginTop: 10}}
              orderNum={`# ${item.order_id}`}
              orderDate={item.date_added}
              status={item.status}
              onPress={() => {
                dispatch(getSingleOrder(item.order_id));
                navigation.navigate('OrderOverview', item);
              }}
              // Two Products
              products={item.products}
            />
          )}
        />
      )}
    </SafeView>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  con: {
    backgroundColor: Colors.darkWhite,
  },
  noOrdersCon: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '20%',
    marginBottom: 20,
  },
});
