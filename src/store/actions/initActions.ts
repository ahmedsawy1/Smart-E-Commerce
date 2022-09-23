import AsyncStorage from '@react-native-async-storage/async-storage';
import {I18nManager, Platform} from 'react-native';
import {
  getDeviceId,
  getDeviceType,
  getSystemVersion,
  getVersion,
} from 'react-native-device-info';

import {checkNotificationPermission} from 'react-native-check-notification-permission';
import qs from 'qs';
import RNRestart from 'react-native-restart';
import {showMessage} from 'react-native-flash-message';
import {axiosAPI, baseUrl} from '../../api/config';
import {
  AsyncKeys,
  GetCookie,
  GetCurrency,
  getItem,
  GetLanguage,
  saveItem,
  SetCookie,
} from '../../constants/helpers';
import {ActionType} from '../types/types';
import {getHomeLayout} from './productsActions';
import {Dispatch} from 'react';
import {IDispatch} from '../../constants/interfaces';

export const StartLoading = () => {
  return {type: ActionType.LOADING_STARTED, payload: null};
};

export const EndLoading = () => {
  return {type: ActionType.LOADING_END, payload: null};
};

export const getAboutUsPage = () => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      let cookie = await GetCookie();
      const {data} = await axiosAPI.get(
        `information/information&information_id=${4}&cookie=${cookie}`,
      );

      dispatch({
        type: ActionType.PAGE_ABOUT_US,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getShipingDliveryPage = () => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      let cookie = await GetCookie();
      const {data} = await axiosAPI.get(
        `information/information&information_id=${6}&cookie=${cookie}`,
      );

      dispatch({
        type: ActionType.PAGE_SEHIPPING_DLIVER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPrivacyPage = () => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      let cookie = await GetCookie();
      const {data} = await axiosAPI.get(
        `information/information&information_id=${3}&cookie=${cookie}`,
      );

      dispatch({
        type: ActionType.PAGE_PRIVACY,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTermsPage = () => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      let cookie = await GetCookie();
      const {data} = await axiosAPI.get(
        `information/information&information_id=${5}&cookie=${cookie}`,
      );

      dispatch({
        type: ActionType.PAGE_TERMS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getReturnPolicyPage = () => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      let cookie = await GetCookie();
      const {data} = await axiosAPI.get(
        `information/information&information_id=${7}&cookie=${cookie}`,
      );

      dispatch({
        type: ActionType.PAGE_RETURNS_POLICY,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const initAction = (language_code?: string) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      // const {data} = await axiosAPI.post('ocapi/me', {language_code});

      let cookie: any = await GetCookie();
      var language = await GetLanguage();

      dispatch(getHomeLayout());

      let isRtl = language.toLowerCase() === 'ar';
      I18nManager.forceRTL(isRtl);
      if ((I18nManager.isRTL && !isRtl) || (!I18nManager.isRTL && isRtl)) {
        RNRestart.Restart();
      }

      // notification
      const NotificationPermission = await checkNotificationPermission();
      var newDeviceToken = await getItem(AsyncKeys.DEVICE_TOKEN);
      var currency_code = await GetCurrency();
      let initAppUrl = `${baseUrl}ocapi/me`;

      // notification
      let body: any = {
        language_code,
        currency_code,
      };

      if (
        typeof newDeviceToken != 'undefined' &&
        newDeviceToken != null &&
        NotificationPermission
      ) {
        body.deviceToken = newDeviceToken.device_token;
        body.devicePlatform = Platform.OS;
        body.deviceAppVersion = getVersion();
        body.deviceType = getDeviceType();
        body.deviceModel = getDeviceId();
        body.deviceSystemVersion = getSystemVersion();
        let oldDeviceToken = await AsyncStorage.getItem('oldDeviceToken');
        if (typeof oldDeviceToken != 'undefined' && oldDeviceToken != null) {
          body.oldDeviceToken = oldDeviceToken;
          await AsyncStorage.removeItem('oldDeviceToken');
        }
      }

      //await Cookie.clear();
      if (typeof cookie != 'undefined' && cookie != null) {
        body.access_token = cookie;
        initAppUrl += `&cookie=${cookie}`;
      }

      try {
        let response = await axiosAPI.post(initAppUrl, qs.stringify(body));

        let data: any = response.data;

        if (data.hasOwnProperty('error_warning')) {
          console.log('FAIL initAction');
          showMessage({
            message: data['error_warning'],
            type: 'danger',
          });
          dispatch(EndLoading());
        } else {
          dispatch({
            type: ActionType.INIT_ACTION,
            payload: data,
          });

          await SetCookie(data.cookie);
          await saveItem(AsyncKeys.CUSTOMER_ID, data.logged);
        }
      } catch (error) {
        console.log('InitializApp Error ', error);
      }
    } catch (error) {
      console.log('=================errorinitAction===================');
      console.log(error);
    }
  };
};
