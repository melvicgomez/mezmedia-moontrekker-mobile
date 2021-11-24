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
 * trailNo: add in the navigation params or ?props? to bypass the current trailIndex when user re-open the app
 * current timestamp: store the timestamp of the device when we detected that app closed/crashed
 *                    In training/challenge, place the componentWillUnmount in the XXXXProgress container
 *
 */

function IndexChallengeEitherEndProgressContainer({ navigation, route }) {
  const { Fonts, Gutters, Layout, Colors, MetricsSizes } = useTheme();

  const {
    trailNo,
    continueRace,
    prev_trail_index,
    prev_scanned_time,
    restoredStartTime,
    selected_start_point,
  } = route.params;

  const appState = useRef(AppState.currentState);
  const stopTimerRef = useRef(false);
  const trailIndexRef = useRef(0);
  const prevProgressRef = useRef(null);
  const startPointRef = useRef(1);
  const lastScannedTimeRef = useRef(moment.utc().format('YYYY-MM-DD HH:mm:ss'));
  const startedTimeRef = useRef(
    restoredStartTime || moment.utc().format('YYYY-MM-DD HH:mm:ss'),
  );

  const dispatch = useDispatch();

  const challengeData = useSelector((state) => state.challenge.item);
  const user = useSelector((state) => state.user.item);

  const listRef = useRef();

  const [trail, setTrail] = useState(null);
  const [trailIndex, setTrailIndex] = useState(trailNo);
  const [loading, setLoading] = useState(true);
  const [disableQRScan, setDisableQRScan] = useState(false);

  // for either end challenge
  const [isStart, setIsStart] = useState(false);
  const [selectedStartPoint, setSelectedStartPoint] = useState(1); // to store user's selected start point

  const [prevProgress, setPrevProgress] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [scannerModalVisible, setScannerModalVisible] = useState(false);
  const [timerModalVisible, setTimerModalVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [toastModalVisible, setToastModalVisible] = useState(false);
  const [quitModalVisible, setQuitModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

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
      setSelectedStartPoint(selected_start_point);
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

  const handleAppStateChange = async (nextAppState) => {
    appState.current = nextAppState;

    if (
      appState.current.match(/inactive|background/) &&
      !stopTimerRef.current
    ) {
      console.log('CONSTANTS.PROGRESS_TO_RESUME', {
        type: challengeData.type,
        current_trail_index: trailIndexRef.current,
        prev_trail_index: prevProgressRef.current.trail_index,
        prev_scanned_time: prevProgressRef.current.scanned_time,
        app_background_timestamp: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        start_time: startedTimeRef.current,
        selected_start_point: startPointRef.current,
      });

      await AsyncStorage.setItem(
        CONSTANTS.PROGRESS_TO_RESUME,
        JSON.stringify({
          type: challengeData.type,
          current_trail_index: trailIndexRef.current,
          prev_trail_index: prevProgressRef.current.trail_index,
          prev_scanned_time: prevProgressRef.current.scanned_time,
          app_background_timestamp: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
          start_time: startedTimeRef.current,
          selected_start_point: startPointRef.current,
        }),
      );
    }
  };

  useEffect(() => {
    trailIndexRef.current = trailIndex;
    prevProgressRef.current = prevProgress;
    lastScannedTimeRef.current = lastScannedTime;
    stopTimerRef.current = stopTimer;
    startPointRef.current = selectedStartPoint;
  }, [
    trailIndex,
    prevProgress,
    lastScannedTime,
    stopTimer,
    selectedStartPoint,
  ]);

  useEffect(() => {
    setTrail(challengeData.trails.find((t) => t.trail_index === trailIndex));

    // if (selectedStartPoint === 1) {
    //   if (trailIndex !== 1 && trailIndex !== 2) {
    //     setToastModalVisible(true);
    //   }
    // } else {
    //   if (
    //     trailIndex !== challengeData.trails.length &&
    //     trailIndex !== challengeData.trails.length - 1
    //   ) {
    //     setToastModalVisible(true);
    //   }
    // }

    if (listRef.current) {
      listRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  }, [trailIndex]);

  useEffect(() => {
    if (challengeData && !!Object.keys(challengeData).length) {
      setLoading(false);
    }
  }, [challengeData]);

  const takePhoto = (uri) => {
    setLoadingModalVisible(true);

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(async (location) => {
        const image = uri;

        if (!isStart) {
          await dispatch(ProgressClear.action([]));
          await dispatch(AttemptClear.action({}));
          startChallenge();
        } else if (trailIndex !== selectedStartPoint) {
          handleScanTrail('qr', trail, '', image, location);
        }
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
        setLoadingModalVisible(false);
        setErrorModalVisible(true);
      });
  };

  const scanQr = (value) => {
    setLoadingModalVisible(true);

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(async (location) => {
        const qrCode = value.data;
        const trailScanned = challengeData.trails.find(
          (t) => t.station_qr_value === qrCode,
        );

        if (trailScanned) {
          if (!isStart) {
            if (trailScanned.trail_index === selectedStartPoint) {
              await dispatch(ProgressClear.action([]));
              await dispatch(AttemptClear.action({}));
              startChallenge();
            } else {
              setLoadingModalVisible(false);
              setModalVisible(true);
            }
          } else if (trailScanned.trail_index === trailIndex) {
            handleScanTrail('qr', trailScanned, qrCode, '', location);
          } else {
            setLoadingModalVisible(false);
            setModalVisible(true);
          }
        } else {
          setLoadingModalVisible(false);
          setModalVisible(true);
        }
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
        setLoadingModalVisible(false);
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

    const storedAttempt = await AsyncStorage.getItem(
      CONSTANTS.CREATED_ATTEMPT_ID_KEY,
    ).then((value) => JSON.parse(value));

    let data = {
      attempt_id: storedAttempt.attempt_id,
      challenge_id: challengeData.challenge_id,
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

    if (
      (selectedStartPoint === 1 &&
        trailIndex === challengeData.trails.length) ||
      (selectedStartPoint === challengeData.trails.length && trailIndex === 1)
    ) {
      completeChallenge(currentTime);
    } else {
      setLoadingModalVisible(false);
      setPrevProgress({
        trail_index: trailIndex,
        scanned_time: currentTime,
      });
      setTrailIndex((prevVal) =>
        selectedStartPoint === 1 ? prevVal + 1 : prevVal - 1,
      );
      setToastModalVisible(true);
    }
  };

  const startChallenge = async () => {
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
      challenge_id: challengeData.challenge_id,
      user_id: user.user_id,
      started_at: currentTime,
      status: 'incomplete',
    };
    await dispatch(Attempt.action({ data: data }));

    setPrevProgress({
      trail_index: selectedStartPoint,
      scanned_time: currentTime,
    });
    setTimerModalVisible(true);
    setLoadingModalVisible(false);
    setStopTimer(false);
  };

  const completeChallenge = async (scannedTime) => {
    setStopTimer(true);

    const storedStartTime = await AsyncStorage.getItem(
      CONSTANTS.ACTIVITY_START_TIME,
    ).then((value) => JSON.parse(value));

    const attemptRecord = await AsyncStorage.getItem(
      CONSTANTS.CREATED_ATTEMPT_ID_KEY,
    ).then((value) => JSON.parse(value));

    let completedTrails =
      selectedStartPoint === 1
        ? challengeData.trails
            .filter((t) => t.trail_index <= trailIndex)
            .slice(1)
        : challengeData.trails
            .filter((t) => t.trail_index >= trailIndex)
            .splice(0, challengeData.trails.length - 1);

    const distanceRun = completedTrails.reduce((a, b) => a + b.distance, 0);
    const pointGained = completedTrails.reduce(
      (a, b) => a + b.moontrekker_point,
      0,
    );

    const data = {
      attempt_id: attemptRecord?.attempt_id,
      total_distance: !challengeData.is_distance_required ? 0 : distanceRun,
      moontrekker_point: pointGained,
      status: 'complete',
      total_time: !challengeData.is_time_required
        ? 0
        : Math.abs(
            moment
              .utc(storedStartTime.started_at)
              .diff(moment.utc(scannedTime), 'seconds', false),
          ),
      ended_at: scannedTime,
    };

    await dispatch(Attempt.action({ data: data }));

    setLoadingModalVisible(false);
    backHandlerRef.current.remove();
    navigateAndSimpleReset('Challenge Complete');
  };

  const quitChallenge = async (skipNavigation = false) => {
    setLoadingModalVisible(true);
    setQuitModalVisible(false);
    setStopTimer(true);

    const storedStartTime = await AsyncStorage.getItem(
      CONSTANTS.ACTIVITY_START_TIME,
    ).then((value) => JSON.parse(value));

    const attemptRecord = await AsyncStorage.getItem(
      CONSTANTS.CREATED_ATTEMPT_ID_KEY,
    ).then((value) => JSON.parse(value));
    const currentTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');

    let completedTrails = challengeData.trails
      .filter((t) =>
        selectedStartPoint === 1
          ? t.trail_index <= prevProgress.trail_index
          : t.trail_index >= prevProgress.trail_index,
      )
      .slice(1);
    const distanceRun = completedTrails.reduce((a, b) => a + b.distance, 0);
    const pointGained = completedTrails.reduce(
      (a, b) => a + b.moontrekker_point,
      0,
    );

    const data = {
      attempt_id: attemptRecord?.attempt_id,
      total_distance: !challengeData.is_distance_required ? 0 : distanceRun,
      moontrekker_point: pointGained,
      status: 'incomplete',
      total_time: !challengeData.is_time_required
        ? 0
        : Math.abs(
            moment
              .utc(storedStartTime.started_at)
              .diff(moment.utc(currentTime), 'seconds', false),
          ),
      ended_at: currentTime,
    };
    await dispatch(Attempt.action({ data: data }));

    setLoadingModalVisible(false);
    backHandlerRef.current.remove();
    if (!skipNavigation) {
      navigateAndSimpleReset('Challenge Complete');
    }
  };

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <AppBarComponent
        title={challengeData.title}
        type="challenge"
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
          {trailIndex !== 1 ? (
            <WeatherWarningModalComponent
              weatherWarningUpdate={() => {
                quitChallenge(true);
              }}
              onQuitPress={() => {
                navigateAndSimpleReset('Challenge Complete');
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

          {!!challengeData.is_time_required &&
            isStart &&
            trailIndex !== selectedStartPoint && (
              <TimerComponent
                title={challengeData.title}
                stop={stopTimer}
                dismiss={() => quitChallenge()}
                incomplete={false}
                lastScannedTime={lastScannedTime}
                startedTime={startedTimeRef.current}
              />
            )}

          {trailIndex !== selectedStartPoint ? (
            <>
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
                  challengeData.trails.find(
                    (t) => t.trail_index === prevProgress.trail_index,
                  ).title
                }
              </Text>
              <Text
                style={[
                  Fonts.h2,
                  Fonts.textCenter,
                  !challengeData.is_time_required && Gutters.tinyTMargin,
                  Gutters.mediumBMargin,
                  { color: Colors.yellow },
                ]}
              >
                NEXT CHECKPOINT IS
              </Text>
            </>
          ) : null}

          <CheckpointTrailCardComponent
            disableQRScan={disableQRScan}
            type="challenge"
            trail={trail}
            requireButton={true}
            isStartPoint={!isStart ? true : false}
            isEndPoint={
              !isStart
                ? false
                : selectedStartPoint === 1
                ? trailIndex === challengeData.trails.length
                : trailIndex === 1
            }
            isSingleCheckpoint={false}
            buttonAction={() => {
              if (!isStart) {
                setSelectedStartPoint(1);
              }
              setScannerModalVisible(true);
            }}
            openIssueScreen={() =>
              navigate('Qr Issue', {
                trail: trail,
                getPhotoUri: takePhoto,
              })
            }
          />

          {!isStart && (
            <CheckpointTrailCardComponent
              disableQRScan={disableQRScan}
              type="challenge"
              trail={challengeData.trails.find(
                (t) => t.trail_index === challengeData.trails.length,
              )}
              requireButton={true}
              isStartPoint={true}
              isEndPoint={false}
              isSingleCheckpoint={false}
              buttonAction={() => {
                setSelectedStartPoint(challengeData.trails.length);
                setScannerModalVisible(true);
              }}
              openIssueScreen={() =>
                navigate('Qr Issue', {
                  trail: trail,
                  getPhotoUri: takePhoto,
                })
              }
            />
          )}

          <PrimaryButtonComponent
            label={isStart ? 'QUIT THE CHALLENGE' : 'GO BACK'}
            onPress={() => {
              if (isStart) {
                setQuitModalVisible(true);
              } else {
                navigation.goBack();
              }
            }}
            buttonColor={Colors.bodyText}
            outerStyle={Gutters.regularHMargin}
          />
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
                setTrailIndex(
                  selectedStartPoint === 1
                    ? selectedStartPoint + 1
                    : selectedStartPoint - 1,
                );
                setIsStart(true);
              }}
            />
          )}
          {!!toastModalVisible && (
            <CheckpointScanToastComponent
              visibility={toastModalVisible}
              dismissModal={() => setToastModalVisible(false)}
              checkpoint={challengeData.trails.find(
                (t) => t.trail_index === (prevProgress?.trail_index || trailNo),
              )}
              nextCheckpoint={[
                challengeData.trails.find((t) => t.trail_index === trailIndex),
              ]}
              type={challengeData.type}
            />
          )}
          <ConfirmationPopupComponent
            visibility={quitModalVisible}
            dismissModal={() => {
              setQuitModalVisible(false);
            }}
            title="Quit this Challenge"
            message="You are quitting this challenge. You will not be able to continue from where you left off. You will have to redo the challenge if you wish to try again. This cannot be undone. Confirm?"
            leftAction={() => quitChallenge()}
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
        visibility={loadingModalVisible}
        dismissModal={() => setLoadingModalVisible(false)}
      />
    </View>
  );
}

export default IndexChallengeEitherEndProgressContainer;
