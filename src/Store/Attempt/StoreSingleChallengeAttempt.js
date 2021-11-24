// this is the reducer file
import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper';
import CreateSingleChallengeAttempt from '@/Services/Attempt/CreateSingleChallengeAttempt';

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions(
    'attempt/single_detail',
    CreateSingleChallengeAttempt,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'error',
    loadingKey: 'loading',
  }),
};
