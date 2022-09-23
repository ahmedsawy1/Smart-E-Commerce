import {ActionType} from '../types/types';

const initialState = {
  addresses: [],
  zones: [],
  loader: false,
  countryId: 184,
  orders: [],
  returnsData: {},
  singleOrder: {},
  singleReturn: {},
};

export default (state = initialState, action: {type: {}; payload: {}}) => {
  switch (action.type) {
    case ActionType.GET_ADDRESSES:
      return {...state, addresses: action.payload};

    case ActionType.GET_MY_ORDERS:
      return {...state, orders: action.payload};

    case ActionType.GET_MY_RETURNS:
      return {...state, returnsData: action.payload};

    case ActionType.GET_SINGLE_ORDER:
      return {...state, singleOrder: action.payload};

    case ActionType.GET_SINGLE_RETURN:
      return {...state, singleReturn: action.payload};

    case ActionType.ADD_ADDRESS:
      return {...state, addresses: action.payload};

    case ActionType.DELETE_ADDRESS:
      const addressesAfterDelete = state.addresses.filter(
        item => item.address_id != action.payload,
      );

      return {...state, addresses: addressesAfterDelete};

    case ActionType.LOADING_STARTED:
      return {...state, loader: true};

    case ActionType.LOADING_END:
      return {...state, loader: false};

    case ActionType.GET_ZONES:
      return {...state, zones: action.payload};

    default:
      return state;
  }
};
