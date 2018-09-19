import thunk from 'redux-thunk';
import { getStore, setStore } from 'src/storeHelper';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { reducer as dataReducer } from './data/reducer';
import { reducer as navigatorsReducer } from './navigators/reducer';
import { middleware as navMiddleware } from './navigators';

const middlewares = [thunk, navMiddleware];
const enhancer = composeWithDevTools(
  {
    // Options: https://github.com/jhen0409/react-native-debugger#options
  },
)(applyMiddleware(...middlewares));

let store = getStore();

const persistConfig = {
  key: 'root',
  blacklist: ['nav'],
  storage
};

if (!store) {
  const reducers = combineReducers({
    nav: navigatorsReducer,
    data: dataReducer
  });

  const appReducer = persistReducer(persistConfig, reducers);

  store = createStore(
    appReducer,
    enhancer
  );

  setStore(store);

  persistStore(store);
}

export default store;

