import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import React, {useState} from 'react';
import {View, Text, Platform, ScrollView, StyleSheet} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import CartItem from '../../../components/cart/CartItem';
import DiscountInput from '../../../components/inputs/DiscountInput';
import Loader from '../../../components/other/Loader';
import CheckBoxRound from '../../../components/touchables/CheckBoxRound';
import {
  addCoupon,
  addVoucher,
  ChangeCartQuanitity,
  deleteFromCart,
  getCart,
  SetPaymentMethod,
  SetShippingtMethod,
} from '../../../store/actions/CheckoutActions';
import {RootState} from '../../../store/store';
import Colors, {Fonts, PixelPerfect} from '../../../styles/stylesConstants';
import RenderTotals from '../RenderTotals';

export const CartAndMethods = ({inStockArray}) => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const {shippingMethods, paymentData, cartData, loader} = useSelector(
    (state: RootState) => state.checkoutReducer,
  );

  const [voucher, setVoucher] = useState('');
  const [coupon, setCoupon] = useState('');
  const [code, setCode] = useState({
    shipingCode: '',
    paymentCode: '',
  });

  const ShipingMethods = () => {
    let methods: any = {};
    if (shippingMethods.shipping_methods) {
      methods = shippingMethods.shipping_methods;
    }
    return Object.keys(methods).map(m => {
      for (const [key2, value2] of Object.entries(methods[m].quote)) {
        return (
          <CheckBoxRound
            title={methods[m].title}
            checked={
              code.shipingCode == methods[m]?.quote?.[key2]?.code ? true : false
            }
            onPress={() => {
              setCode(old => ({
                ...old,
                shipingCode: methods[m]?.quote?.[key2]?.code,
              }));
              dispatch(SetShippingtMethod(methods[m]?.quote?.[key2]?.code));
              console.log(methods[m]?.quote?.[key2]?.code);
            }}
            endText={
              methods[m]?.quote?.[key2]?.cost
                ? `${methods[m]?.quote?.[key2]?.cost} ${t('SR')}`
                : null
            }
          />
        );
      }
    });
  };

  const PaymentMethods = () => {
    let methods: any = {};
    if (paymentData.payment_methods) {
      methods = paymentData.payment_methods;
    }
    return Object.keys(methods).map(m => {
      let objectValue = methods[m];
      let title = methods[m].title;
      if (objectValue.hasOwnProperty('sub_methods')) {
        return Object.keys(methods[m].sub_methods).map(s => {
          let objectValue2 = methods[m].sub_methods[s];
          if (Platform.OS == 'android' && objectValue2.code == 'ap') {
            return false;
          }
          return (
            <CheckBoxRound
              title={methods[m].title}
              checked={code.paymentCode == methods[m].code ? true : false}
              onPress={() => {
                setCode(old => ({...old, paymentCode: methods[m].code}));
                dispatch(SetPaymentMethod(methods[m].code));
              }}
            />
          );
        });
      } else if (methods[m].code == 'myfatoorah_direct') {
        <CheckBoxRound
          title={methods[m].title}
          checked={code.paymentCode == methods[m].code ? true : false}
          onPress={() => {
            setCode(old => ({...old, paymentCode: methods[m].code}));
            dispatch(SetPaymentMethod(methods[m].code));
          }}
        />;
      } else {
        if (methods[m].code == 'myfatoorah_pg') {
          title = title.replace(
            /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            '',
          );
        }
        return (
          <CheckBoxRound
            title={title}
            checked={code.paymentCode == methods[m].code ? true : false}
            onPress={() => {
              setCode(old => ({...old, paymentCode: methods[m].code}));
              dispatch(SetPaymentMethod(methods[m].code));
            }}
          />
        );
      }
    });
  };

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
  }

  return (
    <>
      {false ? (
        <Loader style={{marginBottom: 10}} />
      ) : (
        <View>
          {shippingMethods?.shipping_methods?.length == 0 ||
          shippingMethods?.shipping_methods == undefined ? (
            <Text style={styles.noMethodsText}>
              {t('noShipingToThisAddress')}
            </Text>
          ) : (
            <>
              <View style={styles.titleCon}>
                <Text style={styles.sharedTitle}>{t('ShippingMethod')}</Text>
              </View>

              <View style={styles.checkBoxCon}>
                <ShipingMethods />
              </View>
            </>
          )}

          {paymentData.payment_methods?.length == 0 ||
          paymentData.payment_methods == undefined ? (
            <Text style={styles.noMethodsText}>
              {t('noPaymentToThisAddress')}
            </Text>
          ) : (
            <>
              <View style={styles.titleCon}>
                <Text style={styles.sharedTitle}>{t('PaymentMethod')}</Text>
              </View>

              <View style={styles.checkBoxCon}>
                <PaymentMethods />
              </View>
            </>
          )}
        </View>
      )}

      <View style={styles.titleCon}>
        <Text style={styles.sharedTitle}>{t('buyCart')}</Text>
      </View>

      {cartData.hasOwnProperty('products') ? (
        <>
          <ScrollView contentContainerStyle={{paddingHorizontal: 16}}>
            {cartData?.products?.map((item: any, index: number) => {
              inStockArray?.push(item.stock);

              return (
                <CartItem
                  inStock={item?.stock}
                  quantity={item.quantity}
                  onIncreasePress={() =>
                    onQuanitiyChangePress(item.cart_id, item.quantity, '+')
                  }
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
                    dispatch(getCart());

                    setTimeout(() => {
                      if (cartData?.products?.length == undefined) {
                        navigation.navigate('HomeScreen');
                      }
                    }, 1000);
                  }}
                />
              );
            })}
          </ScrollView>

          <DiscountInput
            placeholder={t('enterVoucher')}
            style={{marginTop: 11}}
            value={voucher}
            onChangeText={(text: string) => setVoucher(text)}
            onPress={() => {
              dispatch(addVoucher(voucher));
            }}
          />

          <DiscountInput
            placeholder={t('enterDiscount')}
            style={{marginBottom: 21}}
            value={coupon}
            onChangeText={(text: string) => setCoupon(text)}
            onPress={() => {
              dispatch(addCoupon(coupon));
            }}
          />

          <View style={styles.priceCon}>
            <RenderTotals />

            {/* <CheckBox
                style={{marginTop: 40}}
                checked={state.approve}
                onPress={changeApprove}
                title={t('iRead')}
                diffrentTitle={t('terms')}
              /> */}
          </View>
        </>
      ) : (
        <View style={styles.emptyTextCon}>
          <Text style={[styles.price, {fontSize: PixelPerfect(40)}]}>
            {t('cartIsEmpty')}
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 12,
    marginTop: 15,
    color: Colors.black,
    fontSize: PixelPerfect(32),
    fontFamily: Fonts.SemiBold,
    textAlign: 'left',
  },

  titleCon: {
    paddingHorizontal: 16,
    backgroundColor: Colors.darkWhite,
    paddingTop: 17,
    paddingBottom: 10,
  },
  sharedTitle: {
    color: Colors.black,
    fontSize: PixelPerfect(32),
    fontFamily: Fonts.SemiBold,
    textAlign: 'left',
  },
  checkBoxCon: {
    paddingHorizontal: 16,
    marginVertical: 18,
  },
  priceCon: {
    paddingHorizontal: 16,
  },
  price: {
    fontSize: PixelPerfect(32),
    fontFamily: Fonts.Medium,
    color: Colors.black,
  },

  emptyTextCon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },

  noMethodsText: {
    fontSize: PixelPerfect(30),
    color: Colors.medGray,
    fontFamily: Fonts.Medium,
    marginVertical: 13,
    marginHorizontal: 16,
    textAlign: 'center',
  },
});
