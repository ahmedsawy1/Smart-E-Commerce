import {
  FlatList,
  I18nManager,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import SafeView from '../../components/views/SafeView';
import LogoHeader from '../../components/headers/LogoHeader';
import Slider from '../../components/other/Slider';
import Colors, {
  Fonts,
  phoneHeight,
  phoneWidth,
  PixelPerfect,
} from '../../styles/stylesConstants';
import {t} from 'i18next';
import Seprator from '../../components/other/Seprator';
import UserComment from '../../components/cards/UserComment';
import {SharedStyles} from '../../styles/sharedStyles';
import ColoredButton from '../../components/touchables/ColoredButton';
import {MinusIcon, PlusIcon} from '../../assets/svg/icons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import Loader from '../../components/other/Loader';
import {addToCart, getCart} from '../../store/actions/CheckoutActions';
import {
  addToCompare,
  addToFavorites,
  getProductReviews,
  getSingleProduct,
  removeFromFavorites,
} from '../../store/actions/productsActions';
import {regex, RemoveHTMLFromString} from '../../constants/helpers';
import {ProductCustomize} from './option/ProductCustomize';
import ProductRatings from '../../components/inputs/ProductRatings';
import ProductCard from '../../components/cards/ProductCard';
import {showMessage} from 'react-native-flash-message';
import SliderImageViewer from '../../components/views/SliderImageViewer';

const ProductOverview = () => {
  const dispatch = useDispatch();

  const {singleProduct, loader, reviews, selecedOptions} = useSelector(
    (state: RootState) => state.productsReducer,
  );
  const {isSignedIn} = useSelector((state: RootState) => state.authReducer);

  const [state, setState] = useState({
    compared: false,
    imageViewerVisiable: false,
  });

  const [cart, setCart] = useState({
    prodID: singleProduct?.product_id,
    quantity: 1,
  });
  const [commentsNum, setCommentsNum] = useState(2);

  const toggleImageViewerVisiable = (status: boolean) =>
    setState(s => ({...s, imageViewerVisiable: status}));

  const reduceCount = () => {
    if (cart.quantity > 1) {
      setCart(old => ({...old, quantity: cart.quantity - 1}));
    }
  };

  console.log('prod id = ' + singleProduct?.product_id);
  console.log(JSON.stringify(singleProduct, null, 3));

  const productURL = RemoveHTMLFromString(singleProduct?.share);

  const RenderPrice = () => {
    if (singleProduct?.special) {
      return (
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.price,
              {
                textDecorationLine: 'line-through',
                color: Colors.lightGray,
              },
            ]}>
            {singleProduct?.price}
          </Text>
          <Text style={styles.price}> {singleProduct?.special}</Text>
        </View>
      );
    } else return <Text style={styles.price}>{singleProduct?.price}</Text>;
  };

  const RenderTax = () => {
    if (singleProduct?.tax) {
      return (
        <Text style={styles.taxText}>
          {t('priceWithoutTax')} {singleProduct?.tax}
        </Text>
      );
    } else {
      return null;
    }
  };

  const handleFavorite = () => {
    if (isSignedIn) {
      if (!singleProduct?.wishlist) {
        dispatch(addToFavorites(singleProduct?.product_id));
        dispatch(getSingleProduct(singleProduct?.product_id, false));
      } else {
        dispatch(removeFromFavorites(singleProduct?.product_id));
        dispatch(getSingleProduct(singleProduct?.product_id, false));
      }
    } else {
      showMessage({type: 'danger', message: t('mustBeLoggedIn')});
    }
  };

  const bannerDataVerfy =
    singleProduct?.images != undefined && singleProduct?.popup != undefined
      ? [{popup: singleProduct?.popup}, ...singleProduct?.images]
      : [
          {
            popup:
              'https://www.tumerfashion.com/shop/image/catalog/tumer-logo.png',
          },
        ];

  const arrString: any = [];
  let selectedOptionsArr: any = [];
  let newArrOfWholeObj: any = [];

  const onAddToCartPress = () => {
    for (let i = 0; i < selecedOptions.length; i++) {
      const element: any = selecedOptions[i];

      selectedOptionsArr.push(element.product_option_id);

      const newAllObj = singleProduct.options.find(
        (obj: any) => obj.product_option_id == element.product_option_id,
      );
      newArrOfWholeObj.push(newAllObj);

      let wantedVal = newAllObj.option_value.find(
        (obj: any) => obj.option_value_id == element.option_value_id,
      );

      if (newAllObj.type == 'checkbox') {
        arrString.push(`&option[${newAllObj.option_id}][]=${wantedVal}`);
      } else {
        arrString.push(`&option[${newAllObj.option_id}]=${wantedVal}`);
      }
    }

    if (cart.quantity <= singleProduct?.stock) {
      dispatch(
        addToCart(singleProduct?.product_id, cart.quantity, selecedOptions),
      );
      dispatch(getCart());
    } else {
      showMessage({
        type: 'danger',
        message: `${t('noEnoughQty')}: ${singleProduct?.stock}`,
      });
    }
  };

  // console.log('Banner Data');
  // console.log(JSON.stringify(bannerDataVerfy, null, 3));

  const expectImageKeyNames = bannerDataVerfy?.map(item => {
    return {
      url: decodeURI(item.popup),
      width: phoneWidth,
      height: phoneHeight / 1.4,
    };
  });

  return (
    <>
      <SafeView>
        <View style={styles.paddingView}>
          <LogoHeader
            shareMessage={`${singleProduct?.share_text + '\n' + productURL}`}
            hasCartIcon
          />
          <ScrollView
            contentContainerStyle={{paddingBottom: PixelPerfect(200)}}
            showsVerticalScrollIndicator={false}>
            {loader || !singleProduct ? (
              <Loader
                style={{
                  marginTop: phoneHeight / 3,
                }}
              />
            ) : (
              <View>
                <Slider
                  onImagePress={() => toggleImageViewerVisiable(true)}
                  addToCompare={() =>
                    dispatch(addToCompare(singleProduct?.product_id))
                  }
                  wishList={singleProduct?.wishlist}
                  hasIconButtons
                  isRTL={I18nManager.isRTL ? true : false}
                  isURI
                  bannerData={bannerDataVerfy}
                  styleContainer={{paddingHorizontal: 15}}
                  dotStyle={styles.sliderDotsStyle}
                  imageStyle={styles.sliderImageStyle}
                  imageResizeMode="contain"
                  bannerContainerStyle={styles.sliderCon}
                  flatListStyle={{width: phoneWidth}}
                  activeDotColor={Colors.black}
                  inActiveDotColor={Colors.lightGray}
                  selectedItem={singleProduct}
                />

                <SliderImageViewer
                  images={expectImageKeyNames}
                  onRequestClose={() => toggleImageViewerVisiable(false)}
                  imageViewrVisiable={state.imageViewerVisiable}
                />

                <View style={styles.detailsCon}>
                  <Text style={styles.title}>{singleProduct?.name} </Text>
                  <RenderPrice />
                  <RenderTax />
                </View>
                <Seprator style={styles.seprator} />

                {singleProduct?.options?.length != 0 && (
                  <View>
                    <ProductCustomize
                      string={arrString}
                      prodId={singleProduct?.product_id}
                    />
                    <Seprator style={styles.seprator} />
                  </View>
                )}

                <Text style={[styles.title]}>{t('description')}</Text>
                <Text style={styles.description}>
                  {singleProduct?.description?.split(regex).join(' ')}
                </Text>
                <Seprator style={styles.seprator} />
                <Text style={styles.title}>{t('comments')}</Text>

                {reviews
                  .slice(0, commentsNum)
                  .map((item: any, index: number) => (
                    <UserComment
                      key={index}
                      userName={item.author}
                      comment={item.text}
                      userImage="https://pbs.twimg.com/profile_images/1349415837866876930/IjkCwd52_400x400.jpg"
                    />
                  ))}

                {reviews.length == 0 ? (
                  <Text
                    style={[
                      styles.seeMoreComments,
                      {
                        textDecorationLine: 'none',
                      },
                    ]}>
                    {t('noComments')}
                  </Text>
                ) : reviews.length == 1 ? (
                  <View style={styles.sharedSpace} />
                ) : commentsNum >= reviews.length ? (
                  <View style={styles.sharedSpace} />
                ) : (
                  <Text
                    style={styles.seeMoreComments}
                    onPress={() => setCommentsNum(commentsNum + 2)}>
                    {t('moreComments')}
                  </Text>
                )}

                <Text style={styles.title}>{t('addComment')}</Text>

                <ProductRatings productID={singleProduct?.product_id} />

                <Seprator style={styles.seprator} />

                <Text style={styles.otherProdsText}>
                  {t('similarProducts')}
                </Text>

                <FlatList
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.flatListContent}
                  horizontal
                  data={singleProduct?.products}
                  keyExtractor={item => item.product_id}
                  ListEmptyComponent={
                    <Text style={styles.emptyText}>{t('notFound')}</Text>
                  }
                  renderItem={({item}) => (
                    <ProductCard
                      onPress={() => {
                        dispatch(getSingleProduct(item.product_id));
                        dispatch(getProductReviews(item.product_id));
                      }}
                      title={item.name}
                      imageURL={item.thumb}
                      price={item.price}
                      style={{marginRight: 10}}
                      wishlist={item.wishlist}
                    />
                  )}
                />
              </View>
            )}
          </ScrollView>
        </View>
      </SafeView>

      {loader || !singleProduct ? null : singleProduct?.stock != 'غير متوفر' &&
        singleProduct?.stock != 'Out Of Stock' ? (
        <View style={styles.bottomView}>
          <View style={styles.numberCon}>
            <Pressable
              onPress={() =>
                setCart(old => ({...old, quantity: cart.quantity + 1}))
              }
              style={styles.iconCon}>
              <PlusIcon />
            </Pressable>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={styles.number}>{cart.quantity}</Text>
            </View>
            <Pressable onPress={reduceCount} style={styles.iconCon}>
              <MinusIcon />
            </Pressable>
          </View>
          <ColoredButton
            title={t('addToCart')}
            style={styles.button}
            onPress={onAddToCartPress}
          />
        </View>
      ) : (
        <View style={styles.bottomView}>
          <ColoredButton
            title={t('noQty')}
            style={{backgroundColor: Colors.medGray}}
            isLinear={false}
            // onPress={onAddToCartPress}
          />
        </View>
      )}
    </>
  );
};

export default ProductOverview;

const styles = StyleSheet.create({
  bannerCon: {
    width: '100%',
    height: PixelPerfect(380),
    marginVertical: PixelPerfect(40),
    borderRadius: PixelPerfect(15),
  },
  banner: {
    width: '100%',
    borderRadius: PixelPerfect(15),
    height: '100%',
  },
  bottomView: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    backgroundColor: Colors.mainBack,
    ...SharedStyles.shadow,
    paddingBottom: Platform.OS === 'ios' ? PixelPerfect(50) : 10,
  },
  numberCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.blueGray,
    color: Colors.red,
  },
  iconCon: {
    ...SharedStyles.centred,
    // flex: 1,
    backgroundColor: Colors.lightGray,
    padding: 5,
    height: PixelPerfect(60),
    width: PixelPerfect(60),
    borderRadius: 30,
  },
  number: {
    marginHorizontal: 5,
    alignSelf: 'center',
    color: Colors.black,
  },
  button: {
    flex: 2,
    marginLeft: 10,
  },
  paddingView: {
    paddingHorizontal: 16,
  },
  sliderCon: {
    width: '100%',
    borderRadius: 15,
  },
  sliderImageStyle: {
    width: '100%',
    borderRadius: 15,
  },
  sliderDotsStyle: {
    height: 3,
    borderRadius: 5,
    marginBottom: 5,
  },
  detailsCon: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: PixelPerfect(36),
    fontFamily: Fonts.Bold,
    color: Colors.black,
    ...SharedStyles.textAlign,
  },
  price: {
    fontSize: PixelPerfect(44),
    fontFamily: Fonts.Bold,
    color: Colors.black,
    marginVertical: PixelPerfect(15),
    marginBottom: PixelPerfect(10),
  },
  taxText: {
    fontSize: PixelPerfect(30),
    fontFamily: Fonts.Regular,
    color: Colors.medGray,
    marginTop: -8,
  },
  description: {
    fontSize: PixelPerfect(30),
    fontFamily: Fonts.Regular,
    color: Colors.darkGray,
    textAlign: 'left',
    // ...SharedStyles.textAlign,
  },
  seprator: {
    marginVertical: 22.5,
  },
  seeMoreComments: {
    alignSelf: 'center',
    color: Colors.black,
    fontSize: PixelPerfect(30),
    fontFamily: Fonts.Medium,
    marginTop: 13,
    marginBottom: 33,
    textDecorationLine: 'underline',
  },
  sharedInputs: {
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  smallInput: {
    marginTop: 13,
    marginBottom: 7,
  },
  largeInput: {
    height: 100,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  otherProdsText: {
    color: Colors.black,
    fontSize: PixelPerfect(36),
    fontFamily: Fonts.SemiBold,
    marginBottom: 5,
    ...SharedStyles.textAlign,
  },
  flatListContent: {
    // paddingRight: I18nManager.isRTL ? 16 : 6,
    paddingVertical: 5,
    // paddingHorizontal: 16,
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
  },
  roundCheck: {
    marginVertical: 5,
    marginHorizontal: 16,
  },
  emptyText: {
    fontSize: PixelPerfect(30),
    color: Colors.medGray,
    fontFamily: Fonts.Medium,
    textAlign: 'center',
  },
  sharedSpace: {
    marginTop: 13,
  },
  buttonsCon: {
    position: 'absolute',
    top: Platform.OS === 'android' ? PixelPerfect(20) : PixelPerfect(30),
    left: PixelPerfect(30),
    zIndex: 1,
  },
  heartButton: {
    ...SharedStyles.centred,
    ...SharedStyles.shadow,
    height: 28,
    width: 28,
    borderRadius: 14,
    marginTop: 5,
  },
});
