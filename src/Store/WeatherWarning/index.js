import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper';
import GetWeatherWarning from './GetWeatherWarning';
import UpdateWeatherWarning from './UpdateWeatherWarning';

// initialize the reducer
// initialize the state
// everything will be inside `token`

// This state is common to all the "user" module, and can be modified by any "user" reducers
const sliceInitialState = {
  item: { data: [] },
};

export default buildSlice(
  'weatherWarning',
  [GetWeatherWarning, UpdateWeatherWarning],
  sliceInitialState,
).reducer;
