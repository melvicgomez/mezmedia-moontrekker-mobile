import api from '@/Services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANTS from '@/Utilities/Constants';

export default async (params) => {
  const isActivityEnded =
    params.data.hasOwnProperty('attempt_id') &&
    params.data.hasOwnProperty('total_distance') &&
    params.data.hasOwnProperty('total_time') &&
    params.data.hasOwnProperty('ended_at');

  const response = await api
    .post('api/attempt', params.data)
    .catch((e) => console.log(e));

  if (!response) {
    console.log(`ATTEMPT PARAMS [${isActivityEnded}]: `, params.data);
    await AsyncStorage.setItem(
      isActivityEnded
        ? CONSTANTS.COMPLETE_STORAGE_KEY
        : CONSTANTS.ATTEMPT_STORAGE_KEY,
      JSON.stringify(params.data),
    );
    console.log(
      `STORED ATTEMPT BECAUSE DEVICE IS OFFLINE. [${
        isActivityEnded
          ? CONSTANTS.COMPLETE_STORAGE_KEY
          : CONSTANTS.ATTEMPT_STORAGE_KEY
      }]`,
    );
  }

  if (response && !isActivityEnded) {
    console.log(
      '>>>>>>>>>>>CONSTANTS.CREATED_ATTEMPT_ID_KEY',
      CONSTANTS.CREATED_ATTEMPT_ID_KEY,
    );
    await AsyncStorage.removeItem(CONSTANTS.ATTEMPT_STORAGE_KEY);
    await AsyncStorage.setItem(
      CONSTANTS.CREATED_ATTEMPT_ID_KEY,
      JSON.stringify(response.data.data),
    );
  }

  if (isActivityEnded) {
    const storedAttempt = await AsyncStorage.getItem(
      CONSTANTS.ACTIVITY_START_TIME,
    ).then((value) => JSON.parse(value));

    await AsyncStorage.setItem(
      CONSTANTS.ACTIVITY_ATTEMPT_COMPLETE_KEY,
      JSON.stringify({
        ...params.data,
        started_at: storedAttempt.started_at,
      }),
    );
    await AsyncStorage.removeItem(CONSTANTS.PROGRESS_TO_RESUME);
  } else {
    await AsyncStorage.setItem(
      CONSTANTS.ACTIVITY_ATTEMPT_START_KEY,
      JSON.stringify(params.data),
    );
  }

  if (response && isActivityEnded) {
    await AsyncStorage.removeItem(CONSTANTS.ATTEMPT_STORAGE_KEY);
    await AsyncStorage.removeItem(CONSTANTS.COMPLETE_STORAGE_KEY);
  }
  return response.data.data;
};
