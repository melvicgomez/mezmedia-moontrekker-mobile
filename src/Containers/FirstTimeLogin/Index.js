import React, { useState } from 'react';
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

function IndexFirstLoginContainer({ navigation, route }) {
  const { source } = route.params;
  const { Gutters, Layout, Colors, Fonts, Images } = useTheme();

  const [email, setEmail] = useState('');
  const [hasError, setHasError] = useState(false);

  const [placeholder, setPlaceholder] = useState({
    email: 'Enter the email you registered with',
  });

  const submitEmail = async () => {
    setHasError(false);

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let emailValid = emailRegex.test(email);

    if (emailValid) {
      navigate('OTP', {
        screen_view: 'Verification Code',
        email,
        source,
      });
    } else {
      setHasError(true);
      setEmail(emailValid);
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
                  onChangeText={(text) => {
                    setEmail(text);
                    setHasError(false);
                  }}
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

              {hasError ? (
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
                      <Text style={[Fonts.body, { color: Colors.warning }]}>
                        • Invalid email address format.
                      </Text>
                    </View>
                  </View>
                </View>
              ) : null}

              <PrimaryButtonComponent
                label="SUBMIT"
                disabled={email.length <= 0}
                onPress={() => {
                  if (email.length > 0) {
                    submitEmail();
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

export default IndexFirstLoginContainer;
