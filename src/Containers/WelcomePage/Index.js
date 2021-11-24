import React, { useEffect } from 'react';
import {
  View,
  Dimensions,
  ImageBackground,
  Text,
  PixelRatio,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { navigateAndSimpleReset, navigate } from '@/Navigators/Root';
import { useSelector } from 'react-redux';
import { useTheme } from '@/Theme';
import { Brand } from '@/Components';
import PrimaryButtonComponent from '@/Components/PrimaryButtonComponent';
import moment from 'moment';
import axiosInstance from '@/Services/index';
import { persistor } from '@/Store';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import Mailer from 'react-native-mail';

import { OfflineImageStore } from '@/Components/react-native-image-offline';

function IndexWelcomePageContainer() {
  const { Fonts, Gutters, Layout, Images, Colors } = useTheme();

  const token = useSelector((state) => state.token.item);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (token.expires_at !== undefined) {
      if (moment().isBefore(token.expires_at)) {
        if (isFocused) {
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${token.access_token}`;
          navigateAndSimpleReset('Home');
        }
      } else {
        persistor.purge();
      }
    }
  }, [token]);

  const requestMessagingPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
    }
  };

  useEffect(() => {
    Toast.show({
      type: 'info',
      text2: 'App Version 1.0.0',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
    });

    requestMessagingPermission();
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      messaging().registerDeviceForRemoteMessages();
    }

    OfflineImageStore.restore(
      {
        name: 'My_Image_gallery',
        imageRemoveTimeout: 2592000, // expire image after 30 days
        debugMode: false,
      },
      () => {
        // Callback function
        console.log('Restore completed and callback called !');
      },
    );
  }, []);

  const sendEmail = () => {
    Mailer.mail(
      {
        recipients: ['hello@moontrekker.com'],
        isHTML: true,
      },
      (error, event) => {
        console.log(error);
      },
    );
  };

  return (
    <ImageBackground
      source={Images.welcomeBG}
      style={[Layout.fullSize, Layout.center]}
    >
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <View style={[Gutters.largeVPadding, Gutters.largeHPadding]}>
        <View style={Layout.colCenter} flex={7}>
          <Brand width={Dimensions.get('window').width * 0.8} height={108} />
          <PrimaryButtonComponent
            label="FIRST TIME LOGIN"
            onPress={() =>
              navigate('First Login', {
                screen_view: 'First Time Login',
                source: 'First Time Login',
              })
            }
            outerStyle={{
              width: Dimensions.get('window').width * 0.8,
              marginTop: 30,
              marginBottom: 10,
            }}
          />
          <Text
            style={[
              Fonts.bodyBold,
              Gutters.mediumHPadding,
              Fonts.textCenter,
              { color: Colors.white },
            ]}
          >
            If this is your first time on this app, you will need to create a
            password. Have your email you used to register for Moontrekker
            ready.
          </Text>
          <View
            style={[
              Gutters.mediumVMargin,
              {
                height: 2,
                backgroundColor: Colors.lightGrey,
                width: Dimensions.get('window').width * 0.8,
              },
            ]}
          />
          <PrimaryButtonComponent
            label="LOGIN"
            onPress={() =>
              navigate('Login', {
                screen_view: 'Login',
              })
            }
            outerStyle={{
              width: Dimensions.get('window').width * 0.8,
              marginBottom: 10,
            }}
            buttonColor={Colors.disabled}
          />
          <Text
            style={[
              Fonts.bodyBold,
              Gutters.mediumHPadding,
              Fonts.textCenter,
              { color: Colors.white },
            ]}
          >
            If you have already set up a password to access the app, press this
            button to login
          </Text>
        </View>
        <View flex={1}>
          <Text
            style={[
              Fonts.bodyBold,
              Gutters.mediumHPadding,
              Fonts.textCenter,
              Gutters.smallTPadding,
              Layout.alignItemsCenter,
              {
                color: Colors.white,
                lineHeight: 20 / PixelRatio.getFontScale(),
              },
            ]}
          >
            If you haven’t registered for MoonTrekker, you need to do{' '}
            <Text onPress={() => sendEmail()}>so </Text>
            <Text
              style={[
                Fonts.bodyBold,
                Fonts.textUnderline,
                {
                  color: Colors.white,
                },
              ]}
              onPress={() => sendEmail()}
            >
              here.
            </Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

export default IndexWelcomePageContainer;
