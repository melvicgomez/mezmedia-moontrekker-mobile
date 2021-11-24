import React, { useState } from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';
import { useTheme } from '@/Theme';
import { navigate } from '@/Navigators/Root';
import AppBarComponent from '@/Components/AppBarComponent';
import PrimaryButtonComponent from '@/Components/PrimaryButtonComponent';
import PermissionPopupComponent from '@/Components/PermissionPopupComponent';
import messaging from '@react-native-firebase/messaging';
import {
  requestMultiple,
  PERMISSIONS,
  checkMultiple,
  RESULTS,
} from 'react-native-permissions';

function IndexRaceRuleContainer({ navigation }) {
  const { Fonts, Gutters, Layout, Colors } = useTheme();

  const [allowNotification, setAllowNotification] = useState(true);
  const [allowCamera, setAllowCamera] = useState(true);
  const [allowLocation, setAllowLocation] = useState(true);

  const [permissionModalVisible, setPermissionModalVisible] = useState(false);

  const permissionChecking = async () => {
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
      navigate('Race Progress', {
        trailNo: 1,
        screen_view: 'Race Progress',
      });
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
        title="Race"
        type="main"
        displayBack={true}
        displayMenu={false}
      />
      <ScrollView
        bounces={false}
        style={Layout.fill}
        contentContainerStyle={[Gutters.mediumVPadding, Gutters.largeHPadding]}
      >
        <Text
          style={[
            Fonts.h2,
            Fonts.textCenter,
            Gutters.mediumBMargin,
            { color: Colors.white },
          ]}
        >
          RULES & REGULATIONS
        </Text>
        <View style={[Layout.row, Gutters.mediumBMargin]}>
          <Text
            style={[Fonts.body, Gutters.smallRMargin, { color: Colors.white }]}
          >
            •
          </Text>
          <Text style={[Fonts.body, { color: Colors.white, flex: 1 }]}>
            Full completion of the route{' '}
            <Text style={Fonts.bodyBold}>is required</Text> to place you on the
            leaderboard.
          </Text>
        </View>
        <View style={[Layout.row, Gutters.mediumBMargin]}>
          <Text
            style={[Fonts.body, Gutters.smallRMargin, { color: Colors.white }]}
          >
            •
          </Text>
          <Text style={[Fonts.body, { color: Colors.white, flex: 1 }]}>
            If you are in a Duo or Team, your leaderboard ranking will only
            appear after all members have completed a race successfully.
          </Text>
        </View>
        <View style={[Layout.row, Gutters.mediumBMargin]}>
          <Text
            style={[Fonts.body, Gutters.smallRMargin, { color: Colors.white }]}
          >
            •
          </Text>
          <Text style={[Fonts.body, { color: Colors.white, flex: 1 }]}>
            You must scan all Checkpoints to complete the race.
          </Text>
        </View>
        <View style={[Layout.row, Gutters.mediumBMargin]}>
          <Text
            style={[Fonts.body, Gutters.smallRMargin, { color: Colors.white }]}
          >
            •
          </Text>
          <Text style={[Fonts.body, { color: Colors.white, flex: 1 }]}>
            All races <Text style={Fonts.bodyBold}>must</Text> start between{' '}
            <Text style={Fonts.bodyBold}>5:00pm - 11.59pm HKT</Text>. Races that
            are done outside of this time will be declared invalid. The training
            and challenges, you may start at any time.
          </Text>
        </View>
        <View style={[Layout.row, Gutters.mediumBMargin]}>
          <Text
            style={[Fonts.body, Gutters.smallRMargin, { color: Colors.white }]}
          >
            •
          </Text>
          <Text style={[Fonts.body, { color: Colors.white, flex: 1 }]}>
            If your time between each checkpoint exceeds 12hrs, your race will
            be declared incomplete.
          </Text>
        </View>
        <View style={[Layout.row, Gutters.mediumBMargin]}>
          <Text
            style={[Fonts.body, Gutters.smallRMargin, { color: Colors.white }]}
          >
            •
          </Text>
          <Text style={[Fonts.body, { color: Colors.white, flex: 1 }]}>
            Competitive times of 4hrs and below will require additional
            verification via{' '}
            <Text
              style={[Fonts.bodyBold, Fonts.textUnderline]}
              onPress={() => navigate('Strava', { screen_view: 'Strava' })}
            >
              Strava
            </Text>
            . Click{' '}
            <Text
              style={Fonts.bodyLink}
              onPress={() => navigate('Strava', { screen_view: 'Strava' })}
            >
              here
            </Text>{' '}
            to find out more.
          </Text>
        </View>
        <View style={[Layout.row, Gutters.mediumBMargin]}>
          <Text
            style={[Fonts.body, Gutters.smallRMargin, { color: Colors.white }]}
          >
            •
          </Text>
          <Text style={[Fonts.body, { color: Colors.white, flex: 1 }]}>
            <Text style={Fonts.bodyBold}>
              Training Partner OR Virtual Buddy:
            </Text>{' '}
            Participants must conduct their training together with at least one
            other participant OR with a 'Virtual Buddy'. A virtual buddy is
            someone who monitors you during your training hikes and race
            attempts. They should be in regular touch, aware of your route and
            expected finish times. Participants must supply the phone contact
            details of their virtual race buddy.
          </Text>
        </View>
        <View style={[Layout.row, Gutters.mediumBMargin]}>
          <Text
            style={[Fonts.body, Gutters.smallRMargin, { color: Colors.white }]}
          >
            •
          </Text>
          <Text style={[Fonts.body, { color: Colors.white, flex: 1 }]}>
            <Text style={Fonts.bodyBold}>Route Directions:</Text> Participants
            are responsible for familiarizing themselves with the route in their
            training runs. the organizer accepts no responsibility for
            participants who do not follow the correct route.
          </Text>
        </View>
        <View style={[Layout.row, Gutters.mediumBMargin]}>
          <Text
            style={[Fonts.body, Gutters.smallRMargin, { color: Colors.white }]}
          >
            •
          </Text>
          <Text style={[Fonts.body, { color: Colors.white, flex: 1 }]}>
            <Text style={Fonts.bodyBold}>Physical Injury:</Text> Participants
            accept taking part in the MoonTrekker race, training and challenges
            or related training hikes, have an inherent risk of injury.
            Organisers or affiliates of MoonTrekker Limited including its
            partners and sponsors accepts no responsibility whatsoever of
            participants including death or injury. All participants must ensure
            that they are physically fit to participate in the MoonTrekker
            training and MoonTrekker race and that they know no reason why it
            would be ill advisable for them to take part. By submitting his or
            her entry, each applicant agrees to obey and accept all the terms
            and conditions of participation.
          </Text>
        </View>
        <View style={[Layout.row, Gutters.mediumBMargin]}>
          <Text
            style={[Fonts.body, Gutters.smallRMargin, { color: Colors.white }]}
          >
            •
          </Text>
          <Text style={[Fonts.body, { color: Colors.white, flex: 1 }]}>
            <Text style={Fonts.bodyBold}>Age:</Text> Participants must be 18
            years old or above on from October 1st, 2021 (the first day of the
            virtual challenge).
          </Text>
        </View>
        <View style={[Layout.row, Gutters.mediumBMargin]}>
          <Text
            style={[Fonts.body, Gutters.smallRMargin, { color: Colors.white }]}
          >
            •
          </Text>
          <Text style={[Fonts.body, { color: Colors.white, flex: 1 }]}>
            In the event of bad weather, a warning will be issued in the app. If
            you are already in the race, it will be declared incomplete and the
            race will be cancelled.
          </Text>
        </View>
        <View style={[Layout.row, Gutters.mediumBMargin]}>
          <Text
            style={[Fonts.body, Gutters.smallRMargin, { color: Colors.white }]}
          >
            •
          </Text>
          <Text style={[Fonts.body, { color: Colors.white, flex: 1 }]}>
            Only scanned Checkpoints completed will gain you MoonTrekker Points.
          </Text>
        </View>
        <View style={[Layout.row, Gutters.mediumBMargin]}>
          <Text
            style={[Fonts.body, Gutters.smallRMargin, { color: Colors.white }]}
          >
            •
          </Text>
          <Text style={[Fonts.body, { color: Colors.white, flex: 1 }]}>
            <Text style={Fonts.bodyBold}>Photographs and Video Usage:</Text>{' '}
            Barclays Moontrekker reserves the right to use any photographs
            or/and videos of participants taken by our event photographers of
            participants taking part in Barclays MoonTrekker 21 (challenge and
            race). This images maybe used in (and not restricted to) on Barclays
            MoonTrekker promotional materials including (and not limited to)
            websites, newsletters or media releases. Images and videos may also
            be shared with third parties and event sponsors for their own
            promotional usage.
          </Text>
        </View>
        <PrimaryButtonComponent
          label="I HAVE READ & AGREE TO THE RULES & REGULATIONS ABOVE"
          onPress={() => permissionChecking()}
          outerStyle={{
            marginTop: 15,
            marginBottom: 20,
          }}
        />
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
    </View>
  );
}

export default IndexRaceRuleContainer;
