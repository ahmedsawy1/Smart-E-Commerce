import {FlatList, I18nManager, StyleSheet} from 'react-native';
import React, {FC, useState} from 'react';
import ProductCard from '../../components/cards/ProductCard';
import SectionTitle from '../../components/other/SectionTitle';
import {PixelPerfect} from '../../styles/stylesConstants';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  emptyOptions,
  getMoreProducts,
  getProductReviews,
  getSingleProduct,
} from '../../store/actions/productsActions';

interface IProductsSection {
  data: [];
  code?: string;
  title: string;
  onPress?: () => void;
}

const ProductsSection: FC<IProductsSection> = React.memo(
  ({data, title, code}) => {
    const navigation: any = useNavigation();
    const dispatch = useDispatch();

    const [dataState, setDataState] = useState(data);

    const handleSwitch = (prodID: any, boool: boolean) => {
      const newProds = dataState?.map((item: any) =>
        item.product_id == prodID ? {...item, wishlist: !boool} : item,
      );
      setDataState(newProds);
    };

    return (
      <>
        <SectionTitle
          hasMoreBtn
          title={title}
          style={styles.sectionTitle}
          onPress={() => {
            dispatch(getMoreProducts(code));
            navigation.navigate('ShowMore', {title, code});
          }}
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          horizontal
          data={dataState}
          keyExtractor={(item: any) => item.product_id}
          renderItem={({item}) => (
            <ProductCard
              selectedItem={item.product_id}
              wishlist={item.wishlist}
              navItem={item}
              otherFunction={() => handleSwitch(item.product_id, item.wishlist)}
              onPress={() => {
                dispatch(getSingleProduct(item.product_id, true));
                dispatch(emptyOptions());
                dispatch(getProductReviews(item.product_id));
                navigation.navigate('ProductOverview', item);
              }}
              title={item.name}
              imageURL={item.thumb}
              price={item.price}
              style={styles.sharedProdStyle}
            />
          )}
        />
      </>
    );
  },
);

export default ProductsSection;

const styles = StyleSheet.create({
  flatListContent: {
    paddingRight: I18nManager.isRTL ? 16 : 6,
    paddingVertical: 5,
    paddingHorizontal: 16,
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
  },
  sharedProdStyle: {
    marginRight: 10,
  },
  sectionTitle: {
    marginTop: PixelPerfect(50),
    paddingHorizontal: 16,
  },
});
