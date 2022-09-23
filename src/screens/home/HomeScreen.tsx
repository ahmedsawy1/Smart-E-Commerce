import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  I18nManager,
  Image,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import SafeView from '../../components/views/SafeView';
import SearchHeader from '../../components/headers/SearchHeader';
import {t} from 'i18next';
import Slider from '../../components/other/Slider';
import Colors, {
  Fonts,
  phoneHeight,
  phoneWidth,
  PixelPerfect,
} from '../../styles/stylesConstants';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {searchProducts} from '../../store/actions/productsActions';
import {RootState} from '../../store/store';
import ProductsSection from './ProductsSection';
import CategoriesSection from './CategoriesSection';
import {showMessage} from 'react-native-flash-message';

const HomeScreen = React.memo(() => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const {layoutData, loader} = useSelector(
    (state: RootState) => state.productsReducer,
  );

  useFocusEffect(
    useCallback(() => {
      return () => setSearch('');
    }, []),
  );

  const praseModule = (module: any) => {
    let banners = module?.data?.banners;
    if (module.code === 'slideshow' && banners.length != 0) {
      return (
        <Slider
          key={module.code}
          isRTL={I18nManager.isRTL ? true : false}
          isURI
          keyExtractor={(item: any) => item.image}
          bannerData={banners}
          imageResizeMode="cover"
          imageURL={true}
          styleContainer={{paddingHorizontal: 16}}
          dotStyle={styles.sliderDotsStyle}
          imageStyle={styles.sliderImageStyle}
          bannerContainerStyle={styles.sliderCon}
          flatListStyle={{width: phoneWidth}}
          activeDotColor={Colors.black}
          inActiveDotColor={Colors.lightGray}
        />
      );
    }
    if (module.code === 'category') {
      let cateogries = module.data.categories;
      return <CategoriesSection key={module.code} data={cateogries} />;
    }
    if (
      (module.code === 'latest' && module.data !== null) ||
      (module.code === 'special' && module.data !== null) ||
      (module.code === 'featured' && module.data !== null) ||
      (module.code === 'mostviewed' && module.data !== null) ||
      (module.code === 'products_by_category' && module.data !== null) ||
      (module.code === 'bestseller' && module.data !== null)
    ) {
      let products = module.data.products;
      let heading_title = module.data.heading_title;
      return (
        <ProductsSection
          key={module.code}
          data={products}
          title={heading_title}
          code={module.code}
        />
      );
    }
    if (module.code === 'banner') {
      if (module.data.banners.length == 0) {
        return;
      }
      let image = module.data.banners[0].image;
      return (
        <View style={styles.bannerCon} key={module.code}>
          <Image
            source={{uri: decodeURI(image)}}
            style={[styles.banner]}
            resizeMode="cover"
          />
        </View>
      );
    }
  };

  const RenderHomeScreen = () => {
    let topContentModules = layoutData?.content_top?.modules;
    let bottomContentModules = layoutData?.content_bottom?.modules;

    let topElements = topContentModules?.map((e: any) => praseModule(e));
    let bottomElements = bottomContentModules?.map((e: any) => praseModule(e));
    return [].concat(topElements, bottomElements);
  };

  const handleSearch = () => {
    if (search == '') {
      showMessage({
        type: 'danger',
        message: t('typeSomthing'),
      });
    } else {
      navigation.navigate('SearchScreen', {searchKeyword: search});
      dispatch(searchProducts(search));
    }
  };

  return (
    <SafeView>
      <SearchHeader
        value={search}
        onChangeText={text => setSearch(text)}
        placeholder={t('searchFor')}
        onSearchPress={handleSearch}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: phoneHeight / 6}}>
        <RenderHomeScreen />

        <View style={styles.centerView}>
          <Text style={styles.rightsText}>{t('rights')}</Text>
        </View>
      </ScrollView>
    </SafeView>
  );
});

export default HomeScreen;

const styles = StyleSheet.create({
  centerView: {
    alignItems: 'center',
  },
  rightsText: {
    color: '#979797',
    marginVertical: 30,
    fontFamily: Fonts.Regular,
    fontSize: PixelPerfect(30),
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
  bannerCon: {
    width: '100%',
    height: PixelPerfect(380),
    paddingHorizontal: 16,
    marginTop: PixelPerfect(40),
  },
  banner: {
    width: '100%',
    height: '100%',
  },
});
