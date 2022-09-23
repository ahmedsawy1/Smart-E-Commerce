import {ActionType} from '../types/types';

const initialState = {
  loader: false,
  userData: {},
  isSignedIn: false,
  countries: [],
  contact: {},
  currencies: [],
  settingsData: {},
  newsLetter: 0,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.LOAD_AUTH_DATA:
      return {...state, userData: action.payload};

    case ActionType.INIT_ACTION:
      return {
        ...state,
        settingsData: action.payload,
        countries: action.payload.countries,
        contact: action.payload.contact,
        currencies: action.payload.currencies,
        newsLetter: action.payload.newsletter,
      };

    case ActionType.SWITCH_MAIL_LIST_SUB:
      return {
        ...state,
        newsLetter: action.payload,
      };

    case ActionType.LOG_USER_IN:
      return {...state, isSignedIn: true};

    case ActionType.LOG_USER_OUT:
      return {...state, isSignedIn: false};

    case ActionType.LOADING_STARTED:
      return {...state, loader: true};

    case ActionType.LOADING_END:
      return {...state, loader: false};

    default:
      return state;
  }
};
