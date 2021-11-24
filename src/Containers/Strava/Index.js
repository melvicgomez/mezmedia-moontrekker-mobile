import React from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';
import { useTheme } from '@/Theme';
import AppBarComponent from '@/Components/AppBarComponent';
import PrimaryButtonComponent from '@/Components/PrimaryButtonComponent';

function IndexStravaContainer() {
  const { Fonts, Gutters, Layout, Colors } = useTheme();

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
        <Text style={[Fonts.h2, Fonts.textCenter, { color: Colors.white }]}>
          COMPETITIVE TIMES
        </Text>
        <Text
          style={[Fonts.body, Gutters.regularTMargin, { color: Colors.white }]}
        >
          If you plan on running a competitive time of{' '}
          <Text style={Fonts.bodyBold}>4 hours</Text> and below, we will need to
          verify your route. In order to do so, you will need to download and
          install the free <Text style={Fonts.bodyBold}>Strava</Text> app. You
          will need create a run in Strava alongside the scanning of checkpoints
          via the MoonTrekker app.
        </Text>
        <Text
          style={[Fonts.body, Gutters.mediumTMargin, { color: Colors.white }]}
        >
          Strava tracks your exact route of the run via GPS. This will allow us
          to verify your results.
        </Text>
        <View flexDirection="row" style={Gutters.mediumTMargin}>
          <Text
            style={[
              Fonts.body,
              Gutters.smallHMargin,
              { color: Colors.white, width: 13 },
            ]}
          >
            1.
          </Text>
          <Text style={[Fonts.body, { color: Colors.white, flex: 1 }]}>
            Download the Strava App from the relevant app store
          </Text>
        </View>
        <View flexDirection="row" style={Gutters.smallTMargin}>
          <Text
            style={[
              Fonts.body,
              Gutters.smallHMargin,
              { color: Colors.white, width: 13 },
            ]}
          >
            2.
          </Text>
          <Text style={[Fonts.body, { color: Colors.white, flex: 1 }]}>
            Launch the Strava App. Go to Record
          </Text>
        </View>
        <View flexDirection="row" style={Gutters.smallTMargin}>
          <Text
            style={[
              Fonts.body,
              Gutters.smallHMargin,
              { color: Colors.white, width: 13 },
            ]}
          >
            3.
          </Text>
          <Text style={[Fonts.body, { color: Colors.white, flex: 1 }]}>
            Press Start when you want to begin. Then swap over to the
            MoonTrekker app and scan the Starting Checkpoint QR Code
          </Text>
        </View>
        <View flexDirection="row" style={Gutters.smallTMargin}>
          <Text
            style={[
              Fonts.body,
              Gutters.smallHMargin,
              { color: Colors.white, width: 13 },
            ]}
          >
            4.
          </Text>
          <Text style={[Fonts.body, { color: Colors.white, flex: 1 }]}>
            Proceed with the race
          </Text>
        </View>
        <View flexDirection="row" style={Gutters.smallTMargin}>
          <Text
            style={[
              Fonts.body,
              Gutters.smallHMargin,
              { color: Colors.white, width: 13 },
            ]}
          >
            5.
          </Text>
          <Text style={[Fonts.body, { color: Colors.white, flex: 1 }]}>
            Scan the Finish Checkpoint QR Code in the MoonTrekker app to
            complete the race
          </Text>
        </View>
        <View flexDirection="row" style={Gutters.smallTMargin}>
          <Text
            style={[
              Fonts.body,
              Gutters.smallHMargin,
              { color: Colors.white, width: 13 },
            ]}
          >
            6.
          </Text>
          <Text style={[Fonts.body, { color: Colors.white, flex: 1 }]}>
            In the Strava App, Stop and Finish the run
          </Text>
        </View>
        <View flexDirection="row" style={Gutters.smallTMargin}>
          <Text
            style={[
              Fonts.body,
              Gutters.smallHMargin,
              { color: Colors.white, width: 13 },
            ]}
          >
            7.
          </Text>
          <Text style={[Fonts.body, { color: Colors.white, flex: 1 }]}>
            Take a screenshot of the route. Email a copy of your route to
            hello@moontrekker.com
          </Text>
        </View>
        <Text
          style={[Fonts.body, Gutters.mediumTMargin, { color: Colors.white }]}
        >
          If you need further clarifications, please email hello@moontrekker.com
        </Text>
        <PrimaryButtonComponent
          label="DOWNLOAD STRAVA (APPLE STORE)"
          onPress={() => {
            Linking.openURL(
              'https://apps.apple.com/us/app/strava-run-ride-swim/id426826309',
            );
          }}
          outerStyle={{
            marginTop: 30,
          }}
        />
        <PrimaryButtonComponent
          label="DOWNLOAD STRAVA (ANDROID)"
          onPress={() => {
            Linking.openURL(
              'https://play.google.com/store/apps/details?id=com.strava&hl=en&gl=US',
            );
          }}
          outerStyle={{
            marginTop: 20,
          }}
        />
      </ScrollView>
    </View>
  );
}

export default IndexStravaContainer;
