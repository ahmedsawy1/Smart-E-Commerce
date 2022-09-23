import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import React, {FC} from 'react';
import {SharedStyles} from '../../styles/sharedStyles';
import Colors, {Fonts, PixelPerfect} from '../../styles/stylesConstants';
import Icon from 'react-native-vector-icons/Feather';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../store/actions/productsActions';
import {RootState} from '../../store/store';
import {showMessage} from 'react-native-flash-message';
import {t} from 'i18next';

interface IProductCard {
  imageURL: string;
  title: string;
  price: number;
  style: StyleProp<ViewStyle>;
  styleImage?: StyleProp<ImageStyle>;
  styleImageCont: StyleProp<ViewStyle>;
  onPress: () => void;
  otherFunction: any;
  navItem: object;
  selectedItem?: any;
  wishlist: boolean;
}

const ProductCard: FC<IProductCard> = React.memo(
  ({
    imageURL,
    title,
    price,
    style,
    onPress,
    selectedItem,
    wishlist,
    otherFunction,
    styleImage,
    styleImageCont,
  }) => {
    const dispatch = useDispatch();
    const {isSignedIn} = useSelector((state: RootState) => state.authReducer);
    const {name} = useRoute();

    const handleFavorite = () => {
      if (isSignedIn) {
        if (!wishlist) {
          dispatch(
            addToFavorites(
              selectedItem,
              name == 'HomeScreen' || name == 'SearchScreen' ? false : true,
            ),
          );
        } else {
          dispatch(
            removeFromFavorites(
              selectedItem,
              name == 'HomeScreen' || name == 'SearchScreen' ? false : true,
            ),
          );
        }
      } else {
        showMessage({type: 'danger', message: t('mustBeLoggedIn')});
      }
    };

    return (
      <Pressable style={[styles.con, style]} onPress={onPress}>
        <Pressable
          onPress={() => {
            handleFavorite();
            otherFunction && isSignedIn && otherFunction();
          }}
          style={[
            styles.heartButton,
            {backgroundColor: wishlist ? Colors.black : Colors.mainBack},
          ]}>
          <Icon
            name="heart"
            size={15}
            color={wishlist ? Colors.mainBack : '#888888'}
          />
        </Pressable>
        <View style={[styles.imageCon, styleImageCont]}>
          <Image
            source={{uri: decodeURI(imageURL)}}
            style={[styles.image, styleImage]}
            // resizeMode="stretch"
          />
        </View>
        <View style={styles.detailsCon}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.priceText}>{price}</Text>
        </View>
      </Pressable>
    );
  },
);

export default ProductCard;

const styles = StyleSheet.create({
  con: {
    ...SharedStyles.shadow,
    width: PixelPerfect(300),
    borderRadius: 10,
    backgroundColor: Colors.mainBack,
  },

  imageCon: {
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: PixelPerfect(270),
  },
  detailsCon: {
    flex: 4,
    paddingTop: 8,
    paddingBottom: 15,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleText: {
    ...SharedStyles.textAlign,
    fontSize: PixelPerfect(28),
    fontFamily: Fonts.Regular,
    color: Colors.black,
  },
  priceText: {
    marginTop: 5,
    fontSize: PixelPerfect(28),
    fontFamily: Fonts.Bold,
    color: Colors.black,
  },
  heartButton: {
    ...SharedStyles.centred,
    ...SharedStyles.shadow,

    height: 28,
    width: 28,
    position: 'absolute',
    zIndex: 1,
    left: 5,
    top: 5,
    borderRadius: 14,
  },
});
