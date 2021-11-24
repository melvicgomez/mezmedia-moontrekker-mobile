import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper';
import RegisterDeviceToken from './RegisterDeviceToken';
import UnregisterDeviceToken from './UnregisterDeviceToken';

// This state is common to all the "user" module, and can be modified by any "user" reducers
const sliceInitialState = {
  item: {},
};

export default buildSlice(
  'fcm_token',
  [RegisterDeviceToken, UnregisterDeviceToken],
  sliceInitialState,
).reducer;
