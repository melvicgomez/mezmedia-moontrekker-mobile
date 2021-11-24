import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '@/Theme';
import CheckpointTrailCardComponent from '@/Components/CheckpointTrailCardComponent';
import PrimaryButtonComponent from '@/Components/PrimaryButtonComponent';
import CameraComponent from '@/Components/CameraComponent';

function IndexQrCodeIssueContainer({ navigation, route }) {
  const { Fonts, Gutters, Layout, Colors } = useTheme();

  const { getPhotoUri, trail } = route.params;
  const [cameraModalVisible, setCameraModalVisible] = useState(false);

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <ScrollView
        bounces={false}
        contentContainerStyle={[
          Gutters.regularHPadding,
          Gutters.regularVPadding,
          { backgroundColor: Colors.background },
        ]}
      >
        <View style={[Gutters.smallHPadding, Gutters.mediumBPadding]}>
          <Text style={[Fonts.textCenter, Fonts.h2, { color: Colors.white }]}>
            QR CODE ISSUES
          </Text>
          <Text
            style={[
              Fonts.textCenter,
              Fonts.h3,
              Gutters.largeVMargin,
              { color: Colors.white },
            ]}
          >
            Help! I can’t scan or can’t find the QR Code!
          </Text>
          <Text style={[Fonts.body, { color: Colors.white }]}>
            Having trouble? Tap the{' '}
            <Text style={Fonts.bodyBold}>Take Photo Button</Text> below to take
            a photo of the checkpoint landmark as proof that you are here. Then
            proceed on to the next checkpoint as usual.
          </Text>
        </View>
        <CheckpointTrailCardComponent trail={trail} requireButton={false} />
        <PrimaryButtonComponent
          label="TAKE PHOTO"
          onPress={() => setCameraModalVisible(true)}
          outerStyle={{
            ...Gutters.regularHMargin,
            ...Gutters.tinyTMargin,
          }}
        />
        <PrimaryButtonComponent
          label="GO BACK"
          onPress={() => navigation.goBack()}
          buttonColor={Colors.bodyText}
          outerStyle={{
            ...Gutters.regularHMargin,
            ...Gutters.regularVMargin,
          }}
        />
        {!!cameraModalVisible && (
          <CameraComponent
            visibility={cameraModalVisible}
            dismissModal={() => setCameraModalVisible(false)}
            getPhotoUri={(uri) => {
              getPhotoUri(uri, trail.trail_index);
              navigation.goBack();
            }}
          />
        )}
      </ScrollView>
    </View>
  );
}

export default IndexQrCodeIssueContainer;
