import {GetCookie} from '../../constants/helpers';
import {axiosAPI} from '../../api/config';
import {ActionType} from '../types/types';
import {showMessage} from 'react-native-flash-message';
import {t} from 'i18next';
import {IDispatch} from '../../constants/interfaces';
import {Dispatch} from 'react';

export const StartLoading = () => {
  return {type: ActionType.LOADING_STARTED, payload: null};
};

export const EndLoading = () => {
  return {type: ActionType.LOADING_END, payload: null};
};

export const getAddresses = () => {
  return async (dispatch: Dispatch<IDispatch>) => {
    dispatch(StartLoading());
    let cookie = await GetCookie();
    try {
      let {data} = await axiosAPI.get(
        `/ocapi/account/address&cookie=${cookie}`,
      );

      dispatch({
        type: ActionType.GET_ADDRESSES,
        payload: data.addresses,
      });

      dispatch(EndLoading());
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};

export const addAddress = (
  address: object,
  cb: (success?: boolean) => void,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();

    try {
      let response = await axiosAPI.post(
        `ocapi/account/address/insert&cookie=${cookie}`,
        address,
      );
      if (response.data.success) {
        showMessage({
          message: response.data.success,
          type: 'success',
        });

        cb(true);
      } else {
        cb(false);
        const errorArr = [
          'error_firstname',
          'error_lastname',
          'error_address_1',
          'error_city',
          'error_postcode',
          'error_country',
          'error_zone',
        ];
        errorArr.forEach(element => {
          if (
            response.data.hasOwnProperty(element) &&
            response.data[element].trim()
          ) {
            showMessage({
              message: response.data[element],
              type: 'danger',
            });
          }
        });
      }
    } catch (error) {
      cb(false);
    }
  };
};

export const updateAddress = (
  address: object,
  addressID: number,
  cb: (success?: boolean) => void,
) => {
  return async () => {
    let cookie = await GetCookie();

    try {
      let response = await axiosAPI.post(
        `account/address/edit&address_id=${addressID}&cookie=${cookie}`,
        address,
      );
      if (response.data.success) {
        showMessage({
          message: response.data.success,
          type: 'success',
        });

        cb(true);
      } else {
        cb(false);
        const errorArr = [
          'error_firstname',
          'error_lastname',
          'error_address_1',
          'error_city',
          'error_postcode',
          'error_country',
          'error_zone',
        ];
        errorArr.forEach(element => {
          if (
            response.data.hasOwnProperty(element) &&
            response.data[element].trim()
          ) {
            showMessage({
              message: response.data[element],
              type: 'danger',
            });
          }
        });
      }
    } catch (error) {
      cb(false);
      console.log(error);
    }
  };
};

export const deleteAddress = (addressID: number) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();

    try {
      let {data} = await axiosAPI.get(
        `/ocapi/account/address/delete&address_id=${addressID}&cookie=${cookie}`,
      );

      if (data.error_warning != '') {
        showMessage({
          message: data['error_warning'],
          type: 'danger',
        });
        dispatch(EndLoading());
      } else {
        showMessage({
          type: 'success',
          message: data.success,
        });

        dispatch({
          type: ActionType.DELETE_ADDRESS,
          payload: addressID,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getZones = (countryId: number) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    dispatch(StartLoading());
    let cookie = await GetCookie();

    try {
      let {data} = await axiosAPI.get(
        `/ocapi/localisation/zones&country_id=${countryId}&cookie=${cookie}`,
      );

      dispatch({
        type: ActionType.GET_ZONES,
        payload: data.zone,
      });
      dispatch(EndLoading());
    } catch (error) {
      console.log('================errorerror====================');
      console.log(error);
      console.log('====================================');
      dispatch(EndLoading());
    }
  };
};

export const getMyOrders = () => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();

    try {
      dispatch(StartLoading());

      let {data} = await axiosAPI.get(`/ocapi/account/order&cookie=${cookie}`);

      dispatch({
        type: ActionType.GET_MY_ORDERS,
        payload: data.orders,
      });

      dispatch(EndLoading());
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};

export const getSingleOrder = (orderID: number) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();

    try {
      dispatch(StartLoading());

      let {data} = await axiosAPI.get(
        `/ocapi/account/order/info&order_id=${orderID}&cookie=${cookie}`,
      );

      dispatch({
        type: ActionType.GET_SINGLE_ORDER,
        payload: data,
      });

      dispatch(EndLoading());
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};

export const getMyReturns = () => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();

    try {
      dispatch(StartLoading());
      let {data} = await axiosAPI.get(`/account/return&cookie=${cookie}`);

      console.log(data);

      dispatch({
        type: ActionType.GET_MY_RETURNS,
        payload: data,
      });

      dispatch(EndLoading());
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};

export const getSingleReturn = (returnID: number) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();

    try {
      dispatch(StartLoading());

      let {data} = await axiosAPI.get(
        `/account/return/info&return_id=${returnID}&cookie=${cookie}`,
      );

      dispatch({
        type: ActionType.GET_SINGLE_RETURN,
        payload: data,
      });

      dispatch(EndLoading());
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};

export const changePassword = (body: {}, cb: (success?: boolean) => void) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();

    try {
      let {data} = await axiosAPI.post(
        `ocapi/account/password&cookie=${cookie}`,
        body,
      );
      if (data.hasOwnProperty('error_password')) {
        console.log('error');
        console.log(data.error_password);
        cb(false);
        showMessage({
          type: 'danger',
          message: t('updatePassErr'),
        });
      } else {
        showMessage({
          type: 'success',
          message: t('passUpdated'),
        });
        cb(true);

        dispatch({
          type: ActionType.CHANGE_PASSWORD,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
