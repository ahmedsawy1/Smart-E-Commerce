import {ActionType} from '../types/types';

const initialState = {
  loader: false,
  layoutData: {},
  searchedProducts: [],
  allData: {},
  singleProduct: {},
  categories: [],
  categoriesAllData: {},
  categoryProducts: [],
  favorites: [],
  products: [],
  bestSeller: [],
  reviews: [],
  compareProds: [],
  moreProdsData: {},
  moreProds: [],
  secondryProducts: [],
  secondryAllData: {},
  selecedOptions: [],
  filtersData: {},
};

export default (state = initialState, action: any) => {
  const newState = {...state};

  switch (action.type) {
    case ActionType.LOADING_STARTED:
      return {...state, loader: true};

    case ActionType.LOADING_END:
      return {...state, loader: false};

    case ActionType.GET_LAYOUT:
      return {...state, layoutData: action.payload};

    case ActionType.GET_SINGLE_PRODUCT:
      return {...state, singleProduct: action.payload};

    case ActionType.GET_COMPARE:
      return {...state, compareProds: action.payload};

    case ActionType.GET_MORE_PRODUCTS:
      return {
        ...state,
        moreProdsData: action.allData,
        moreProds: action.payload,
      };

    case ActionType.LOAD_MORE_PRODUCTS_NEXT_PAGE:
      return {
        ...state,
        moreProdsData: action.allData,
        moreProds: [...state.moreProds, ...action.payload],
      };

    case ActionType.GET_PROUDCTS:
      return {...state, products: action.payload};

    case ActionType.GET_REVIEWS:
      return {...state, reviews: action.payload.reviews};

    case ActionType.GET_CATEGORIES:
      return {...state, categories: action.payload};

    case ActionType.GET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        categoryProducts: action.payload.products,
        categoriesAllData: action.payload,
      };

    case ActionType.LOAD_CATEOGRY_NEXT_PAGE:
      return {
        ...state,
        categoryProducts: [
          ...state.categoryProducts,
          ...action.payload.products,
        ],
        categoriesAllData: action.payload,
      };

    case ActionType.GET_PRODUCTS_BY_CATEGORY_SECONDARY:
      return {
        ...state,
        categoryProducts: action.payload.products,
      };

    case ActionType.SORT_PRODUCTS_BY_CATEGORY:
      return {...state, categoryProducts: action.payload};

    case ActionType.SEARCH_PRODUCTS:
      return {
        ...state,
        searchedProducts: action.payload,
        allData: action.allData,
      };

    case ActionType.LOAD_SEARCH_NEXT_PAGE:
      return {
        ...state,
        searchedProducts: [...state.searchedProducts, ...action.payload],
        allData: action.allData,
      };

    case ActionType.GET_BEST_SELLER:
      return {...state, bestSeller: action.payload};

    case ActionType.LOADING_STARTED:
      return {...state, loader: true};

    case ActionType.LOADING_END:
      return {...state, loader: false};

    case ActionType.GET_FAVORITES:
      return {...state, favorites: action.payload};

    case ActionType.ADD_TO_FAVORITE:
      return {...state, bestSeller: action.payload};

    case ActionType.ADD_OPTION_VALUE:
      let options: any = [...newState.selecedOptions];
      options = options.filter(
        (e: any) => e.product_option_id != action.payload.product_option_id,
      );
      options.push(action.payload);
      newState.selecedOptions = options;

      return {...state, selecedOptions: options};

    case ActionType.REMOVE_OPTION_VALUE:
      let optionsDel = [...newState.selecedOptions];
      options = optionsDel.filter(
        (e: any) => e.product_option_id != action.payload,
      );
      newState.selecedOptions = options;
      return {...state, selecedOptions: options};

    case ActionType.ADD_GROUP_OF_OPTION_VALUE:
      var optionsGroup = [...newState.selecedOptions];
      if (action.payload && action.payload.length > 0) {
        options = optionsGroup.filter(
          e => e.product_option_id != action.payload[0].product_option_id,
        );
        //options.concat(action.payload);
        newState.selecedOptions = [].concat(options, action.payload);
        return newState;
      }

    case ActionType.EMPTY_OPTIONS:
      return {...state, selecedOptions: []};

    case ActionType.SAVE_FILTERS:
      return {...state, filtersData: action.payload};

    default:
      return state;
  }
};
