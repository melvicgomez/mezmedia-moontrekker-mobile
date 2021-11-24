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
import axiosInstance from '@/Services';
import HTML from 'react-native-render-html';
import { useSelector, useDispatch } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import {
  requestMultiple,
  PERMISSIONS,
  checkMultiple,
  RESULTS,
} from 'react-native-permissions';
import AppBarComponent from '@/Components/AppBarComponent';
import PermissionPopupComponent from '@/Components/PermissionPopupComponent';
import PrimaryButtonComponent from '@/Components/PrimaryButtonComponent';
import ChallengeCardComponent from '@/Components/ChallengeCardComponent';
import WeatherWarningComponent from '@/Components/WeatherWarningComponent';

import { OfflineImageStore } from '@/Components/react-native-image-offline';
import FetchChallengeDetail from '@/Store/Challenge/FetchChallengeDetail';
import moment from 'moment';

function IndexChallengeDetailContainer({ route }) {
  const { Fonts, Gutters, Layout, Colors, Images } = useTheme();
  const dispatch = useDispatch();

  const { id } = route.params;

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isCompleted, setIsCompleted] = useState(false);
  const [fullyRedeem, setFullyRedeem] = useState(false);
  const [attempt, setAttempt] = useState(null);
  const [canParticipate, setCanParticipate] = useState(true);

  const [allowNotification, setAllowNotification] = useState(true);
  const [allowCamera, setAllowCamera] = useState(true);
  const [allowLocation, setAllowLocation] = useState(true);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);

  const challengeData = useSelector((state) => state.challenge.item);
  const apiLoading = useSelector((state) => state.challenge.loading);

  useEffect(() => {
    dispatch(FetchChallengeDetail.action({ oldData: challengeData, id: id }));
  }, []);

  useEffect(() => {
    if (
      !apiLoading &&
      !!Object.keys(challengeData).length &&
      challengeData.challenge_id === id
    ) {
      if (Object.keys(challengeData).length) {
        let uri = [
          `${Config.IMAGE_URL_PREFIX}challenge/${challengeData.challenge_id}/${challengeData.challenge_cover_image}`,
        ];
        if (challengeData.trails.length) {
          let request = challengeData.trails.map((trail) => {
            if (trail.images.length) {
              trail.images.map((image) => {
                uri.push(
                  `${Config.IMAGE_URL_PREFIX}trail/${trail.trail_id}/${image.image_filename}`,
                );
              });
            }
          });

          Promise.all(request).then(() => {
            OfflineImageStore.preLoad(uri);
          });
        }
      }

      setChallenge(challengeData);
      setIsCompleted(!!challengeData.is_joined_challenge);
      setFullyRedeem(
        challengeData.reward_count
          ? challengeData.reward_count - challengeData.total_reward_claimed <= 0
          : false,
      );

      setLoading(false);
    }
  }, [apiLoading]);

  useEffect(() => {
    if (isCompleted) {
      axiosInstance
        .get(`api/challenge-attempt/${challengeData.challenge_id}`)
        .then((res) => {
          setAttempt(res.data.data);
        })
        .catch((e) => console.log(e));
    }
  }, [isCompleted]);

  const permissionChecking = async (type, trail) => {
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
      if (type === 'training') {
        navigate('Challenge Training Progress', {
          trailList: [trail.trail_index],
          startIndex: trail.trail_index,
          screen_view: `Challenge/${challenge.challenge_id}/${challenge.title}`,
        });
      } else if (type === 'challenge_either_end') {
        navigate('Challenge Either End Progress', {
          trailNo: 1,
          screen_view: `Challenge/${challenge.challenge_id}/${challenge.title}`,
        });
      } else if (type === 'challenge') {
        navigate('Challenge Progress', {
          trailNo: 1,
          screen_view: `Challenge/${challenge.challenge_id}/${challenge.title}`,
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
      <AppBarComponent
        title="Challenges"
        type="main"
        displayBack={true}
        displayMenu={false}
      />
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
          <View
            style={[
              Gutters.mediumTPadding,
              Gutters.smallBPadding,
              Gutters.smallHPadding,
            ]}
          >
            <ChallengeCardComponent challengeData={challenge} />
            <View style={Gutters.mediumHPadding}>
              <HTML
                baseFontStyle={{
                  ...Fonts.body,
                  ...Gutters.smallTMargin,
                  ...{
                    color: Colors.white,
                    lineHeight: 20 / PixelRatio.getFontScale(),
                  },
                }}
                tagsStyles={{
                  a: {
                    color: Colors.primary,
                  },
                  strong: {
                    ...Fonts.bodyBold,
                  },
                  b: {
                    ...Fonts.bodyBold,
                  },
                }}
                listsPrefixesRenderers={{
                  ul: () => {
                    return (
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: 16 / PixelRatio.getFontScale(),
                          marginRight: 5,
                        }}
                      >
                        •
                      </Text>
                    );
                  },
                  ol: (
                    _htmlAttribs,
                    _children,
                    _convertedCSSStyles,
                    passProps,
                  ) => {
                    return (
                      <Text
                        style={[
                          Fonts.body,
                          {
                            marginRight: 10,
                            marginLeft: -10,
                            color: Colors.white,
                          },
                        ]}
                      >
                        {passProps.nodeIndex + 1}.
                      </Text>
                    );
                  },
                }}
                source={{ html: challenge.html_content }}
              />
            </View>
            {challenge.type === 'challenge_training' && (
              <View
                style={[
                  Gutters.largeHPadding,
                  Gutters.regularBMargin,
                  Gutters.smallTMargin,
                ]}
              >
                {challenge.trails.map((trail, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      if (
                        moment.utc() >= moment.utc(challenge.started_at) &&
                        moment.utc() <= moment.utc(challenge.ended_at)
                      ) {
                        if (canParticipate) {
                          if (!challenge.multiple_attempt_available) {
                            if (
                              !challenge.is_joined_challenge &&
                              !fullyRedeem
                            ) {
                              console.log('hit');
                              permissionChecking('training', trail);
                            }
                          } else {
                            permissionChecking('training', trail);
                          }
                        }
                      }
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
            )}

            {challenge.type !== 'challenge_single' && (
              <PrimaryButtonComponent
                onPress={() =>
                  navigate('Trail Checkpoint', {
                    challengeId: challenge.challenge_id,
                    type: 'challenge',
                    screen_view: `Challenge/${challenge.challenge_id}/${challenge.title}/Trail Preview`,
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
                outerStyle={{
                  ...Gutters.smallHMargin,
                  ...Gutters.regularBMargin,
                }}
              />
            )}
            {challenge.type !== 'challenge_training' && (
              <PrimaryButtonComponent
                disabled={
                  challenge.multiple_attempt_available
                    ? moment.utc() < moment.utc(challenge.started_at) ||
                      moment.utc() > moment.utc(challenge.ended_at)
                      ? true
                      : !canParticipate
                    : isCompleted || fullyRedeem
                    ? false
                    : moment.utc() < moment.utc(challenge.started_at) ||
                      moment.utc() > moment.utc(challenge.ended_at)
                    ? true
                    : !canParticipate
                }
                onPress={() => {
                  if (
                    moment.utc() >= moment.utc(challenge.started_at) &&
                    moment.utc() <= moment.utc(challenge.ended_at)
                  ) {
                    if (!challenge.multiple_attempt_available) {
                      if (!isCompleted && !fullyRedeem) {
                        if (challenge.type === 'challenge_either_end') {
                          permissionChecking('challenge_either_end', 1);
                        } else {
                          permissionChecking('challenge', 1);
                        }
                      } else if (isCompleted) {
                        if (attempt) {
                          navigate('Record Details', {
                            attempt_id: attempt.attempt_id,
                          });
                        }
                      }
                    } else {
                      permissionChecking('challenge', 1);
                    }
                  }
                }}
                iconLeft={
                  moment.utc() < moment.utc(challenge.started_at) ? null : (
                    <Image
                      source={
                        !challenge.multiple_attempt_available
                          ? isCompleted
                            ? Images.completeIcon
                            : moment.utc() > moment.utc(challenge.ended_at)
                            ? Images.endIcon
                            : fullyRedeem
                            ? Images.fullRedemptIcon
                            : Images.joinChallengeIcon
                          : moment.utc() > moment.utc(challenge.ended_at)
                          ? Images.endIcon
                          : Images.joinChallengeIcon
                      }
                      resizeMode="contain"
                      style={[
                        Gutters.smallRMargin,
                        { height: 38, width: 38, resizeMode: 'contain' },
                      ]}
                    />
                  )
                }
                buttonColor={
                  moment.utc() < moment.utc(challenge.started_at)
                    ? Colors.disabled
                    : !challenge.multiple_attempt_available
                    ? isCompleted
                      ? Colors.orange
                      : moment.utc() > moment.utc(challenge.ended_at)
                      ? Colors.grey
                      : fullyRedeem
                      ? Colors.warning
                      : Colors.primary
                    : moment.utc() > moment.utc(challenge.ended_at)
                    ? Colors.grey
                    : Colors.primary
                }
                label={
                  moment.utc() < moment.utc(challenge.started_at)
                    ? 'THIS CHALLENGE HAS NOT STARTED YET'
                    : !challenge.multiple_attempt_available
                    ? isCompleted
                      ? 'YOU HAVE COMPLETED THIS CHALLENGE. VIEW DETAILS'
                      : moment.utc() > moment.utc(challenge.ended_at)
                      ? 'THIS CHALLENGE HAS ENDED'
                      : fullyRedeem
                      ? 'THIS CHALLENGE HAS BEEN FULLY REDEEMED'
                      : 'TAP TO PARTICIPATE IN THIS CHALLENGE'
                    : moment.utc() > moment.utc(challenge.ended_at)
                    ? 'THIS CHALLENGE HAS ENDED'
                    : 'TAP TO PARTICIPATE IN THIS CHALLENGE'
                }
                innerStyle={{
                  paddingLeft:
                    moment.utc() < moment.utc(challenge.started_at) ? 55 : 30,
                  paddingRight:
                    moment.utc() < moment.utc(challenge.started_at) ? 55 : 30,
                  opacity:
                    isCompleted || fullyRedeem
                      ? 1
                      : canParticipate &&
                        moment.utc() >= moment.utc(challenge.started_at) &&
                        moment.utc() <= moment.utc(challenge.ended_at)
                      ? 1
                      : 0.25,
                }}
                labelStyle={{
                  ...Fonts.bodyBold,
                  color: Colors.white,
                }}
                outerStyle={{
                  ...Gutters.smallHMargin,
                  ...Gutters.regularBMargin,
                }}
              />
            )}
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
          </View>
        </ScrollView>
      )}
    </View>
  );
}

export default IndexChallengeDetailContainer;
