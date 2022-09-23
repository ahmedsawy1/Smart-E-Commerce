import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch, useState} from 'react';
import {Alert, Platform, Share} from 'react-native';
import {IDispatch} from './interfaces';
import Geolocation from 'react-native-geolocation-service';

export enum AsyncKeys {
  COOKIE = 'COOKIE',
  IS_LOGIN = 'IS_LOGIN',
  USER_DATA = 'USER_DATA',
  CUSTOMER_ID = 'CUSTOMER_ID',
  LANGUAGE = 'LANGUAGE',
  CURRENCY = 'CURRENCY',
  DEVICE_TOKEN = 'DEVICE_TOKEN',
  COUNTRY = 'COUNTRY',
  SKIPPED_KEY = 'SKIPPED_KEY',
}
export class PersistConfig {
  key: string;
  storage: import('@react-native-async-storage/async-storage').AsyncStorageStatic;
  whitelist?: any;
  constructor(key: string, ...whitelist: any) {
    this.key = key;
    this.storage = AsyncStorage;
    this.whitelist = [...whitelist];
  }
}

export const regex = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
export const regexSaudiNumber = new RegExp(
  /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
);

export const saveItem = async (key: string, data: object) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error: any) {
    console.log(error.message);
  }
  return false;
};

export const getItem = async (key: string) => {
  try {
    const retrievedItem: any = await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem);
    return item;
  } catch (error: any) {
    console.log(error.message);
  }
  return null;
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.log(error.message);
  }
  return false;
};

export const clear = async () => {
  await AsyncStorage.clear();
};

export async function SetCookie(cookie: object) {
  const res = await saveItem(AsyncKeys.COOKIE, cookie);
}

export async function GetCookie() {
  const cookie = await getItem(AsyncKeys.COOKIE);
  return cookie;
}

export async function SetCurrency(currency: object) {
  const Currency = await saveItem(AsyncKeys.CURRENCY, currency);
  return Currency;
}

export async function GetCurrency() {
  const currency = await getItem(AsyncKeys.CURRENCY);
  return currency;
}
export async function SetLanguage(language: string) {
  const lang = await saveItem(AsyncKeys.LANGUAGE, language);
  return lang;
}
export async function GetLanguage() {
  const lang = await getItem(AsyncKeys.LANGUAGE);
  if (lang === null) return 'ar';
  return lang;
}

export async function GetSkipLogin() {
  let skipped = await AsyncStorage.getItem(AsyncKeys.SKIPPED_KEY);
  if (skipped === null) return false;
  return Boolean(skipped);
}

/**
 * handel requests errors
 * @param errorMessage response error message
 * @param response response error
 * @returns actions
 */

export function RemoveHTMLFromString(encodedString: string) {
  var translate_re = /&(nbsp|amp|quot|lt|gt|br);/g;
  var translate: any = {
    nbsp: ' ',
    amp: '&',
    quot: '"',
    lt: '<',
    gt: '>',
    br: '</ br>',
  };
  return encodedString
    ?.replace(translate_re, function (match, entity) {
      return translate[entity];
    })
    ?.replace(/&#(\d+);/gi, function (match, numStr) {
      var num = parseInt(numStr, 10);
      return String.fromCharCode(num);
    });
}

export function normalizeText(text: string) {
  //remove special characters
  text = text.replace(
    /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g,
    '',
  );

  //normalize Arabic
  text = text.replace(/(آ|إ|أ)/g, 'ا');
  text = text.replace(/(ة)/g, 'ه');
  text = text.replace(/(ئ|ؤ)/g, 'ء');
  text = text.replace(/(ى)/g, 'ي');

  //convert arabic numerals to english counterparts.
  var starter = 0x660;
  for (var i = 0; i < 10; i++) {
    text.replace(String.fromCharCode(starter + i), String.fromCharCode(48 + i));
  }

  return text;
}

export const onShareFN = async (shareMessage: string) => {
  try {
    const result = await Share.share({
      message: shareMessage,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    Alert.alert(error.message);
    console.log(error);
  }
};

export function getAllUrlParams(url: string) {
  // get query string from url (optional) or window
  var queryString = url.split('?')[1];

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {
    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof a[1] === 'undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') {
        paramValue = paramValue.toLowerCase();
      }

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {
        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) {
          obj[key] = [];
        }

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string') {
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}
