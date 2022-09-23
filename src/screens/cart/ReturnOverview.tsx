import {Platform, StyleSheet, ScrollView, View} from 'react-native';
import React, {useEffect} from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import TitleText from '../../components/texts/TitleText';
import {useRoute} from '@react-navigation/native';
import Seprator from '../../components/other/Seprator';
import OrderItem from '../../components/cart/OrderItem';
import {getSingleReturn} from '../../store/actions/accountActions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';

const ReturnOverview = () => {
  const {params}: any = useRoute();
  const dispatch = useDispatch();
  const {singleReturn} = useSelector(
    (state: RootState) => state.accountReducer,
  );

  useEffect(() => {
    dispatch(getSingleReturn(params.return_id));
  }, []);

  return (
    <SafeView>
      <MainHeader title={`${t('ReturnDetailsNum')}${params.return_id}`} />

      <View style={styles.centred}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}}>
            <TitleText
              title={t('orderNumber')}
              subTitle={params.order_id}
              style={{flex: 0}}
              styleSubTitle={styles.subTitles}
            />
          </View>
          <View style={{flex: 1}}>
            <TitleText
              title={t('orderDate')}
              subTitle={params.date_added}
              style={{flex: 0}}
              styleSubTitle={styles.subTitles}
            />
          </View>
        </View>

        <View style={styles.sharedRowMargin}>
          <View style={{flex: 1}}>
            <TitleText
              title={t('ReturntNumber')}
              subTitle={params.return_id}
              style={{flex: 0}}
              styleSubTitle={styles.subTitles}
            />
          </View>
          <View style={{flex: 1}}>
            <TitleText
              title={t('returnReason')}
              subTitle={singleReturn?.reason}
              style={{flex: 0}}
              styleSubTitle={styles.subTitles}
            />
          </View>
        </View>

        <View style={styles.sharedRowMargin}>
          <View style={{flex: 1}}>
            <TitleText
              title={t('hasOpened')}
              subTitle={singleReturn?.opened}
              style={{flex: 0}}
              styleSubTitle={styles.subTitles}
            />
          </View>
          <View style={{flex: 1}}>
            <TitleText
              title={t('retunDetails')}
              subTitle={
                singleReturn?.comment == '' ? 'لايوجد' : singleReturn?.comment
              }
              style={{flex: 0}}
              styleSubTitle={styles.subTitles}
            />
          </View>
        </View>

        <Seprator style={{marginTop: 30, marginBottom: 10}} />

        {/* <ScrollView>
          {params.items.map((item: any, index: number) => (
            <OrderItem
              key={index}
              style={{marginTop: 10}}
              imageURL={item.image}
              price={item.price}
              title={item.title}
              hasQty
              quantity={'1'}
            />
          ))}
        </ScrollView> */}
      </View>
    </SafeView>
  );
};

export default ReturnOverview;

const styles = StyleSheet.create({
  subTitles: {
    paddingLeft: Platform.OS === 'android' ? 16 : 0,
    paddingRight: Platform.OS === 'ios' ? 16 : 0,
  },
  sharedRowMargin: {
    flexDirection: 'row',
    marginTop: 10,
  },
  centred: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
});
