import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper';
import userAuthenticationPost from '@/Services/Login/UserAuthentication';

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('auth/authentication', userAuthenticationPost),
  reducers: buildAsyncReducers({
    errorKey: 'error',
    loadingKey: 'loading',
  }),
};
