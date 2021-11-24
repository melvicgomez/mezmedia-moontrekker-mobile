import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Modal, PixelRatio } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { useTheme } from '@/Theme';
import PrimaryButtonComponent from '@/Components/PrimaryButtonComponent';
import { openSettings } from 'react-native-permissions';

function PermissionPopupComponent({
  dismissModal,
  visibility,
  allowNotif,
  allowCam,
  allowLocation,
}) {
  const { Gutters, Layout, Colors, Fonts } = useTheme();

  const permissionText = () => {
    let temp = [];

    if (!allowLocation) {
      temp.push('Location');
    }
    if (!allowCam) {
      temp.push('Camera');
    }
    if (!allowNotif) {
      temp.push('Notification');
    }

    return (
      temp.join(', ') +
      (temp.length > 1 ? ' Permissions Required' : ' Permission Required')
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visibility}
      onRequestClose={() => {
        console.log('Action modal has been closed.');
      }}
    >
      <TouchableOpacity
        style={[
          Layout.center,
          {
            flex: 1,
            backgroundColor: Colors.backdrop,
          },
        ]}
        activeOpacity={1}
        onPress={dismissModal}
      >
        <View
          paddingTop={50}
          paddingBottom={45}
          style={[
            Gutters.largeHPadding,
            {
              backgroundColor: Colors.white,
              borderRadius: 8,
              width: '90%',
            },
          ]}
        >
          <View position="absolute" right={0} padding={10}>
            <TouchableOpacity onPress={dismissModal}>
              <Icon
                name="close"
                width={35}
                height={35}
                fill={Colors.bodyText}
              />
            </TouchableOpacity>
          </View>
          <View style={Gutters.tinyHPadding}>
            <Text
              style={[
                Fonts.textCenter,
                Fonts.h3,
                Gutters.mediumBMargin,
                {
                  color: Colors.bodyText,
                  lineHeight: 22 / PixelRatio.getFontScale(),
                },
              ]}
            >
              {permissionText()}
            </Text>
            <Text
              style={[
                // Fonts.textCenter,
                Fonts.bodyBold,
                {
                  color: Colors.bodyText,
                },
              ]}
            >
              This app requires the following permissions in order to funtion.
              Please enable it in the settings
            </Text>

            <View style={Gutters.regularTMargin}>
              {!allowLocation ? (
                <Text
                  style={[
                    Fonts.body,
                    Gutters.smallBMargin,
                    {
                      color: Colors.bodyText,
                    },
                  ]}
                >
                  GPS and location data is required to confirm your location
                  during the Race and Challenge
                </Text>
              ) : null}
              {!allowCam ? (
                <Text
                  style={[
                    Fonts.body,
                    Gutters.smallBMargin,
                    {
                      color: Colors.bodyText,
                    },
                  ]}
                >
                  Camera is required to scan QR Codes for the Race and Challenge
                </Text>
              ) : null}
              {!allowNotif ? (
                <Text
                  style={[
                    Fonts.body,
                    {
                      color: Colors.bodyText,
                    },
                  ]}
                >
                  Notification is required to receive Race and Challenge updates
                </Text>
              ) : null}
            </View>
          </View>
          <View
            flexDirection="row"
            style={[Layout.center, Gutters.largeTMargin]}
          >
            <PrimaryButtonComponent
              label="Open Settings"
              loading={false}
              onPress={() =>
                openSettings().catch(() => console.warn('cannot open settings'))
              }
              labelStyle={Fonts.bodyBold}
              outerStyle={{
                width: '80%',
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

PermissionPopupComponent.propTypes = {};

PermissionPopupComponent.defaultProps = {};

export default PermissionPopupComponent;
