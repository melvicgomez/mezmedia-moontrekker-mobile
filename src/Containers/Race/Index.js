import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Linking,
  Image,
  PixelRatio,
} from 'react-native';

import { navigate } from '@/Navigators/Root';
import { Config } from '@/Config';
import { useTheme } from '@/Theme';
import { useSelector, useDispatch } from 'react-redux';
import AppBarComponent from '@/Components/AppBarComponent';
import PrimaryButtonComponent from '@/Components/PrimaryButtonComponent';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';

import { OfflineImage } from '@/Components/react-native-image-offline';
import WeatherWarningComponent from '@/Components/WeatherWarningComponent';

import FetchRaceDetail from '@/Store/Race/FetchRaceDetail';

function IndexRaceContainer() {
  const { Fonts, Gutters, Layout, Colors, Images } = useTheme();
  const dispatch = useDispatch();

  const internetStatus = useSelector((s) => s.internetStatus.item);

  const [race, setRace] = useState(null);
  // const [stickyIndex, setStickyIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [canParticipate, setCanParticipate] = useState(false);
  const [imageOffline, setImageOffline] = useState(null);

  const raceData = useSelector((state) => state.race.item);
  const apiLoading = useSelector((state) => state.race.loading);

  useEffect(() => {
    dispatch(FetchRaceDetail.action({ oldData: raceData }));
  }, []);

  useFocusEffect(
    useCallback(() => {
      setCanParticipate(
        moment().isBetween(
          moment('09:00:00', 'HH:mm:ss'),
          moment('15:59:59', 'HH:mm:ss'),
        ),
        // true,
      );
    }, []),
  );

  useEffect(() => {
    if (!apiLoading && !!Object.keys(raceData).length) {
      setRace(raceData);
      setLoading(false);
    }
  }, [apiLoading]);

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <AppBarComponent title="Race" type="main" />
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
          // stickyHeaderIndices={[stickyIndex]}
        >
          <WeatherWarningComponent
            customViewStyles={{ marginBottom: 0 }}
            hasWarning={(status) => {
              // if (status) {
              //   setStickyIndex(0);
              // } else {
              //   setStickyIndex(-1);
              // }
              setCanParticipate(
                moment().isBetween(
                  moment('09:00:00', 'HH:mm:ss'),
                  moment('15:59:59', 'HH:mm:ss'),
                ) && !status,
                // true,
              );
            }}
          />
          <View
            style={[
              Layout.fullWidth,
              Layout.center,
              Gutters.regularTPadding,
              Gutters.mediumBPadding,
              Gutters.mediumHPadding,
              {
                zIndex: 0,
                backgroundColor: Colors.green,
              },
            ]}
          >
            <Text
              style={[
                Fonts.bodyBold,
                Fonts.textCenter,
                { color: Colors.white, flex: 1 },
              ]}
            >
              Reminder: You can only start a race between 5:00pm - 11:59pm.
            </Text>
            <Text
              style={[
                Fonts.bodyBold,
                Fonts.textCenter,
                Gutters.tinyTMargin,
                { color: Colors.white, flex: 1 },
              ]}
            >
              Please remember to check the{' '}
              <Text
                style={Fonts.textUnderline}
                onPress={() => {
                  Linking.openURL('https://www.hko.gov.hk/en/index.html');
                }}
              >
                weather conditions
              </Text>{' '}
              before participation.
            </Text>
          </View>

          <View style={[Gutters.mediumVPadding, Gutters.regularHPadding]}>
            <View
              style={[
                Gutters.regularVPadding,
                Gutters.regularHPadding,
                { borderRadius: 8, borderColor: Colors.grey, borderWidth: 1 },
              ]}
            >
              <PrimaryButtonComponent
                onPress={() => {
                  navigate('Rule');
                }}
                iconLeft={
                  <Image
                    source={Images.raceSymbol}
                    resizeMode="contain"
                    style={[
                      Gutters.smallRMargin,
                      { height: 35, width: 25, resizeMode: 'contain' },
                    ]}
                  />
                }
                disabled={!canParticipate}
                label="TAP TO PARTICIPATE IN THE RACE"
                innerStyle={{
                  paddingLeft: 40,
                  paddingRight: 40,
                  opacity: canParticipate ? 1 : 0.25,
                }}
              />
              <Text
                style={[
                  Fonts.body,
                  Fonts.textCenter,
                  Gutters.regularTMargin,
                  {
                    color: Colors.white,
                    lineHeight: 20 / PixelRatio.getFontScale(),
                  },
                ]}
              >
                Full completion of the route{' '}
                <Text style={Fonts.bodyBold}>is required</Text> to place you on
                the leaderboard.
              </Text>
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
                Checkpoints completed will gain you Moontrekker Points{' '}
                <Image
                  source={Images.pointIcon}
                  resizeMode="contain"
                  style={[
                    Gutters.smallRMargin,
                    {
                      height: 17,
                      width: 17,
                      resizeMode: 'contain',
                    },
                  ]}
                />
                .
              </Text>
              <Text
                style={[
                  Fonts.body,
                  Fonts.textCenter,
                  Gutters.smallBMargin,
                  {
                    color: Colors.white,
                    lineHeight: 20 / PixelRatio.getFontScale(),
                  },
                ]}
              >
                Competitive times of 4hrs and below will require additional
                verification via{' '}
                <Text
                  style={[Fonts.bodyBold, Fonts.textUnderline]}
                  onPress={() => navigate('Strava', { screen_view: 'Strava' })}
                >
                  Strava
                </Text>
                .
              </Text>
            </View>
            <View
              style={{
                display: 'none',
              }}
            >
              <OfflineImage
                key={`${Config.IMAGE_URL_PREFIX}challenge/${race.challenge_id}/${race.checkpoint_preview_image}`}
                reloadImage={true}
                source={{
                  uri: `${Config.IMAGE_URL_PREFIX}challenge/${race.challenge_id}/${race.checkpoint_preview_image}`,
                }}
                getImage={(uri) => setImageOffline(uri)}
              />
            </View>
            <Image
              source={
                internetStatus.isOnline
                  ? {
                      uri: `${Config.IMAGE_URL_PREFIX}challenge/${race.challenge_id}/${race.checkpoint_preview_image}`,
                    }
                  : imageOffline
                  ? { uri: 'file://' + imageOffline }
                  : Images.imagePlaceholder
              }
              defaultSource={Images.imagePlaceholder}
              style={[
                Gutters.mediumBMargin,
                Gutters.regularTMargin,
                // Layout.fullWidth,
                Gutters.tinyHMargin,
                {
                  height: 220,
                  resizeMode: 'contain',
                },
              ]}
            />
            <PrimaryButtonComponent
              onPress={() =>
                navigate('Trail Checkpoint', {
                  challengeId: race.challenge_id,
                  type: 'race',
                  screen_view: 'Race Trail Preview',
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
        </ScrollView>
      )}
    </View>
  );
}

export default IndexRaceContainer;
