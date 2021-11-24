import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper';
import GetMoontrekkerPoint from './GetMoontrekkerPoint';

// This state is common to all the "user" module, and can be modified by any "user" reducers
const sliceInitialState = {
  item: 0,
};

export default buildSlice(
  'moontrekkerPoint',
  [GetMoontrekkerPoint],
  sliceInitialState,
).reducer;
