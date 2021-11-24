// this is the reducer file
import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper';
import FetchLeaderboard from '@/Services/Leaderboard/FetchLeaderboard';

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('leaderboard/ranking', FetchLeaderboard),
  reducers: {
    ...buildAsyncReducers({
      errorKey: 'error',
      loadingKey: 'loading',
      itemKey: 'item',
    }),
    fulfilled: (state, { payload, type }) => {
      state.loading = false;
      state.error = null;
      let oldStateData = state.item?.data || [];
      const incomingNewData = payload.data;
      
      if (payload.current_page === 1) {
        oldStateData = [];
      }

      payload.data = [...oldStateData, ...incomingNewData];
      state.item = payload;
    },
  },
};
