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

function IndexRaceProgressContainer({ navigation, route }) {
  const { Fonts, Gutters, Layout, Colors, MetricsSizes } = useTheme();

  const {
    trailNo,
    continueRace,
    prev_trail_index,
    prev_scanned_time,
    restoredStartTime,
  } = route.params;

  const appState = useRef(AppState.currentState);
  const stopTimerRef = useRef(false);
  const trailIndexRef = useRef(0);
  const prevProgressRef = useRef(null);
  const lastScannedTimeRef = useRef(moment.utc().format('YYYY-MM-DD HH:mm:ss'));
  const startedTimeRef = useRef(
    restoredStartTime || moment.utc().format('YYYY-MM-DD HH:mm:ss'),
  );

  const dispatch = useDispatch();

  const raceData = useSelector((state) => state.race.item);
  const user = useSelector((state) => state.user.item);
  const userAttempt = useSelector((state) => state.attempt.item);

  const listRef = useRef();

  const [trail, setTrail] = useState(null);
  const [trailIndex, setTrailIndex] = useState(trailNo);
  const [loading, setLoading] = useState(true);
  const [disableQRScan, setDisableQRScan] = useState(false);

  const [prevProgress, setPrevProgress] = useState(null);
  const [attempt, setAttempt] = useState(null);
  const [isStart, setIsStart] = useState(false);

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
      await AsyncStorage.setItem(
        CONSTANTS.PROGRESS_TO_RESUME,
        JSON.stringify({
          type: 'race',
          current_trail_index: trailIndexRef.current,
          prev_trail_index: prevProgressRef.current.trail_index,
          prev_scanned_time: prevProgressRef.current.scanned_time,
          app_background_timestamp: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
          start_time: startedTimeRef.current,
        }),
      );
    }
  };

  useEffect(() => {
    trailIndexRef.current = trailIndex;
    prevProgressRef.current = prevProgress;
    lastScannedTimeRef.current = lastScannedTime;
    stopTimerRef.current = stopTimer;
  }, [trailIndex, prevProgress, lastScannedTime, stopTimer]);

  useEffect(() => {
    setTrail(raceData.trails.find((t) => t.trail_index === trailIndex));

    if (listRef.current) {
      listRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }

    if (trailIndex !== 1) {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    }

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  }, [trailIndex]);

  useEffect(() => {
    if (raceData && !!Object.keys(raceData).length) {
      setLoading(false);
    }
  }, [raceData]);

  useEffect(() => {
    if (userAttempt && Object.keys(userAttempt).length) {
      setAttempt(userAttempt);
    }
  }, [userAttempt]);

  const takePhoto = (uri) => {
    setLoadingModalVisible(true);

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(async (location) => {
        const image = uri;

        if (trailIndex === 1) {
          await dispatch(ProgressClear.action([]));
          await dispatch(AttemptClear.action({}));
          startRace();
        } else {
          handleScanTrail('photo', trail, '', image, location);
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
        const trailScanned = raceData.trails.find(
          (t) => t.station_qr_value === qrCode,
        );

        if (trailScanned) {
          if (trailIndex === 1 && trailScanned.trail_index === trailIndex) {
            await dispatch(ProgressClear.action([]));
            await dispatch(AttemptClear.action({}));
            startRace();
          } else if (
            trailIndex !== 1 &&
            trailScanned.trail_index === trailIndex
          ) {
            handleScanTrail('qr', trailScanned, qrCode, '', location);
          } else if (
            trailIndex !== 1 &&
            trailScanned.trail_index > trailIndex
          ) {
            handleSkipCheckpoint(trailScanned, qrCode, location);
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

    const attemptRecord = await AsyncStorage.getItem(
      CONSTANTS.CREATED_ATTEMPT_ID_KEY,
    ).then((value) => JSON.parse(value));

    // send this data to save checkpoint timing
    let data = {
      attempt_id: attempt?.attempt_id || attemptRecord?.attempt_id,
      challenge_id: 1,
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

    if (trailIndex === raceData.trails.length) {
      completeRace(currentTime);
    } else {
      setLoadingModalVisible(false);
      setPrevProgress({
        trail_index: trailIndex,
        scanned_time: currentTime,
      });
      setTrailIndex((prevVal) => prevVal + 1);
      setToastModalVisible(true);
    }
  };

  const handleSkipCheckpoint = async (trailScanned, qrCode, gps) => {
    const currentTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    setLastScannedTime(currentTime);

    const totalSkip = trailScanned.trail_index - prevProgress.trail_index;
    let prevRecord = prevProgress;
    let index = 0;

    do {
      let tempTrail =
        index === totalSkip - 1
          ? raceData.trails.find(
              (t) => t.trail_index === trailScanned.trail_index,
            )
          : raceData.trails.find(
              (t) => t.trail_index === prevRecord.trail_index + 1,
            );

      const attemptRecord = await AsyncStorage.getItem(
        CONSTANTS.CREATED_ATTEMPT_ID_KEY,
      ).then((value) => JSON.parse(value));

      // send this data to save checkpoint timing
      let data = {
        attempt_id: attempt?.attempt_id || attemptRecord?.attempt_id,
        challenge_id: 1,
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
        trail_index: prevRecord.trail_index + 1,
        scanned_time: null,
      };

      index = index + 1;
    } while (index < totalSkip);

    if (trailScanned.trail_index === raceData.trails.length) {
      completeRace(currentTime);
    } else {
      setLoadingModalVisible(false);
      setPrevProgress({
        trail_index: trailScanned.trail_index,
        scanned_time: currentTime,
      });
      setTrailIndex(trailScanned.trail_index + 1);
      setToastModalVisible(true);
    }
  };

  const startRace = async () => {
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
      challenge_id: 1,
      user_id: user.user_id,
      started_at: currentTime,
      status: 'incomplete',
    };
    await dispatch(Attempt.action({ data: data }));

    setPrevProgress({
      trail_index: trailIndex,
      scanned_time: currentTime,
    });
    setTimerModalVisible(true);
    setLoadingModalVisible(false);
    setStopTimer(false);
  };

  const completeRace = async (scannedTime) => {
    setStopTimer(true);
    const storedStartTime = await AsyncStorage.getItem(
      CONSTANTS.ACTIVITY_START_TIME,
    ).then((value) => JSON.parse(value));

    const completedTrails = raceData.trails.slice(1);
    const distanceRun = completedTrails.reduce((a, b) => a + b.distance, 0);
    const pointGained = completedTrails.reduce(
      (a, b) => a + b.moontrekker_point,
      0,
    );

    const attemptRecord = await AsyncStorage.getItem(
      CONSTANTS.CREATED_ATTEMPT_ID_KEY,
    ).then((value) => JSON.parse(value));

    // send this data to save checkpoint timing
    let data = {
      attempt_id: attempt?.attempt_id || attemptRecord?.attempt_id,
      total_distance: distanceRun,
      moontrekker_point: pointGained,
      status: 'complete',
      total_time: Math.abs(
        moment
          .utc(storedStartTime.started_at)
          .diff(moment.utc(scannedTime), 'seconds', false),
      ),
      ended_at: scannedTime,
    };
    await dispatch(Attempt.action({ data: data }));

    setLoadingModalVisible(false);
    backHandlerRef.current.remove();
    navigateAndSimpleReset('Race Complete');
  };

  const quitRace = async (skipNavigation = false) => {
    setStopTimer(true);
    const storedStartTime = await AsyncStorage.getItem(
      CONSTANTS.ACTIVITY_START_TIME,
    ).then((value) => JSON.parse(value));

    setLoadingModalVisible(true);
    setQuitModalVisible(false);
    const currentTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');

    const completedTrails = raceData.trails
      .filter((t) => t.trail_index <= prevProgress.trail_index)
      .slice(1);
    const distanceRun = completedTrails.reduce((a, b) => a + b.distance, 0);
    const pointGained = completedTrails.reduce(
      (a, b) => a + b.moontrekker_point,
      0,
    );

    const attemptRecord = await AsyncStorage.getItem(
      CONSTANTS.CREATED_ATTEMPT_ID_KEY,
    ).then((value) => JSON.parse(value));

    // send this data to save checkpoint timing
    let data = {
      attempt_id: attempt?.attempt_id || attemptRecord?.attempt_id,
      total_distance: prevProgress.trail_index === 1 ? 0 : distanceRun,
      moontrekker_point: prevProgress.trail_index === 1 ? 0 : pointGained,
      status: 'incomplete',
      total_time: Math.abs(
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
      navigateAndSimpleReset('Race Complete');
    }
  };

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <AppBarComponent
        title="Race"
        type="race"
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
                quitRace(true);
              }}
              onQuitPress={() => {
                navigateAndSimpleReset('Race Complete');
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

          {trailIndex !== 1 && (
            <>
              <TimerComponent
                title="MoonTrekker Race"
                stop={stopTimer}
                dismiss={() => quitRace()}
                incomplete={false}
                lastScannedTime={lastScannedTime}
                startedTime={startedTimeRef.current}
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
                  raceData.trails.find(
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

          <CheckpointTrailCardComponent
            disableQRScan={disableQRScan}
            type="race"
            trail={trail}
            requireButton={true}
            isStartPoint={trailIndex === 1}
            isEndPoint={
              raceData?.trails.length
                ? trailIndex === raceData.trails.length
                : 0
            }
            buttonAction={() => {
              setScannerModalVisible(true);
            }}
            openIssueScreen={() =>
              navigate('Qr Issue', {
                trail: trail,
                getPhotoUri: takePhoto,
              })
            }
          />
          <PrimaryButtonComponent
            label={trailIndex === 1 ? 'GO BACK' : 'QUIT THE RACE'}
            onPress={() => {
              if (trailIndex === 1) {
                navigation.goBack();
              } else {
                setQuitModalVisible(true);
              }
            }}
            buttonColor={Colors.bodyText}
            outerStyle={Gutters.regularHMargin}
          />
          {trailIndex !== 1 ? (
            <Text
              style={[
                Fonts.bodyBold,
                Fonts.textUnderline,
                Fonts.textCenter,
                Gutters.regularTMargin,
                Gutters.regularHMargin,
                { color: Colors.white },
              ]}
              onPress={() =>
                navigate('Checkpoint Miss', {
                  type: 'race',
                  challengeId: raceData.challenge_id,
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
                setTrailIndex((prevVal) => prevVal + 1);
                setIsStart(true);
              }}
            />
          )}
          {!!toastModalVisible && (
            <CheckpointScanToastComponent
              visibility={toastModalVisible}
              dismissModal={() => setToastModalVisible(false)}
              checkpoint={raceData.trails.find(
                (t) => t.trail_index === (prevProgress?.trail_index || trailNo),
              )}
              nextCheckpoint={[
                raceData.trails.find((t) => t.trail_index === trailIndex),
              ]}
              type="race"
            />
          )}
          <ConfirmationPopupComponent
            visibility={quitModalVisible}
            dismissModal={() => {
              setQuitModalVisible(false);
            }}
            title="Quit this Race"
            message="You are quitting this Race. You will not be able to continue from where you left off. You will have to start the Race over (i.e. scan at the first checkpoint) if you wish to try again. This cannot be undone. Confirm?"
            leftAction={() => quitRace()}
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

export default IndexRaceProgressContainer;
