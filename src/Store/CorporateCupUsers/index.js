import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper';
import GetCorporateCupUsers from './GetCorporateCupUsers';

// initialize the reducer
// initialize the state
// everything will be inside `token`

// This state is common to all the "user" module, and can be modified by any "user" reducers
const sliceInitialState = {
  item: { data: [] },
};

export default buildSlice(
  'corporate_cup_users',
  [GetCorporateCupUsers],
  sliceInitialState,
).reducer;
