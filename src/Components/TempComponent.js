import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANTS from '@/Utilities/Constants';

function TempComponent() {
  const userAttempt = useSelector((state) => state.attempt.item);

  const [ACTIVITY_START_TIME, SET_ACTIVITY_START_TIME] = useState(null);
  const [CREATED_ATTEMPT_ID_KEY, SET_CREATED_ATTEMPT_ID_KEY] = useState(null);
  const [ATTEMPT_STORAGE_KEY, SET_ATTEMPT_STORAGE_KEY] = useState(null);
  const [PROGRESS_STORAGE_KEY, SET_PROGRESS_STORAGE_KEY] = useState(null);
  const [COMPLETE_STORAGE_KEY, SET_COMPLETE_STORAGE_KEY] = useState(null);
  const [ACTIVITY_ATTEMPT_START_KEY, SET_ACTIVITY_ATTEMPT_START_KEY] =
    useState(null);
  const [ACTIVITY_ATTEMPT_COMPLETE_KEY, SET_ACTIVITY_ATTEMPT_COMPLETE_KEY] =
    useState(null);
  const [ACTIVITY_ATTEMPT_PROGRESS_KEY, SET_ACTIVITY_ATTEMPT_PROGRESS_KEY] =
    useState(null);
  const [PROGRESS_TO_RESUME, SET_PROGRESS_TO_RESUME] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(CONSTANTS.ACTIVITY_START_TIME).then((value) =>
      SET_ACTIVITY_START_TIME(value),
    );
    AsyncStorage.getItem(CONSTANTS.CREATED_ATTEMPT_ID_KEY).then((value) =>
      SET_CREATED_ATTEMPT_ID_KEY(value),
    );
    AsyncStorage.getItem(CONSTANTS.ATTEMPT_STORAGE_KEY).then((value) =>
      SET_ATTEMPT_STORAGE_KEY(value),
    );
    AsyncStorage.getItem(CONSTANTS.PROGRESS_STORAGE_KEY).then((value) =>
      SET_PROGRESS_STORAGE_KEY(value),
    );
    AsyncStorage.getItem(CONSTANTS.COMPLETE_STORAGE_KEY).then((value) =>
      SET_COMPLETE_STORAGE_KEY(value),
    );
    AsyncStorage.getItem(CONSTANTS.ACTIVITY_ATTEMPT_START_KEY).then((value) =>
      SET_ACTIVITY_ATTEMPT_START_KEY(value),
    );
    AsyncStorage.getItem(CONSTANTS.ACTIVITY_ATTEMPT_COMPLETE_KEY).then(
      (value) => SET_ACTIVITY_ATTEMPT_COMPLETE_KEY(value),
    );
    AsyncStorage.getItem(CONSTANTS.ACTIVITY_ATTEMPT_PROGRESS_KEY).then(
      (value) => SET_ACTIVITY_ATTEMPT_PROGRESS_KEY(value),
    );
    AsyncStorage.getItem(CONSTANTS.PROGRESS_TO_RESUME).then((value) =>
      SET_PROGRESS_TO_RESUME(value),
    );
  }, []);

  return (
    <View>
      <Text style={{ marginBottom: 10 }}>
        userAttempt {JSON.stringify(userAttempt)}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        ACTIVITY_START_TIME {ACTIVITY_START_TIME}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        CREATED_ATTEMPT_ID_KEY {CREATED_ATTEMPT_ID_KEY}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        ATTEMPT_STORAGE_KEY {ATTEMPT_STORAGE_KEY}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        PROGRESS_STORAGE_KEY {PROGRESS_STORAGE_KEY}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        COMPLETE_STORAGE_KEY {COMPLETE_STORAGE_KEY}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        ACTIVITY_ATTEMPT_START_KEY {ACTIVITY_ATTEMPT_START_KEY}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        ACTIVITY_ATTEMPT_COMPLETE_KEY {ACTIVITY_ATTEMPT_COMPLETE_KEY}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        ACTIVITY_ATTEMPT_PROGRESS_KEY {ACTIVITY_ATTEMPT_PROGRESS_KEY}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        PROGRESS_TO_RESUME {PROGRESS_TO_RESUME}
      </Text>
    </View>
  );
}

export default TempComponent;
