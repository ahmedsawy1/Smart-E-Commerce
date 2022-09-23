import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {t} from 'i18next';
import {SharedStyles} from '../../styles/sharedStyles';
import Colors, {Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {ChevronDown, FilterIcon, SortIcon} from '../../assets/svg/icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootState} from '../../store/store';
import {useSelector} from 'react-redux';

interface IFiltersCon {
  onFilterPress: () => void;
  onSortPress: () => void;
  hasFilter: boolean;
}
const FiltersCon: FC<IFiltersCon> = ({
  onFilterPress,
  hasFilter = false,
  onSortPress,
}) => {
  const {compareProds} = useSelector(
    (state: RootState) => state.productsReducer,
  );

  const {categoriesAllData} = useSelector(
    (state: RootState) => state.productsReducer,
  );
  console.log(categoriesAllData?.text_compare);

  return (
    <View style={styles.con}>
      {hasFilter && (
        <Pressable style={styles.filterCon} onPress={onFilterPress}>
          <FilterIcon />
          <Text style={styles.textShared}>{t('searchFilters')}</Text>
          <ChevronDown />
        </Pressable>
      )}

      <Pressable
        style={[
          styles.sortCon,
          !hasFilter && {
            justifyContent: 'flex-start',
          },
        ]}
        onPress={onSortPress}>
        <Icon name="sort-variant" size={18} color={Colors.medGray} />
        <Text style={styles.textShared}>{t('sortBy')}</Text>
        <ChevronDown />
      </Pressable>
      <View style={styles.compareCon}>
        {/* <Text style={styles.textShared}>{t('productsCompare')}</Text> */}
        <Text style={styles.compareNum}>{categoriesAllData?.text_compare}</Text>
      </View>
    </View>
  );
};

export default FiltersCon;

const styles = StyleSheet.create({
  con: {
    backgroundColor: '#E6E6E6',
    paddingVertical: 11,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  filterCon: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sortCon: {
    flexDirection: 'row',
    flex: 1,
    ...SharedStyles.centred,
  },
  compareCon: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  textShared: {
    color: Colors.medGray,
    fontSize: PixelPerfect(28),
    fontFamily: Fonts.Medium,
    marginHorizontal: 5,
  },
  compareNum: {
    color: Colors.medGray,
    fontSize: PixelPerfect(28),
    fontFamily: Fonts.Medium,
  },
});
