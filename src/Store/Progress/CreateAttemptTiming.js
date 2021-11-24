// this is the reducer file
import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper';
import CreateAttemptTiming from '@/Services/Progress/CreateAttemptTiming';

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('progress/detail', CreateAttemptTiming),
  reducers: {
    ...buildAsyncReducers({
      errorKey: 'error',
      loadingKey: 'loading',
      itemKey: 'item',
    }),
    fulfilled: (state, { payload, type }) => {
      state.loading = false;
      state.error = null;
      state.item = [...state.item, payload];
    },
  },
};
