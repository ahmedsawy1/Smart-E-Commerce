import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import CartItem from '../../components/cart/CartItem';
import LogoHeader from '../../components/headers/LogoHeader';
import DiscountInput from '../../components/inputs/DiscountInput';
import Loader from '../../components/other/Loader';
import ColoredButton from '../../components/touchables/ColoredButton';
import SafeView from '../../components/views/SafeView';
import {
  addCoupon,
  addRewardPoints,
  addVoucher,
  ChangeCartQuanitity,
  deleteFromCart,
  getCart,
} from '../../store/actions/CheckoutActions';
import {RootState} from '../../store/store';
import {SharedStyles} from '../../styles/sharedStyles';
import Colors, {
  Fonts,
  phoneHeight,
  PixelPerfect,
} from '../../styles/stylesConstants';
import RenderTotals from './RenderTotals';

const CartScreen = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const [voucher, setVoucher] = useState('');
  const [coupon, setCoupon] = useState('');
  const [reward, setReward] = useState('');
  const {cartData, loader} = useSelector(
    (state: RootState) => state.checkoutReducer,
  );
  const {isSignedIn} = useSelector((state: RootState) => state.authReducer);

  const {selecedOptions} = useSelector(
    (state: RootState) => state.productsReducer,
  );

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getCart());
    wait(2000).then(() => setRefreshing(false));
  }, []);

  function onQuanitiyChangePress(id: number, quantity: any, op: string) {
    let newQuantity = 0;
    if (op === '+') {
      newQuantity = parseInt(quantity) + 1;
    } else {
      newQuantity = parseInt(quantity) - 1;
    }
    if (newQuantity === 0) {
      showMessage({
        message: t('lessProdsNum'),
        type: 'danger',
      });
      return;
    }
    dispatch(ChangeCartQuanitity(id, newQuantity));
    dispatch(getCart());
  }

  let inStockArray = [];

  return (
    <SafeView>
      <LogoHeader noArrow noShare />
      {!cartData ? (
        <Loader />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.black]}
            />
          }
          contentContainerStyle={{paddingBottom: phoneHeight / 4}}
          keyboardShouldPersistTaps="handled">
          {cartData.hasOwnProperty('products') ? (
            <>
              <ScrollView
                contentContainerStyle={{paddingHorizontal: 16}}
                keyboardShouldPersistTaps="handled">
                {cartData?.products?.map((item: any, index: number) => {
                  inStockArray.push(item.stock);

                  return (
                    <CartItem
                      inStock={item?.stock}
                      Option={item.option}
                      quantity={item.quantity}
                      onIncreasePress={() => {
                        onQuanitiyChangePress(item.cart_id, item.quantity, '+');
                      }}
                      onReducePress={() =>
                        onQuanitiyChangePress(item.cart_id, item.quantity, '-')
                      }
                      key={index}
                      style={{
                        marginTop: 20,
                      }}
                      imageURL={item.thumb}
                      title={item.name}
                      price={item.price}
                      onDeletePress={() => {
                        dispatch(deleteFromCart(item.cart_id));
                      }}
                    />
                  );
                })}
              </ScrollView>

              {/* {loader && <Loader style={{marginTop: 10}} />} */}

              {cartData?.modules.hasOwnProperty('coupon') && (
                <DiscountInput
                  // loading={loader}
                  placeholder={t('enterVoucher')}
                  style={{marginTop: 11}}
                  value={voucher}
                  onChangeText={(text: string) => setVoucher(text)}
                  onPress={() => {
                    Keyboard.dismiss();
                    dispatch(addVoucher(voucher));
                  }}
                />
              )}

              {cartData?.modules.hasOwnProperty('voucher') && (
                <DiscountInput
                  // loading={loader}
                  placeholder={t('enterDiscount')}
                  value={coupon}
                  onChangeText={(text: string) => setCoupon(text)}
                  onPress={() => {
                    dispatch(addCoupon(coupon));
                  }}
                />
              )}
              {cartData?.modules.hasOwnProperty('reward') && (
                <DiscountInput
                  // loading={loader}
                  placeholder={t('Enter Reward Points')}
                  value={reward}
                  onChangeText={(text: string) => setReward(text)}
                  onPress={() => {
                    dispatch(addRewardPoints(reward));
                  }}
                />
              )}

              <View style={{paddingHorizontal: 16, marginTop: 21}}>
                <RenderTotals />

                <ColoredButton
                  style={styles.button}
                  title={t('checkout')}
                  onPress={() => {
                    if (!inStockArray.includes(false)) {
                      if (isSignedIn) {
                        navigation.navigate('CheckoutScreen');
                      } else {
                        navigation.navigate('GuestCheckoutScreen');
                      }
                    } else {
                      showMessage({
                        type: 'danger',
                        message: t('plzReduceQty'),
                      });
                    }
                  }}
                />
              </View>
            </>
          ) : (
            <View style={styles.emptyTextCon}>
              <Text style={[styles.price, {fontSize: PixelPerfect(40)}]}>
                {t('cartIsEmpty')}
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  priceCon: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: PixelPerfect(32),
    fontFamily: Fonts.Medium,
    color: Colors.black,
    flex: 1,
    ...SharedStyles.textAlign,
  },
  price: {
    fontSize: PixelPerfect(32),
    fontFamily: Fonts.Medium,
    color: Colors.black,
  },
  sharedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  button: {
    marginVertical: 28,
  },
  emptyTextCon: {
    flex: 1,
    height: phoneHeight / 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadText: {
    color: Colors.black,
  },
});
