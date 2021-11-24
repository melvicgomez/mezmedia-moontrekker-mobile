import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@/Theme';
import { navigateAndSimpleReset, navigate } from '@/Navigators/Root';
import axiosInstance from '@/Services/index';
import AppBarComponent from '@/Components/AppBarComponent';
import ConfirmationPopupComponent from '@/Components/ConfirmationPopupComponent';

import AuthenticationToken from '@/Store/AuthToken/AuthenticationToken';
import UserProfile from '@/Store/User/UserProfile';
import UnregisterDeviceToken from '@/Store/FCMNotification/UnregisterDeviceToken';
import messaging from '@react-native-firebase/messaging';
import GetPoint from '@/Store/MoontrekkerPoint/GetMoontrekkerPoint';

function IndexSettingsContainer() {
  const { Fonts, Gutters, Layout, Colors } = useTheme();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.item);

  const [fcmToken, setFcmToken] = useState(null);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    messaging()
      .getToken()
      .then((token) => {
        if (isMounted.current) {
          setFcmToken(token);
        }
      });

    return () => (isMounted.current = false);
  }, []);

  const userLogout = () => {
    if (!logoutLoading) {
      setLogoutLoading(true);
      axiosInstance
        .delete('api/logout')
        .then(async () => {
          await dispatch(AuthenticationToken.action({}));
          await dispatch(UserProfile.action({}));
          await dispatch(GetPoint.action({ user_id: 0 }));
          await dispatch(
            UnregisterDeviceToken.action({
              token: fcmToken,
            }),
          );
          setConfirmLogout(false);
          navigateAndSimpleReset('Welcome');
        })
        .catch((err) => {
          setLogoutLoading(false);
          console.log(err);
        });
    }
  };

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <AppBarComponent title="Settings" type="main" />
      <ScrollView
        bounces={false}
        contentContainerStyle={[Gutters.mediumVPadding, Gutters.mediumHPadding]}
      >
        <View style={Gutters.largeBMargin}>
          <Text
            style={[
              Fonts.bodyBold,
              Gutters.mediumBMargin,
              { color: Colors.white },
            ]}
          >
            Personal Settings
          </Text>
          <View
            style={[
              Layout.row,
              Layout.justifyContentBetween,
              Gutters.smallBMargin,
            ]}
          >
            <Text
              style={[
                Fonts.body,
                Gutters.smallBMargin,
                { color: Colors.white, width: 100 },
              ]}
            >
              Email
            </Text>
            <Text
              style={[
                Fonts.body,
                Gutters.smallBMargin,
                Fonts.textRight,
                {
                  color: Colors.white,
                  flex: 1,
                  flexWrap: 'wrap',
                },
              ]}
            >
              {user.email}
            </Text>
          </View>
          <View
            style={[
              Layout.row,
              Layout.justifyContentBetween,
              Gutters.smallBMargin,
            ]}
          >
            <Text
              style={[
                Fonts.body,
                Gutters.smallBMargin,
                { color: Colors.white },
              ]}
            >
              Change Password
            </Text>
            <Text
              style={[
                Fonts.bodyLink,
                Gutters.smallBMargin,
                { color: Colors.white },
              ]}
              onPress={() =>
                navigate('Change Password', { screen_view: 'Change Password' })
              }
            >
              Change
            </Text>
          </View>
          <View style={[Layout.row, Layout.justifyContentEnd]}>
            <Text
              style={[Fonts.bodyLink, { color: Colors.white }]}
              onPress={() => setConfirmLogout(true)}
            >
              Logout
            </Text>
          </View>
        </View>
        <View style={Gutters.largeBMargin}>
          <Text
            style={[
              Fonts.bodyBold,
              Gutters.mediumBMargin,
              { color: Colors.white },
            ]}
          >
            Technical Support
          </Text>
          <Text
            style={[
              Fonts.body,
              Gutters.smallBMargin,
              {
                color: Colors.white,
                lineHeight: 22 / PixelRatio.getFontScale(),
              },
            ]}
          >
            For registration changes or technical support, contact us{' '}
            <Text
              style={[
                Fonts.bodyBold,
                Fonts.textUnderline,
                {
                  color: Colors.white,
                  lineHeight: 22 / PixelRatio.getFontScale(),
                },
              ]}
              onPress={() =>
                navigate('Contact Us', {
                  screen_view: 'Contact Us',
                })
              }
            >
              here
            </Text>
          </Text>
        </View>
        <View>
          <View
            style={[
              Layout.row,
              Layout.justifyContentBetween,
              Gutters.mediumBMargin,
            ]}
          >
            <Text style={[Fonts.bodyBold, { color: Colors.white }]}>
              About this app
            </Text>
            <Text style={[Fonts.bodyBold, { color: Colors.white }]}>
              App Version 1.0.0
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              navigate('Privacy Policy', {
                screen_view: 'Privacy Policy',
              })
            }
          >
            <Text
              style={[
                Fonts.bodyLink,
                Gutters.mediumBMargin,
                {
                  color: Colors.white,
                  lineHeight: 22 / PixelRatio.getFontScale(),
                },
              ]}
            >
              Privacy Policy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              navigate('Terms And Conditions', {
                screen_view: 'Terms And Conditions',
              })
            }
          >
            <Text
              style={[
                Fonts.bodyLink,
                Gutters.smallBMargin,
                {
                  color: Colors.white,
                  lineHeight: 22 / PixelRatio.getFontScale(),
                },
              ]}
            >
              Terms & Conditions
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View>
          <TouchableOpacity>
            <PrimaryButtonComponent
              onPress={() =>
                navigate('OpenStreetMap Viewer', {
                  screen_view: 'OpenStreetMap Viewer',
                  iframeSrc:
                    'https://www.google.com/maps/d/embed?mid=1s3aRfP2GROGhPlMIjNHxurTEp5qVlO13',
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
              label="GOOGLE MAPS"
              innerStyle={{ paddingLeft: 20, paddingRight: 20 }}
              labelStyle={Fonts.bodyBold}
              outerStyle={Gutters.smallHMargin}
            />
          </TouchableOpacity>
        </View> */}
        <ConfirmationPopupComponent
          visibility={confirmLogout}
          dismissModal={() => setConfirmLogout(false)}
          title="Confirm Logout"
          message="You will be logged out of MoonTrekker and will be required to sign back in. Are you sure you want to proceed?"
          leftAction={userLogout}
          rightAction={() => setConfirmLogout(false)}
        />
      </ScrollView>
    </View>
  );
}

export default IndexSettingsContainer;
