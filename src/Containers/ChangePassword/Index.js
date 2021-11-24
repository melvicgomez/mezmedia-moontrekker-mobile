import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { Text, Icon } from '@ui-kitten/components';

import { useTheme } from '@/Theme';
import axiosInstance from '@/Services';
import { navigateAndSimpleReset } from '@/Navigators/Root';

import UserChangePassword from '@/Store/Login/UserChangePassword';
import AuthenticationToken from '@/Store/AuthToken/AuthenticationToken';
import UserProfile from '@/Store/User/UserProfile';

import AppBarComponent from '@/Components/AppBarComponent';
import ConfirmationPopupComponent from '@/Components/ConfirmationPopupComponent';
import PrimaryButtonComponent from '@/Components/PrimaryButtonComponent';
import TextInputComponent from '@/Components/TextInputComponent';

function IndexNewPasswordContainer({ navigation }) {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user.item);

  const { Gutters, Layout, Colors, Fonts } = useTheme();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [isValidCurrentPassword, setIsValidCurrentPassword] = useState(true);
  const [isValidNewPassword, setIsValidNewPassword] = useState(true);
  const [isValidPassConfirm, setIsValidPassConfirm] = useState(true);

  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const isEnabled =
    currentPassword.length > 0 &&
    newPassword.length > 0 &&
    passwordConfirm.length > 0;

  const [placeholder, setPlaceholder] = useState({
    currentPassword: 'Enter current password',
    newPassword: 'Enter new password',
    passwordConfirm: 'Enter the same password again',
  });

  const submitNewPassword = async () => {
    const passwordRegex = /^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$/;
    const validCurrentPass = passwordRegex.test(currentPassword);
    const validNewPass = passwordRegex.test(newPassword);
    const validPassConfirm = newPassword === passwordConfirm;

    if (validCurrentPass && validNewPass && validPassConfirm) {
      if (!auth.loading) {
        console.log('dispatch');
        dispatch(
          UserChangePassword.action({
            user_id: user.user_id,
            old_password: currentPassword,
            new_password: newPassword,
          }),
        );

        axiosInstance
          .post(`api/change-password/${user.user_id}`, {
            old_password: currentPassword,
            new_password: newPassword,
          })
          .then((res) => {
            if (res.status === 204) {
              setSuccessModalVisible(true);
            }
          });
      }
    } else {
      setIsValidCurrentPassword(validCurrentPass);
      setIsValidNewPassword(validNewPass);
      setIsValidPassConfirm(validPassConfirm);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <AppBarComponent
        title="Password"
        type="main"
        displayMenu={false}
        displayBack={true}
      />
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
        <View style={Layout.fullSize}>
          <View style={[Gutters.regularVPadding, Gutters.largeHPadding]}>
            <View>
              <View marginTop={20}>
                <TextInputComponent
                  label="Current Password"
                  placeholder={placeholder.currentPassword}
                  onChangeText={(text) => setCurrentPassword(text)}
                  value={currentPassword}
                  secureTextEntry={
                    !placeholder.currentPassword || !!currentPassword
                  }
                  onFocus={() =>
                    setPlaceholder({ ...placeholder, currentPassword: '' })
                  }
                  onBlur={() => {
                    console.log('enter');
                    setPlaceholder({
                      ...placeholder,
                      currentPassword: 'Enter current password',
                    });
                  }}
                  type="password"
                />
              </View>

              <View marginTop={20}>
                <TextInputComponent
                  label="New Password"
                  placeholder={placeholder.newPassword}
                  onChangeText={(text) => setNewPassword(text)}
                  value={newPassword}
                  secureTextEntry={!placeholder.newPassword || !!newPassword}
                  onFocus={() =>
                    setPlaceholder({ ...placeholder, newPassword: '' })
                  }
                  onBlur={() =>
                    setPlaceholder({
                      ...placeholder,
                      newPassword: 'Enter new password',
                    })
                  }
                  type="password"
                />
                <Text
                  style={[
                    Fonts.body,
                    Gutters.tinyTMargin,
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
                  label="Confirm New Password"
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
                  type="password"
                />
              </View>

              {!isValidNewPassword ||
              !isValidCurrentPassword ||
              !isValidPassConfirm ? (
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
                      {!isValidNewPassword || !isValidCurrentPassword ? (
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

              <PrimaryButtonComponent
                label="SUBMIT"
                disabled={!isEnabled}
                loading={auth.loading}
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

              <ConfirmationPopupComponent
                visibility={successModalVisible}
                dismissModal={async () => {
                  // await dispatch(AuthenticationToken.action({}));
                  // await dispatch(UserProfile.action({}));
                  // navigateAndSimpleReset('Welcome');
                  navigation.goBack();
                }}
                title="Password Changed!"
                message="Your password has been changed successfully"
                actionRequired={false}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default IndexNewPasswordContainer;
