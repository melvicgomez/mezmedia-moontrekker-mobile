import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { navigate } from '@/Navigators/Root';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

import FetchRaceDetail from '@/Store/Race/FetchRaceDetail';
import FetchTrainingDetail from '@/Store/Training/FetchTrainingDetail';
import UpdateWeatherWarning from '@/Store/WeatherWarning/UpdateWeatherWarning';
import UpdateInternetStatus from '@/Store/InternetStatus/UpdateInternetStatus';

import Attempt from '@/Store/Attempt/StoreChallengeAttempt';
// import AttemptClear from '@/Store/Attempt/ClearAttempt';
import Progress from '@/Store/Progress/CreateAttemptTiming';
// import ProgressClear from '@/Store/Progress/ClearProgressHistory';

import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANTS from '@/Utilities/Constants';

import { Text } from '@ui-kitten/components';
import { useTheme } from '@/Theme';
import {
  IndexLeaderboardsContainer,
  IndexTrainingContainer,
  IndexChallengesContainer,
  IndexRaceContainer,
  IndexMyProfileContainer,
  IndexSponsorsContainer,
  IndexSettingsContainer,
  IndexRaceProgressContainer,
  IndexTrainingProgressContainer,
} from '@/Containers';

const { Navigator, Screen } = createDrawerNavigator();

const drawerItems = [
  {
    title: 'Leaderboards',
    name: 'Leaderboards',
    component: IndexLeaderboardsContainer,
    icon: 'leaderboardIcon',
    screen_view: 'Leaderboards',
  },
  {
    title: 'Training',
    name: 'Training',
    component: IndexTrainingContainer,
    icon: 'trainingIcon',
    screen_view: 'Training',
  },
  {
    title: 'Challenges',
    name: 'Challenges',
    component: IndexChallengesContainer,
    icon: 'challengeIcon',
    screen_view: 'Challenges',
  },
  {
    title: 'Race',
    name: 'Race',
    component: IndexRaceContainer,
    icon: 'raceIcon',
    screen_view: 'Race',
  },
  {
    title: 'My Profile',
    name: 'Profile',
    component: IndexMyProfileContainer,
    icon: 'profileIcon',
    screen_view: 'My Profile',
  },
  {
    title: 'Sponsors',
    name: 'Sponsors',
    component: IndexSponsorsContainer,
    icon: 'sponsorIcon',
    screen_view: 'Sponsors',
  },
  {
    title: 'Settings',
    name: 'Settings',
    component: IndexSettingsContainer,
    icon: 'settingIcon',
    screen_view: 'Settings',
  },
];

const DrawerContent = ({ state }) => {
  const { Fonts, Gutters, Colors, Images, Layout } = useTheme();
  const dispatch = useDispatch();

  const navigationPath = (index) => {
    navigate(state.routeNames[index]);
  };

  const raceData = useSelector((s) => s.race.item);
  const trainingData = useSelector((s) => s.training.item);
  const internetStatus = useSelector((s) => s.internetStatus.item);

  // firebase messaging to catch weather warning
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.data?.bad_weather_status === 'enabled') {
        dispatch(UpdateWeatherWarning.action(remoteMessage.data));
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((listener) => {
      const isOnline = listener.isConnected && listener.isInternetReachable;
      dispatch(UpdateInternetStatus.action({ isOnline }));
    });
    return () => removeNetInfoSubscription();
  }, []);

  useEffect(async () => {
    // BACK ONLINE
    console.log(internetStatus);
    if (internetStatus.isOnline) {
      console.log('>>>>>>>>>>>THE DEVICE IS ONLINE.');
      // SYNC START ATTEMPT
      const pendingStartAttemptData = await AsyncStorage.getItem(
        CONSTANTS.ATTEMPT_STORAGE_KEY,
      ).then((value) => JSON.parse(value));

      if (pendingStartAttemptData) {
        console.log('>>>>>>>>>>>SYNCING STARTED ATTEMPT DATA');
        await dispatch(Attempt.action({ data: pendingStartAttemptData }));
      }

      await AsyncStorage.getItem(CONSTANTS.CREATED_ATTEMPT_ID_KEY)
        .then((value) => JSON.parse(value))
        .then(async (startAttempt) => {
          console.log('>>>>>>>>>>>ATTEMPT ID FOUND TO SYNC', startAttempt);
          // SYNC ATTEMPT TIMINGS PROGRESS
          const pendingStoredProgress = await AsyncStorage.getItem(
            CONSTANTS.PROGRESS_STORAGE_KEY,
          )
            .then((value) => JSON.parse(value))
            .then((value) => {
              console.log(value);
              return value;
            });

          if (pendingStoredProgress && startAttempt.attempt_id) {
            for (const progressData of pendingStoredProgress.map(
              (progress) => ({
                ...progress,
                attempt_id: startAttempt.attempt_id,
              }),
            )) {
              console.log(
                '>>>>>>>>>>>DISPATCHIING ATTEMPT TIMING PROGRESS DATA',
                progressData,
              );
              await dispatch(
                Progress.action({ data: { ...progressData, retrying: true } }),
              );
            }

            await AsyncStorage.removeItem(CONSTANTS.PROGRESS_STORAGE_KEY);
          }

          // SYNC COMPLETE/INCOMPLETE ATTEMPT
          const pendingDoneAttemptData = await AsyncStorage.getItem(
            CONSTANTS.COMPLETE_STORAGE_KEY,
          ).then((value) => JSON.parse(value));

          if (pendingDoneAttemptData && startAttempt.attempt_id) {
            console.log('>>>>>>>>>>>SYNCING COMPLETION ATTEMPT DATA', {
              ...pendingDoneAttemptData,
              attempt_id: startAttempt.attempt_id,
            });
            await dispatch(
              Attempt.action({
                data: {
                  ...pendingDoneAttemptData,
                  attempt_id: startAttempt.attempt_id,
                },
              }),
            );
          }
          console.log('>>>>>>>>>>>ALL OFFLINE DATA SYNCED.');
        });
    }
  }, [internetStatus.isOnline]);

  useEffect(() => {
    dispatch(FetchRaceDetail.action({ oldData: raceData }));
    dispatch(FetchTrainingDetail.action({ oldData: trainingData }));
    // OfflineImageStore.clearStore((err) => {
    //   if (!err) {
    //     console.log('Hurray!! clearStore completed callback called');
    //   }
    // });

    AsyncStorage.getItem(CONSTANTS.PROGRESS_TO_RESUME)
      .then((value) => JSON.parse(value))
      .then((value) => {
        switch (value?.type) {
          case 'race':
            // Linking.openURL('app://moontrekker/race-progress/1'); // 1 is the last trail index user did
            navigate('Race Progress', {
              restoredStartTime: value.start_time,
              trailNo: value.current_trail_index,
              continueRace: true,
              ...value,
            });
            break;
          case 'training':
            navigate('Training Progress', {
              restoredStartTime: value.start_time,
              trailList: value.current_trail_index,
              startIndex: value.start_trail_index,
              continueRace: true,
              ...value,
            });
            break;
          case 'challenge_single':
          case 'challenge_standard':
            navigate('Challenge Progress', {
              restoredStartTime: value.start_time,
              trailNo: value.current_trail_index,
              continueRace: true,
              ...value,
            });
            break;
          case 'challenge_either_end':
            navigate('Challenge Either End Progress', {
              restoredStartTime: value.start_time,
              trailNo: value.current_trail_index,
              continueRace: true,
              selected_start_point: value.selected_start_point,
              ...value,
            });
            break;
          case 'challenge_training':
            navigate('Challenge Training Progress', {
              restoredStartTime: value.start_time,
              trailList: value.current_trail_index,
              startIndex: value.start_trail_index,
              continueRace: true,
              ...value,
            });
            break;
          default:
            break;
        }
      });
  }, []);

  return (
    <DrawerContentScrollView
      appearance="noDivider"
      bounces={false}
      contentContainerStyle={[
        {
          backgroundColor: Colors.primary,
          flexGrow: 1,
        },
      ]}
    >
      <View
        style={[
          Gutters.largeHPadding,
          Gutters.mediumTMargin,
          {
            height: 70,
          },
        ]}
      >
        <Image
          style={Layout.fullSize}
          source={Images.moontrekkerLogoColor}
          resizeMode="contain"
        />
      </View>
      <View style={[Layout.justifyContentCenter, Gutters.regularVPadding]}>
        {drawerItems.map((item, index) => (
          <DrawerItem
            key={index}
            onPress={() => {
              navigationPath(index);
            }}
            label={() => (
              <Text
                style={[
                  Fonts.h3,
                  {
                    color: Colors.white,
                    marginLeft: -12,
                  },
                ]}
              >
                {item.title}
              </Text>
            )}
            icon={() => (
              <Image
                style={[
                  Gutters.largeLMargin,
                  {
                    height: 30,
                    width: 30,
                  },
                ]}
                source={Images.navigation[item.icon]}
                resizeMode="contain"
              />
            )}
            style={[{ backgroundColor: Colors.transparent }]}
          />
        ))}
      </View>
      <View
        style={[
          Gutters.mediumLPadding,
          Gutters.largeRPadding,
          Gutters.largeTMargin,
          {
            height: 50,
          },
        ]}
      >
        <Image
          style={Layout.fullSize}
          source={Images.barclayLogo}
          resizeMode="contain"
        />
      </View>
    </DrawerContentScrollView>
  );
};

function DrawerNavigator() {
  return (
    <Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName="Challenges"
      overlayColor="#333333CC"
    >
      {drawerItems.map((screen) => (
        <Screen
          name={screen.name}
          key={screen.name}
          component={screen.component}
        />
      ))}

      <Screen
        name="Race Progress"
        key="Race Progress"
        component={IndexRaceProgressContainer}
      />
      <Screen
        name="Training Progress"
        key="Training Progress"
        component={IndexTrainingProgressContainer}
      />
    </Navigator>
  );
}

export default DrawerNavigator;
