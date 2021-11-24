import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  StatusBar,
  Dimensions,
  AppState,
} from 'react-native';
import { useTheme } from '@/Theme';
import { useSelector, useDispatch } from 'react-redux';
import { navigateAndSimpleReset, navigate } from '@/Navigators/Root';
import GetLocation from 'react-native-get-location';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CONSTANTS from '@/Utilities/Constants';
import AppBarComponent from '@/Components/AppBarComponent';
import PrimaryButtonComponent from '@/Components/PrimaryButtonComponent';
import CheckpointTrailCardComponent from '@/Components/CheckpointTrailCardComponent';
import ConfirmationPopupComponent from '@/Components/ConfirmationPopupComponent';
import QrCodeScannerComponent from '@/Components/QrCodeScannerComponent';
import TimerComponent from '@/Components/TimerComponent';
import CountdownComponent from '@/Components/CountdownComponent';
import LoadingOverlayComponent from '@/Components/LoadingOverlayComponent';
import CheckpointScanToastComponent from '@/Components/CheckpointScanToastComponent';
import WeatherWarningModalComponent from '@/Components/WeatherWarningModalComponent';
import WeatherWarningComponent from '@/Components/WeatherWarningComponent';

import Progress from '@/Store/Progress/CreateAttemptTiming';
import ProgressClear from '@/Store/Progress/ClearProgressHistory';
import Attempt from '@/Store/Attempt/StoreChallengeAttempt';
import AttemptClear from '@/Store/Attempt/ClearAttempt';

/**
 *
 * trailIndex: add in the navigation params or ?props? to bypass the current trailIndex when user re-open the app
 * current timestamp: store the timestamp of the device when we detected that app closed/crashed
 *                    In training/challenge, place the componentWillUnmount in the XXXXProgress container
 *
 */

function IndexTrainingProgressContainer({ navigation, route }) {
  const { Fonts, Gutters, Layout, Colors, MetricsSizes } = useTheme();

  const {
    startIndex,
    trailList,
    continueRace,
    prev_trail_index,
    prev_scanned_time,
    restoredStartTime,
  } = route.params;

  const appState = useRef(AppState.currentState);
  const stopTimerRef = useRef(false);
  const trailListRef = useRef([]);
  const startIndexRef = useRef(0);
  const prevProgressRef = useRef(null);
  const lastScannedTimeRef = useRef(moment.utc().format('YYYY-MM-DD HH:mm:ss'));
  const startedTimeRef = useRef(
    restoredStartTime || moment.utc().format('YYYY-MM-DD HH:mm:ss'),
  );

  const dispatch = useDispatch();

  const trainingData = useSelector((state) => state.training.item);
  const user = useSelector((state) => state.user.item);
  const userAttempt = useSelector((state) => state.attempt.item);
  const attemptLoading = useSelector((state) => state.attempt.loading);
  const progressLoading = useSelector((state) => state.progress.loading);

  const listRef = useRef();

  const [currentTrailIndex, setCurrentTrailIndex] = useState(trailList);
  const [startTrailIndex, setStartTrailIndex] = useState(startIndex);
  const [isStart, setIsStart] = useState(false);
  const [loading, setLoading] = useState(true);

  const [prevProgress, setPrevProgress] = useState(null);
  // const [attempt, setAttempt] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [scannerModalVisible, setScannerModalVisible] = useState(false);
  const [timerModalVisible, setTimerModalVisible] = useState(false);
  // const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [toastModalVisible, setToastModalVisible] = useState(false);
  const [quitModalVisible, setQuitModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const [disableQRScan, setDisableQRScan] = useState(false);

  // timer
  const [stopTimer, setStopTimer] = useState(true);
  const [lastScannedTime, setLastScannedTime] = useState(
    moment.utc().format('YYYY-MM-DD HH:mm:ss'),
  );

  const backHandlerRef = useRef(null);

  useEffect(() => {
    if (isStart) {
      backHandlerRef.current = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackButton,
      );
    }
  }, [isStart]);

  const handleBackButton = () => {
    return true;
  };

  useEffect(async () => {
    if (continueRace) {
      setIsStart(true);
      setStopTimer(false);
      setLastScannedTime(prev_scanned_time);
      setPrevProgress({
        trail_index: prev_trail_index,
        scanned_time: prev_scanned_time,
      });
    }

    StatusBar.setHidden(false);
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
      backHandlerRef.current && backHandlerRef.current.remove();
    };
  }, []);

  useEffect(() => {
    if (startIndex) {
      setStartTrailIndex(startIndex);
    }

    if (trailList) {
      setCurrentTrailIndex(trailList);
    }
  }, [startIndex, trailList]);

  const handleAppStateChange = async (nextAppState) => {
    appState.current = nextAppState;

    if (
      appState.current.match(/inactive|background/) &&
      !stopTimerRef.current
    ) {
      await AsyncStorage.setItem(
        CONSTANTS.PROGRESS_TO_RESUME,
        JSON.stringify({
          type: 'training',
          current_trail_index: trailListRef.current,
          start_trail_index: startIndexRef.current,
          prev_trail_index: prevProgressRef.current.trail_index,
          prev_scanned_time: prevProgressRef.current.scanned_time,
          app_background_timestamp: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
          start_time: startedTimeRef.current,
        }),
      );
    }
  };

  useEffect(() => {
    trailListRef.current = currentTrailIndex;
    startIndexRef.current = startTrailIndex;
    prevProgressRef.current = prevProgress;
    lastScannedTimeRef.current = lastScannedTime;
    stopTimerRef.current = stopTimer;
  }, [
    currentTrailIndex,
    startTrailIndex,
    prevProgress,
    lastScannedTime,
    stopTimer,
  ]);

  useEffect(() => {
    if (trainingData && !!Object.keys(trainingData).length) {
      setTimeout(() => setLoading(false), 500);
    }
  }, [trainingData]);

  // useEffect(() => {
  //   if (Object.keys(userAttempt).length) {
  //     setAttempt(userAttempt);
  //   }
  // }, [userAttempt]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  }, [currentTrailIndex]);

  const takePhoto = (uri, selectedTrail) => {
    // setLoadingModalVisible(true);

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(async (location) => {
        const image = uri;
        if (!isStart) {
          await dispatch(ProgressClear.action([]));
          await dispatch(AttemptClear.action({}));
          startTraining();
        } else {
          const trail = trainingData.trails.find(
            (t) => t.trail_index === selectedTrail,
          );
          handleScanTrail('photo', trail, '', image, location);
        }
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
        setErrorModalVisible(true);
      });
  };

  const scanQr = (value) => {
    // setLoadingModalVisible(true);

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(async (location) => {
        const qrCode = value.data;
        const trailScanned = trainingData.trails.find(
          (t) => t.station_qr_value === qrCode,
        );

        if (trailScanned) {
          const isSkipped = !trainingData.trails
            .filter((t) =>
              currentTrailIndex.length > 1
                ? t.trail_index === currentTrailIndex[0] ||
                  t.trail_index === currentTrailIndex[1]
                : t.trail_index === currentTrailIndex[0],
            )
            .find((t) => t.station_qr_value === trailScanned.station_qr_value);

          if (!isStart) {
            if (currentTrailIndex.includes(trailScanned.trail_index)) {
              await dispatch(ProgressClear.action([]));
              await dispatch(AttemptClear.action({}));
              startTraining();
            } else {
              // setLoadingModalVisible(false);
              setModalVisible(true);
            }
          } else if (trailScanned.trail_index === prevProgress.trail_index) {
            // setLoadingModalVisible(false);
            setModalVisible(true);
          } else if (!isSkipped) {
            handleScanTrail('qr', trailScanned, qrCode, '', location);
          } else if (isSkipped) {
            handleSkipCheckpoint(trailScanned, qrCode, location);
          } else {
            // setLoadingModalVisible(false);
            setModalVisible(true);
          }
        } else {
          // setLoadingModalVisible(false);
          setModalVisible(true);
        }
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
        setErrorModalVisible(true);
      });
  };

  const handleScanTrail = async (
    type,
    trailScanned,
    qrCode = '',
    image = '',
    gps,
  ) => {
    const currentTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    setLastScannedTime(currentTime);

    const attemptRecord = await AsyncStorage.getItem(
      CONSTANTS.CREATED_ATTEMPT_ID_KEY,
    ).then((value) => JSON.parse(value));

    // send this data to save checkpoint timing
    let data = {
      attempt_id: userAttempt?.attempt_id || attemptRecord?.attempt_id,
      challenge_id: 2,
      user_id: user.user_id,
      start_trail_id: prevProgress.trail_index,
      end_trail_id: trailScanned.trail_index,
      description: `Checkpoint ${prevProgress.trail_index} to ${trailScanned.trail_index}`,
      moontrekker_point_received: trailScanned.moontrekker_point,
      distance: trailScanned.distance,
      started_at: prevProgress.scanned_time,
      ended_at: currentTime,
      duration: moment
        .utc(currentTime)
        .diff(moment.utc(prevProgress.scanned_time), 'seconds', false),
      submitted_at: currentTime,
    };

    if (gps) {
      data.longitude = gps.longitude;
      data.latitude = gps.latitude;
    }

    if (type === 'photo') {
      data.submitted_image = image;
    } else {
      data.scanned_qr_code = qrCode;
    }
    await dispatch(Progress.action({ data: data }));

    setPrevProgress({
      trail_index: trailScanned.trail_index,
      scanned_time: currentTime,
    });
    let list = getNextTrails(trailScanned.trail_index);
    setCurrentTrailIndex(list);
    // setLoadingModalVisible(false);
    setToastModalVisible(true);
  };

  const handleSkipCheckpoint = async (trailScanned, qrCode, gps) => {
    const currentTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    setLastScannedTime(currentTime);

    let prevRecord = prevProgress;
    let index = 0;
    const totalSkip =
      trailScanned.trail_index < prevProgress.trail_index
        ? prevProgress.trail_index - trailScanned.trail_index
        : trailScanned.trail_index - prevProgress.trail_index;

    do {
      let tempTrail =
        index === totalSkip - 1
          ? trainingData.trails.find(
              (t) => t.trail_index === trailScanned.trail_index,
            )
          : trainingData.trails.find(
              (t) =>
                t.trail_index ===
                (trailScanned.trail_index < prevProgress.trail_index
                  ? prevRecord.trail_index - 1
                  : prevRecord.trail_index + 1),
            );

      const attemptRecord = await AsyncStorage.getItem(
        CONSTANTS.CREATED_ATTEMPT_ID_KEY,
      ).then((value) => JSON.parse(value));

      // send this data to save checkpoint timing
      let data = {
        attempt_id: userAttempt?.attempt_id || attemptRecord?.attempt_id,
        challenge_id: 2,
        user_id: user.user_id,
        start_trail_id: prevRecord.trail_index,
        end_trail_id: tempTrail.trail_index,
        description: `Checkpoint ${prevRecord.trail_index} to ${tempTrail.trail_index}`,
        scanned_qr_code: index === totalSkip - 1 ? qrCode : '',
        moontrekker_point_received: tempTrail.moontrekker_point,
        distance: tempTrail.distance,
        duration: moment
          .utc(currentTime)
          .diff(moment.utc(prevProgress.scanned_time), 'seconds', false),
        submitted_at: currentTime,
      };

      if (gps) {
        if (index === totalSkip - 1) {
          data.longitude = gps.longitude;
          data.latitude = gps.latitude;
        }
      }

      if (prevRecord.scanned_time) {
        data.started_at = prevRecord.scanned_time;
      }
      if (index === totalSkip - 1) {
        data.ended_at = currentTime;
      }
      await dispatch(Progress.action({ data: data }));

      prevRecord = {
        trail_index:
          trailScanned.trail_index < prevProgress.trail_index
            ? prevRecord.trail_index - 1
            : prevRecord.trail_index + 1,
        scanned_time: null,
      };
      index = index + 1;
    } while (index < totalSkip);

    setPrevProgress({
      trail_index: trailScanned.trail_index,
      scanned_time: currentTime,
    });
    let list = getNextTrails(trailScanned.trail_index);
    setCurrentTrailIndex(list);
    // setLoadingModalVisible(false);
    setToastModalVisible(true);
  };

  const startTraining = async () => {
    await AsyncStorage.removeItem(CONSTANTS.CREATED_ATTEMPT_ID_KEY);
    await AsyncStorage.removeItem(CONSTANTS.ATTEMPT_STORAGE_KEY);
    await AsyncStorage.removeItem(CONSTANTS.PROGRESS_STORAGE_KEY);
    await AsyncStorage.removeItem(CONSTANTS.COMPLETE_STORAGE_KEY);
    await AsyncStorage.removeItem(CONSTANTS.ACTIVITY_ATTEMPT_COMPLETE_KEY);
    await AsyncStorage.removeItem(CONSTANTS.ACTIVITY_ATTEMPT_PROGRESS_KEY);
    await AsyncStorage.removeItem(CONSTANTS.PROGRESS_TO_RESUME);

    const currentTime = moment
      .utc()
      // .add(12, 'seconds') // include countdown time?
      .format('YYYY-MM-DD HH:mm:ss');
    setLastScannedTime(currentTime);

    startedTimeRef.current = currentTime;

    await AsyncStorage.setItem(
      CONSTANTS.ACTIVITY_START_TIME,
      JSON.stringify({ started_at: currentTime }),
    );

    let data = {
      challenge_id: 2,
      user_id: user.user_id,
      started_at: currentTime,
      status: 'incomplete',
    };
    await dispatch(Attempt.action({ data: data }));

    setPrevProgress({
      trail_index: startTrailIndex,
      scanned_time: currentTime,
    });
    setTimerModalVisible(true);
    // setLoadingModalVisible(false);

    const list = getNextTrails(startTrailIndex);
    setCurrentTrailIndex(list);
    setStopTimer(false);
  };

  const quitTraining = async (skipNavigation = false) => {
    setStopTimer(true);
    const storedStartTime = await AsyncStorage.getItem(
      CONSTANTS.ACTIVITY_START_TIME,
    ).then((value) => JSON.parse(value));

    // setLoadingModalVisible(true);
    setQuitModalVisible(false);
    const currentTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');

    const tempProgress = await AsyncStorage.getItem(
      CONSTANTS.ACTIVITY_ATTEMPT_PROGRESS_KEY,
    ).then((value) => JSON.parse(value));

    const distanceRun = (tempProgress || []).reduce(
      (a, b) => a + b.distance,
      0,
    );
    const pointGained = (tempProgress || []).reduce(
      (a, b) => a + b.moontrekker_point_received,
      0,
    );

    const attemptRecord = await AsyncStorage.getItem(
      CONSTANTS.CREATED_ATTEMPT_ID_KEY,
    ).then((value) => JSON.parse(value));

    const data = {
      attempt_id: userAttempt?.attempt_id || attemptRecord?.attempt_id,
      total_distance: distanceRun,
      moontrekker_point: pointGained,
      status: (tempProgress || []).length ? 'complete' : 'incomplete',
      total_time: Math.abs(
        moment
          .utc(storedStartTime.started_at)
          .diff(moment.utc(currentTime), 'seconds', false),
      ),
      ended_at: currentTime,
    };
    await dispatch(Attempt.action({ data: data }));

    backHandlerRef.current.remove();

    // setLoadingModalVisible(false);
    if (!skipNavigation) {
      navigateAndSimpleReset('Training Complete');
    }
  };

  const getNextTrails = (trailIndex) => {
    if (trailIndex === 1) {
      return [trailIndex + 1];
    } else if (trailIndex === trainingData.trails.length) {
      return [trailIndex - 1];
    } else {
      return [trailIndex - 1, trailIndex + 1];
    }
  };

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <AppBarComponent
        title="Training"
        type="training"
        displayBack={false}
        displayMenu={false}
        showPoint={false}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={Gutters.largeVMargin}
        />
      ) : (
        <ScrollView
          bounces={false}
          style={Layout.fill}
          ref={listRef}
          contentContainerStyle={[
            Gutters.mediumBPadding,
            Gutters.regularHPadding,
          ]}
        >
          {isStart ? (
            <WeatherWarningModalComponent
              weatherWarningUpdate={() => {
                quitTraining(true);
              }}
              onQuitPress={() => {
                navigateAndSimpleReset('Training Complete');
              }}
            />
          ) : (
            <WeatherWarningComponent
              customViewStyles={{
                left: -MetricsSizes.regular,
                marginBottom: disableQRScan ? 20 : 0,
                width: Dimensions.get('window').width,
                zIndex: 1,
              }}
              hasWarning={(status) => {
                setDisableQRScan(status);
              }}
            />
          )}

          {!!isStart && (
            <TimerComponent
              title="MoonTrekker Training"
              stop={stopTimer}
              dismiss={() => quitTraining()}
              incomplete={false}
              lastScannedTime={lastScannedTime}
              startedTime={startedTimeRef.current}
            />
          )}
          {isStart && (
            <>
              <PrimaryButtonComponent
                label="END THE TRAINING SESSION"
                onPress={() => {
                  setQuitModalVisible(true);
                }}
                outerStyle={{
                  ...Gutters.regularHMargin,
                  ...Gutters.mediumBMargin,
                }}
              />
              <Text
                style={[Fonts.body, Fonts.textCenter, { color: Colors.white }]}
              >
                Last Checkpoint Scanned
              </Text>
              <Text
                style={[
                  Fonts.bodyBold,
                  Fonts.textCenter,
                  Gutters.mediumBMargin,
                  { color: Colors.white },
                ]}
              >
                Checkpoint {prevProgress.trail_index}{' '}
                {
                  trainingData.trails.find(
                    (t) => t.trail_index === prevProgress.trail_index,
                  ).title
                }
              </Text>
              <Text
                style={[
                  Fonts.h2,
                  Fonts.textCenter,
                  Gutters.mediumBMargin,
                  { color: Colors.yellow },
                ]}
              >
                NEXT CHECKPOINT IS
              </Text>
            </>
          )}

          {currentTrailIndex.map((index, i) => (
            <View key={i}>
              {i !== 0 ? (
                <Text
                  style={[
                    Fonts.h2,
                    Fonts.textCenter,
                    Gutters.mediumBMargin,
                    { color: Colors.yellow },
                  ]}
                >
                  OR
                </Text>
              ) : null}
              <CheckpointTrailCardComponent
                disableQRScan={disableQRScan}
                type="training"
                trail={trainingData.trails.find((t) => t.trail_index === index)}
                requireButton={true}
                isStartPoint={!isStart && index === startTrailIndex}
                isEndPoint={false}
                buttonAction={() => {
                  setScannerModalVisible(true);
                }}
                openIssueScreen={() => {
                  navigate('Qr Issue', {
                    trail: trainingData.trails.find(
                      (t) => t.trail_index === index,
                    ),
                    getPhotoUri: takePhoto,
                  });
                }}
              />
            </View>
          ))}

          {!isStart && (
            <PrimaryButtonComponent
              label="GO BACK"
              onPress={() => {
                navigation.goBack();
              }}
              buttonColor={Colors.bodyText}
              outerStyle={{
                ...Gutters.regularHMargin,
                ...Gutters.regularBMargin,
              }}
            />
          )}
          {isStart ? (
            <Text
              style={[
                Fonts.bodyBold,
                Fonts.textUnderline,
                Fonts.textCenter,
                Gutters.regularHMargin,
                { color: Colors.white },
              ]}
              onPress={() =>
                navigate('Checkpoint Miss', {
                  type: 'training',
                  challengeId: trainingData.challenge_id,
                  scanQr: scanQr,
                })
              }
            >
              I missed my checkpoint. What do I do?
            </Text>
          ) : null}
          <ConfirmationPopupComponent
            visibility={modalVisible}
            dismissModal={() => {
              setModalVisible(false);
            }}
            title="Invalid QR Code"
            message="Please make sure you have scanned the correct QR Code"
            actionRequired={false}
          />
          <QrCodeScannerComponent
            visibility={scannerModalVisible}
            dismissModal={() => setScannerModalVisible(false)}
            onSuccess={scanQr}
          />
          {timerModalVisible && (
            <CountdownComponent
              visibility={timerModalVisible}
              dismissModal={async () => {
                const currentTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
                setLastScannedTime(currentTime);
                startedTimeRef.current = currentTime;
                setPrevProgress((prevVal) => ({
                  ...prevVal,
                  scanned_time: currentTime,
                }));
                await AsyncStorage.setItem(
                  CONSTANTS.ACTIVITY_START_TIME,
                  JSON.stringify({ started_at: currentTime }),
                );

                setTimerModalVisible(false);
                setIsStart(true);
              }}
            />
          )}
          {!!toastModalVisible && (
            <CheckpointScanToastComponent
              visibility={toastModalVisible}
              dismissModal={() => setToastModalVisible(false)}
              checkpoint={trainingData.trails.find(
                (t) =>
                  t.trail_index ===
                  (prevProgress?.trail_index || startTrailIndex),
              )}
              nextCheckpoint={trainingData.trails.filter((t) =>
                currentTrailIndex.length > 1
                  ? t.trail_index === currentTrailIndex[0] ||
                    t.trail_index === currentTrailIndex[1]
                  : t.trail_index === currentTrailIndex[0],
              )}
              type="training"
            />
          )}
          <ConfirmationPopupComponent
            visibility={quitModalVisible}
            dismissModal={() => {
              setQuitModalVisible(false);
            }}
            title="End the Training Session"
            message="You will be ending the training session now. This cannot be undone. Confirm?"
            leftAction={() => quitTraining()}
            rightAction={() => setQuitModalVisible(false)}
          />
          <ConfirmationPopupComponent
            visibility={errorModalVisible}
            dismissModal={() => {
              setErrorModalVisible(false);
            }}
            title="Unable to detect current location"
            message="MoonTrekker uses your GPS location to ensure that you are at the correct checkpoints during the race and challenges. Please make sure that you have enable the GPS location"
            actionRequired={false}
          />
        </ScrollView>
      )}
      <LoadingOverlayComponent
        visibility={attemptLoading || progressLoading}
        // dismissModal={() => setLoadingModalVisible(false)}
      />
    </View>
  );
}

export default IndexTrainingProgressContainer;
