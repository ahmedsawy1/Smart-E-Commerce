import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import OrderStatus from '../../components/cart/OrderStatus';
import {useNavigation, useRoute} from '@react-navigation/native';
import TitleText from '../../components/texts/TitleText';
import OrderItem from '../../components/cart/OrderItem';
import Seprator from '../../components/other/Seprator';
import Colors, {
  Fonts,
  phoneHeight,
  PixelPerfect,
} from '../../styles/stylesConstants';
import ColoredButton from '../../components/touchables/ColoredButton';
import {SharedStyles} from '../../styles/sharedStyles';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import Loader from '../../components/other/Loader';
import RenderTotals from './RenderTotals';

const OrderOverview = () => {
  const {params}: any = useRoute();
  const navigation: any = useNavigation();

  const {loader, singleOrder} = useSelector(
    (state: RootState) => state.accountReducer,
  );

  const paymentAddress = singleOrder
    ? singleOrder?.payment_address?.split('<br />').join('\n')
    : '';

  const shipingAddress = singleOrder
    ? singleOrder?.shipping_address?.split('<br />').join('\n')
    : '';

  return (
    <>
      <SafeView>
        {(!singleOrder && loader) ||
        singleOrder.products == undefined ||
        singleOrder == {} ? (
          <Loader />
        ) : (
          <ScrollView contentContainerStyle={{paddingBottom: phoneHeight / 7}}>
            <MainHeader
              title={`${t('orderDetailsNum')} ${singleOrder?.order_id}`}
            />
            <View style={styles.centred}>
              <OrderStatus
                status={params.status}
                style={{marginVertical: 30}}
              />

              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View style={{flex: 1}}>
                  <TitleText
                    title={t('orderNumber')}
                    subTitle={singleOrder?.order_id}
                    style={{flex: 0}}
                    styleSubTitle={styles.subTitles}
                  />
                </View>
                <View style={{flex: 1}}>
                  <TitleText
                    title={t('orderDate')}
                    subTitle={singleOrder?.date_added}
                    style={{flex: 0}}
                    styleSubTitle={styles.subTitles}
                  />
                </View>
              </View>

              <View style={styles.sharedRowMargin}>
                <View style={{flex: 1}}>
                  <TitleText
                    title={t('ShippingMethod')}
                    subTitle={singleOrder?.shipping_method}
                    style={{flex: 0}}
                    styleSubTitle={styles.subTitles}
                  />
                </View>
                <View style={{flex: 1}}>
                  <TitleText
                    title={t('PaymentMethod')}
                    subTitle={singleOrder?.payment_method}
                    style={{flex: 0}}
                    styleSubTitle={styles.subTitles}
                  />
                </View>
              </View>

              <View style={styles.sharedRowMargin}>
                <View style={{flex: 1}}>
                  <TitleText
                    title={t('payAddress')}
                    subTitle={paymentAddress}
                    style={{flex: 0}}
                    styleSubTitle={styles.subTitles}
                  />
                </View>
                <View style={{flex: 1}}>
                  <TitleText
                    title={t('shippingAddress')}
                    subTitle={shipingAddress}
                    style={{flex: 0}}
                    styleSubTitle={styles.subTitles}
                  />
                </View>
              </View>

              <Seprator style={{marginTop: 30, marginBottom: 10}} />

              <ScrollView>
                {singleOrder?.products?.map((item: any, index: number) => (
                  <View>
                    <OrderItem
                      key={index}
                      style={{marginTop: 10}}
                      imageURL={item.pro_image}
                      price={item.price}
                      title={item.name}
                      hasQty
                      quantity={item.quantity}
                      canReturn
                      onRetrunPress={() =>
                        navigation.navigate('ReturnProduct', {
                          orderID: singleOrder.order_id,
                          orderProductId: item.order_product_id,
                        })
                      }
                    />
                  </View>
                ))}
              </ScrollView>
            </View>

            <View style={styles.priceCon}>
              <RenderTotals isOrderTotal={singleOrder?.totals} />

              {/* <View style={styles.sharedRow}>
                <Text style={styles.priceTitle}>{t('total')}</Text>
                <Text style={styles.price}>{singleOrder?.totals[0]?.text}</Text>
              </View> 
              <View style={styles.sharedRow}>
                <Text style={styles.priceTitle}>{t('shippingCost')}</Text>
                <Text style={styles.price}>{singleOrder?.totals[1]?.text}</Text>
              </View>
              <View style={styles.sharedRow}>
                <Text style={styles.priceTitle}>{t('VAT(15%)')}</Text>
                <Text style={styles.price}>{singleOrder?.totals[2]?.text}</Text>
              </View>
              <Seprator style={{marginVertical: 15}} />
              <View style={styles.sharedRow}>
                <Text style={[styles.priceTitle, {fontFamily: Fonts.SemiBold}]}>
                  {t('finalTotal')}
                </Text>
                <Text style={styles.price}>{singleOrder?.totals[3]?.text}</Text>
              </View> */}
            </View>
          </ScrollView>
        )}
      </SafeView>
      {/* <View style={styles.buttonCon}>
        <ColoredButton
          title={t('buyAgain')}
          style={{width: '45%'}}
          onPress={() => navigation.navigate('HomeScreen')}
        />
        <ColoredButton
          onPress={() => navigation.navigate('ReturnProduct')}
          title={t('returnOrder')}
          style={styles.returnButton}
          isLinear={false}
          styleTitle={{color: '#828282'}}
        />
      </View> */}
    </>
  );
};

export default OrderOverview;

const styles = StyleSheet.create({
  centred: {
    paddingHorizontal: 16,
  },
  subTitles: {
    paddingLeft: Platform.OS === 'android' ? 16 : 0,
    paddingRight: Platform.OS === 'ios' ? 16 : 0,
  },
  priceCon: {
    paddingHorizontal: 16,
    marginTop: 30,
  },
  sharedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  priceTitle: {
    fontSize: PixelPerfect(32),
    fontFamily: Fonts.Regular,
    color: Colors.black,
    flex: 1,
    ...SharedStyles.textAlign,
  },
  price: {
    fontSize: PixelPerfect(32),
    fontFamily: Fonts.Regular,
    color: Colors.black,
  },
  buttonCon: {
    backgroundColor: Colors.mainBack,
    ...SharedStyles.centred,
    ...SharedStyles.shadow,
    paddingTop: 9,
    paddingBottom: Platform.OS === 'ios' ? 24 : 9,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  returnButton: {
    width: '45%',
    backgroundColor: Colors.lightGray,
  },
  sharedRowMargin: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
