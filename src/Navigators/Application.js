import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  IndexStartupContainer,
  IndexResetPageContainer,
  IndexWelcomePageContainer,
  IndexLoginContainer,
  IndexFirstLoginContainer,
  IndexOneTimePinContainer,
  IndexNewPasswordContainer,
  IndexChangePasswordContainer,
  IndexAnnouncementContainer,
  IndexTrailCheckpointContainer,
  IndexStravaContainer,
  IndexContactUsContainer,
  IndexRaceProgressContainer,
  IndexRaceRuleContainer,
  IndexPrivacyPolicyContainer,
  IndexTermsAndConditionsContainer,
  IndexRaceCompleteContainer,
  IndexCheckpointMissContainer,
  IndexQrCodeIssueContainer,
  IndexTrailImageViewerContainer,
  IndexOpenStreetMapViewerContainer,
  IndexLeaderboardRankingContainer,
  IndexRecordDetailsContainer,
  IndexTrainingProgressContainer,
  IndexTrainingCompleteContainer,
  IndexChallengeDetailContainer,
  IndexChallengeTrainingProgressContainer,
  IndexChallengeProgressContainer,
  IndexChallengeEitherEndProgressContainer,
  IndexChallengeCompleteContainer,
  IndexCorporateCupUsersContainer,
  IndexPermissionInfoContainer,
} from '@/Containers';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '@/Navigators/Root';
import { SafeAreaView, StatusBar, View, Linking } from 'react-native';
import { AppearanceProvider } from 'react-native-appearance';
import { useTheme } from '@/Theme';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { DrawerNavigator } from '@/Navigators';

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

import config from './config';

const linking = {
  prefixes: ['app://moontrekker'],
  config,
};

const Stack = createStackNavigator();

let MainNavigator;

// @refresh reset
const ApplicationNavigator = () => {
  const { NavigationTheme, Colors } = useTheme();
  const [isApplicationLoaded, setIsApplicationLoaded] = useState(false);
  const applicationIsLoading = useSelector((state) => state.startup.loading);

  useEffect(() => {
    if (MainNavigator == null && !applicationIsLoading) {
      MainNavigator = require('@/Navigators/Drawer').default;
      setIsApplicationLoaded(true);

      PushNotification.createChannel(
        {
          channelId: 'fcm_fallback_notification_channel', // (required)
          channelName: 'Default Notification', // (required)
        },
        (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
      );

      PushNotification.configure({
        onRegister: () => {},
        onNotification: function (notification) {
          console.log('onNotification:', notification);
          notification.finish(PushNotificationIOS.FetchResult.NoData);

          if (notification.userInteraction) {
            // navigate when user click the notification
            console.log('NOTIFICATION:', notification);
            Linking.openURL(`app://moontrekker/${notification.data.url}`);
          }
        },
        onAction: (notification) => {
          if (notification.action === 'Yes') {
            PushNotification.invokeApp(notification);
          }
        },
        onRegistrationError: function (token) {
          console.log('TOKEN:', token);
        },
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
      });
    }
  }, [applicationIsLoading]);

  // on destroy needed to be able to reset when app close in background (Android)
  useEffect(
    () => () => {
      setIsApplicationLoaded(false);
      MainNavigator = null;
      PushNotification.clearAllNotifications();
    },
    [],
  );

  /**
   * FIREBASE MESSAGING
   */

  useEffect(() => {
    PushNotification.popInitialNotification((notification) => {
      console.log('Initial Notification', notification);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      PushNotification.localNotification({
        channelId: 'fcm_fallback_notification_channel', // (required)
        channelName: 'Default Notification', // (required)
        largeIcon: '',
        smallIcon: '',
        color: Colors.digital,
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
        showWhen: true,
        when: Date.now(),
        userInfo: {
          // url will be provided when notification is send
          url: remoteMessage.data.url, // 'livetogive://www.livetogive.co/settings'
        },
      });
    });
    return unsubscribe;
  }, []);
  /**
   * FIREBASE MESSAGING
   */

  return (
    <AppearanceProvider>
      <IconRegistry icons={[EvaIconsPack]} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <View
          height={StatusBar.currentHeight}
          backgroundColor={Colors.statusBarBg}
        >
          <SafeAreaView>
            <StatusBar
              backgroundColor={Colors.statusBarBg}
              barStyle="light-content"
              translucent
            />
          </SafeAreaView>
        </View>
        <NavigationContainer
          linking={linking}
          theme={NavigationTheme}
          ref={navigationRef}
        >
          <Stack.Navigator
            initialRouteName="Startup"
            headerMode={'none'}
            screenOptions={{ animationEnabled: false, gestureEnabled: false }}
          >
            <Stack.Screen name="Startup" component={IndexStartupContainer} />
            {isApplicationLoaded && MainNavigator != null && (
              <Stack.Screen
                name="Welcome"
                component={IndexWelcomePageContainer}
              />
            )}
            <Stack.Screen name="Home" component={DrawerNavigator} />
            <Stack.Screen
              name="Permission Info"
              component={IndexPermissionInfoContainer}
            />
            <Stack.Screen name="Login" component={IndexLoginContainer} />
            <Stack.Screen
              name="First Login"
              component={IndexFirstLoginContainer}
            />
            <Stack.Screen name="OTP" component={IndexOneTimePinContainer} />
            <Stack.Screen
              name="New Password"
              component={IndexNewPasswordContainer}
            />
            <Stack.Screen
              name="Change Password"
              component={IndexChangePasswordContainer}
            />
            <Stack.Screen
              name="Contact Us"
              component={IndexContactUsContainer}
            />
            <Stack.Screen
              name="Reset Page"
              component={IndexResetPageContainer}
            />
            <Stack.Screen
              name="Announcement Details"
              component={IndexAnnouncementContainer}
            />
            <Stack.Screen
              name="Trail Checkpoint"
              component={IndexTrailCheckpointContainer}
            />
            <Stack.Screen name="Rule" component={IndexRaceRuleContainer} />
            <Stack.Screen
              name="Race Progress"
              component={IndexRaceProgressContainer}
            />
            <Stack.Screen
              name="Race Complete"
              component={IndexRaceCompleteContainer}
            />
            <Stack.Screen
              name="Challenge Detail"
              component={IndexChallengeDetailContainer}
            />
            <Stack.Screen
              name="Challenge Progress"
              component={IndexChallengeProgressContainer}
            />
            <Stack.Screen
              name="Challenge Either End Progress"
              component={IndexChallengeEitherEndProgressContainer}
            />
            <Stack.Screen
              name="Challenge Training Progress"
              component={IndexChallengeTrainingProgressContainer}
            />
            <Stack.Screen
              name="Challenge Complete"
              component={IndexChallengeCompleteContainer}
            />
            <Stack.Screen
              name="Training Progress"
              component={IndexTrainingProgressContainer}
            />
            <Stack.Screen
              name="Training Complete"
              component={IndexTrainingCompleteContainer}
            />
            <Stack.Screen
              name="Checkpoint Miss"
              component={IndexCheckpointMissContainer}
            />
            <Stack.Screen
              name="Qr Issue"
              component={IndexQrCodeIssueContainer}
            />
            <Stack.Screen
              name="View Image"
              component={IndexTrailImageViewerContainer}
            />
            <Stack.Screen
              name="Record Details"
              component={IndexRecordDetailsContainer}
            />
            <Stack.Screen name="Strava" component={IndexStravaContainer} />
            <Stack.Screen
              name="Privacy Policy"
              component={IndexPrivacyPolicyContainer}
            />
            <Stack.Screen
              name="Terms And Conditions"
              component={IndexTermsAndConditionsContainer}
            />
            <Stack.Screen
              name="OpenStreetMap Viewer"
              component={IndexOpenStreetMapViewerContainer}
            />
            <Stack.Screen
              name="Leaderboard Ranking"
              component={IndexLeaderboardRankingContainer}
            />
            <Stack.Screen
              name="Corporate Cup Users"
              component={IndexCorporateCupUsersContainer}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </AppearanceProvider>
  );
};

export default ApplicationNavigator;
