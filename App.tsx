import {I18nManager} from 'react-native';
import React from 'react';

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import ar from './src/localization/ar';
import en from './src/localization/en';

import FlashMessage from 'react-native-flash-message';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {Fonts} from './src/styles/stylesConstants';

import AppInitializer from './src/screens/AppInitializer';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'Warning: Each child in a list should have a unique "key" prop.',
  "EventEmitter.removeListener('appStateDidChange', ...): Method has been deprecated. Please instead use `remove()` on the subscription returned by `EventEmitter.addListener`.",
]);

const {isRTL} = I18nManager;

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    ar: {
      translation: ar,
    },
    en: {
      translation: en,
    },
  },

  lng: isRTL ? 'ar' : 'en',
  fallbackLng: isRTL ? 'ar' : 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default function App() {
  return (
    <>
      <Provider store={store}>
        <AppInitializer />
      </Provider>

      <FlashMessage
        position="top"
        floating
        hideOnPress={true}
        style={{paddingTop: 15}}
        titleStyle={{
          fontFamily: Fonts.Medium,
          paddingTop: 10,
          textAlign: isRTL ? 'left' : 'right',
        }}
        textStyle={{
          fontFamily: Fonts.Medium,
        }}
      />
    </>
  );
}

// git status && git add . && git commit -m "Adding TicTok" && git push origin master
