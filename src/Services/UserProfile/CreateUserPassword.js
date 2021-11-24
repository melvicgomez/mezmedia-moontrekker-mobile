import api from '@/Services';
import { navigateAndSimpleReset } from '@/Navigators/Root';
import { Platform } from 'react-native';

import RegisterDeviceToken from '@/Store/FCMNotification/RegisterDeviceToken';
import AuthenticationToken from '@/Store/AuthToken/AuthenticationToken';
import UserProfile from '@/Store/User/UserProfile';
import { PERMISSIONS, checkMultiple, RESULTS } from 'react-native-permissions';

import messaging from '@react-native-firebase/messaging';

export default async (params, { dispatch }) => {
  api.defaults.headers.common.Authorization = `Bearer ${params.token}`;

  const response = await api.post('api/create-password', {
    new_password: params.password,
  });
  console.log(response.data);
  if (response.status === 200) {
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
    checkMultiple(
      Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]
        : [
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ],
    )
      .then((statuses) => {
        if (Platform.OS === 'ios') {
          if (
            statuses[PERMISSIONS.IOS.CAMERA] !== RESULTS.GRANTED ||
            statuses[PERMISSIONS.IOS.CAMERA] !== RESULTS.LIMITED ||
            statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] !==
              RESULTS.GRANTED ||
            statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] !==
              RESULTS.LIMITED ||
            authStatus < 1
          ) {
            navigateAndSimpleReset('Permission Info');
          } else {
            navigateAndSimpleReset('Home');
          }
        } else {
          if (
            statuses[PERMISSIONS.ANDROID.CAMERA] !== RESULTS.GRANTED ||
            statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] ===
              RESULTS.GRANTED ||
            authStatus < 1
          ) {
            navigateAndSimpleReset('Permission Info');
          } else {
            navigateAndSimpleReset('Home');
          }
        }
      })
      .catch((error) => {
        console.log('Error: ', error);
        navigateAndSimpleReset('Home');
      });

    // navigateAndSimpleReset('Home');
  }
};
