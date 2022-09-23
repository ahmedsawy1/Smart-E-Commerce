import {FlatList, I18nManager, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import i18next, {t} from 'i18next';
import Selector from '../../components/touchables/Selector';
import Switcher from '../../components/touchables/Switcher';
import PopUp from '../../components/views/PopUp';
import CheckBox from '../../components/touchables/CheckBox';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
// import {
//   changeNotificationSetting,
//   checkNotificationPermission,
// } from 'react-native-check-notification-permission';
import {AppState} from 'react-native';
import {initAction} from '../../store/actions/initActions';
import {SetLanguage} from '../../constants/helpers';

const SettingsScreen = () => {
  const [popUp, setPopUp] = useState(false);
  const [currencyPopUp, setCurrencyPopUp] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({});

  const {currencies, settingsData} = useSelector(
    (state: RootState) => state.authReducer,
  );

  const dispatch = useDispatch();

  const changeLangFN = async (code: string) => {
    i18next.changeLanguage(code);
    await SetLanguage(code).then(() => {
      dispatch(initAction(code));
    });
  };

  // const appState = useRef(AppState.currentState);
  // const [ActiveAppState, setActiveAppState] = useState(AppState.currentState);
  // const bool = checkNotificationPermission();
  // const [notifications, setnotifications] = useState(bool);
  // useEffect(() => {
  //   checkNotificationPermission().then((ret: any) => {
  //     setnotifications(ret);
  //   });
  // }, []);

  // useEffect(() => {
  //   AppState.addEventListener('change', _handleAppStateChange);

  //   return () => AppState.removeEventListener('change', _handleAppStateChange);
  // });
  // const _handleAppStateChange = async nextAppState => {
  //   if (
  //     appState.current.match(/inactive|background/) &&
  //     nextAppState === 'active'
  //   ) {
  //     const bool = await checkNotificationPermission();

  //     setnotifications(bool);
  //   }
  //   appState.current = nextAppState;
  //   setActiveAppState(appState.current);
  // };

  return (
    <SafeView>
      <MainHeader title={t('Settings')} />
      <View style={styles.selectorsCon}>
        <Selector
          title={t('language')}
          subTitle={I18nManager.isRTL ? 'عربى' : 'English'}
          onPress={() => setPopUp(true)}
        />
        <Selector
          title={t('currency')}
          subTitle={selectedCurrency.title}
          onPress={() => setCurrencyPopUp(true)}
        />
        {/* <Switcher
          title={t('notifications')}
          onValueChange={() => changeNotificationSetting()}
          value={notifications}
        /> */}
      </View>
      {
        <PopUp visible={popUp} onRequestClose={() => setPopUp(false)}>
          <View style={{paddingHorizontal: 16}}>
            <FlatList
              data={settingsData?.languages}
              keyExtractor={item => item.title}
              renderItem={({item}) => (
                <CheckBox
                  style={{marginTop: 20}}
                  title={item.name}
                  onPress={() => {
                    changeLangFN(item.code);
                    if (item.dir == 'ltr') {
                      I18nManager.forceRTL(false);
                    } else {
                      I18nManager.forceRTL(true);
                    }
                  }}
                  checked={item.code == settingsData.language ? true : false}
                />
              )}
            />
          </View>
        </PopUp>
      }
      {
        <PopUp
          visible={currencyPopUp}
          onRequestClose={() => setCurrencyPopUp(false)}>
          <View style={{paddingHorizontal: 16}}>
            <FlatList
              data={currencies}
              keyExtractor={item => item.title}
              renderItem={({item}) => (
                <CheckBox
                  style={{marginTop: 20}}
                  title={item.title}
                  onPress={() => {
                    setSelectedCurrency(item);
                    setCurrencyPopUp(false);
                  }}
                />
              )}
            />
          </View>
        </PopUp>
      }
    </SafeView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  selectorsCon: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
});
