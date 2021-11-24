import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper';
import ChangeUserPassword from '@/Services/UserProfile/ChangeUserPassword';

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('user/change-password', ChangeUserPassword),
  reducers: buildAsyncReducers({
    errorKey: 'error',
    loadingKey: 'loading',
  }),
};
