// this is the reducer file
import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper';
import FetchCorporateCupUsers from '@/Services/CorporateCupUsers/FetchCorporateCupUsers';

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions(
    'fetch/corporate_cup_users',
    FetchCorporateCupUsers,
  ),
  reducers: {
    ...buildAsyncReducers({
      errorKey: 'error',
      loadingKey: 'loading',
      itemKey: 'item',
    }),
    rejected: (state) => {
      // when error occured after fetching weather warning
      // set item.data to empty []
      state.item.data = [];
    },
  },
};
