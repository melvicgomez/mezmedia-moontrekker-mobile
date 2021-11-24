import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '@/Theme';
import { navigateAndSimpleReset } from '@/Navigators/Root';
import PrimaryButtonComponent from '@/Components/PrimaryButtonComponent';

function IndexPermissionInfoContainer() {
  const { Fonts, Gutters, Layout, Colors } = useTheme();

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <ScrollView
        bounces={false}
        style={Layout.fill}
        contentContainerStyle={[
          // Gutters.mediumVPadding,
          // Gutters.largeHPadding,
          { padding: 50 },
        ]}
      >
        <Text
          style={[
            Fonts.h3,
            Fonts.textCenter,
            Gutters.largeBMargin,
            Gutters.smallTMargin,
            { color: Colors.white },
          ]}
        >
          PLEASE ALLOW PERMISSIONS
        </Text>
        <Text
          style={[
            Fonts.bodyBold,
            Layout.row,
            Gutters.mediumBMargin,
            { color: Colors.white, flex: 1 },
          ]}
        >
          This app requires several permissions in order to function.
        </Text>
        <Text
          style={[
            Fonts.body,
            Layout.row,
            Gutters.mediumBMargin,
            { color: Colors.white, flex: 1 },
          ]}
        >
          GPS and location data is required to confirm your location during the
          Race and Challenges.
        </Text>
        <Text
          style={[
            Fonts.body,
            Layout.row,
            Gutters.mediumBMargin,
            { color: Colors.white, flex: 1 },
          ]}
        >
          Photo taking feature is required to scan the QR codes for the Race and
          Challenges.
        </Text>
        <Text
          style={[
            Fonts.body,
            Layout.row,
            Gutters.mediumBMargin,
            { color: Colors.white, flex: 1 },
          ]}
        >
          Notifications is required in order to notify you of Race and Challenge
          updates
        </Text>
        <PrimaryButtonComponent
          label="NEXT"
          onPress={() => navigateAndSimpleReset('Home')}
          outerStyle={{
            marginTop: 30,
            marginBottom: 20,
          }}
        />
      </ScrollView>
    </View>
  );
}

export default IndexPermissionInfoContainer;
