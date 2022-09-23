import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import Colors, {Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';
import {t} from 'i18next';
import ColoredButton from '../touchables/ColoredButton';

interface IOrderItem {
  imageURL: any;
  title: String;
  price: String;
  style?: StyleProp<ViewStyle>;
  hasQty?: boolean;
  quantity?: String;
  canReturn?: boolean;
  onRetrunPress?: () => void;
}

const OrderItem: FC<IOrderItem> = ({
  imageURL,
  title,
  price,
  style,
  hasQty,
  quantity,
  canReturn = false,
  onRetrunPress,
}) => {
  return (
    <View style={[styles.con, style]}>
      <View style={styles.imageCon}>
        <Image
          source={{uri: decodeURI(imageURL)}}
          style={{
            width: PixelPerfect(110),
            height: PixelPerfect(110),
            borderRadius: 5,
          }}
        />
      </View>

      <View style={styles.detailsCon}>
        <View style={styles.topCon}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
            {canReturn && (
              <ColoredButton
                onPress={onRetrunPress}
                title={t('Return Product')}
                style={styles.returnButton}
                linearStyle={{height: 25}}
                styleTitle={{
                  fontSize: PixelPerfect(25),
                  fontFamily: Fonts.Medium,
                }}
              />
            )}
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.price}>{price}</Text>
            {hasQty && (
              <Text style={styles.quantityText}>
                {t('quantity')}
                {quantity}
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  con: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 0.3,
    borderColor: Colors.blueGray,
  },
  imageCon: {
    marginBottom: 8,
  },
  detailsCon: {
    flex: 3.5,
    paddingHorizontal: 14,
  },
  topCon: {
    flex: 2,
  },
  bottomCon: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    fontSize: PixelPerfect(26),
    color: Colors.black,
    fontFamily: Fonts.Regular,
    ...SharedStyles.textAlign,
  },
  price: {
    fontSize: PixelPerfect(28),
    fontFamily: Fonts.Bold,
    color: Colors.black,
    marginVertical: PixelPerfect(10),
    marginBottom: PixelPerfect(10),
    ...SharedStyles.textAlign,
  },
  numberCon: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.blueGray,
    width: PixelPerfect(182),
    paddingVertical: 5,
  },
  iconCon: {
    ...SharedStyles.centred,
    // flex: 1,
    backgroundColor: Colors.lightGray,
    padding: 5,
    height: PixelPerfect(40),
    width: PixelPerfect(40),
    borderRadius: 30,
  },
  number: {
    alignSelf: 'center',
  },
  deleteCon: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  quantityText: {
    marginHorizontal: 20,
    fontSize: PixelPerfect(28),
    fontFamily: Fonts.Regular,
    color: Colors.medGray,
  },
  returnButton: {
    width: '30%',
    height: 25,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
});
