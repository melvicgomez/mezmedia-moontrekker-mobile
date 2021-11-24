// this is the reducer file
import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper';
import api from '@/Services';

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('moontrekkerPoint/update', async (params) => {
    if (params.user_id) {
      const response = await api
        .get(`api/moontrekker-points-total?user_id=${params.user_id}`)
        .catch((e) => console.log(e));

      return response?.data || params.oldData || 0;
    } else {
      return 0;
    }
  }),
  reducers: buildAsyncReducers({
    errorKey: 'error',
    loadingKey: 'loading',
  }),
};
