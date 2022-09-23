import {ActionType} from '../types/types';

const initialState = {
  aboutUs: {},
  shippingDlivery: {},
  privacy: {},
  terms: {},
  returnPolicy: {},
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.PAGE_ABOUT_US:
      return {...state, aboutUs: action.payload};

    case ActionType.PAGE_SEHIPPING_DLIVER:
      return {...state, shippingDlivery: action.payload};

    case ActionType.PAGE_PRIVACY:
      return {...state, privacy: action.payload};

    case ActionType.PAGE_TERMS:
      return {...state, terms: action.payload};

    case ActionType.PAGE_RETURNS_POLICY:
      return {...state, returnPolicy: action.payload};

    default:
      return state;
  }
};
