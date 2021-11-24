// this is the reducer file
import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper';
import FetchAttemptById from '@/Services/Attempt/FetchAttemptById';

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions(
    'attempt/get_attempt_with_progress',
    FetchAttemptById,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'error',
    loadingKey: 'loading',
  }),
};
