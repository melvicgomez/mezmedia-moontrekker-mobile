// this is the reducer file
import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper';
import FetchRaceDetail from '@/Services/Race/FetchRaceDetail';

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('race/detail', FetchRaceDetail),
  reducers: buildAsyncReducers({
    errorKey: 'error',
    loadingKey: 'loading',
  }),
};
