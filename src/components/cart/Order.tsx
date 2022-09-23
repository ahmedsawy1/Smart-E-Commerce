import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import ProfileSection from '../touchables/ProfileSection';
import Colors, {Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {t} from 'i18next';
import TitleText from '../texts/TitleText';
import OrderStatus from './OrderStatus';
import OrderItem from './OrderItem';
import {FlatList} from 'react-native-gesture-handler';

interface IOrder {
  style: StyleProp<ViewStyle>;
  status: String;
  orderNum: String;
  orderDate: String;
  noStatus?: boolean;
  isReturn?: boolean;
  products?: any;
  returnNumber?: String;
  onPress?: () => void;
}

const Order: FC<IOrder> = ({
  style,
  status,
  orderNum,
  orderDate,
  noStatus,
  isReturn,
  returnNumber,
  onPress,
  products,
}) => {
  return (
    <View style={[styles.con, style]}>
      <View style={styles.titlesCon}>
        <TitleText title={t('orderNumber')} subTitle={orderNum} />
        <TitleText title={t('orderDate')} subTitle={orderDate} />

        {isReturn && (
          <TitleText title={t('ReturnNumber')} subTitle={returnNumber} />
        )}
      </View>
      {noStatus ? null : (
        <OrderStatus style={styles.progressBar} status={status} />
      )}

      <FlatList
        data={products}
        keyExtractor={(item: any) => item.name}
        renderItem={({item}) => (
          <OrderItem
            style={{marginTop: 15}}
            title={item.name}
            imageURL={item.thumb}
            price={item.price}
          />
        )}
      />

      <ProfileSection
        styleTitle={styles.button}
        title={t('showOrderDetails')}
        noBorder
        onPress={onPress}
      />
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  con: {
    backgroundColor: Colors.mainBack,
    paddingHorizontal: 16,
    paddingTop: 15,
  },
  button: {
    color: Colors.medGray,
    fontSize: PixelPerfect(28),
    fontFamily: Fonts.SemiBold,
  },
  titlesCon: {
    flexDirection: 'row',
  },
  progressBar: {
    marginTop: 10,
    marginBottom: 15,
  },
});
