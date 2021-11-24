// this is the reducer file
import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper';
import FetchWeatherWarning from '@/Services/WeatherWarning/FetchWeatherWarning';

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('fetch/weather_warning', FetchWeatherWarning),
  reducers: {
    ...buildAsyncReducers({
      errorKey: 'error',
      loadingKey: 'loading',
      itemKey: 'item',
    }),
    rejected: (state) => {
      // when error occured after fetching weather warning
      // set item.data to empty []
      state.item.data = [];
    },
  },
};
