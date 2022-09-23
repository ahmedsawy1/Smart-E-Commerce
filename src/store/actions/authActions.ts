import {t} from 'i18next';
import {Dispatch} from 'react';
import {showMessage} from 'react-native-flash-message';
import {axiosAPI} from '../../api/config';
import {AsyncKeys, GetCookie, saveItem} from '../../constants/helpers';
import {IDispatch} from '../../constants/interfaces';
import {ActionType} from '../types/types';

export const StartLoading = () => {
  return {type: ActionType.LOADING_STARTED, payload: null};
};

export const EndLoading = () => {
  return {type: ActionType.LOADING_END, payload: null};
};

export const registerAction = (
  body: object,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    dispatch(StartLoading());
    try {
      let response = await axiosAPI.post(`ocapi/account/register`, body);
      let {data} = response;

      if (data.hasOwnProperty('error_warning')) {
        const errorArr = [
          'error_firstname',
          'error_lastname',
          'error_email',
          'error_telephone',
          'error_password',
          'error_confirm',
          'error_warning',
        ];
        errorArr.forEach(element => {
          if (data.hasOwnProperty(element) && data[element].trim()) {
            showMessage({
              message: data[element],
              type: 'danger',
            });
          }
        });

        cb(false);
      } else {
        const {firstname, lastname, email, telephone, newsLetter} = data;
        dispatch({
          type: ActionType.LOAD_AUTH_DATA,
          payload: {firstname, lastname, email, telephone, newsLetter},
        });
        const {currency, currencies, language, languages} = data;

        saveItem(AsyncKeys.CUSTOMER_ID, data.logged);
        saveItem(AsyncKeys.CURRENCY, currency.code);
        saveItem(AsyncKeys.LANGUAGE, language);
        saveItem(AsyncKeys.USER_DATA, {
          firstname,
          lastname,
          email,
          telephone,
          newsLetter,
        });

        dispatch({
          type: ActionType.LOAD_APP_SETTINGS,
          payload: {currency, currencies, language, languages},
        });

        dispatch({type: ActionType.LOG_USER_IN, payload: null});
        cb(true);
      }
      dispatch(EndLoading());
    } catch (error) {
      cb(false);
      dispatch(EndLoading());
    }
  };
};

export const loginNormal = (body: object, cb: (success?: boolean) => void) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    dispatch(StartLoading());

    try {
      let cookie = await GetCookie();

      let response = await axiosAPI.post(
        `ocapi/account/login&cookie=${cookie}`,
        body,
      );
      let data = response.data;

      if (data.hasOwnProperty('error_warning')) {
        cb(false);
        console.log('FAIL');
        showMessage({
          message: data['error_warning'],
          type: 'danger',
        });
        dispatch(EndLoading());
      } else {
        dispatch(EndLoading());
        console.log('SUCCESS');

        const {
          firstname,
          lastname,
          email,
          telephone,
          newsLetter,
          access_token,
        } = data;

        console.log(
          firstname,
          lastname,
          email,
          telephone,
          newsLetter,
          access_token,
        );

        dispatch({
          type: ActionType.LOAD_AUTH_DATA,
          payload: {
            firstname,
            lastname,
            email,
            telephone,
            newsLetter,
            access_token,
          },
        });

        const {currency, currencies, language, languages} = data;

        saveItem(AsyncKeys.CURRENCY, currency?.code);
        saveItem(AsyncKeys.LANGUAGE, language);
        saveItem(AsyncKeys.USER_DATA, {
          firstname,
          lastname,
          email,
          telephone,
          newsLetter,
        });

        //   dispatch({
        //     type: SettingTypes.LOAD_APP_SETTINGS,
        //     payload: {currency, currencies, language, languages},
        //   });

        dispatch({type: ActionType.LOG_USER_IN, payload: null});
        //   dispatch(lodAcountPage());
        dispatch(EndLoading());
        cb(true);
      }
    } catch (error) {
      dispatch(EndLoading());
      cb(false);
    }
  };
};

export const forgetPassword = (
  body: object,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    dispatch(StartLoading());

    try {
      let cookie = await GetCookie();

      let response = await axiosAPI.post(
        `ocapi/account/forgotten&cookie=${cookie}`,
        body,
      );
      let {data} = response;

      if (data.hasOwnProperty('success')) {
        dispatch({type: ActionType.FORGET_PASSWORD, payload: null});
        showMessage({
          message: data.success,
          type: 'success',
        });
        dispatch(EndLoading());
        cb(true);
      } else {
        dispatch(EndLoading());
        showMessage({
          message: data['error_warning'],
          type: 'danger',
        });
        cb(false);
      }
    } catch (error) {
      dispatch(EndLoading());
      console.log('===FORGET_PASSWORD===');
      console.log({error});
    }
  };
};

export const resetPasswordAction = (
  body: object,
  cookie: string,
  code: string,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    dispatch(StartLoading());

    try {
      let response = await axiosAPI.post(
        `account/reset&cookie=${cookie}&code=${code}`,
        body,
      );
      let {data} = response;

      if (data.hasOwnProperty('success') && data.success.length != 0) {
        showMessage({
          message: data.success,
          type: 'success',
        });

        dispatch(EndLoading());
        cb(true);
      } else {
        dispatch(EndLoading());
        showMessage({
          message: data['error_warning'],
          type: 'danger',
        });
        cb(false);
      }
    } catch (error) {
      dispatch(EndLoading());
      console.log('===RESET PASS===');
      console.log({error});
    }
  };
};

export const logOut = (cb: (success?: boolean) => void) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    dispatch(StartLoading());

    try {
      let cookie = await GetCookie();

      let response = await axiosAPI.post(`account/logout&cookie=${cookie}`);

      let {data} = response;

      if (data.hasOwnProperty('error_warning')) {
        console.log('FAIL');
        console.log(data['error_warning']);
        dispatch(EndLoading());
        //   Toast.show(data['error_warning']);
      } else {
        console.log('Logged out');
        dispatch(EndLoading());

        dispatch({type: ActionType.LOG_USER_OUT, payload: null});
        cb(true);
      }
    } catch (error) {
      dispatch(EndLoading());
      cb(false);

      console.log('================error==============');
      console.log(error);
      console.log('==============error===============');
    }
  };
};

export const editProfile = (body: object, cb: (success: boolean) => void) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    dispatch(StartLoading());

    try {
      let cookie = await GetCookie();
      let response = await axiosAPI.post(
        `ocapi/account/edit&cookie=${cookie}`,
        body,
      );

      let {data} = response;

      const {firstname, lastname, email, telephone, newsLetter} = data;

      dispatch({
        type: ActionType.LOAD_AUTH_DATA,
        payload: {firstname, lastname, email, telephone, newsLetter},
      });

      if (data.hasOwnProperty('error_warning')) {
        dispatch(EndLoading());
        cb(false);

        const errorArr = [
          'error_firstname',
          'error_lastname',
          'error_email',
          'error_telephone',
          'error_warning',
        ];
        errorArr.forEach(element => {
          if (data.hasOwnProperty(element) && data[element].trim()) {
            showMessage({
              message: data[element],
              type: 'danger',
            });
          }
        });
      } else {
        showMessage({
          message: data.success,
          type: 'success',
        });
        dispatch(EndLoading());
        cb(true);
      }
    } catch (error) {
      dispatch(EndLoading());
      console.log('================error==============');
      console.log(error);
      cb(false);
    }
  };
};

export const mailingListSub = (
  want: object,
  cb: (success: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    dispatch(StartLoading());

    try {
      const cookie = await GetCookie();
      const {data} = await axiosAPI.post(
        `/account/newsletter&cookie=${cookie}`,
        {newsletter: want},
      );

      dispatch({
        type: ActionType.SWITCH_MAIL_LIST_SUB,
        payload: want,
      });
      cb(true);
      showMessage({
        message: t('saveChangesSuccess'),
        type: 'success',
      });
    } catch (error) {
      console.log({error});
    }
  };
};
