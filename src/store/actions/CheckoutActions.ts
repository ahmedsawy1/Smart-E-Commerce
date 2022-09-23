import {t} from 'i18next';
import {Dispatch} from 'react';
import {Alert} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {axiosAPI, baseUrl} from '../../api/config';
import {GetCookie} from '../../constants/helpers';
import {IDispatch} from '../../constants/interfaces';
import {ActionType} from '../types/types';
var qs = require('qs');
const queryString = require('query-string');

export const StartLoading = () => {
  return {type: ActionType.LOADING_STARTED, payload: null};
};

export const EndLoading = () => {
  return {type: ActionType.LOADING_END, payload: null};
};

export const addToCart = (
  prodID: number,
  quantity: number,
  selecedOptions: any,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();
    try {
      let body = `product_id=${prodID}&quantity=${quantity}`;
      selecedOptions.forEach((o: any) => {
        console.log('==============o======================');
        console.log(o);
        console.log('====================================');

        //  option_value_id  >> product_option_value_id
        body += `&option[${o.product_option_id}]=${o.option_value_id}`;
      });

      console.log('=================body===================');
      console.log(body);
      console.log('====================================');

      let {data} = await axiosAPI.post(
        `checkout/cart/add&cookie=${cookie}`,
        body,
      );

      if (data.hasOwnProperty('success')) {
        showMessage({
          type: 'success',
          message: t('addedToCart'),
        });
      }

      if (data.hasOwnProperty('error')) {
        console.log(data.error);

        showMessage({
          type: 'danger',
          message: t('youMustChooseChoices'),
        });
      }

      dispatch({
        type: ActionType.ADD_TO_CART,
        // payload: data.products,
      });
    } catch (error) {
      console.log({error});

      // showMessage({
      //   type: 'danger',
      //   message: Object.keys(error)[0],
      // });
    }
  };
};

export const getCart = () => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();
    try {
      let {data} = await axiosAPI.get(`ocapi/checkout/cart&cookie=${cookie}`);

      dispatch({
        type: ActionType.GET_CART,
        payload: data,
      });
    } catch (error) {
      dispatch(EndLoading());
      console.log({error});
    }
  };
};

export const deleteFromCart = (cartID: number) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();
    try {
      let {data} = await axiosAPI.get(
        `ocapi/checkout/cart&remove=${cartID}&cookie=${cookie}`,
      );

      dispatch({
        type: ActionType.DELETE_FROM_CART,
        payload: data.products,
      });
      dispatch(getCart());
    } catch (error) {
      console.log({error});
    }
  };
};

export const ChangeCartQuanitity = (
  cart_id: number,
  quanitity: number | string,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();

    try {
      let body = `quantity[${cart_id}]=${quanitity}`;
      // body[`quantity[${cart_id}]`] = `${quanitity}`;
      let response = await axiosAPI.post(
        `ocapi/checkout/cart&cookie=${cookie}`,
        body,
      );
      dispatch(getCart());
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};

export const addVoucher = (voucher: string) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();
    try {
      dispatch(StartLoading());
      let {data} = await axiosAPI.post(
        `/extension/total/voucher/voucher&cookie=${cookie}`,
        {
          voucher: voucher,
        },
      );

      if (data.hasOwnProperty('redirect')) {
        showMessage({
          type: 'success',
          message: t('addedd'),
        });
        dispatch(getCart());
        dispatch(EndLoading());
      }
      if (data.hasOwnProperty('error')) {
        showMessage({
          type: 'danger',
          message: data.error,
        });
        dispatch(EndLoading());
      }
    } catch (error) {
      console.log({error});
      dispatch(EndLoading());
    }
  };
};

export const addCoupon = (coupon: string) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();
    try {
      dispatch(StartLoading());

      let {data} = await axiosAPI.post(
        `/extension/total/coupon/coupon&cookie=${cookie}`,
        {
          coupon: coupon,
        },
      );

      console.log('==================datadatadata==================');
      console.log(data);
      console.log('====================================');

      if (data.hasOwnProperty('redirect')) {
        showMessage({
          type: 'success',
          message: t('addedd'),
        });
        dispatch(getCart());
        dispatch(EndLoading());
      }
      if (data.hasOwnProperty('error')) {
        showMessage({
          type: 'danger',
          message: data.error,
        });
        dispatch(EndLoading());
      }
    } catch (error) {
      console.log({error});
      dispatch(EndLoading());
    }
  };
};
export const addRewardPoints = (reward: string) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();
    try {
      dispatch(StartLoading());

      let {data} = await axiosAPI.post(
        `/extension/total/reward/reward&cookie=${cookie}`,
        {
          reward: reward,
        },
      );

      if (data.hasOwnProperty('redirect')) {
        showMessage({
          type: 'success',
          message: t('addedd'),
        });
        dispatch(getCart());
        dispatch(EndLoading());
      }
      if (data.hasOwnProperty('error')) {
        showMessage({
          type: 'danger',
          message: data.error,
        });
        dispatch(EndLoading());
      }
    } catch (error) {
      console.log({error});
      dispatch(EndLoading());
    }
  };
};

export const getAddressessList = () => {
  return async (dispatch: Dispatch<IDispatch>) => {
    const cookie = await GetCookie();

    try {
      const {data} = await axiosAPI.get(
        `ocapi/account/address&cookie=${cookie}`,
      );

      let addresses = data.addresses;

      var address_id = data.address_id;
      if (address_id == 0) {
        address_id =
          Object.keys(addresses).length > 0 ? Object.keys(addresses)[0] : 0;
      }

      dispatch({
        type: ActionType.GET_ADDRESSES_LIST,
        payload: data,
      });

      dispatch({
        type: ActionType.SET_DEFAULT_ADDRESS_ID,
        payload: address_id,
      });

      dispatch({
        type: ActionType.SET_SHIPPING_ADDRESS_ID,
        payload: address_id,
      });
      // dispatch(
      //   setShippingAddressId(address_id, () => {
      //     dispatch(setPaymentAddressId(address_id));
      //   }),
      // );

      dispatch({
        type: ActionType.SET_PAYMNET_ADDRESS_ID,
        payload: address_id,
      });
      if (address_id) {
        axiosAPI
          .post(`ocapi/checkout/shipping_address/save&cookie=${cookie}`, {
            shipping_address: 'existing',
            address_id: address_id,
          })
          .then(() => {
            axiosAPI.post(
              `ocapi/checkout/payment_address/save&cookie=${cookie}`,
              {
                payment_address: 'existing',
                address_id: address_id,
              },
            );
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const setShippingAddressId = (
  shipping_address_id: number,
  cb: () => void,
) => {
  return async (dispatch: any) => {
    let cookie = await GetCookie();
    dispatch({
      type: ActionType.SET_SHIPPING_ADDRESS_ID,
      payload: shipping_address_id,
    });
    console.log({
      shipping_address: 'existing',
      address_id: shipping_address_id,
    });

    await axiosAPI
      .post(`ocapi/checkout/shipping_address/save&cookie=${cookie}`, {
        shipping_address: 'existing',
        address_id: shipping_address_id,
      })
      .then(data => {
        axiosAPI
          .post(`ocapi/checkout/shipping_method&cookie=${cookie}`)
          .then(shippingMethodPromise => {
            let {shipping_methods, code, error_warning} =
              shippingMethodPromise.data;

            dispatch({
              type: ActionType.GET_SHIPING_METHODS,
              payload: shipping_methods,
            });
            if (code != '') {
              dispatch({
                type: ActionType.SET_SHIPPING_METHOD,
                payload: code,
              });
            }
            cb && cb();
          });
      });
  };
};

export const setPaymentAddressId = (payment_address_id: number) => {
  return async (dispatch: any) => {
    dispatch({
      type: ActionType.SET_PAYMNET_ADDRESS_ID,
      payload: payment_address_id,
    });

    let cookie = await GetCookie();
    await axiosAPI
      .post(`ocapi/checkout/payment_address/save&cookie=${cookie}`, {
        payment_address: 'existing',
        address_id: payment_address_id,
      })
      .then(() => {
        axiosAPI
          .get(`ocapi/checkout/payment_method&cookie=${cookie}`)
          .then(paymentMethodsPromise => {
            let {payment_methods, code, error_warning} =
              paymentMethodsPromise.data;

            dispatch({
              type: ActionType.GET_PAYMENTS_METHODS,
              payload: payment_methods,
            });
            if (code != '') {
              dispatch({
                type: ActionType.SET_PAYMENT_METHOD,
                payload: code,
              });
            }
            dispatch({
              type: ActionType.LOADING_END,
            });
          });
      });
  };
};

// Here //////////

export const ShippingSetted = (payload: boolean) => ({
  type: ActionType.SHIPPING_SETTED,
  payload,
});
export const PaymentSetted = (payload: boolean) => ({
  type: ActionType.PAYMENT_SETTED,
  payload,
});

export const SetPaymentMethod = (payment_method: string, cb: () => void) => {
  return async (dispatch: any) => {
    try {
      let cookie = await GetCookie();
      let body = `payment_method=${payment_method}&agree=1`;

      let respnose = await axiosAPI
        .post(
          `ocapi/checkout/payment_method/save&cookie=${cookie}`,
          queryString.stringify({
            payment_method: payment_method,
            agree: 1,
          }),
        )
        .then(() => {
          dispatch(PaymentSetted(true));
        });
      cb();
    } catch (error) {
      console.log(error);
    }
  };
};

export const SetShippingtMethod = (method: string, cb: () => void) => {
  return async (dispatch: any) => {
    let cookie = await GetCookie();

    let body = `shipping_method=${method}`;
    let respnose = await axiosAPI
      .post(
        `ocapi/checkout/shipping_method/save&cookie=${cookie}`,
        queryString.stringify({
          shipping_method: method,
        }),
      )
      .then(() => {
        dispatch(ShippingSetted(true));
      });

    cb();
  };
};

export const initCheckout = () => {
  return async (dispatch: any) => {
    const cookie = await GetCookie();

    try {
      axiosAPI
        .get(`ocapi/checkout/checkout&cookie=${cookie}`)
        .then(async () => {
          // dispatch(getAddressessList());
          const {data} = await axiosAPI.get(
            `ocapi/account/address&cookie=${cookie}`,
          );

          let addresses = data.addresses;

          var address_id = data.address_id;
          if (address_id == 0) {
            address_id =
              Object.keys(addresses).length > 0 ? Object.keys(addresses)[0] : 0;
          }

          dispatch({
            type: ActionType.GET_ADDRESSES_LIST,
            payload: data,
          });

          dispatch({
            type: ActionType.SET_DEFAULT_ADDRESS_ID,
            payload: address_id,
          });

          dispatch({
            type: ActionType.SET_SHIPPING_ADDRESS_ID,
            payload: address_id,
          });

          dispatch({
            type: ActionType.SET_PAYMNET_ADDRESS_ID,
            payload: address_id,
          });

          axiosAPI
            .post(`ocapi/checkout/shipping_address/save&cookie=${cookie}`, {
              shipping_address: 'existing',
              address_id: address_id,
            })
            .then(() => {
              axiosAPI
                .post(`ocapi/checkout/payment_address/save&cookie=${cookie}`, {
                  payment_address: 'existing',
                  address_id: address_id,
                })
                .then(async () => {
                  await axiosAPI
                    .get(`ocapi/checkout/shipping_method&cookie=${cookie}`)
                    .then(shipping_method => {
                      dispatch({
                        type: ActionType.GET_SHIPING_METHODS,
                        payload: shipping_method.data,
                      });
                    })
                    .then(async () => {
                      await axiosAPI
                        .get(`ocapi/checkout/payment_method&cookie=${cookie}`)
                        .then(payment_method => {
                          dispatch({
                            type: ActionType.GET_PAYMENTS_METHODS,
                            payload: payment_method.data,
                          });
                        });
                    });
                });
            });
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const initCheckoutAnotherAddress = selectedAddressId => {
  return async (dispatch: any) => {
    const cookie = await GetCookie();

    try {
      axiosAPI
        .get(`ocapi/checkout/checkout&cookie=${cookie}`)
        .then(async () => {
          // dispatch(getAddressessList());
          const {data} = await axiosAPI.get(
            `ocapi/account/address&cookie=${cookie}`,
          );

          dispatch({
            type: ActionType.GET_ADDRESSES_LIST,
            payload: data,
          });

          dispatch({
            type: ActionType.SET_DEFAULT_ADDRESS_ID,
            payload: selectedAddressId,
          });

          dispatch({
            type: ActionType.SET_SHIPPING_ADDRESS_ID,
            payload: selectedAddressId,
          });

          dispatch({
            type: ActionType.SET_PAYMNET_ADDRESS_ID,
            payload: selectedAddressId,
          });

          axiosAPI
            .post(`ocapi/checkout/shipping_address/save&cookie=${cookie}`, {
              shipping_address: 'existing',
              address_id: selectedAddressId,
            })
            .then(() => {
              axiosAPI
                .post(`ocapi/checkout/payment_address/save&cookie=${cookie}`, {
                  payment_address: 'existing',
                  address_id: selectedAddressId,
                })
                .then(async () => {
                  await axiosAPI
                    .get(`ocapi/checkout/shipping_method&cookie=${cookie}`)
                    .then(shipping_method => {
                      dispatch({
                        type: ActionType.GET_SHIPING_METHODS,
                        payload: shipping_method.data,
                      });
                    })
                    .then(async () => {
                      await axiosAPI
                        .get(`ocapi/checkout/payment_method&cookie=${cookie}`)
                        .then(payment_method => {
                          dispatch({
                            type: ActionType.GET_PAYMENTS_METHODS,
                            payload: payment_method.data,
                          });
                        });
                    });
                });
            });
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const initGuestCheckout = () => {
  return async (dispatch: any) => {
    let cookie = await GetCookie();
    dispatch(getShipingMethods());
    const data2 = await axiosAPI.get(
      `ocapi/checkout/guest_shipping&cookie=${cookie}`,
    );

    dispatch(getPaymentsMethods());
    // dispatch(EndLoading()).catch(error => {
    //   console.log('===============error=====================');
    //   console.log(error);
    // });
  };
};

export const validateGuest = (
  body: any,
  cb: (success?: boolean) => void,
  error: (err: any) => void,
) => {
  return async (dispatch: any) => {
    try {
      let cookie = await GetCookie();
      let {data} = await axiosAPI.post(
        `ocapi/checkout/guest/save&cookie=${cookie}`,
        body,
      );

      console.log('===================data=================');
      console.log(data);
      console.log('====================================');

      if (data.hasOwnProperty('error')) {
        error(data.error);
      } else {
        dispatch({type: ActionType.SET_GUEST_CHECKOUT_DATA, payload: body});
        cb(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const submitCheckout = (
  comment: string,
  cbWebView: (param: string) => void,
  cb: (success: boolean) => void,
) => {
  return async (dispatch: any) => {
    let cookie = await GetCookie();
    let validation = await axiosAPI.post(
      `ocapi/checkout/validation&cookie=${cookie}`,
      {comment: comment},
    );
    console.log('validation', validation);
    if (validation.status != 200) {
      Alert.alert('حدث خطأ ما، يرجى المحاولة لاحقا أو الإتصال بنا');
      return;
    } else if (
      validation.data.hasOwnProperty('error') &&
      validation.data.error.warning
    ) {
      Alert.alert(validation.data.error.warning);
    } else {
      let confirmCheckout = await axiosAPI.post(
        `ocapi/checkout/confirm&cookie=${cookie}`,
      );

      if (confirmCheckout.status != 200) {
        Alert.alert('حدث خطأ ما، يرجى المحاولة لاحقا أو الإتصال بنا');
        return;
      }
      let quickConfirmCheckout = await axiosAPI.get(
        `ocapi/checkout/quickconfirm&cookie=${cookie}`,
      );
      if (quickConfirmCheckout.data.hasOwnProperty('newOrderId')) {
        dispatch({
          type: ActionType.SAVE_LAST_ORDER_ID,
          payload: quickConfirmCheckout.data.newOrderId,
        });
        // self.$root.newOrderId = data.newOrderId;
      }
      if (
        quickConfirmCheckout.data.hasOwnProperty('message') &&
        quickConfirmCheckout.data.message == false
      ) {
        // Go to webview
        cbWebView(`${baseUrl}ocapi/checkout/confirm_order&cookie=${cookie}`);
        // cb(true);
      } else {
        // go to success screen
        cb(true);
      }
    }
  };
};

export const getShipingMethods = () => {
  return async (dispatch: any) => {
    const cookie = await GetCookie();

    try {
      const data = await axiosAPI.get(
        `ocapi/checkout/shipping_method&cookie=${cookie}`,
      );
      dispatch({
        type: ActionType.GET_SHIPING_METHODS,
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPaymentsMethods = () => {
  return async (dispatch: any) => {
    const cookie = await GetCookie();

    try {
      const {data} = await axiosAPI.get(
        `ocapi/checkout/payment_method&cookie=${cookie}`,
      );

      dispatch({
        type: ActionType.GET_PAYMENTS_METHODS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
