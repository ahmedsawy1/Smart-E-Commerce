import React from 'react';
import {StyleSheet, FlatList, Button} from 'react-native';
import SafeView from '../../components/views/SafeView';
import ProductCard from '../../components/cards/ProductCard';
import MainHeader from '../../components/headers/MainHeader';
import {
  phoneHeight,
  phoneWidth,
  PixelPerfect,
} from '../../styles/stylesConstants';
import {
  emptyOptions,
  getMoreProducts,
  getProductReviews,
  getSingleProduct,
  loadMoreProductsNextPage,
} from '../../store/actions/productsActions';
import {RootState} from '../../store/store';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const ShowMore = () => {
  const {params}: any = useRoute();
  const {moreProds, moreProdsData} = useSelector(
    (state: RootState) => state.productsReducer,
  );
  const dispatch = useDispatch();

  const onEndReached = () => {
    let pageNum = parseInt(moreProdsData?.pagination?.page) + 1;
    dispatch(loadMoreProductsNextPage(params.code, pageNum));
  };

  const navigation: any = useNavigation();

  // console.log('================moreProds====================');
  // console.log(JSON.stringify(moreProds, null, 3));
  // console.log(moreProds[moreProds.length - 1].thumb);
  // console.log('====================================');

  return (
    <SafeView>
      <MainHeader title={params.title} />
      <FlatList
        onEndReached={onEndReached}
        onEndReachedThreshold={0.01}
        initialNumToRender={10}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between', flex: 1}}
        contentContainerStyle={{
          width: phoneWidth,
          paddingBottom: phoneHeight / 4,
          paddingHorizontal: 16,
        }}
        data={moreProds}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <ProductCard
            onPress={() => {
              dispatch(getSingleProduct(item.product_id, true));
              dispatch(emptyOptions());
              dispatch(getProductReviews(item.product_id));
              navigation.navigate('ProductOverview', item);
            }}
            otherFunction={() => dispatch(getMoreProducts(params.code))}
            wishlist={item.wishlist}
            selectedItem={item.product_id}
            imageURL={item.thumb}
            title={item.name}
            price={item.price}
            style={{marginTop: 10, width: '48%'}}
            styleImageCont={{height: PixelPerfect(310)}}
          />
        )}
      />
    </SafeView>
  );
};

export default ShowMore;

const styles = StyleSheet.create({});
