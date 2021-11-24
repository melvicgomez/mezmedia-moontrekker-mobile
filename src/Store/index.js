import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';

import startup from './Startup';
import user from './User';
import theme from './Theme';
import token from './AuthToken';
import auth from './Login';
import training from './Training';
import challenge from './Challenge';
import race from './Race';
import fcm_token from './FCMNotification';
import progress from './Progress';
import attempt from './Attempt';
import leaderboard from './Leaderboard';
import weatherWarning from './WeatherWarning';
import internetStatus from './InternetStatus';
import moontrekkerPoint from './MoontrekkerPoint';
import corporateCupUsers from './CorporateCupUsers';

import { encryptTransform } from 'redux-persist-transform-encrypt';

const reducers = combineReducers({
  startup,
  user,
  theme,
  token,
  auth,
  fcm_token,
  training,
  race,
  progress,
  attempt,
  leaderboard,
  weatherWarning,
  challenge,
  internetStatus,
  moontrekkerPoint,
  corporateCupUsers,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'theme',
    'token',
    'user',
    'race',
    'training',
    'weatherWarning',
    'challenge',
    'internetStatus',
    'moontrekkerPoint',
  ],
  transforms: [
    encryptTransform({
      secretKey: 'moontrekker',
      onError: function (error) {
        // Handle the error.
        console.log('persist error: ', error);
      },
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default;
      middlewares.push(createDebugger());
    }

    return middlewares;
  },
});

const persistor = persistStore(store);

export { store, persistor };
