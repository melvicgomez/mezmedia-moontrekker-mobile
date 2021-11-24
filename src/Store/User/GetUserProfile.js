// this is the reducer file
import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper';
import getUserProfile from '@/Services/UserProfile/GetUserProfile';

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('user/get-profile', getUserProfile),
  reducers: buildAsyncReducers({
    errorKey: 'error',
    loadingKey: 'loading',
  }),
};
