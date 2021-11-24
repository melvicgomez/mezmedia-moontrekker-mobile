import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  StatusBar,
  Platform,
  Text,
} from 'react-native';
import { Icon } from '@ui-kitten/components';
import { useTheme } from '@/Theme';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

function QrCodeScannerComponent({ dismissModal, visibility, onSuccess }) {
  const { Gutters, Colors, Layout, Fonts } = useTheme();

  const [torchlight, setTorchlight] = useState(false);

  useEffect(() => {
    if (visibility) {
      StatusBar.setHidden(true);
    }
    return () => {
      StatusBar.setHidden(false);
    };
  }, [visibility]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visibility}
      onRequestClose={() => {
        console.log('Action modal has been closed.');
      }}
    >
      <View
        style={[
          Layout.center,
          {
            flex: 1,
            backgroundColor: Colors.background,
          },
        ]}
      >
        <View
          style={[
            Gutters.smallHPadding,
            Layout.fullSize,
            { flex: 1, backgroundColor: Colors.background },
          ]}
        >
          <View position="absolute" right={10} top={10} zIndex={1}>
            <TouchableOpacity onPress={dismissModal}>
              <Icon
                name="close-outline"
                width={35}
                height={40}
                fill={Colors.white}
              />
            </TouchableOpacity>
          </View>
          <QRCodeScanner
            onRead={(value) => {
              dismissModal();
              onSuccess(value);
            }}
            showMarker={true}
            markerStyle={{ borderColor: Colors.white }}
            fadeIn={false}
            flashMode={
              torchlight
                ? RNCamera.Constants.FlashMode.torch
                : RNCamera.Constants.FlashMode.off
            }
            topContent={
              <View style={[Gutters.regularHPadding]}>
                <Text
                  style={[
                    Fonts.h3,
                    Fonts.textCenter,
                    Gutters.smallBMargin,
                    { color: Colors.white },
                  ]}
                >
                  Scan QR Code
                </Text>
                <Text
                  style={[
                    Fonts.body,
                    Fonts.textCenter,
                    { color: Colors.white, marginBottom: -15 },
                  ]}
                >
                  Point the camera at the QR code. The app will detect the QR
                  code automatically. Make sure the entire code is visible and
                  is in focus.
                </Text>
              </View>
            }
            bottomContent={
              <View style={[Layout.alignItemsCenter, Gutters.regularHPadding]}>
                <Text
                  style={[
                    Fonts.body,
                    Fonts.textCenter,
                    Gutters.smallBMargin,
                    { color: Colors.white },
                  ]}
                >
                  Turn the flash on to improve the lighting conditions for
                  scanning.
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setTorchlight((prevVal) => !prevVal)}
                >
                  <View
                    flexDirection="row"
                    style={[
                      Layout.center,
                      {
                        backgroundColor: Colors.primary,
                        borderRadius: 8,
                        height: 60,
                        width: 180,
                      },
                    ]}
                  >
                    {!torchlight ? (
                      <Icon
                        name={'flash-outline'}
                        width={35}
                        height={35}
                        fill={Colors.white}
                        style={Gutters.smallRMargin}
                      />
                    ) : null}

                    <Text style={[Fonts.bodyBold, { color: Colors.white }]}>
                      Turn {torchlight ? 'Off' : 'On'} Flash
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            }
            containerStyle={{
              backgroundColor: Colors.background,
              alignItems: 'center',
            }}
            cameraStyle={{
              width:
                Platform.OS === 'ios'
                  ? Dimensions.get('window').width * 0.9
                  : Dimensions.get('window').width * 0.8,
              height: Dimensions.get('window').height * 0.6,
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

export default QrCodeScannerComponent;
