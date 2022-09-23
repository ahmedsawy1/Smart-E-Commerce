import {Pressable, StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useState} from 'react';
import SafeView from '../../components/views/SafeView';
import {XIcon} from '../../assets/svg/icons';
import Colors, {Fonts, PixelPerfect} from '../../styles/stylesConstants';
import FiltersCon from '../../components/touchables/FiltersCon';
import {phoneHeight, phoneWidth} from '../../styles/stylesConstants';
import ProductCard from '../../components/cards/ProductCard';
import SearchHeader from '../../components/headers/SearchHeader';
import {t} from 'i18next';
import {SharedStyles} from '../../styles/sharedStyles';
import {useNavigation, useRoute} from '@react-navigation/native';
import FilterModal from '../../components/views/FilterModal';
import CheckBoxRound from '../../components/touchables/CheckBoxRound';
import PopUp from '../../components/views/PopUp';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {
  emptyOptions,
  getProductReviews,
  getSingleProduct,
  searchProducts,
  searchResultsNextPage,
  sortSearchedProducts,
} from '../../store/actions/productsActions';
import Loader from '../../components/other/Loader';
import {showMessage} from 'react-native-flash-message';

const SearchScreen = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const {searchedProducts, allData, loader} = useSelector(
    (state: RootState) => state.productsReducer,
  );

  const {params} = useRoute();

  const searchKeyword =
    params?.searchKeyword == undefined ? allData.search : params?.searchKeyword;

  const [check, setCheck] = useState(1);
  const [getSearch, setSearch] = useState(searchKeyword);
  const [visible, setVisible] = useState({
    filter: false,
    sort: false,
  });

  const handleSort = (checkNum: number, sortType: string, sortVal: string) => {
    dispatch(sortSearchedProducts(sortType, sortVal));
    setCheck(checkNum);
    setVisible(old => ({...old, sort: false}));
  };

  const onEndReached = () => {
    let pageNum = parseInt(allData?.pagination?.page) + 1;

    dispatch(searchResultsNextPage(allData.search, pageNum));
  };

  console.log('PARAM');
  console.log(allData.search);

  const handleSearch = () => {
    if (getSearch == '') {
      showMessage({
        type: 'danger',
        message: t('typeSomthing'),
      });
    } else {
      dispatch(searchProducts(getSearch));
    }
  };

  return (
    <SafeView>
      <SearchHeader
        value={getSearch}
        onChangeText={text => setSearch(text)}
        onSearchPress={handleSearch}
        placeholder={t('searchFor')}
        endIcon
        onMicPress={() => navigation.navigate('VoiceSearch')}
      />

      <FiltersCon
        onFilterPress={() => setVisible(old => ({...old, filter: true}))}
        onSortPress={() => setVisible(old => ({...old, sort: true}))}
      />

      <FilterModal
        onFilterPress={() => setVisible(old => ({...old, filter: false}))}
        visible={visible.filter}
        onClose={() => setVisible(old => ({...old, filter: false}))}
        onRequestClose={() => setVisible(old => ({...old, filter: false}))}
      />
      {loader || allData.search == undefined ? null : (
        <Text style={styles.resultText}>
          {t('display')} {allData?.pagination?.total} {t('resultsSearchFor')}
          {allData.search}
        </Text>
      )}

      {loader ? (
        <Loader />
      ) : (
        <FlatList
          ListEmptyComponent={
            <Text style={[styles.resultText, {textAlign: 'center'}]}>
              {allData.search == undefined ? t('typeSomthing') : t('noResult')}
            </Text>
          }
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between', flex: 1}}
          contentContainerStyle={{
            width: phoneWidth,
            paddingBottom: phoneHeight / 4,
            paddingHorizontal: 16,
          }}
          data={searchedProducts}
          keyExtractor={item => item.product_id}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.01}
          initialNumToRender={10}
          renderItem={({item}) => (
            <ProductCard
              selectedItem={item.product_id}
              onPress={() => {
                dispatch(getSingleProduct(item.product_id, true));
                dispatch(emptyOptions());
                dispatch(getProductReviews(item.product_id));
                navigation.navigate('ProductOverview', item);
              }}
              otherFunction={() => {
                dispatch(searchProducts(getSearch));
              }}
              wishlist={item.wishlist}
              title={item.name}
              imageURL={item.thumb}
              price={item.price}
              style={{
                marginTop: 10,
                width: '48%',
              }}
            />
          )}
        />
      )}
      {
        <PopUp
          visible={visible.sort}
          onRequestClose={() => setVisible(old => ({...old, sort: false}))}>
          <View style={styles.titleCon}>
            <View style={{flex: 1, alignItems: 'flex-start', height: 30}}>
              <Text style={styles.title}>{t('SortBy')}</Text>
            </View>
            <Pressable
              style={{padding: 10}}
              onPress={() => setVisible(old => ({...old, sort: false}))}>
              <XIcon />
            </Pressable>
          </View>

          <View style={{paddingHorizontal: 24, marginTop: 14}}>
            <CheckBoxRound
              onPress={() => handleSort(1, 'sort_order', 'ASC')}
              checked={check == 1 ? true : false}
              title={t('default')}
              style={styles.roundCheck}
            />
            <CheckBoxRound
              onPress={() => handleSort(2, 'name', 'ASC')}
              checked={check == 2 ? true : false}
              title={t('nameAToZ')}
              style={styles.roundCheck}
            />
            <CheckBoxRound
              onPress={() => handleSort(3, 'name', 'DESC')}
              checked={check == 3 ? true : false}
              title={t('nameZToA')}
              style={styles.roundCheck}
            />
            <CheckBoxRound
              onPress={() => handleSort(4, 'price', 'ASC')}
              checked={check == 4 ? true : false}
              title={t('priceLow')}
              style={styles.roundCheck}
            />
            <CheckBoxRound
              onPress={() => handleSort(5, 'price', 'DESC')}
              checked={check == 5 ? true : false}
              title={t('priceHight')}
              style={styles.roundCheck}
            />
            <CheckBoxRound
              onPress={() => handleSort(6, 'rating', 'ASC')}
              checked={check == 6 ? true : false}
              title={t('hightRate')}
              style={styles.roundCheck}
            />
            <CheckBoxRound
              onPress={() => handleSort(7, 'rating', 'DESC')}
              checked={check == 7 ? true : false}
              title={t('lowRate')}
              style={styles.roundCheck}
            />
            <CheckBoxRound
              onPress={() => handleSort(8, 'model', 'ASC')}
              checked={check == 8 ? true : false}
              title={t('typeAToZ')}
              style={styles.roundCheck}
            />
            <CheckBoxRound
              onPress={() => handleSort(9, 'model', 'DESC')}
              checked={check == 9 ? true : false}
              title={t('typeZToA')}
              style={styles.roundCheck}
            />
          </View>
        </PopUp>
      }
    </SafeView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  resultText: {
    fontSize: PixelPerfect(30),
    color: Colors.medGray,
    fontFamily: Fonts.Regular,
    marginVertical: 13,
    marginHorizontal: 16,
    ...SharedStyles.textAlign,
  },
  roundCheck: {
    marginVertical: 5,
  },
  titleCon: {
    paddingRight: 14,
    paddingLeft: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontFamily: Fonts.SemiBold,
    fontSize: PixelPerfect(45),
    color: Colors.black,
  },
});
