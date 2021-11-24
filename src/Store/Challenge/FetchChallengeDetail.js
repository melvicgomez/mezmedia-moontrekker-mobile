// this is the reducer file
import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper';
import FetchChallengeDetail from '@/Services/Challenge/FetchChallengeDetail';

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('challenge/detail', FetchChallengeDetail),
  reducers: buildAsyncReducers({
    errorKey: 'error',
    loadingKey: 'loading',
  }),
};
