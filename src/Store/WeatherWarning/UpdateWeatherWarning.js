// this is the reducer file
import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper';

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('update/weather_warning', async (args) => {
    console.log(args);
    return { data: [args] };
  }),
  reducers: buildAsyncReducers({
    errorKey: 'error',
    loadingKey: 'loading',
  }),
};
