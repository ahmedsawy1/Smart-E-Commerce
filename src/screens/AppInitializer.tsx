import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation, {navigationLinking} from '../navigation/navigation';
import {useDispatch, useSelector} from 'react-redux';

import {getHomeLayout} from '../store/actions/productsActions';
// import RNBootSplash from 'react-native-bootsplash';
import {RootState} from '../store/store';
import {createNavigationContainerRef} from '@react-navigation/native';

import messaging from '@react-native-firebase/messaging';
import {AsyncKeys, getItem, GetLanguage, saveItem} from '../constants/helpers';
import {initAction} from '../store/actions/initActions';

export const navigationRef = createNavigationContainerRef();

const AppInitializer = () => {
  const dispatch = useDispatch();
  const {isSignedIn} = useSelector((state: RootState) => state.authReducer);

  const initApp = async () => {
    const language = await GetLanguage();
    dispatch(initAction(language));
  };

  useEffect(() => {
    initApp();
  }, []);

  // useEffect(() => {
  //   const init = async () => {};

  //   init().finally(async () => {
  //     await RNBootSplash.hide({fade: true});
  //   });
  // }, [isSignedIn]);

  const [routeName, setRouteName] = useState();

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
    }
    const knowPremession = await messaging().requestPermission({
      sound: false,
      announcement: true,
      // ... other permission settings
    });

    console.log('Permession = ', knowPremession);
  }

  const getToken = async () => {
    try {
      const token = await messaging().getToken();

      console.log('============= messaging token =============');
      console.log({token});

      await saveItem(AsyncKeys.DEVICE_TOKEN, {device_token: token});
    } catch (error) {
      console.log('======== error post token ==========');
      console.log(error);
    }
  };

  const notficationListener = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
    notficationListener();
  }, []);

  return (
    <NavigationContainer
      linking={navigationLinking}
      ref={navigationRef}
      onReady={() => {
        setRouteName(navigationRef.getCurrentRoute().name);
      }}
      onStateChange={async () => {
        const previousRouteName = routeName;
        const currentRouteName = navigationRef.getCurrentRoute().name;
        setRouteName(currentRouteName);
        // To Do >> make if statement to do this only in screens that have product with fav icons

        const routesForUpdateFavs = [
          'HomeScreen',
          'CatgeoryOverview',
          'SearchScreen',
          'FavoriteScreen',
          'ShowMore',
        ];

        if (routesForUpdateFavs.includes(currentRouteName)) {
          dispatch(getHomeLayout());
        }
      }}>
      <Navigation routeName={routeName} />
    </NavigationContainer>
  );
};

export default AppInitializer;

const styles = StyleSheet.create({});
