import {
  FlatList,
  I18nManager,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import Colors, {Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import CheckBoxRound from './CheckBoxRound';
import {useDispatch} from 'react-redux';
import {saveFilters} from '../../store/actions/productsActions';

interface ISelector {
  title: string;
  onPress: () => void;
  choices: [];
  subTitle?: string;
}

const Selector: FC<ISelector> = ({title, onPress, choices, subTitle}) => {
  const [selected, setSelected]: any = useState([]);
  const dispatch = useDispatch();

  return (
    <Pressable style={styles.con} onPress={onPress}>
      <View style={styles.titleCon}>
        <Text style={styles.title}>{title}</Text>

        {subTitle ? (
          <Text style={styles.subTitle}>{subTitle}</Text>
        ) : (
          <FlatList
            style={{
              width: '100%',
              paddingTop: 10,
            }}
            data={choices}
            keyExtractor={(item: any) => item.filter_id}
            renderItem={({item}) => (
              <CheckBoxRound
                style={{marginVertical: 1}}
                title={item?.name}
                onPress={() => {
                  if (!selected.includes(item.filter_id)) {
                    selected.push(item.filter_id);
                    setSelected([...selected]);
                    console.log(selected);
                    dispatch(saveFilters(selected));
                  } else if (selected.includes(item.filter_id)) {
                    setSelected(
                      selected.filter((_item: any) => _item != item.filter_id),
                    );
                    dispatch(saveFilters(selected));
                  }
                }}
                checked={selected.includes(item.filter_id)}
              />
            )}
          />
        )}
      </View>
      <View style={styles.arrowCon}>
        <Icon name={'down'} size={PixelPerfect(28)} color={'#B7B7B7'} />
      </View>
    </Pressable>
  );
};

export default Selector;

const styles = StyleSheet.create({
  con: {
    flexDirection: 'row',
    width: '100%',
    paddingBottom: 12,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.lightGray,
    paddingHorizontal: 13,
    marginBottom: 10,
  },
  titleCon: {
    flex: 10,
    alignItems: 'flex-start',
  },
  arrowCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: PixelPerfect(35),
    fontFamily: Fonts.SemiBold,
    color: Colors.black,
    ...SharedStyles.textAlign,
  },
  subTitle: {
    fontSize: PixelPerfect(30),
    fontFamily: Fonts.Light,
    color: Colors.medGray,
    ...SharedStyles.textAlign,
  },
});
