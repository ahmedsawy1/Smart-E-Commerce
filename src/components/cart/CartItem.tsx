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
import {DeleteIcon, MinusIcon, PlusIcon} from '../../assets/svg/icons';

interface ICartItem {
  imageURL: any;
  Option: any;
  title: String;
  inStock: Boolean;
  quantity: number;
  price: String;
  style: StyleProp<ViewStyle>;
  onDeletePress: () => void;
  onIncreasePress: () => void;
  onReducePress: () => void;
}

const CartItem: FC<ICartItem> = ({
  imageURL,
  title,
  price,
  style,
  quantity,
  onDeletePress,
  onIncreasePress,
  onReducePress,
  Option,
  inStock,
}) => {
  const RenderOptions = () => {
    let options = Option;
    if (typeof options === 'undefined') {
      return null;
    }
    if (Array.isArray(options) && options.length > 0) {
      let children = [];
      for (let i = 0; i < options.length; i++) {
        const o = options[i];
        children.push(
          <Text style={{fontSize: 12}}>
            {o.name}: {o.value}
          </Text>,
        );
        // children.push(<Text style={{fontSize:12}}> {o.value}</Text>)
      }
      return (
        // <FlatList
        //   data={children}
        //   keyExtractor={item => item.name}
        //   renderItem={({item}) => <Text>{item.name}</Text>}
        // />
        children
      );
    }
    return null;
  };

  return (
    <View style={[styles.con, style]}>
      <View>
        <Image
          source={{uri: decodeURI(imageURL)}}
          style={{
            width: PixelPerfect(166),
            height: PixelPerfect(166),
            borderRadius: 5,
          }}
          // defaultSource={{uri: 'https://i.ibb.co/F0phgG9/1.png'}}
        />
      </View>

      <View style={styles.detailsCon}>
        <View style={styles.topCon}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
        {!inStock && (
          <Text
            style={{marginBottom: 5, color: 'red', fontFamily: Fonts.Regular}}>
            {t('plzReduceQty')}
          </Text>
        )}

        <View style={styles.bottomCon}>
          <View style={styles.numberCon}>
            <Pressable onPress={onIncreasePress} style={styles.iconCon}>
              <PlusIcon size={PixelPerfect(18)} />
            </Pressable>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={styles.number}>{quantity}</Text>
            </View>
            <Pressable onPress={onReducePress} style={styles.iconCon}>
              <MinusIcon height={1.5} />
            </Pressable>
          </View>
          <View style={styles.deleteCon}>
            <Pressable
              onPress={onDeletePress}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <DeleteIcon />
              <Text style={styles.deleteWord}>{t('Delete')}</Text>
            </Pressable>
          </View>
        </View>
        <View style={{marginTop: 5}}>
          <RenderOptions />
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  con: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: Colors.blueGray,
    paddingBottom: 20,
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
    fontSize: PixelPerfect(28),
    color: Colors.black,
    fontFamily: Fonts.Medium,
    ...SharedStyles.textAlign,
  },
  price: {
    fontSize: PixelPerfect(32),
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
    color: Colors.black,
  },
  deleteCon: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  deleteWord: {
    marginLeft: 6.6,
    fontFamily: Fonts.Medium,
    color: Colors.medGray,
    fontSize: PixelPerfect(24),
    marginTop: 3,
  },
});
