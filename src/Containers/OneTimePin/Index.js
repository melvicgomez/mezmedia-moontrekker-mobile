import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { Text, Icon } from '@ui-kitten/components';

import PrimaryButtonComponent from '@/Components/PrimaryButtonComponent';
import TextInputComponent from '@/Components/TextInputComponent';
import ConfirmationPopupComponent from '@/Components/ConfirmationPopupComponent';
import { useTheme } from '@/Theme';
import { navigate } from '@/Navigators/Root';
import axiosInstance from '@/Services';

function IndexOneTimePinContainer({ route, navigation }) {
  const { email, source } = route.params;

  const { Gutters, Layout, Colors, Fonts, Images } = useTheme();

  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isTooManyReq, setIsTooManyReq] = useState(null);

  const [placeholder, setPlaceholder] = useState({
    pin: 'Enter verification code',
  });

  useEffect(() => {
    getOTP(true);
  }, []);

  const getOTP = useCallback((firstLoad = false) => {
    // check if loading
    if (!firstLoad) setIsResendLoading(true);
    setIsTooManyReq(null);
    setErrorMessage(null);
    axiosInstance
      .post('api/request-new-otp', { email })
      .then((res) => {
        if (res.status === 204) {
          if (!firstLoad) setModalVisibility(true);
        }
      })
      .catch((error) => {
        if (error.status === 429) {
          const retry_after = error.headers['retry-after'];
          console.log(`getOTP retry again: ${retry_after} in seconds`);
          setIsTooManyReq(
            `• Sorry, please request for another Verification Code after ${
              Math.floor(retry_after / 60) > 0
                ? Math.ceil(retry_after / 60)
                : 'a'
            } minute${Math.floor(retry_after / 60) > 0 ? 's' : ''}.`,
          );
        }
        if (error.status === 422) {
          if (!firstLoad) setModalVisibility(true);
        }
      })
      .finally(() => {
        if (!firstLoad) setIsResendLoading(false);
      });
  }, []);

  const submitOTP = () => {
    const tempPin = pin;

    setPin('');
    setIsTooManyReq(null);
    setErrorMessage(null);
    const alphnum = /^[A-Za-z0-9]+$/;
    if (alphnum.test(tempPin)) {
      setIsLoading(true);
      axiosInstance
        .post('api/verify-requested-otp', {
          email,
          otp_code: tempPin.toUpperCase(),
        })
        .then(({ data }) => {
          if (data.is_valid === 1) {
            axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;
            navigate('New Password', {
              token: data.token,
              source,
            });
          }
        })
        .catch((error) => {
          if (error.status === 429) {
            const retry_after = error.headers['retry-after'];
            console.log(`submitOTP retry again: ${retry_after} in seconds`);

            setIsTooManyReq(
              `• Sorry, please request for another Verification Code after ${
                Math.floor(retry_after / 60) > 0
                  ? Math.ceil(retry_after / 60)
                  : 'a'
              } minute${Math.floor(retry_after / 60) > 0 ? 's' : ''}.`,
            );
          } else {
            setErrorMessage(error.status === 400);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setErrorMessage('500');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          Layout.justifyContentCenter,
          {
            flexGrow: 1,
            backgroundColor: Colors.background,
          },
        ]}
      >
        <ImageBackground
          source={Images.welcomeBG}
          style={[Layout.fullSize, Layout.justifyContentCenter]}
        >
          <View position="absolute" top={10} left={10}>
            <TouchableOpacity
              style={{ alignSelf: 'flex-start' }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon
                name="arrow-back-outline"
                width={30}
                height={35}
                fill={Colors.white}
              />
            </TouchableOpacity>
          </View>

          <View style={[Gutters.largeVPadding, Gutters.largeHPadding]}>
            <Text
              style={[
                Fonts.textCenter,
                Fonts.body,
                Gutters.mediumTMargin,
                Gutters.regularHPadding,
                Gutters.largeBMargin,
                { color: Colors.white },
              ]}
            >
              Please enter the verification code that has been sent to your
              email.
            </Text>

            <TextInputComponent
              placeholder={placeholder.pin}
              onChangeText={(text) => {
                setPin(text);
              }}
              value={pin}
              maxLength={5}
              onFocus={() => setPlaceholder({ ...placeholder, pin: '' })}
              onBlur={() => {
                setPlaceholder({
                  ...placeholder,
                  pin: 'Enter verification code',
                });
                setPin(pin.toUpperCase());
              }}
            />

            {errorMessage || isTooManyReq !== null ? (
              <View
                backgroundColor={Colors.white}
                borderRadius={8}
                marginTop={25}
                elevation={20}
                justifyContent="center"
                style={[Gutters.regularHPadding, Gutters.regularVPadding]}
              >
                <View flexDirection="row">
                  <View style={{ paddingRight: 6, marginTop: 1 }}>
                    <Icon
                      width={20}
                      height={20}
                      fill={Colors.warning}
                      name="alert-circle"
                    />
                  </View>
                  <View flex={1}>
                    {errorMessage ? (
                      <Text
                        style={[
                          Fonts.body,
                          {
                            color: Colors.warning,
                          },
                        ]}
                      >
                        • Your Verification Code is invalid.
                      </Text>
                    ) : null}

                    {isTooManyReq !== null ? (
                      <Text
                        style={[
                          Fonts.body,
                          {
                            color: Colors.warning,
                            lineHeight: 20,
                          },
                        ]}
                      >
                        {isTooManyReq}
                      </Text>
                    ) : null}
                  </View>
                </View>
              </View>
            ) : null}

            <PrimaryButtonComponent
              label="VERIFY"
              disabled={pin.length < 5}
              loading={isLoading}
              onPress={pin.length === 5 ? submitOTP : () => {}}
              outerStyle={{
                marginTop: 30,
              }}
            />
            <View alignItems="center" marginTop={20}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (!isResendLoading) {
                    getOTP();
                  }
                }}
              >
                <View style={Layout.rowCenter}>
                  {isResendLoading ? (
                    <ActivityIndicator
                      size={13}
                      color={Colors.white}
                      style={Gutters.tinyRMargin}
                    />
                  ) : null}
                  <Text
                    style={[
                      Fonts.bodyLink,
                      Fonts.textCenter,
                      { color: Colors.white },
                    ]}
                  >
                    Did not receive the code? Tap here to send another.
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <ConfirmationPopupComponent
            visibility={modalVisibility}
            dismissModal={() => {
              setModalVisibility(false);
            }}
            title="New Verification Code Sent"
            message="A new verification code has been sent to your email"
            actionRequired={false}
          />
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default IndexOneTimePinContainer;
