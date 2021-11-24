import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper';
import api from '@/Services';
import { Config } from '@/Config';
import messaging from '@react-native-firebase/messaging';

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('fcm_token/register', async (params) => {
    await api.get(`/api/fcm-token/${params.token}`);
    if (Config.ENVIRONMENT === 'PRODUCTION')
      messaging().subscribeToTopic('message_all_users');
    else messaging().subscribeToTopic('message_all_staging_users');
    return {};
  }),
  reducers: buildAsyncReducers({
    errorKey: 'error',
    loadingKey: 'loading',
  }),
};
