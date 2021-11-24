import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper';
import UpdateInternetStatus from './UpdateInternetStatus';

// This state is common to all the "user" module, and can be modified by any "user" reducers
const sliceInitialState = {
  item: { isOnline: true },
};

export default buildSlice(
  'internet_status',
  [UpdateInternetStatus],
  sliceInitialState,
).reducer;
