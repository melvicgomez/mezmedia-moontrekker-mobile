// this is the reducer file
import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper';
import CreateAttempt from '@/Services/Attempt/CreateAttempt';

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('attempt/detail', CreateAttempt),
  reducers: buildAsyncReducers({
    errorKey: 'error',
    loadingKey: 'loading',
  }),
};
