import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import Order from '../../components/cart/Order';
import Colors, {Fonts, phoneHeight} from '../../styles/stylesConstants';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getMyReturns} from '../../store/actions/accountActions';
import {RootState} from '../../store/store';

const ReturnsScreen = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const {returnsData} = useSelector((state: RootState) => state.accountReducer);

  useEffect(() => {
    dispatch(getMyReturns());
  }, []);

  return (
    <SafeView style={styles.con}>
      <MainHeader title={t('ReturnRequests')} />

      {returnsData?.returns == undefined || [] ? (
        <View style={styles.noOrdersCon}>
          <Text
            style={{
              fontFamily: Fonts.Regular,
            }}>
            {t('No Orders')}
          </Text>
        </View>
      ) : (
        // <Text onPress={() => dispatch(getMyReturns())}>Please try Again</Text>
        <FlatList
          contentContainerStyle={{paddingBottom: phoneHeight / 10}}
          data={returnsData.returns}
          keyExtractor={item => item.return_id}
          renderItem={({item}) => (
            <Order
              isReturn
              returnNumber={item.return_id}
              noStatus
              style={{marginTop: 10}}
              orderNum={`# ${item.order_id}`}
              orderDate={item.date_added}
              status={item.status}
              onPress={() => navigation.navigate('ReturnOverview', item)}
            />
          )}
        />
      )}
    </SafeView>
  );
};

export default ReturnsScreen;

const styles = StyleSheet.create({
  con: {
    backgroundColor: Colors.darkWhite,
  },
  noOrdersCon: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '20%',
    marginBottom: 20,
  },
});
