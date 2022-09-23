import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import Colors, {
  ColorWithOpacity,
  Fonts,
  PixelPerfect,
} from '../../styles/stylesConstants';
import ProductCard from '../../components/cards/ProductCard';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {
  emptyOptions,
  getComparePage,
  getProductReviews,
  getSingleProduct,
} from '../../store/actions/productsActions';
import {useNavigation} from '@react-navigation/native';

const Compare = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const {compareProds} = useSelector(
    (state: RootState) => state.productsReducer,
  );

  useEffect(() => {
    dispatch(getComparePage());
  }, []);

  const [data, setData] = useState(compareProds);

  const handleSwitch = (prodID: any, wishlist: boolean) => {
    const newProds = data?.map((item: any) =>
      item.product_id == prodID ? {...item, wishlist: !wishlist} : item,
    );
    setData(newProds);
  };

  return (
    <SafeView style={styles.container}>
      <MainHeader title={t('productsCompare')} />

      <FlatList
        style={{flex: 1}}
        horizontal
        contentContainerStyle={styles.flatListContent}
        data={data}
        keyExtractor={item => item.product_id}
        renderItem={({item}) => (
          <View style={styles.column}>
            <ProductCard
              onPress={() => {
                dispatch(getSingleProduct(item.product_id, true));
                dispatch(emptyOptions());
                dispatch(getProductReviews(item.product_id));
                navigation.navigate('ProductOverview', item);
              }}
              wishlist={item.wishlist}
              selectedItem={item.product_id}
              otherFunction={() => handleSwitch(item.product_id, item.wishlist)}
              title={item.name}
              imageURL={item.thumb}
              price={item.price}
              style={styles.card}
            />
            <Text style={styles.mainTitle}>{t('Brand')}</Text>
            <Text style={styles.subTitle}>{item.model}</Text>
            <Text style={styles.mainTitle}>{t('status')}</Text>
            <Text style={styles.subTitle}>{item.availability}</Text>
            {/* <Text style={styles.mainTitle}>{t('Section')}</Text>
            <Text style={styles.subTitle}>بخور</Text>
            <Text style={styles.mainTitle}>SKU</Text>
            <Text style={styles.subTitle}>0590458902809</Text> */}
          </View>
        )}
      />
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mainTitle: {
    fontFamily: Fonts.Bold,
    fontSize: PixelPerfect(29),
    color: ColorWithOpacity(Colors.black, 0.5),
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  subTitle: {
    fontFamily: Fonts.Medium,
    fontSize: PixelPerfect(24),
    color: Colors.medGray,
    alignSelf: 'flex-start',
  },
  card: {
    // ...SharedStyles.shadow,
    height: PixelPerfect(420),
  },
  flatListContent: {
    paddingHorizontal: PixelPerfect(28),
  },
  column: {
    margin: 5,
  },
});

export default Compare;
