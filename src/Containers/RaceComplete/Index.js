import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  PixelRatio,
  Image,
  BackHandler,
  TouchableOpacity,
  Platform,
} from 'react-native';

import { Config } from '@/Config';
import { useTheme } from '@/Theme';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANTS from '@/Utilities/Constants';

import { navigateAndReset } from '@/Navigators/Root';
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
import ConfirmationPopupComponent from '@/Components/ConfirmationPopupComponent';
import EventSharingComponent from '@/Components/EventSharingComponent';

import GetPoint from '@/Store/MoontrekkerPoint/GetMoontrekkerPoint';

function IndexRaceCompleteContainer() {
  const { Fonts, Gutters, Layout, Colors, Images } = useTheme();

  const dispatch = useDispatch();
  const raceData = useSelector((state) => state.race.item);

  // refresh point
  const point = useSelector((state) => state.moontrekkerPoint.item);
  const user = useSelector((state) => state.user.item);

  const [modalVisible, setModalVisible] = useState(false);
  const [checkpointModalVisible, setCheckpointModalVisible] = useState(false);
  const [galleryModalVisible, setGalleryModalVisible] = useState(false);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);

  const [attemptData, setAttemptData] = useState(null);
  const [attemptProgressData, setAttemptProgressData] = useState([]);

  const viewRef = useRef();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    AsyncStorage.getItem(CONSTANTS.ACTIVITY_ATTEMPT_COMPLETE_KEY)
      .then((value) => JSON.parse(value))
      .then((value) => {
        setAttemptData(value);
        if (value.total_time < 14400) {
          setModalVisible(true);
        }
      });

    AsyncStorage.getItem(CONSTANTS.ACTIVITY_ATTEMPT_PROGRESS_KEY)
      .then((value) => JSON.parse(value))
      .then((value) => setAttemptProgressData(value));

    return () => backHandler.remove();
  }, []);

  const handleBackButton = () => {
    navigateAndReset([
      {
        name: 'Home',
        state: {
          routes: [
            {
              name: 'Race',
            },
          ],
        },
      },
    ]);

    return true;
  };

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
          console.log('The permission is not requestable');
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
        console.log('The permission is not requestable');
        setPermissionModalVisible(true);
      }
    });
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

      <ScrollView
        bounces={false}
        style={Layout.fill}
        contentContainerStyle={[Gutters.mediumBPadding]}
      >
        <View
          style={[
            Layout.center,
            Gutters.mediumVPadding,
            Gutters.regularHMargin,
            Gutters.mediumBMargin,
            {
              borderColor:
                attemptData?.status === 'incomplete'
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
                  attemptData?.status === 'incomplete'
                    ? Colors.warning
                    : Colors.white,
                lineHeight: 75 / PixelRatio.getFontScale(),
                fontSize: RFValue(60) / PixelRatio.getFontScale(),
              },
            ]}
          >
            {moment
              .utc((attemptData?.total_time || 0) * 1000)
              .format('HH:mm:ss')}
          </Text>
        </View>
        {attemptData?.status === 'incomplete' ? (
          <View
            style={[
              Gutters.mediumVPadding,
              Gutters.mediumHPadding,
              { backgroundColor: Colors.white },
            ]}
          >
            <Text
              style={[Fonts.h2, Fonts.textCenter, { color: Colors.warning }]}
            >
              INCOMPLETE
            </Text>
            <Text
              style={[Fonts.h2, Fonts.textCenter, { color: Colors.warning }]}
            >
              RACE
            </Text>
          </View>
        ) : (
          <Image
            source={Images.completeRace}
            style={[
              Layout.fullWidth,
              Gutters.smallHPadding,
              Gutters.smallVMargin,
              { height: 160 },
            ]}
            resizeMode="contain"
          />
        )}
        <Image
          source={{
            uri: `${Config.IMAGE_URL_PREFIX}trail/${
              (attemptProgressData || []).length > 0
                ? raceData.trails.find(
                    (t) =>
                      t.trail_index ===
                      attemptProgressData[attemptProgressData.length - 1]
                        .end_trail_id,
                  ).trail_id
                : raceData.trails[0].trail_id
            }/${
              (attemptProgressData || []).length > 0
                ? raceData.trails.find(
                    (t) =>
                      t.trail_index ===
                      attemptProgressData[attemptProgressData.length - 1]
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
        <View style={[Gutters.largeHPadding]}>
          <View
            style={[Layout.row, Layout.alignItemsCenter, Gutters.smallTMargin]}
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
                .utc(attemptData ? attemptData.started_at : moment())
                .local()
                .format('DD MMM HH:mm')}{' '}
              -{' '}
              {moment
                .utc(attemptData ? attemptData.ended_at : moment())
                .local()
                .format('DD MMM HH:mm')}
            </Text>
          </View>
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
              {moment
                .utc((attemptData?.total_time || 0) * 1000)
                .format('HH:mm:ss')}
            </Text>
          </View>
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
              Distance Ran {attemptData?.total_distance || 0}
              km
            </Text>
          </View>
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
              {attemptData?.moontrekker_point || 0} MoonTrekker Points Awarded
            </Text>
          </View>
        </View>
        <View style={[Gutters.largeHPadding, Gutters.largeTMargin]}>
          {(attemptProgressData || []).length > 0 ? (
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
                  <Text style={[Fonts.body, { color: Colors.white }]}>𝙞</Text>
                </TouchableOpacity>
              </View>
              <View style={[Gutters.regularVMargin]}>
                {(attemptProgressData || []).map((progress, i) => (
                  <View key={i}>
                    {i !== 0 ? (
                      <View
                        style={[
                          Gutters.smallVMargin,
                          { height: 1, backgroundColor: Colors.white },
                        ]}
                      />
                    ) : null}
                    <View style={[Layout.row, Layout.justifyContentBetween]}>
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
              Gutters.tinyTMargin,
              {
                color: Colors.white,
              },
            ]}
          >
            {attemptData?.status === 'incomplete'
              ? 'It was a good effort! You can always try again. Persistence is the key to success!'
              : 'Fantastic! You’ve completed the MoonTrekker Race! Your time will be added to the leaderboards.'}
          </Text>
          {attemptData?.total_time < 14400 &&
            attemptData?.status === 'complete' && (
              <Text
                style={[
                  Fonts.bodyBold,
                  Gutters.mediumTMargin,
                  {
                    color: Colors.yellow,
                  },
                ]}
              >
                You’ve clocked a competitive time of below 4:00hrs. Please send
                your Strava confirmation image to hello@moontrekker.com
              </Text>
            )}
        </View>
        <PrimaryButtonComponent
          label="SHARE ON FACEBOOK"
          onPress={() => {
            onShare('share');
          }}
          outerStyle={{ ...Gutters.largeHMargin, ...Gutters.largeTMargin }}
          iconLeft={<Images.FacebookIcon width={45} />}
        />
        <PrimaryButtonComponent
          label="SAVE IMAGE TO GALLERY"
          onPress={() => {
            onShare('save');
          }}
          outerStyle={{
            ...Gutters.largeHMargin,
            ...Gutters.regularTMargin,
          }}
          iconLeft={<Images.GalleryIcon width={45} />}
        />
        <PrimaryButtonComponent
          label="CLOSE"
          onPress={() => {
            dispatch(
              GetPoint.action({ user_id: user.user_id, oldData: point }),
            );

            navigateAndReset([
              {
                name: 'Home',
                state: {
                  routes: [
                    {
                      name: 'Race',
                    },
                  ],
                },
              },
            ]);
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
          {attemptData ? (
            <EventSharingComponent
              title="race"
              type="race"
              attempt={{
                ...attemptData,
                progress: attemptProgressData || [],
              }}
              challenge={raceData}
            />
          ) : null}
        </View>
        <ConfirmationPopupComponent
          visibility={
            attemptData?.total_time < 14400 &&
            attemptData?.status === 'complete' &&
            modalVisible
          }
          dismissModal={() => {
            setModalVisible(false);
          }}
          title=""
          message="You’ve clocked a competitive time of below 4:00hrs. Please send your Strava confirmation image to hello@moontrekker.com"
          singleButton={true}
          rightLabel="OK"
          rightAction={() => setModalVisible(false)}
        />
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
    </View>
  );
}

export default IndexRaceCompleteContainer;
