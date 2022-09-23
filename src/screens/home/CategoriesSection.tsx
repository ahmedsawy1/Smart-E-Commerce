import {FlatList, StyleSheet, Text} from 'react-native';
import React, {FC} from 'react';
import Colors, {
  Fonts,
  phoneWidth,
  PixelPerfect,
} from '../../styles/stylesConstants';
import CategoryCard from '../../components/cards/CategoryCard';
import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import {getSingleCategory} from '../../store/actions/productsActions';
import {useDispatch} from 'react-redux';
import {SharedStyles} from '../../styles/sharedStyles';

interface ICategoriesSection {
  data: [];
  code?: string;
}

const CategoriesSection: FC<ICategoriesSection> = React.memo(({data, code}) => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  return (
    <FlatList
      ListEmptyComponent={
        <Text style={styles.noCatgText}>{t('noCategories')}</Text>
      }
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
      style={{width: phoneWidth}}
      horizontal
      data={data}
      keyExtractor={(item: any) => item.category_id}
      renderItem={({item}: any) => (
        <CategoryCard
          title={item.name}
          image={item.thumb}
          style={styles.sharedProdStyle}
          styleImageCon={{
            overflow: 'hidden',
            height: PixelPerfect(200),
            width: PixelPerfect(200),
            ...SharedStyles.centred,
          }}
          styleImage={{
            height: PixelPerfect(150),
            width: PixelPerfect(150),
          }}
          onPress={() => {
            dispatch(getSingleCategory(item.category_id));
            navigation.navigate('CatgeoryOverview', item);
          }}
        />
      )}
    />
  );
});

export default CategoriesSection;

const styles = StyleSheet.create({
  sharedProdStyle: {
    marginRight: 10,
    alignItems: 'center',
  },
  noCatgText: {
    fontSize: PixelPerfect(30),
    color: Colors.medGray,
    fontFamily: Fonts.Medium,
    marginVertical: 13,
    marginHorizontal: 16,
    textAlign: 'center',
  },
});
