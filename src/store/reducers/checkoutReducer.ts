import {ActionType} from '../types/types';

const initialState = {
  cartData: {},

  shippingMethods: {},
  paymentData: {},
  addressData: {},
  guestData: {},
  myfatoorah_payment_method: '',
  payment_method: '',
  shipping_method: '',
  shipping_address_id: '',
  address_id: '',
  payment_address_id: '',
  order_id: 0,
  loader: true,

  paymentSetted: false,
  shippingSetted: false,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.GET_CART:
      return {...state, cartData: action.payload};

    case ActionType.PAYMENT_SETTED:
      return {...state, paymentSetted: action.payload};

    case ActionType.SHIPPING_SETTED:
      return {...state, shippingSetted: action.payload};

    case ActionType.LOADING_STARTED:
      return {...state, loader: true};

    case ActionType.LOADING_END:
      return {...state, loader: false};

    case ActionType.ADD_VOUCHER:
      return {...state, cartData: action.payload};

    case ActionType.GET_SHIPING_METHODS:
      return {...state, shippingMethods: action.payload};

    case ActionType.GET_PAYMENTS_METHODS:
      return {...state, paymentData: action.payload};

    case ActionType.GET_ADDRESSES_LIST:
      return {...state, addressData: action.payload};

    case ActionType.EMPTY_CART:
      return {...state, cartData: {}};

    case ActionType.SET_SHIPPING_ADDRESS_ID:
      return {...state, shipping_address_id: action.payload};

    case ActionType.SET_DEFAULT_ADDRESS_ID:
      return {...state, address_id: action.payload};
    case ActionType.SET_GUEST_CHECKOUT_DATA:
      return {...state, guestData: action.payload};

    case ActionType.SET_PAYMNET_ADDRESS_ID:
      return {...state, payment_address_id: action.payload};
    case ActionType.SAVE_LAST_ORDER_ID:
      return {...state, order_id: action.payload};

    default:
      return state;
  }
};
