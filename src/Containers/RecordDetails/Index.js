import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  PixelRatio,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { Config } from '@/Config';
import { useTheme } from '@/Theme';
import { useSelector } from 'react-redux';
import moment from 'moment';
import axiosInstance from '@/Services';
import { RFValue } from 'react-native-responsive-fontsize';
import { ShareDialog } from 'react-native-fbsdk-next';
import { captureRef } from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import {
  request,
  PERMISSIONS,
  check,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

import AppBarComponent from '@/Components/AppBarComponent';
import PrimaryButtonComponent from '@/Components/PrimaryButtonComponent';
import EventSharingComponent from '@/Components/EventSharingComponent';
import ConfirmationPopupComponent from '@/Components/ConfirmationPopupComponent';

function IndexRecordDetailsContainer({ navigation, route }) {
  const { Fonts, Gutters, Layout, Colors, Images } = useTheme();

  const { attempt_id } = route.params;

  const raceData = useSelector((state) => state.race.item);
  const trainingData = useSelector((state) => state.training.item);

  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState(null);

  const [checkpointModalVisible, setCheckpointModalVisible] = useState(false);
  const [galleryModalVisible, setGalleryModalVisible] = useState(false);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);

  const viewRef = useRef();

  useEffect(() => {
    axiosInstance
      .get(`api/attempt/${attempt_id}`)
      .then((res) => {
        setAttempt(res.data.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (attempt) {
      if (attempt.challenge.type === 'training') {
        setChallenge(trainingData);
      } else if (attempt.challenge.type === 'race') {
        setChallenge(raceData);
      } else {
        axiosInstance
          .get(`api/challenge/${attempt.challenge_id}`)
          .then((res) => {
            setChallenge(res.data.data);
          })
          .catch((e) => console.log(e));
      }
    }
  }, [attempt]);

  const shareLinkWithShareDialog = (uri) => {
    const shareLinkContent = {
      contentType: 'photo',
      photos: [{ imageUrl: uri }],
    };

    ShareDialog.canShow(shareLinkContent)
      .then((canShow) => {
        if (canShow) {
          return ShareDialog.show(shareLinkContent);
        }
      })
      .then((result) => {
        if (result.isCancelled) {
          console.log('Share cancelled');
        } else {
          console.log('Share success with postId: ' + result.postId);
        }
      })
      .catch((error) => console.log('Share fail with error: ' + error));
  };

  const onShare = async (action) => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });

      if (action === 'share') {
        shareLinkWithShareDialog(uri);
      } else {
        savePhoto(uri);
      }

      console.log('uri', uri);
    } catch (error) {
      console.log(error.message);
    }
  };

  const savePhoto = (uri) => {
    check(
      Platform.OS === 'ios'
        ? Platform.Version > 14
          ? PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY
          : PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    )
      .then((result) => {
        if (result === RESULTS.DENIED) {
          requestPermission(uri);
        } else if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
          CameraRoll.save(uri, { type: 'photo' }).then((status) => {
            setGalleryModalVisible(true);
          });
        } else {
          setPermissionModalVisible(true);
        }
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  const requestPermission = (uri) => {
    request(
      Platform.OS === 'ios'
        ? Platform.Version > 14
          ? PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY
          : PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ).then((result) => {
      if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
        CameraRoll.save(uri, { type: 'photo' }).then((status) => {
          setGalleryModalVisible(true);
        });
      } else {
        setPermissionModalVisible(true);
      }
    });
  };

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={Gutters.largeVMargin}
        />
      ) : (
        <>
          <AppBarComponent
            title={attempt.challenge.title}
            type={attempt.challenge.type}
            displayBack={false}
            displayMenu={false}
            showPoint={false}
          />
          <ScrollView
            bounces={false}
            style={Layout.fill}
            contentContainerStyle={[Gutters.mediumBPadding]}
          >
            {!!attempt.challenge.is_time_required && (
              <View
                style={[
                  Layout.center,
                  Gutters.mediumVPadding,
                  Gutters.regularHMargin,
                  Gutters.mediumBMargin,
                  {
                    borderColor:
                      attempt.status === 'incomplete'
                        ? Colors.warning
                        : Colors.white,
                    borderRadius: 8,
                    borderWidth: 2,
                  },
                ]}
              >
                <Text style={[Fonts.h3, { color: Colors.primary }]}>TIME</Text>
                <Text
                  style={[
                    Fonts.h1,
                    {
                      color:
                        attempt.status === 'incomplete'
                          ? Colors.warning
                          : Colors.white,
                      lineHeight: 75 / PixelRatio.getFontScale(),
                      fontSize: RFValue(60) / PixelRatio.getFontScale(),
                    },
                  ]}
                >
                  {moment.utc(attempt.total_time * 1000).format('HH:mm:ss')}
                </Text>
              </View>
            )}

            {attempt.status === 'incomplete' ? (
              <View
                style={[
                  Gutters.mediumVPadding,
                  Gutters.mediumHPadding,
                  { backgroundColor: Colors.white },
                ]}
              >
                <Text
                  style={[
                    Fonts.h2,
                    Fonts.textCenter,
                    { color: Colors.warning },
                  ]}
                >
                  INCOMPLETE
                </Text>
                <Text
                  style={[
                    Fonts.h2,
                    Fonts.textCenter,
                    { color: Colors.warning },
                  ]}
                >
                  {attempt.challenge.type === 'race' ? 'RACE' : 'CHALLENGE'}
                </Text>
              </View>
            ) : (
              <Image
                source={
                  attempt.challenge.type === 'race'
                    ? Images.completeRace
                    : attempt.challenge.type === 'training'
                    ? Images.completeTraining
                    : Images.completeChallenge
                }
                style={[
                  Layout.fullWidth,
                  Gutters.smallHPadding,
                  Gutters.smallVMargin,
                  Gutters.regularBMargin,
                  { height: 160 },
                ]}
                resizeMode="contain"
              />
            )}
            {attempt.challenge.type === 'race' && (
              <Image
                source={{
                  uri: `${Config.IMAGE_URL_PREFIX}trail/${
                    attempt.progress.length
                      ? raceData.trails.find(
                          (t) =>
                            t.trail_index ===
                            attempt.progress[attempt.progress.length - 1]
                              .end_trail_id,
                        ).trail_id
                      : raceData.trails[0].trail_id
                  }/${
                    attempt.progress.length
                      ? raceData.trails.find(
                          (t) =>
                            t.trail_index ===
                            attempt.progress[attempt.progress.length - 1]
                              .end_trail_id,
                        ).trail_progress_image
                      : raceData.trails[0].trail_progress_image
                  }`,
                }}
                style={[
                  Gutters.smallHPadding,
                  Gutters.regularHMargin,
                  Gutters.mediumBMargin,
                  Gutters.regularTMargin,
                  { height: 220 },
                ]}
                resizeMode="contain"
              />
            )}
            <View style={[Gutters.largeHPadding]}>
              <View
                style={[
                  Layout.row,
                  Layout.alignItemsCenter,
                  Gutters.regularTMargin,
                ]}
              >
                <Image
                  source={Images.dateIcon}
                  style={[
                    Gutters.regularRMargin,
                    { height: 18, width: 18, resizeMode: 'contain' },
                  ]}
                />
                <Text style={[Fonts.h3, { color: Colors.white }]}>
                  {moment
                    .utc(attempt.started_at)
                    .local()
                    .format('DD MMM HH:mm')}{' '}
                  -{' '}
                  {moment.utc(attempt.ended_at).local().format('DD MMM HH:mm')}
                </Text>
              </View>
              {!!attempt.challenge.is_time_required && (
                <View
                  style={[
                    Layout.row,
                    Layout.alignItemsCenter,
                    Gutters.regularTMargin,
                  ]}
                >
                  <Image
                    source={Images.timingIcon}
                    style={[
                      Gutters.regularRMargin,
                      { height: 18, width: 18, resizeMode: 'contain' },
                    ]}
                  />
                  <Text style={[Fonts.h3, { color: Colors.white }]}>
                    Total Time{' '}
                    {moment.utc(attempt.total_time * 1000).format('HH:mm:ss')}
                  </Text>
                </View>
              )}
              {!!attempt.challenge.is_distance_required && (
                <View
                  style={[
                    Layout.row,
                    Layout.alignItemsCenter,
                    Gutters.regularTMargin,
                  ]}
                >
                  <Image
                    source={Images.locationIcon}
                    style={[
                      Gutters.regularRMargin,
                      { height: 18, width: 18, resizeMode: 'contain' },
                    ]}
                  />
                  <Text style={[Fonts.h3, { color: Colors.white }]}>
                    Distance Ran {attempt.total_distance}km
                  </Text>
                </View>
              )}
              <View style={[Layout.row, Gutters.regularTMargin]}>
                <Image
                  source={Images.pointIcon}
                  style={[
                    Gutters.regularRMargin,
                    {
                      height: 18,
                      width: 18,
                      resizeMode: 'contain',
                      marginTop: 3,
                    },
                  ]}
                />
                <Text
                  style={[
                    Fonts.h3,
                    {
                      color: Colors.white,
                      flex: 1,
                      flexWrap: 'wrap',
                    },
                  ]}
                >
                  {attempt.moontrekker_point} MoonTrekker Points Awarded
                </Text>
              </View>
            </View>
            <View style={[Gutters.largeHPadding, Gutters.largeTMargin]}>
              {attempt.challenge.type !== 'challenge_single' &&
              !!attempt.progress.length ? (
                <>
                  <View style={[Layout.row, Layout.justifyContentBetween]}>
                    <Text
                      style={[
                        Fonts.h3,
                        {
                          color: Colors.white,
                          flex: 1,
                          flexWrap: 'wrap',
                        },
                      ]}
                    >
                      CHECKPOINT TIMINGS
                    </Text>
                    <TouchableOpacity
                      style={[
                        Layout.center,
                        Gutters.smallRMargin,
                        {
                          backgroundColor: Colors.primary,
                          borderRadius: 50,
                          width: 22,
                          height: 22,
                        },
                      ]}
                      activeOpacity={0.8}
                      onPress={() => setCheckpointModalVisible(true)}
                    >
                      <Text style={[Fonts.body, { color: Colors.white }]}>
                        𝙞
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[Gutters.regularTMargin, Gutters.mediumBMargin]}>
                    {attempt.progress.map((progress, i) => (
                      <View key={i}>
                        {i !== 0 ? (
                          <View
                            style={[
                              Gutters.smallVMargin,
                              { height: 1, backgroundColor: Colors.white },
                            ]}
                          />
                        ) : null}
                        <View
                          style={[Layout.row, Layout.justifyContentBetween]}
                        >
                          <Text
                            style={[
                              Fonts.bodyBold,
                              {
                                color: Colors.white,
                                flex: 1,
                                flexWrap: 'wrap',
                              },
                            ]}
                          >
                            {progress.description}
                          </Text>
                          <View style={[Layout.row]}>
                            <Text
                              style={[
                                Fonts.body,
                                Gutters.tinyRMargin,
                                {
                                  color: Colors.white,
                                },
                              ]}
                            >
                              {progress.distance}km
                            </Text>
                            <Text
                              style={[
                                Fonts.body,
                                Fonts.textCenter,
                                {
                                  color: Colors.white,
                                  width: 80,
                                },
                              ]}
                            >
                              {!progress.started_at || !progress.ended_at
                                ? '-'
                                : moment
                                    .utc(progress.duration * 1000)
                                    .format('HH:mm:ss')}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                </>
              ) : null}
              <Text
                style={[
                  Fonts.bodyBold,
                  {
                    color: Colors.white,
                  },
                ]}
              >
                {attempt.challenge.type === 'race'
                  ? attempt.status === 'incomplete'
                    ? 'It was a good effort! You can always try again. Persistence is the key to success!'
                    : 'Fantastic! You’ve completed the MoonTrekker Race! Your time will be added to the leaderboards.'
                  : attempt.challenge.type === 'training' ||
                    attempt.challenge.type === 'challenge_training'
                  ? 'Great job! You’ve completed your training session. Train more to receive more MoonTrekker Points!'
                  : attempt.status === 'incomplete'
                  ? 'It was a good effort! You can always try again. Persistence is the key to success!'
                  : 'Your reward instructions will be emailed to you soon. If do not receive your email within a week, contact us at registration@moontrekker.com'}
              </Text>
              {attempt.challenge.type === 'race' &&
              attempt.total_time < 14400 &&
              !!attempt.progress.length ? (
                <Text
                  style={[
                    Fonts.bodyBold,
                    Gutters.mediumTMargin,
                    {
                      color: Colors.yellow,
                    },
                  ]}
                >
                  You’ve clocked a competitive time of below 4:00hrs. Please
                  send your Strava confirmation image to hello@moontrekker.com
                </Text>
              ) : null}
            </View>
            <PrimaryButtonComponent
              label="SHARE ON FACEBOOK"
              onPress={() => {
                if (attempt && challenge) {
                  onShare('share');
                }
              }}
              outerStyle={{ ...Gutters.largeHMargin, ...Gutters.largeTMargin }}
              iconLeft={<Images.FacebookIcon width={45} />}
            />
            <PrimaryButtonComponent
              label="SAVE IMAGE TO GALLERY"
              onPress={() => {
                if (attempt && challenge) {
                  onShare('save');
                }
              }}
              outerStyle={{
                ...Gutters.largeHMargin,
                ...Gutters.regularTMargin,
              }}
              iconLeft={<Images.GalleryIcon width={45} />}
            />
            <PrimaryButtonComponent
              label="GO BACK"
              onPress={() => {
                navigation.goBack();
              }}
              buttonColor={Colors.bodyText}
              outerStyle={{
                ...Gutters.largeHMargin,
                ...Gutters.regularTMargin,
              }}
            />
            <View
              ref={viewRef}
              collapsable={false}
              style={{ position: 'absolute', left: 1000 }}
            >
              {attempt && challenge ? (
                <EventSharingComponent
                  title={
                    attempt.challenge.type === 'race'
                      ? 'race'
                      : attempt.challenge.type === 'training'
                      ? 'training'
                      : attempt.challenge.title
                  }
                  type={
                    attempt.challenge.type === 'race'
                      ? 'race'
                      : attempt.challenge.type === 'training'
                      ? 'training'
                      : 'challenge'
                  }
                  attempt={{ ...attempt, progress: attempt.progress }}
                  challenge={challenge}
                />
              ) : null}
            </View>
            <ConfirmationPopupComponent
              visibility={checkpointModalVisible}
              dismissModal={() => {
                setCheckpointModalVisible(false);
              }}
              title="About Checkpoint Timings"
              message="This displays the time you took from checkpoint to checkpoint. It displays the time taken between each checkpoint scan and not the cumulative total time."
              actionRequired={false}
            />
            <ConfirmationPopupComponent
              visibility={galleryModalVisible}
              dismissModal={() => {
                setGalleryModalVisible(false);
              }}
              title="Successfully Saved"
              message="The image of your achievement has been saved to the gallery successfully"
              actionRequired={false}
            />
            <ConfirmationPopupComponent
              visibility={permissionModalVisible}
              dismissModal={() => {
                setPermissionModalVisible(false);
              }}
              title="Storage Permission Required"
              message="MoonTrekker requires storage permission to save the image to your gallery. Please enable it in the settings."
              singleButton={true}
              rightLabel="Open Settings"
              rightAction={() =>
                openSettings().catch(() => console.warn('cannot open settings'))
              }
            />
          </ScrollView>
        </>
      )}
    </View>
  );
}

export default IndexRecordDetailsContainer;
