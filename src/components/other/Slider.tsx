import React, {FC, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  StyleProp,
  ViewStyle,
  ImageStyle,
  Pressable,
  Platform,
} from 'react-native';
import Colors, {PixelPerfect} from '../../styles/stylesConstants';

import Icon from 'react-native-vector-icons/Feather';
import {CompareIcon} from '../../assets/svg/icons';
import {
  addToFavorites,
  getSingleProduct,
  removeFromFavorites,
} from '../../store/actions/productsActions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {showMessage} from 'react-native-flash-message';
import {t} from 'i18next';
import {SharedStyles} from '../../styles/sharedStyles';

const phoneHeight = Dimensions.get('window').height;
const phoneWidth = Dimensions.get('window').width;

export interface SliderInter {
  bannerData?: any;
  bannerContainerStyle?: StyleProp<ViewStyle>;
  flatListStyle?: StyleProp<ViewStyle>;
  styleContainer?: StyleProp<ViewStyle>;
  dotStyle?: StyleProp<ViewStyle>;
  activeDotColor?: string;
  inActiveDotColor?: string;
  activeDotBorderColor?: string;
  inActiveDotBorderColor?: string;
  imageResizeMode?: any;
  imageStyle?: StyleProp<ImageStyle>;
  isURI?: boolean;
  isRTL?: boolean;
  wishList?: boolean;
  imageSource?: any;
  hasIconButtons?: boolean;
  keyExtractor?: any;
  selectedItem?: any;
  addToCompare: () => void;
  onImagePress: () => void;
  imageURL: any;
}

export const Slider: FC<SliderInter> = React.memo(
  ({
    bannerData,
    bannerContainerStyle,
    flatListStyle,
    dotStyle,
    activeDotColor,
    inActiveDotColor,
    activeDotBorderColor,
    inActiveDotBorderColor,
    imageResizeMode,
    imageStyle,
    isURI,
    styleContainer,
    hasIconButtons,
    isRTL,
    keyExtractor,
    wishList,
    selectedItem,
    addToCompare,
    imageURL,
    onImagePress,
  }) => {
    const indexRef: any = useRef();

    const dispatch = useDispatch();

    const [index, setIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [state, setState] = useState({
      fav: wishList,
      shared: false,
    });

    useEffect(() => {
      indexRef?.current?.scrollToIndex({animated: true, index});
    }, [index]);

    const theNext = (index: number) => {
      if (index < bannerData.length - 1) {
        setIndex(index + 1);
      }
    };

    useEffect(() => {
      const timeOut = setTimeout(() => {
        theNext(index);
        if (index === bannerData.length - 1) {
          setIndex(0);
        }
      }, 4000);

      return () => {
        if (timeOut) {
          clearTimeout(timeOut);
        }
      };
    });

    const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

    const onChange = (nativeEvent: any) => {
      if (nativeEvent) {
        const slide = Math.ceil(
          nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
        );
        if (slide !== selectedIndex) {
          setSelectedIndex(slide);
        }
      }
    };

    const {isSignedIn} = useSelector((state: RootState) => state.authReducer);

    const handleFavorite = () => {
      if (isSignedIn) {
        if (!wishList) {
          dispatch(addToFavorites(selectedItem.product_id));
          setState(old => ({...old, fav: true}));
          dispatch(getSingleProduct(selectedItem.product_id, false));
        } else {
          dispatch(removeFromFavorites(selectedItem.product_id));
          dispatch(getSingleProduct(selectedItem.product_id, false));
          setState(old => ({...old, fav: false}));
        }
      } else {
        showMessage({type: 'danger', message: t('mustBeLoggedIn')});
      }
    };

    return (
      <View style={[bannerContainerStyle]}>
        {hasIconButtons && (
          <View style={styles.buttonsCon}>
            <Pressable
              onPress={handleFavorite}
              style={[
                styles.heartButton,
                {
                  backgroundColor: state.fav ? Colors.red : Colors.mainBack,
                },
              ]}>
              <Icon
                name="heart"
                size={15}
                color={state.fav ? Colors.mainBack : '#888888'}
              />
            </Pressable>
            <Pressable
              onPress={addToCompare}
              style={[
                styles.heartButton,
                {backgroundColor: state.shared ? Colors.red : Colors.mainBack},
              ]}>
              <CompareIcon color={state.shared ? Colors.mainBack : '#888888'} />
            </Pressable>
          </View>
        )}
        <FlatList
          onScroll={({nativeEvent}) => {
            onChange(nativeEvent);
          }}
          ref={indexRef}
          style={[styles.scrollView, flatListStyle, {flexDirection: 'row'}]}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={bannerData}
          // keyExtractor={(item: any) => item.id.toString()}
          keyExtractor={keyExtractor}
          // onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          renderItem={({item}: any) => {
            return (
              <Pressable
                style={[
                  {
                    width: phoneWidth,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  styleContainer,
                ]}
                onPress={onImagePress}>
                <Image
                  style={[styles.image, imageStyle]}
                  resizeMode={imageResizeMode ? imageResizeMode : 'stretch'}
                  source={{
                    uri: decodeURI(imageURL ? item?.image : item?.popup),
                  }}
                />
              </Pressable>
            );
          }}
        />
        <View style={[styles.dotIcons, {flexDirection: 'row'}]}>
          {bannerData?.map((e: any, index: number) => (
            <View
              key={e.id}
              style={[
                {
                  backgroundColor:
                    selectedIndex === index ? activeDotColor : inActiveDotColor,
                  borderColor:
                    selectedIndex === index
                      ? activeDotBorderColor
                      : inActiveDotBorderColor,
                  height: 3,
                  marginHorizontal: 5,
                  marginTop: 10,
                  width: PixelPerfect(27),
                },
                dotStyle,
              ]}
            />
          ))}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  scrollView: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  image: {
    height: phoneHeight / 4,
    width: phoneWidth * 0.8,
    borderRadius: 15,
  },
  dotIcons: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 15,
  },
  buttonsCon: {
    position: 'absolute',
    top: Platform.OS === 'android' ? PixelPerfect(30) : PixelPerfect(40),
    left: PixelPerfect(32),
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

export default Slider;
