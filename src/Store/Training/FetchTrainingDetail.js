// this is the reducer file
import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper';
import FetchTrainingDetail from '@/Services/Training/FetchTrainingDetail';

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('training/detail', FetchTrainingDetail),
  reducers: buildAsyncReducers({
    errorKey: 'error',
    loadingKey: 'loading',
  }),
};
