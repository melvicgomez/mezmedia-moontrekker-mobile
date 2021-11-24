import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper';

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('internet_status/update', (params) => ({
    isOnline: params.isOnline,
  })),
  reducers: buildAsyncReducers({
    errorKey: 'error',
    loadingKey: 'loading',
  }),
};
