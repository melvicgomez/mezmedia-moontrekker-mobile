// this is the reducer file
import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper';
import moment from 'moment';

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('user/token', async (args) => {
    return {
      ...args,
      expires_at: moment(
        moment().add(args.expires_in, 'seconds'),
        'YYYY-M-D H:m',
      ).toISOString(),
    };
  }),
  reducers: buildAsyncReducers({
    errorKey: 'error',
    loadingKey: 'loading',
  }),
};
