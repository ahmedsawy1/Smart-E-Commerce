import React, {useEffect} from 'react';
import {t} from 'i18next';
import {StyleSheet, FlatList, Button} from 'react-native';
import SafeView from '../../components/views/SafeView';
import ProductCard from '../../components/cards/ProductCard';
import MainHeader from '../../components/headers/MainHeader';
import {
  phoneHeight,
  phoneWidth,
  PixelPerfect,
} from '../../styles/stylesConstants';
import {getFavorites} from '../../store/actions/productsActions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';

const FavoriteScreen = () => {
  // const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.addListener('blur', () => {
  //     navigation.dispatch(
  //       CommonActions.reset({
  //         routes: [{name: 'CategoriesScreen'}],
  //       }),
  //     );
  //   });
  // }, []);

  const {favorites} = useSelector((state: RootState) => state.productsReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFavorites());
  }, []);

  console.log('favorites');
  console.log(favorites);

  return (
    <SafeView>
      <MainHeader title={t('WishList')} />

      <FlatList
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between', flex: 1}}
        contentContainerStyle={{
          width: phoneWidth,
          paddingBottom: phoneHeight / 4,
          paddingHorizontal: 10,
        }}
        data={favorites}
        keyExtractor={item => item.product_id}
        renderItem={({item}) => (
          <ProductCard
            otherFunction={() => dispatch(getFavorites())}
            wishlist={true}
            imageURL={item.thumb}
            title={item.name}
            selectedItem={item.product_id}
            price={item.price}
            style={{marginTop: 10, width: '48%'}}
            styleImageCont={{height: PixelPerfect(310)}}
          />
        )}
      />
    </SafeView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({});
