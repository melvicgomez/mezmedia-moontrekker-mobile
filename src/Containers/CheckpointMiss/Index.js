import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useTheme } from '@/Theme';
import { navigate } from '@/Navigators/Root';
import PrimaryButtonComponent from '@/Components/PrimaryButtonComponent';
import QrCodeScannerComponent from '@/Components/QrCodeScannerComponent';

function IndexCheckpointMissContainer({ navigation, route }) {
  const { Fonts, Gutters, Layout, Colors, Images } = useTheme();

  const { type, challengeId, scanQr } = route.params;
  const [scannerModalVisible, setScannerModalVisible] = useState(false);

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <ScrollView
        bounces={false}
        style={Layout.fill}
        contentContainerStyle={[Gutters.mediumVPadding, Gutters.largeHPadding]}
      >
        <View style={[Gutters.smallHPadding, Gutters.mediumBPadding]}>
          <Text style={[Fonts.textCenter, Fonts.h2, { color: Colors.white }]}>
            MISSED A CHECKPOINT
          </Text>
          <Text
            style={[
              Fonts.textCenter,
              Fonts.h3,
              Gutters.largeVMargin,
              { color: Colors.white },
            ]}
          >
            I’ve missed a checkpoint!
          </Text>
          <Text style={[Fonts.body, { color: Colors.white }]}>
            That’s ok! Just head to the next Checkpoint on your run. Hit the
            Scan QR Code Button below and scan QR code at the checkpoint when
            you get to it.
          </Text>
        </View>
        <PrimaryButtonComponent
          onPress={() => setScannerModalVisible(true)}
          iconLeft={
            <Image
              source={Images.flagIconGrey}
              resizeMode="contain"
              style={[
                Gutters.smallRMargin,
                { height: 42, width: 37, resizeMode: 'contain' },
              ]}
            />
          }
          buttonColor={Colors.yellow}
          labelColor={Colors.bodyText}
          label="TAP TO SCAN QR CODE AT NEXT CHECKPOINT"
          innerStyle={{ paddingLeft: 30, paddingRight: 30 }}
          labelStyle={Fonts.h3}
          outerStyle={Gutters.tinyHMargin}
        />
        <Text
          style={[
            Fonts.body,
            Gutters.smallHPadding,
            Gutters.smallTMargin,
            Gutters.mediumBMargin,
            { color: Colors.white },
          ]}
        >
          Not sure where the next checkpoint is? Click here to view all the
          checkpoints.
        </Text>
        <PrimaryButtonComponent
          onPress={() =>
            navigate('Trail Checkpoint', {
              challengeId: challengeId,
              type: type,
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
          outerStyle={Gutters.tinyHMargin}
        />
        <PrimaryButtonComponent
          label="GO BACK"
          onPress={() => navigation.goBack()}
          buttonColor={Colors.bodyText}
          outerStyle={{
            ...Gutters.tinyHMargin,
            ...Gutters.regularVMargin,
          }}
        />
        <QrCodeScannerComponent
          visibility={scannerModalVisible}
          dismissModal={() => setScannerModalVisible(false)}
          onSuccess={(value) => {
            scanQr(value);
            navigation.goBack();
          }}
        />
      </ScrollView>
    </View>
  );
}

export default IndexCheckpointMissContainer;
