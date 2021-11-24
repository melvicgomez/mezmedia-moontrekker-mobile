import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  ImageBackground,
} from 'react-native';
import { Text, Icon } from '@ui-kitten/components';

import PrimaryButtonComponent from '@/Components/PrimaryButtonComponent';
import TextInputComponent from '@/Components/TextInputComponent';
import { useTheme } from '@/Theme';
import { navigate } from '@/Navigators/Root';

import UserAuthentication from '@/Store/Login/UserAuthentication';

function IndexLoginContainer({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.item);
  const apiLoading = useSelector((state) => state.auth.loading);

  const { Gutters, Layout, Colors, Fonts, Images } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isEnabled = email.length > 0 && password.length > 0;

  const [placeholder, setPlaceholder] = useState({
    email: 'Enter the email you registered with',
    password: 'Enter your password',
  });

  const submitLogin = async () => {
    setHasError(false);

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$/;
    //password e.g: BArclays123, (?=.*?\W) to check one special charater

    let emailValid = emailRegex.test(email);
    let passwordValid = passwordRegex.test(password);

    if (emailValid && passwordValid) {
      dispatch(
        UserAuthentication.action({
          email,
          password,
        }),
      );
      // console.log("Pass");
    } else {
      setHasError(true);
      setIsValidEmail(emailValid);
      setIsValidPassword(passwordValid);
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
              <View>
                <TextInputComponent
                  label="Email"
                  placeholder={placeholder.email}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  onFocus={() => setPlaceholder({ ...placeholder, email: '' })}
                  onBlur={() =>
                    setPlaceholder({
                      ...placeholder,
                      email: 'Enter the email you registered with',
                    })
                  }
                />
              </View>
              <View marginTop={20}>
                <TextInputComponent
                  label="Enter Password"
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
                      password: 'Enter your password',
                    })
                  }
                  type="password"
                />
              </View>

              {hasError ||
              user?.error?.username ||
              user?.error?.password ||
              user?.error?.code === 429 ? (
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
                    <View>
                      {(!isValidEmail ||
                        !isValidPassword ||
                        !!user?.error?.username ||
                        !!user?.error?.password) && (
                        <View flex={1}>
                          <Text style={[Fonts.body, { color: Colors.warning }]}>
                            • Your login details are invalid.
                          </Text>
                        </View>
                      )}
                      {user?.error?.code === 429 && (
                        <View flex={1}>
                          <Text style={[Fonts.body, { color: Colors.error }]}>
                            {`• You have exceeded the maximum login attempts. Try again after ${
                              Math.floor(user.error.retry_after / 60) > 0
                                ? Math.floor(user.error.retry_after / 60)
                                : 'a'
                            } minute${
                              Math.floor(user.error.retry_after / 60) > 0
                                ? 's'
                                : ''
                            }.`}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              ) : null}

              <PrimaryButtonComponent
                label="SUBMIT"
                disabled={!isEnabled}
                loading={apiLoading}
                onPress={() => {
                  if (isEnabled) {
                    if (!apiLoading) {
                      submitLogin();
                    }
                  } else {
                    Keyboard.dismiss();
                  }
                }}
                outerStyle={{
                  marginTop: 30,
                }}
              />

              <View marginTop={20}>
                <Text
                  style={[
                    Fonts.bodyLink,
                    Fonts.textCenter,
                    { color: Colors.white },
                  ]}
                  onPress={() => {
                    navigate('First Login', {
                      screen_view: 'First Time Login',
                      source: 'Forgot Password',
                    });
                  }}
                >
                  I forgot my password
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default IndexLoginContainer;
