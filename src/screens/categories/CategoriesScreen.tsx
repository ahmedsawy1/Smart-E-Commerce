import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import SafeView from '../../components/views/SafeView';
import SearchHeader from '../../components/headers/SearchHeader';
import {t} from 'i18next';
import {FlatList} from 'react-native-gesture-handler';
import {
  phoneHeight,
  phoneWidth,
  PixelPerfect,
} from '../../styles/stylesConstants';
import CategoryCard from '../../components/cards/CategoryCard';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSingleCategory,
  getCategoriesLayout,
  searchProducts,
} from '../../store/actions/productsActions';
import {RootState} from '../../store/store';
import Loader from '../../components/other/Loader';
import {showMessage} from 'react-native-flash-message';
import {SharedStyles} from '../../styles/sharedStyles';

const CategoriesScreen = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesLayout());
  }, []);
  const {categories, loader, allData} = useSelector(
    (state: RootState) => state.productsReducer,
  );

  // const [search, setSearch] = useState(allData.search);
  const [search, setSearch] = useState('');

  useFocusEffect(
    useCallback(() => {
      return () => setSearch('');
    }, []),
  );

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
        placeholder={t('searchFor')}
        value={search}
        onChangeText={text => setSearch(text)}
        onSearchPress={handleSearch}
      />
      {!categories && loader ? (
        <Loader />
      ) : (
        <FlatList
          columnWrapperStyle={styles.row}
          numColumns={2}
          contentContainerStyle={{
            width: phoneWidth,
            paddingBottom: phoneHeight / 4,
            paddingHorizontal: 16,
            marginTop: PixelPerfect(30),
          }}
          data={categories}
          keyExtractor={item => item.category_id}
          renderItem={({item}) => (
            <CategoryCard
              onPress={() => {
                dispatch(getSingleCategory(item.category_id));
                navigation.navigate('CatgeoryOverview', item);
              }}
              title={item.name}
              image={item.thumb}
              styleTitle={{
                fontSize: PixelPerfect(30),
              }}
              style={{
                height: PixelPerfect(400),
                marginTop: 10,
                width: '48.5%',
                marginBottom: PixelPerfect(20),
              }}
              styleImageCon={{
                ...SharedStyles.centred,
              }}
              styleImage={{
                width: '80%',
                height: '80%',
              }}
            />
          )}
        />
      )}
    </SafeView>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
