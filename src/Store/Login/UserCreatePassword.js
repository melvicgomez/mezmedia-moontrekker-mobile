import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper';
import CreateUserPassword from '@/Services/UserProfile/CreateUserPassword';

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('user/create-password', CreateUserPassword),
  reducers: buildAsyncReducers({
    errorKey: 'error',
    loadingKey: 'loading',
  }),
};
