import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  PixelRatio,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { navigate } from '@/Navigators/Root';
import { Config } from '@/Config';
import { useTheme } from '@/Theme';
import messaging from '@react-native-firebase/messaging';
import {
  requestMultiple,
  PERMISSIONS,
  checkMultiple,
  RESULTS,
} from 'react-native-permissions';
import { useDispatch, useSelector } from 'react-redux';
import FetchTrainingDetail from '@/Store/Training/FetchTrainingDetail';

import AppBarComponent from '@/Components/AppBarComponent';
import PermissionPopupComponent from '@/Components/PermissionPopupComponent';
import PrimaryButtonComponent from '@/Components/PrimaryButtonComponent';
import WeatherWarningComponent from '@/Components/WeatherWarningComponent';
import { OfflineImage } from '@/Components/react-native-image-offline';

function IndexTrainingContainer() {
  const { Fonts, Gutters, Layout, Colors, Images } = useTheme();
  const dispatch = useDispatch();

  const internetStatus = useSelector((s) => s.internetStatus.item);

  const [training, setTraining] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [stickyIndex, setStickyIndex] = useState(0);
  const [canParticipate, setCanParticipate] = useState(true);
  const [imageOffline, setImageOffline] = useState('');

  const [allowNotification, setAllowNotification] = useState(true);
  const [allowCamera, setAllowCamera] = useState(true);
  const [allowLocation, setAllowLocation] = useState(true);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);

  const trainingData = useSelector((state) => state.training.item);
  const apiLoading = useSelector((state) => state.training.loading);

  useEffect(() => {
    dispatch(FetchTrainingDetail.action({ oldData: trainingData }));
  }, []);

  useEffect(() => {
    if (!apiLoading && !!Object.keys(trainingData).length) {
      setTraining(trainingData);
      setLoading(false);
    }
  }, [apiLoading, trainingData]);

  const permissionChecking = async (trail) => {
    let count = 0;
    const authStatus = await messaging().requestPermission();
    if (authStatus < 1) {
      count++;
      setAllowNotification(false);
    }

    const statuses = await checkMultiple(
      Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]
        : [
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ],
    ).catch((error) => {
      console.log('Error: ', error);
    });

    if (
      (Platform.OS === 'ios' &&
        (statuses[PERMISSIONS.IOS.CAMERA] === RESULTS.DENIED ||
          statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.DENIED)) ||
      (Platform.OS === 'android' &&
        (statuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.DENIED ||
          statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] ===
            RESULTS.DENIED))
    ) {
      count = count + (await requestPermission(authStatus));
    } else if (
      (Platform.OS === 'ios' &&
        (statuses[PERMISSIONS.IOS.CAMERA] === RESULTS.BLOCKED ||
          statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] ===
            RESULTS.BLOCKED)) ||
      (Platform.OS === 'android' &&
        (statuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.BLOCKED ||
          statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] ===
            RESULTS.BLOCKED))
    ) {
      if (
        (Platform.OS === 'ios' &&
          statuses[PERMISSIONS.IOS.CAMERA] === RESULTS.BLOCKED) ||
        (Platform.OS === 'android' &&
          statuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.BLOCKED)
      ) {
        count++;
        setAllowCamera(false);
      }

      if (
        (Platform.OS === 'ios' &&
          statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.BLOCKED) ||
        (Platform.OS === 'android' &&
          statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] ===
            RESULTS.BLOCKED)
      ) {
        count++;
        setAllowLocation(false);
      }
    }

    if (count > 0) {
      setPermissionModalVisible(true);
    } else {
      if (canParticipate) {
        navigate('Training Progress', {
          trailList: [trail.trail_index],
          startIndex: trail.trail_index,
          screen_view: 'Training Progress',
        });
      }
    }
  };

  const requestPermission = async () => {
    let count = 0;

    await requestMultiple(
      Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]
        : [
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ],
    ).then((statuses) => {
      if (
        (Platform.OS === 'ios' &&
          (statuses[PERMISSIONS.IOS.CAMERA] !== RESULTS.GRANTED ||
            statuses[PERMISSIONS.IOS.CAMERA] !== RESULTS.LIMITED)) ||
        (Platform.OS === 'android' &&
          statuses[PERMISSIONS.ANDROID.CAMERA] !== RESULTS.GRANTED)
      ) {
        count++;
        setAllowCamera(false);
      }
      if (
        (Platform.OS === 'ios' &&
          (statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] !== RESULTS.GRANTED ||
            statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] !==
              RESULTS.LIMITED)) ||
        (Platform.OS === 'android' &&
          statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] !==
            RESULTS.GRANTED)
      ) {
        count++;
        setAllowLocation(false);
      }
    });

    return count;
  };

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <AppBarComponent title="Training" type="main" />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={Gutters.largeVMargin}
        />
      ) : (
        <ScrollView bounces={false} style={Layout.fill}>
          <WeatherWarningComponent
            customViewStyles={{ marginBottom: 0 }}
            hasWarning={(status) => {
              setCanParticipate(!status);
            }}
          />

          <View style={[Gutters.mediumVPadding, Gutters.regularHPadding]}>
            <View
              style={{
                display: 'none',
              }}
            >
              <OfflineImage
                key={`${Config.IMAGE_URL_PREFIX}challenge/${training.challenge_id}/${training.checkpoint_preview_image}`}
                reloadImage={true}
                source={{
                  uri: `${Config.IMAGE_URL_PREFIX}challenge/${training.challenge_id}/${training.checkpoint_preview_image}`,
                }}
                getImage={(uri) => setImageOffline(uri)}
              />
            </View>
            <Image
              source={
                internetStatus.isOnline
                  ? {
                      uri: `${Config.IMAGE_URL_PREFIX}challenge/${training.challenge_id}/${training.checkpoint_preview_image}`,
                    }
                  : imageOffline
                  ? { uri: 'file://' + imageOffline }
                  : Images.imagePlaceholder
              }
              style={[
                Gutters.mediumBMargin,
                // Layout.fullWidth,
                Gutters.tinyHMargin,
                {
                  height: 220,
                  resizeMode: 'contain',
                },
              ]}
              defaultSource={Images.imagePlaceholder}
            />
            <View
              style={[
                Gutters.regularVPadding,
                Gutters.regularHPadding,
                Gutters.largeBMargin,
                { borderRadius: 8, borderColor: Colors.grey, borderWidth: 1 },
              ]}
            >
              <Text
                style={[
                  Fonts.body,
                  Fonts.textCenter,
                  {
                    color: Colors.white,
                    lineHeight: 20 / PixelRatio.getFontScale(),
                  },
                ]}
              >
                Select the starting checkpoint location for your training below.
              </Text>
            </View>
            <View style={[Gutters.regularHPadding, Gutters.regularBMargin]}>
              {training.trails.map((trail, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    permissionChecking(trail);
                  }}
                  activeOpacity={canParticipate ? 0.7 : 1}
                >
                  <View
                    style={[
                      Layout.row,
                      Layout.alignItemsCenter,
                      Gutters.regularBMargin,
                      {
                        opacity: canParticipate ? 1 : 0.25,
                      },
                    ]}
                  >
                    <View
                      style={[
                        Layout.center,
                        Gutters.regularRMargin,
                        {
                          backgroundColor: Colors.primary,
                          height: 45,
                          width: 45,
                          borderRadius: 50,
                        },
                      ]}
                    >
                      <Text style={[Fonts.h2, { color: Colors.white }]}>
                        {i + 1}
                      </Text>
                    </View>
                    <Text style={[Fonts.bodyBold, { color: Colors.white }]}>
                      {trail.title.toUpperCase()}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <PrimaryButtonComponent
              onPress={() =>
                navigate('Trail Checkpoint', {
                  training: training.challenge_id,
                  type: 'training',
                  screen_view: 'Training Trail Preview',
                })
              }
              iconLeft={
                <Image
                  source={Images.infoIcon}
                  resizeMode="contain"
                  style={[
                    Gutters.smallRMargin,
                    { height: 38, width: 38, resizeMode: 'contain' },
                  ]}
                />
              }
              buttonColor={Colors.turqoise}
              label="TAP TO VIEW LOCATION OF QR CODES AT CHECKPOINTS"
              innerStyle={{ paddingLeft: 30, paddingRight: 30 }}
              labelStyle={Fonts.bodyBold}
              outerStyle={Gutters.smallHMargin}
            />
          </View>
          {permissionModalVisible ? (
            <PermissionPopupComponent
              visibility={permissionModalVisible}
              dismissModal={() => {
                setPermissionModalVisible(false);
              }}
              allowNotif={allowNotification}
              allowCam={allowCamera}
              allowLocation={allowLocation}
            />
          ) : null}
        </ScrollView>
      )}
    </View>
  );
}

export default IndexTrainingContainer;
