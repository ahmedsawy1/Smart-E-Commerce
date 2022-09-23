import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import SafeView from '../../components/views/SafeView';
import {t} from 'i18next';
import MainHeader from '../../components/headers/MainHeader';
import ColoredButton from '../../components/touchables/ColoredButton';
import {Fonts, PixelPerfect} from '../../styles/stylesConstants';
import CheckBoxRound from '../../components/touchables/CheckBoxRound';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {mailingListSub} from '../../store/actions/authActions';
import {useNavigation} from '@react-navigation/native';

const MailingList = ({}) => {
  const {newsLetter} = useSelector((state: RootState) => state.authReducer);

  const navigation: any = useNavigation();
  const [want, setWant] = useState(newsLetter);
  const dispatch = useDispatch();

  return (
    <SafeView>
      <MainHeader title={t('MailingList')} />
      <View style={styles.centerView}>
        <View>
          <Text style={styles.title}>{t('SubscribeMailingList')}</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <CheckBoxRound
                checked={want == 1 ? true : false}
                onPress={() => setWant(1)}
                styleIconCon={{flex: 5}}
                title={t('yes')}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
              }}>
              <CheckBoxRound
                checked={want == 0 ? true : false}
                onPress={() => setWant(0)}
                styleIconCon={{flex: 5}}
                title={t('no')}
              />
            </View>
          </View>
        </View>

        <ColoredButton
          title={t('saveChanges')}
          style={styles.button}
          onPress={() =>
            dispatch(mailingListSub(want, () => navigation.goBack()))
          }
          // onPress={() => console.log(want)}
        />
      </View>
      <Text>{want}</Text>
    </SafeView>
  );
};

export default MailingList;

const styles = StyleSheet.create({
  centerView: {
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 27,
  },
  button: {
    marginTop: 35,
  },
  title: {
    fontSize: PixelPerfect(30),
    fontFamily: Fonts.SemiBold,
    marginBottom: 23,
  },
});
