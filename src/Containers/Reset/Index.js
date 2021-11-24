import React, { useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { navigateAndSimpleReset } from '@/Navigators/Root';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CONSTANTS from '@/Utilities/Constants';
import UserProfile from '@/Store/User/UserProfile';
import AuthenticationToken from '@/Store/AuthToken/AuthenticationToken';

function IndexResetPageContainer() {
  const dispatch = useDispatch();

  const memoizedCallback = useCallback(async () => {
    AsyncStorage.removeItem(CONSTANTS.ACTIVITY_START_TIME);
    AsyncStorage.removeItem(CONSTANTS.CREATED_ATTEMPT_ID_KEY);
    AsyncStorage.removeItem(CONSTANTS.ATTEMPT_STORAGE_KEY);
    AsyncStorage.removeItem(CONSTANTS.PROGRESS_STORAGE_KEY);
    AsyncStorage.removeItem(CONSTANTS.COMPLETE_STORAGE_KEY);
    AsyncStorage.removeItem(CONSTANTS.ACTIVITY_ATTEMPT_START_KEY);
    AsyncStorage.removeItem(CONSTANTS.ACTIVITY_ATTEMPT_COMPLETE_KEY);
    AsyncStorage.removeItem(CONSTANTS.ACTIVITY_ATTEMPT_PROGRESS_KEY);
    AsyncStorage.removeItem(CONSTANTS.PROGRESS_TO_RESUME);

    await dispatch(UserProfile.action({}));
    await dispatch(AuthenticationToken.action({}));
    navigateAndSimpleReset('Welcome');
  });
  useEffect(() => {
    memoizedCallback();
  }, []);

  return <View />;
}

export default IndexResetPageContainer;
