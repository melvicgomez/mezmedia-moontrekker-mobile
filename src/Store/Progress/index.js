import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper';
import ClearProgressHistory from './ClearProgressHistory';
import CreateAttemptTiming from './CreateAttemptTiming';

const sliceInitialState = {
  item: [],
};

export default buildSlice(
  'progress',
  [ClearProgressHistory, CreateAttemptTiming],
  sliceInitialState,
).reducer;
