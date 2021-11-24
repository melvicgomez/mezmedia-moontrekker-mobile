import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper';
import FetchRaceDetail from './FetchRaceDetail';

// initialize the reducer
// initialize the state
// everything will be inside `token`

// This state is common to all the "user" module, and can be modified by any "user" reducers
const sliceInitialState = {
  item: {},
};

export default buildSlice('race', [FetchRaceDetail], sliceInitialState).reducer;
