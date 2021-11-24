import api from '@/Services';
import { createFormData } from '@/Services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANTS from '@/Utilities/Constants';

export default async (params) => {
  const response = await api
    .post('api/progress', createFormData(params.data), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .catch((e) => console.log(e));

  if (!response) {
    await AsyncStorage.getItem(CONSTANTS.PROGRESS_STORAGE_KEY)
      .then((value) => JSON.parse(value))
      .then((pendingStoredProgress) => {
        pendingStoredProgress = [...(pendingStoredProgress || []), params.data];

        console.log(
          '>>>>>>>>>>>>>>STORED PENDING PROGRESS BECAUSE DEVICE IS OFFLINE. ',
          pendingStoredProgress.length,
        );
        AsyncStorage.setItem(
          CONSTANTS.PROGRESS_STORAGE_KEY,
          JSON.stringify(pendingStoredProgress),
        );
      });
  }

  if (!params.data.retrying) {
    await AsyncStorage.getItem(CONSTANTS.ACTIVITY_ATTEMPT_PROGRESS_KEY)
      .then((value) => JSON.parse(value))
      .then((storedProgress) => {
        storedProgress = [
          ...(storedProgress != null ? storedProgress : []),
          params.data,
        ];

        AsyncStorage.setItem(
          CONSTANTS.ACTIVITY_ATTEMPT_PROGRESS_KEY,
          JSON.stringify(storedProgress),
        );
      });
  }

  return params.data;
};
