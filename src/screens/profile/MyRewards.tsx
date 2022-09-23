import {t} from 'i18next';
import React, {useEffect, useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {axiosAPI} from '../../api/config';
import RewardCard from '../../components/cards/RewardCard';
import MainHeader from '../../components/headers/MainHeader';
import SafeView from '../../components/views/SafeView';
import {GetCookie} from '../../constants/helpers';
import {SharedStyles} from '../../styles/sharedStyles';
import Colors, {Fonts, PixelPerfect} from '../../styles/stylesConstants';

const MyRewards = () => {
  const [data, setData] = useState([]);

  const getRewards = async () => {
    const cookie = await GetCookie();
    const {data} = await axiosAPI.get(`/ocapi/account/reward&cookie=${cookie}`);
    setData(data);
  };

  console.log(data);

  useEffect(() => {
    getRewards();
  }, []);

  return (
    <SafeView style={{backgroundColor: Colors.darkWhite}}>
      <MainHeader title={t('rewardPoints')} />
      {/* <Button title="test get" onPress={() => getRewards()} /> */}
      <View style={styles.linearView}>
        <Text style={styles.rewardText}>{t('rewardPoints')}</Text>
        <Text style={styles.number}>{data?.total}</Text>
      </View>
      <FlatList
        data={data?.rewards}
        keyExtractor={item => item.order_id}
        renderItem={({item}) => (
          <RewardCard
            style={{marginTop: 10}}
            points={item.points}
            date={item.date_added}
            decription={
              item.description == '' ? t('notFound') : item.description
            }
          />
        )}
      />
    </SafeView>
  );
};

export default MyRewards;

const styles = StyleSheet.create({
  linearView: {
    ...SharedStyles.centred,
    paddingTop: 26,
    paddingBottom: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: Colors.black,
    overflow: 'hidden',
  },
  rewardText: {
    fontSize: PixelPerfect(32),
    fontFamily: Fonts.Medium,
    color: Colors.mainBack,
    marginBottom: 5,
  },
  number: {
    fontSize: PixelPerfect(60),
    fontFamily: Fonts.Medium,
    color: Colors.mainBack,
  },
});
