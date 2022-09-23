import {Pressable, StyleSheet, Text, FlatList, View} from 'react-native';
import React, {useState} from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {SearchIcon, XIcon} from '../../assets/svg/icons';
import Colors, {Fonts, PixelPerfect} from '../../styles/stylesConstants';
import FiltersCon from '../../components/touchables/FiltersCon';
import {phoneHeight, phoneWidth} from '../../styles/stylesConstants';
import ProductCard from '../../components/cards/ProductCard';
import {useNavigation, useRoute} from '@react-navigation/native';
import FilterModal from '../../components/views/FilterModal';
import {t} from 'i18next';
import PopUp from '../../components/views/PopUp';
import CheckBoxRound from '../../components/touchables/CheckBoxRound';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import Loader from '../../components/other/Loader';
import {
  emptyOptions,
  fetchSingleCategoryByFilter,
  getProductReviews,
  getSecondaryCategory,
  getSingleCategory,
  getSingleProduct,
  loadCategoryNextPage,
  sortSingleCategory,
} from '../../store/actions/productsActions';
import Selector from '../../components/touchables/Selector';

const CatgeoryOverview = () => {
  const {categoryProducts, loader, categoriesAllData, filtersData} =
    useSelector((state: RootState) => state.productsReducer);
  console.log(categoryProducts);

  const {params}: any = useRoute();

  const [selectedCatg, setSelectedCatg] = useState(params.category_id);
  const [visible, setVisible] = useState({
    filter: false,
    sort: false,
  });
  const navigation: any = useNavigation();

  const dispatch = useDispatch();
  const [check, setCheck] = useState(1);

  const handleSort = (checkNum: number, sortType: string, sortVal: string) => {
    dispatch(sortSingleCategory(params.category_id, sortType, sortVal));
    setCheck(checkNum);
    setVisible(old => ({...old, sort: false}));
  };

  const filtersArr = categoriesAllData?.filter_groups;

  const onEndReached = () => {
    let pageNum = parseInt(categoriesAllData?.pagination?.page) + 1;
    dispatch(loadCategoryNextPage(params.category_id, pageNum));
  };

  return (
    <SafeView>
      <MainHeader
        title={params.name}
        onOtherIconPress={() => navigation.navigate('SearchScreen')}
        otherIcon={<SearchIcon color={Colors.lightGray} />}
      />

      {loader ? (
        <Loader />
      ) : (
        <View>
          <View style={styles.catgegoryCon}>
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: 16,
                justifyContent: 'flex-start',
                // width: '100%',
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categoriesAllData?.categories}
              keyExtractor={(item: any) => item.category_id}
              renderItem={({item}) => (
                <Pressable
                  onPress={() => {
                    setSelectedCatg(item.category_id);
                    dispatch(getSecondaryCategory(item.category_id, true));
                  }}
                  style={[
                    styles.catgItem,
                    {
                      backgroundColor:
                        selectedCatg == item.category_id
                          ? Colors.black
                          : Colors.mainBack,
                      borderColor:
                        selectedCatg == item.category_id
                          ? Colors.black
                          : '#E1E1E1',
                      borderWidth: selectedCatg == item.category_id ? 0 : 1.5,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.catgTitle,
                      {
                        color:
                          selectedCatg == item.category_id
                            ? Colors.mainBack
                            : Colors.medGray,
                      },
                    ]}>
                    {item.name}
                  </Text>
                </Pressable>
              )}
            />
          </View>

          <FiltersCon
            hasFilter={filtersArr?.length == 0 ? false : true}
            onFilterPress={() => setVisible(old => ({...old, filter: true}))}
            onSortPress={() => setVisible(old => ({...old, sort: true}))}
          />
          <FilterModal
            visible={visible.filter}
            onClose={() => setVisible(old => ({...old, filter: false}))}
            onRequestClose={() => setVisible(old => ({...old, filter: false}))}
            onFilterPress={() => {
              console.log(filtersData);

              dispatch(fetchSingleCategoryByFilter(82, filtersData));
            }}>
            {filtersArr?.map((item: any, index: number) => (
              <Selector
                key={index}
                title={item.name}
                choices={item.filter}
                onPress={() => {
                  console.log(item.filter);
                }}
              />
            ))}
          </FilterModal>

          <FlatList
            ListEmptyComponent={
              <View style={styles.noProdsCon}>
                <Text
                  style={{
                    fontFamily: Fonts.Regular,
                  }}>
                  {categoriesAllData?.text_empty}
                </Text>
              </View>
            }
            onEndReached={onEndReached}
            onEndReachedThreshold={0.01}
            initialNumToRender={10}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            contentContainerStyle={{
              // alignItems: 'center',
              width: phoneWidth,
              paddingBottom: phoneHeight / 2,
              paddingHorizontal: 16,
              paddingTop: PixelPerfect(20),
            }}
            data={categoryProducts}
            keyExtractor={item => item.product_id}
            renderItem={({item}) => (
              <ProductCard
                selectedItem={item.product_id}
                wishlist={item.wishlist}
                navItem={item}
                otherFunction={() => {
                  if (selectedCatg == params.category_id) {
                    dispatch(getSingleCategory(params.category_id, true));
                  } else {
                    dispatch(getSecondaryCategory(selectedCatg, true));
                  }
                }}
                onPress={() => {
                  dispatch(getSingleProduct(item.product_id, true));
                  dispatch(emptyOptions());
                  dispatch(getProductReviews(item.product_id));
                  navigation.navigate('ProductOverview', item);
                }}
                title={item.name}
                imageURL={item.thumb}
                price={item.price}
                style={styles.productCard}
                styleImageCont={{height: PixelPerfect(310)}}
              />
            )}
          />
        </View>
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

export default CatgeoryOverview;

const styles = StyleSheet.create({
  catgegoryCon: {
    paddingVertical: 12,
  },
  catgItem: {
    paddingVertical: 7,
    paddingHorizontal: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 6,
  },
  catgTitle: {
    fontSize: PixelPerfect(25),
    fontFamily: Fonts.Regular,
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
  roundCheck: {
    marginVertical: 5,
  },
  productCard: {
    width: '48%',
    marginTop: 10,
  },
  emptyText: {
    fontSize: PixelPerfect(30),
    color: Colors.medGray,
    fontFamily: Fonts.Medium,
    marginVertical: 13,
    marginHorizontal: 16,
    textAlign: 'center',
  },
  noProdsCon: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '20%',
    marginBottom: 20,
  },
});
