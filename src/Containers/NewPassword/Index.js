import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  PixelRatio,
  ImageBackground,
} from 'react-native';
import { Text, Icon } from '@ui-kitten/components';

import { useTheme } from '@/Theme';
import PrimaryButtonComponent from '@/Components/PrimaryButtonComponent';
import TextInputComponent from '@/Components/TextInputComponent';
import { navigate } from '@/Navigators/Root';

import UserCreatePassword from '@/Store/Login/UserCreatePassword';

function IndexNewPasswordContainer({ route, navigation }) {
  const { token, source } = route.params;
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);

  const { Gutters, Layout, Colors, Fonts, Images } = useTheme();

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [agreeTerm, setAgreeTerm] = useState(source === 'Forgot Password');

  const [isValidPassConfirm, setIsValidPassConfirm] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const isEnabled = password.length > 0 && passwordConfirm.length > 0;

  const [placeholder, setPlaceholder] = useState({
    password: 'Enter a secure password',
    passwordConfirm: 'Enter the same password again',
  });

  const submitNewPassword = async () => {
    const passwordRegex = /^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$/;
    const validPass = passwordRegex.test(password);
    const validPassConfirm = password === passwordConfirm;

    if (validPass && validPassConfirm && agreeTerm) {
      if (!user.loading) {
        dispatch(
          UserCreatePassword.action({
            token,
            password,
          }),
        );
      }
    } else {
      setIsValidPassword(validPass);
      setIsValidPassConfirm(validPassConfirm);
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
            <View>
              <View marginTop={20}>
                <TextInputComponent
                  label="Create a New Password"
                  placeholder={placeholder.password}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  secureTextEntry={!placeholder.password || !!password}
                  onFocus={() =>
                    setPlaceholder({ ...placeholder, password: '' })
                  }
                  onBlur={() =>
                    setPlaceholder({
                      ...placeholder,
                      password: 'Enter a secure password',
                    })
                  }
                />
                <Text
                  style={[
                    Fonts.body,
                    Gutters.smallTMargin,
                    Gutters.smallLMargin,
                    {
                      color: Colors.white,
                    },
                  ]}
                >
                  Your password must include at least 8 characters, 1 uppercase,
                  1 lowercase & 1 number
                </Text>
              </View>
              <View marginTop={20}>
                <TextInputComponent
                  label="Confirm Password"
                  placeholder={placeholder.passwordConfirm}
                  onChangeText={(text) => setPasswordConfirm(text)}
                  value={passwordConfirm}
                  secureTextEntry={
                    !placeholder.passwordConfirm || !!passwordConfirm
                  }
                  onFocus={() =>
                    setPlaceholder({ ...placeholder, passwordConfirm: '' })
                  }
                  onBlur={() =>
                    setPlaceholder({
                      ...placeholder,
                      passwordConfirm: 'Enter the same password again',
                    })
                  }
                />
              </View>

              {!isValidPassword || !isValidPassConfirm ? (
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
                      {!isValidPassword ? (
                        <Text
                          style={[
                            Fonts.body,
                            {
                              color: Colors.warning,
                            },
                          ]}
                        >
                          • Your password must include at least 8 characters, 1
                          uppercase, 1 lowercase & 1 number.
                        </Text>
                      ) : null}
                      {!isValidPassConfirm ? (
                        <Text
                          style={[
                            Fonts.body,
                            {
                              color: Colors.warning,
                            },
                          ]}
                        >
                          • Password does not match.
                        </Text>
                      ) : null}
                    </View>
                  </View>
                </View>
              ) : null}

              {source === 'First Time Login' && (
                <View style={Layout.row} marginTop={30} marginBottom={5}>
                  <ImageBackground
                    source={Images.inputBGSmall}
                    resizeMode="stretch"
                    style={[
                      Layout.center,
                      Gutters.tinyBPadding,
                      { height: 40, width: 40 },
                    ]}
                  >
                    <TouchableOpacity
                      style={{
                        borderRadius: 8,
                        height: 35,
                        width: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      activeOpacity={0.8}
                      onPress={() => setAgreeTerm(!agreeTerm)}
                    >
                      {agreeTerm && (
                        <Icon
                          name="checkmark"
                          width={24}
                          height={24}
                          fill={Colors.white}
                        />
                      )}
                    </TouchableOpacity>
                  </ImageBackground>

                  <View flex={1} marginLeft={10}>
                    <Text
                      style={[
                        Fonts.body,
                        {
                          color: Colors.white,
                          lineHeight: 22 / PixelRatio.getFontScale(),
                        },
                      ]}
                    >
                      By creating an account I acknowledge that I have read and
                      accepted the MoonTrekker{' '}
                      <Text
                        style={[
                          Fonts.bodyLink,
                          {
                            color: Colors.white,
                          },
                        ]}
                        onPress={() =>
                          navigate('Terms And Conditions', {
                            screen_view: 'Terms And Conditions',
                          })
                        }
                      >
                        Terms and Conditions
                      </Text>{' '}
                      and{' '}
                      <Text
                        style={[
                          Fonts.bodyLink,
                          {
                            color: Colors.white,
                          },
                        ]}
                        onPress={() =>
                          navigate('Privacy Policy', {
                            screen_view: 'Privacy Policy',
                          })
                        }
                      >
                        Privacy Policy
                      </Text>
                      .
                    </Text>
                  </View>
                </View>
              )}

              <PrimaryButtonComponent
                label={
                  source === 'Forgot Password' ? 'SUBMIT' : 'FIRST TIME LOGIN'
                }
                disabled={!isEnabled}
                loading={user.loading}
                onPress={() => {
                  if (isEnabled) {
                    submitNewPassword();
                  } else {
                    Keyboard.dismiss();
                  }
                }}
                outerStyle={{
                  marginTop: 30,
                }}
              />
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default IndexNewPasswordContainer;
