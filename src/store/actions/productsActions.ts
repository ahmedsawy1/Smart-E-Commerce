import {GetCookie} from '../../constants/helpers';
import {axiosAPI, headers} from '../../api/config';
import {ActionType} from '../types/types';
import {store} from '../store';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import {t} from 'i18next';
import {Dispatch} from 'react';
import {IDispatch} from '../../constants/interfaces';

export const StartLoading = () => {
  return {type: ActionType.LOADING_STARTED, payload: null};
};

export const EndLoading = () => {
  return {type: ActionType.LOADING_END, payload: null};
};

export const getHomeLayout = () => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const cookie = await GetCookie();
      const {data} = await axios.get(
        `https://www.tumerfashion.com/shop/index.php?route=ocapi/home&cookie=${cookie}`,
        {
          headers: {
            ...headers,
          },
        },
      );
      console.log('getHomeLayout Success');

      dispatch({
        type: ActionType.GET_LAYOUT,
        payload: data,
      });

      if (data.hasOwnProperty('Error')) {
        console.log(' getHomeLayout Error');
      }
    } catch (error) {
      console.log('=================getHomeLayout error===================');
      console.log(error);
    }
  };
};

export const getBestSellerProducts = () => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();
    try {
      dispatch(StartLoading());

      let response = await axiosAPI.get(
        `/ocapi/product/special&page=1&cookie=${cookie}`,
      );

      dispatch({
        type: ActionType.GET_BEST_SELLER,
        payload: response.data.products,
      });
      dispatch(EndLoading());
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};

export const saveSearchInput = (payload: string) => ({
  type: ActionType.SAVE_SEARCH_INPUT,
  payload,
});

export const searchProducts = (inputSearch: string) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();
    try {
      dispatch(StartLoading());

      let response = await axiosAPI.get(
        `/ocapi/product/search&search=${inputSearch}&page=1&limit=6&cookie=${cookie}`,
      );

      dispatch({
        type: ActionType.SEARCH_PRODUCTS,
        payload: response.data.products,
        allData: response.data,
      });

      dispatch(EndLoading());
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};
export const searchResultsNextPage = (inputSearch: string, page: number) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();
    try {
      let response = await axiosAPI.get(
        `/ocapi/product/search&search=${inputSearch}&page=${page}&limit=6&cookie=${cookie}`,
      );

      dispatch({
        type: ActionType.LOAD_SEARCH_NEXT_PAGE,
        payload: response.data.products,
        allData: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const sortSearchedProducts = (sortType: string, sortVal: string) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();
    try {
      dispatch(StartLoading());
      const searchInput = store.getState().productsReducer.allData.search;

      let response = await axiosAPI.get(
        `/ocapi/product/search&search=${searchInput}&sort=p.${sortType}&order=${sortVal}&cookie=${cookie}`,
      );

      dispatch({
        type: ActionType.SEARCH_PRODUCTS,
        payload: response.data.products,
        allData: response.data,
      });

      dispatch(EndLoading());
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};

export const addToFavorites = (productID: number, reload: boolean = true) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();
    try {
      let {data} = await axiosAPI.post(
        `/account/wishlist/add&cookie=${cookie}`,
        {
          product_id: productID,
        },
      );

      // {
      //   reload && (await dispatch(getHomeLayout()));
      // }

      if (data.hasOwnProperty('success')) {
        showMessage({
          type: 'success',
          message: t('addedToFav'),
        });
      }

      // dispatch({
      //   type: ActionType.ADD_TO_FAVORITE,
      //   payload: data.products,
      // });
    } catch (error) {
      console.log('Err Add To Fav = ', error);
    }
  };
};

export const removeFromFavorites = (
  productID: number,
  reload: boolean = true,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();
    try {
      let {data} = await axiosAPI.get(
        `/account/wishlist&remove=${productID}&cookie=${cookie}`,
      );

      // {
      //   reload && (await dispatch(getHomeLayout()));
      // }

      if (data.hasOwnProperty('success')) {
        showMessage({
          type: 'success',
          message: t('removeFromFav'),
        });
      }

      // dispatch({
      //   type: ActionType.REMOVE_FROM_FAVORITE,
      //   payload: data.products,
      // });
    } catch (error) {}
  };
};

export const getFavorites = () => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();
    try {
      let response = await axiosAPI.get(`/ocapi/wishlist&cookie=${cookie}`);

      dispatch({
        type: ActionType.GET_FAVORITES,
        payload: response.data.products,
      });
    } catch (error) {}
  };
};

export const getMoreProducts = (code: string) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();

    try {
      let path =
        code == 'special'
          ? 'ocapi/product/special'
          : code == 'featured'
          ? 'ocapi/product/special'
          : code == 'latest'
          ? 'ocapi/product/allproduct'
          : code === 'featured'
          ? 'ocapi/product/bestseller'
          : null;

      let {data} = await axiosAPI.get(`${path}&limit=10&cookie=${cookie}`);

      console.log(data.products);

      dispatch({
        type: ActionType.GET_MORE_PRODUCTS,
        payload: data.products,
        allData: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadMoreProductsNextPage = (code: string, page: number) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();

    try {
      let path =
        code == 'special'
          ? 'ocapi/product/special'
          : code == 'featured'
          ? 'ocapi/product/special'
          : code == 'latest'
          ? 'ocapi/product/allproduct'
          : code === 'featured'
          ? 'ocapi/product/bestseller'
          : null;

      let {data} = await axiosAPI.get(
        `${path}&page=${page}&limit=10&cookie=${cookie}`,
      );

      dispatch({
        type: ActionType.LOAD_MORE_PRODUCTS_NEXT_PAGE,
        payload: data.products,
        allData: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCategoriesLayout = () => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      let cookie = await GetCookie();
      const {data} = await axios.get(
        `https://www.tumerfashion.com/shop/index.php?route=ocapi/categories&cookie=${cookie}`,
        {
          headers: {
            ...headers,
          },
        },
      );

      dispatch({
        type: ActionType.GET_CATEGORIES,
        payload: data.content_top.modules[0].data.categories,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getSingleProduct = (id: number, hasLoader: boolean = true) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();
    {
      hasLoader && dispatch(StartLoading());
    }
    try {
      let {data} = await axiosAPI.get(
        `/ocapi/product/product&product_id=${id}&cookie=${cookie}`,
      );

      dispatch({
        type: ActionType.GET_SINGLE_PRODUCT,
        payload: data.product,
      });
      dispatch(EndLoading());
    } catch (error) {
      dispatch(EndLoading());
      console.log({error});
    }
  };
};

export const getSingleCategory = (id: number, noLoader?: boolean) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();

    try {
      !noLoader && dispatch(StartLoading());
      let {data} = await axiosAPI.get(
        `ocapi/product/category&path=${id}&limit=10&cookie=${cookie}`,
      );
      data.category_id = id;

      dispatch({
        type: ActionType.GET_PRODUCTS_BY_CATEGORY,
        payload: data,
      });
      dispatch(EndLoading());
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};

// export const loadCategoryNextPage = (id, sort, order, page, filters, cb) => {
export const loadCategoryNextPage = (id: number, page: number) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();

    // dispatch(StartLoading());
    try {
      // let filter = '';
      // if (typeof filters !== 'undefined') {
      //    if (filters.length > 0) filter = `&filter=${filters.join(',')}`;
      // }

      let {data} = await axiosAPI.get(
        //  `ocapi/product/category&path=${id}${filter}&page=${page}&limit=10&sort=${sort}&order=${order}&cookie=${cookie}`
        `ocapi/product/category&path=${id}&page=${page}&limit=10&cookie=${cookie}`,
      );
      data.category_id = id;
      dispatch({type: ActionType.LOAD_CATEOGRY_NEXT_PAGE, payload: data});
      // cb && cb()
    } catch (error) {
      console.log(error);
    }
  };
};

export const getSecondaryCategory = (id: number, noLoader?: boolean) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();

    try {
      !noLoader && dispatch(StartLoading());
      let {data} = await axiosAPI.get(
        // `ocapi/product/category&path=${id}&limit=10&cookie=${cookie}`,
        `ocapi/product/category&path=${59}_${id}&cookie=${cookie}`,
      );
      data.category_id = id;

      dispatch({
        type: ActionType.GET_PRODUCTS_BY_CATEGORY_SECONDARY,
        payload: data,
      });
      dispatch(EndLoading());
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};

export const sortSingleCategory = (
  id: number,
  sortType: string,
  sortVal: string,
) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();

    try {
      dispatch(StartLoading());
      let {data} = await axiosAPI.get(
        `ocapi/product/category&path=${id}&sort=p.${sortType}&order=${sortVal}&cookie=${cookie}`,
      );
      data.category_id = id;

      dispatch({
        type: ActionType.SORT_PRODUCTS_BY_CATEGORY,
        payload: data.products,
      });
      dispatch(EndLoading());
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};

export const getProductReviews = (productID: number) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();
    try {
      let {data} = await axiosAPI.get(
        `/ocapi/product/product/review&product_id=${productID}&cookie=${cookie}`,
      );

      dispatch({
        type: ActionType.GET_REVIEWS,
        payload: data,
      });
    } catch (error) {}
  };
};

export const addReview = (productID: number, rating: {}, cb: () => void) => {
  return async () => {
    const cookie = await GetCookie();

    const {data} = await axiosAPI.post(
      `/ocapi/product/product/write&product_id=${productID}&cookie=${cookie}`,
      rating,
    );

    if (data.hasOwnProperty('success')) {
      showMessage({
        type: 'success',
        message: data.success,
      });
      cb();
    }
    if (data.hasOwnProperty('error')) {
      showMessage({
        type: 'danger',
        message: data.error,
      });
    }
  };
};

export const getComparePage = (showLoader = true) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();

    {
      showLoader && dispatch(StartLoading());
    }
    try {
      let {data} = await axiosAPI.get(`ocapi/product/compare&cookie=${cookie}`);

      if (data.hasOwnProperty('success')) {
      }

      dispatch({
        type: ActionType.GET_COMPARE,
        payload: data.products,
      });
      dispatch(EndLoading());
    } catch (error) {
      console.log(error);

      dispatch(EndLoading());
    }
  };
};

export const addToCompare = (id: number) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();

    try {
      let {data} = await axiosAPI.post(`product/compare/add&cookie=${cookie}`, {
        product_id: id,
      });

      if (data.hasOwnProperty('success')) {
        showMessage({
          type: 'success',
          message: t('addedToCompare'),
        });

        dispatch(getComparePage(false));
      } else {
        showMessage({
          type: 'danger',
          message: t('addedToCompareError'),
        });
      }
    } catch (error) {
      showMessage({
        type: 'danger',
        message: t('addedToCompareError'),
      });
    }
  };
};

export const removeFromCompare = (id: number) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();

    try {
      let {data} = await axiosAPI.get(
        `ocapi/product/compare&remove=${id}&cookie=${cookie}`,
      );

      console.log(data);
    } catch (error) {}
  };
};

export const SetGroupOfProductOption = (data: any) => {
  return {type: ActionType.ADD_GROUP_OF_OPTION_VALUE, payload: data};
};

export const setProductOption = (
  product_option_id: number,
  option_value_id: number,
) => {
  return {
    type: ActionType.ADD_OPTION_VALUE,
    payload: {product_option_id, option_value_id},
  };
};

export const removeProductOption = (product_option_id: number) => {
  return {type: ActionType.REMOVE_OPTION_VALUE, payload: product_option_id};
};

export const emptyOptions = () => {
  return {type: ActionType.EMPTY_OPTIONS};
};

export const fetchSingleCategoryByFilter = (id: number, filter: string) => {
  let filterby = filter.split('-')[0];
  let order = filter.split('-')[1];

  return async (dispatch: Dispatch<IDispatch>) => {
    let cookie = await GetCookie();
    //  dispatch(LoadSingleCategory({})); //Clear the current data
    dispatch(StartLoading());

    try {
      let response = await axiosAPI.get(
        `product/category&path=${id}&&limit=10&page=1&cookie=${cookie}&sort=${filterby}&order=${order}`,
      );
      let data = response.data;
      data.category_id = id;
      // dispatch(LoadSingleCategory(data));

      dispatch(EndLoading());
    } catch (error) {
      dispatch(EndLoading());
    }
  };
};

export const saveFilters = (payload: any) => ({
  type: ActionType.SAVE_FILTERS,
  payload,
});
