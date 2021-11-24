import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper';
import StoreChallengeAttempt from './StoreChallengeAttempt';
import StoreSingleChallengeAttempt from './StoreSingleChallengeAttempt';
import GetAttemptWithProgressById from './GetAttemptWithProgressById';
import ClearAttempt from './ClearAttempt';

const sliceInitialState = {
  item: {},
};

export default buildSlice(
  'attempt',
  [
    StoreChallengeAttempt,
    ClearAttempt,
    StoreSingleChallengeAttempt,
    GetAttemptWithProgressById,
  ],
  sliceInitialState,
).reducer;
