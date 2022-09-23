import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productsReducer from './reducers/productsReducer';
import authReducer from './reducers/authReducer';
import accountReducer from './reducers/accountReducer';
import initReducer from './reducers/initReducer';
import checkoutReducer from './reducers/checkoutReducer';

const authConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['userData', 'isSignedIn'],
};

const rootReducer = combineReducers({
  authReducer: persistReducer(authConfig, authReducer),
  productsReducer,
  accountReducer,
  initReducer,
  checkoutReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
