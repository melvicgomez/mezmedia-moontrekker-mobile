import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
  Image,
  StatusBar,
  Text,
} from 'react-native';
import { Icon } from '@ui-kitten/components';
import { useTheme } from '@/Theme';
import { RNCamera } from 'react-native-camera';
import PrimaryButtonComponent from '@/Components/PrimaryButtonComponent';

function CameraComponent({ dismissModal, visibility, getPhotoUri }) {
  const { Gutters, Colors, Layout, Fonts, Images } = useTheme();
  const [imageUrl, setImageUrl] = useState('');

  const cameraRef = useRef();
  const [torchlight, setTorchlight] = useState(false);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: false };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
      setImageUrl(data.uri);
    }
  };

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
      transparent={false}
      visible={visibility}
      statusBarTranslucent={false}
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
            <TouchableOpacity
              onPress={() => {
                setImageUrl('');
                dismissModal();
              }}
            >
              <Icon
                name="close-outline"
                width={35}
                height={40}
                fill={Colors.white}
              />
            </TouchableOpacity>
          </View>
          {imageUrl ? (
            <View style={Layout.fill}>
              <View
                style={[
                  Layout.center,
                  Layout.fill,
                  { paddingTop: Dimensions.get('window').height * 0.05 },
                ]}
              >
                <Image
                  source={{ uri: imageUrl }}
                  style={{
                    alignSelf: 'center',
                    height: Dimensions.get('window').height * 0.7,
                    width: Dimensions.get('window').width,
                  }}
                  resizeMode="contain"
                />
              </View>
              <View
                style={[
                  Layout.row,
                  Layout.justifyContentBetween,
                  Gutters.largeBMargin,
                  Gutters.mediumHPadding,
                  { flex: 0 },
                ]}
              >
                <PrimaryButtonComponent
                  label="RETAKE"
                  onPress={() => {
                    setImageUrl('');
                  }}
                  labelStyle={Fonts.bodyBold}
                  outerStyle={{
                    width: '45%',
                  }}
                />
                <PrimaryButtonComponent
                  label="SUBMIT"
                  onPress={() => {
                    getPhotoUri(imageUrl);
                    dismissModal();
                  }}
                  labelStyle={Fonts.bodyBold}
                  outerStyle={{
                    width: '45%',
                  }}
                />
              </View>
            </View>
          ) : (
            <>
              <View
                style={[
                  Layout.center,
                  Layout.positionAbsolute,
                  {
                    top: Dimensions.get('window').height * 0.1 - 30,
                  },
                ]}
              >
                <Text style={[Fonts.h3, { color: Colors.white }]}>
                  Take a Photo
                </Text>
              </View>
              <RNCamera
                ref={cameraRef}
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginTop: Dimensions.get('window').height * 0.1,
                }}
                type={RNCamera.Constants.Type.back}
                flashMode={
                  torchlight
                    ? RNCamera.Constants.FlashMode.torch
                    : RNCamera.Constants.FlashMode.off
                }
                androidCameraPermissionOptions={{
                  title: 'Camera Access',
                  message: 'We need your permission to use your camera',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
                captureAudio={false}
              />
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 15,
                  margin: 20,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={takePicture}
                  style={Gutters.smallRMargin}
                >
                  <View
                    flexDirection="row"
                    style={[
                      Layout.center,
                      {
                        backgroundColor: Colors.primary,
                        borderRadius: 8,
                        height: 55,
                        width: 160,
                      },
                    ]}
                  >
                    <Image
                      source={Images.cameraIcon}
                      style={[Gutters.smallRMargin, { height: 30, width: 30 }]}
                      resizeMode="contain"
                    />
                    <Text style={[Fonts.bodyBold, { color: Colors.white }]}>
                      Take Photo
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setTorchlight((prevVal) => !prevVal)}
                  style={Gutters.mediumLMargin}
                >
                  <View
                    flexDirection="row"
                    style={[
                      Layout.center,
                      {
                        backgroundColor: Colors.primary,
                        borderRadius: 8,
                        height: 55,
                        width: 160,
                      },
                    ]}
                  >
                    {!torchlight ? (
                      <Icon
                        name={'flash-outline'}
                        width={30}
                        height={30}
                        fill={Colors.white}
                        style={Gutters.tinyRMargin}
                      />
                    ) : null}

                    <Text style={[Fonts.bodyBold, { color: Colors.white }]}>
                      Turn {torchlight ? 'Off' : 'On'} Flash
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

export default CameraComponent;
