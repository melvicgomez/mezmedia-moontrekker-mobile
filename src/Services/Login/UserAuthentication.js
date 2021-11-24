import axiosInstance from '@/Services';
import { Config } from '@/Config';
import { Platform } from 'react-native';
import { navigateAndSimpleReset, navigate } from '@/Navigators/Root';
import AuthenticationToken from '@/Store/AuthToken/AuthenticationToken';
import UserProfile from '@/Store/User/UserProfile';
import RegisterDeviceToken from '@/Store/FCMNotification/RegisterDeviceToken';
import { PERMISSIONS, checkMultiple, RESULTS } from 'react-native-permissions';

import messaging from '@react-native-firebase/messaging';

export default async (params, { dispatch }) => {
  const response = await axiosInstance
    .post('api/login', {
      grant_type: Config.GRANT_TYPE,
      client_id: Config.CLIENT_ID,
      client_secret: Config.CLIENT_SECRET,
      scope: Config.SCOPE,
      username: params.email,
      password: params.password,
    })
    .catch((e) => e);

  if (response.status === 429) {
    return {
      error: {
        code: response.status,
        message: 'Too many attempts.',
        retry_after: response.headers['retry-after'],
      },
    };
  } else if (response.status === 200) {
    if (response.data.error) {
      return response.data;
    } else {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.data.data.token.access_token}`;
      // dispatch an action to update the token inside the store
      await dispatch(AuthenticationToken.action(response.data.data.token));
      await dispatch(UserProfile.action(response.data.data.user));
      await messaging()
        .getToken()
        .then((token) => {
          dispatch(
            RegisterDeviceToken.action({
              token,
            }),
          );
        });

      const authStatus = await messaging().hasPermission();
      let statuses = await checkMultiple(
        Platform.OS === 'ios'
          ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]
          : [
              PERMISSIONS.ANDROID.CAMERA,
              PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ],
      ).catch((error) => {
        console.log('Error: ', error);
        navigateAndSimpleReset('Home');
      });

      if (Platform.OS === 'ios') {
        if (
          (statuses[PERMISSIONS.IOS.CAMERA] !== RESULTS.GRANTED &&
            statuses[PERMISSIONS.IOS.CAMERA] !== RESULTS.LIMITED) ||
          (statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] !== RESULTS.GRANTED &&
            statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] !==
              RESULTS.LIMITED) ||
          authStatus < 1
        ) {
          navigateAndSimpleReset('Permission Info');
        } else {
          navigateAndSimpleReset('Home');
        }
      } else {
        if (
          statuses[PERMISSIONS.ANDROID.CAMERA] !== RESULTS.GRANTED ||
          statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] !==
            RESULTS.GRANTED ||
          authStatus < 1
        ) {
          navigateAndSimpleReset('Permission Info');
        } else {
          navigateAndSimpleReset('Home');
        }
      }
    }
  }
};
