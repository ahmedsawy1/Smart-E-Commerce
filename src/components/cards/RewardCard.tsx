import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import Colors from '../../styles/stylesConstants';
import TitleText from '../texts/TitleText';
import {t} from 'i18next';

interface IRewardCard {
  style?: StyleProp<ViewStyle>;
  points: number;
  date: string;
  decription: string;
}

const RewardCard: FC<IRewardCard> = ({style, points, date, decription}) => {
  return (
    <View style={[styles.con, style]}>
      <View style={{flexDirection: 'row'}}>
        <TitleText title={t('points')} subTitle={points} />
        <TitleText title={t('addedDate')} subTitle={date} />
      </View>
      <TitleText
        style={{marginTop: 11}}
        title={t('decription')}
        subTitle={decription}
      />
    </View>
  );
};

export default RewardCard;

const styles = StyleSheet.create({
  con: {
    backgroundColor: Colors.mainBack,
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 20,
  },
});
