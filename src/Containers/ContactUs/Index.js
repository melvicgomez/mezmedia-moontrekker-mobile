import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  PixelRatio,
  ImageBackground,
} from 'react-native';
import { useTheme } from '@/Theme';
import api from '@/Services';
import { useSelector } from 'react-redux';
import { Icon } from '@ui-kitten/components';

import PrimaryButtonComponent from '@/Components/PrimaryButtonComponent';
import AppBarComponent from '@/Components/AppBarComponent';
import ConfirmationPopupComponent from '@/Components/ConfirmationPopupComponent';

function IndexContactUsContainer({ navigation }) {
  const { Colors, Gutters, Layout, Fonts, Images } = useTheme();

  const user = useSelector((state) => state.user.item);

  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);

  const [placeholder, setPlaceholder] = useState('Description');

  const [submitModalVisible, setSubmitModalVisible] = useState(false);

  const submitDetails = () => {
    setLoading(true);
    api
      .post('api/contact-form', {
        user_id: user.user_id,
        description: description,
      })
      .then((res) => {
        setLoading(false);
        setSubmitModalVisible(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setSubmitModalVisible(true);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <AppBarComponent
        title="Contact Us"
        type="main"
        displayMenu={false}
        displayBack={true}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={[
          Gutters.smallHPadding,
          Gutters.smallTPadding,
          {
            flex: 1,
            backgroundColor: Colors.background,
          },
        ]}
      >
        <View style={[Gutters.mediumHPadding, Gutters.mediumVPadding]}>
          <View>
            <Text
              style={[
                Fonts.h3,
                Gutters.smallBMargin,
                { color: Colors.white, marginLeft: 3 },
              ]}
            >
              Please enter your enquiry below
            </Text>
            <ImageBackground
              source={Images.inputBGLarge}
              resizeMode="stretch"
              style={[
                Layout.fullWidth,
                Gutters.mediumHPadding,
                Gutters.tinyVPadding,
                { height: 270 },
              ]}
            >
              <TextInput
                style={[
                  Fonts.bodyBold,
                  Platform.OS === 'ios' ? { minHeight: 270 } : null,
                  {
                    color: Colors.white,
                    lineHeight: 24 / PixelRatio.getFontScale(),
                    textAlignVertical: 'top',
                  },
                ]}
                placeholder={placeholder}
                placeholderTextColor={Colors.placeholderTextColor}
                value={description}
                multiline={true}
                onChangeText={(text) => {
                  setDescription(text);
                }}
                numberOfLines={10}
                onFocus={() => setPlaceholder('')}
                onBlur={() => setPlaceholder('Description')}
              />
            </ImageBackground>
          </View>
          <View style={Gutters.mediumTMargin}>
            <PrimaryButtonComponent
              label="SUBMIT"
              loading={loading}
              onPress={() => {
                if (description && description.trim().length) {
                  submitDetails();
                }
              }}
              outerStyle={{
                ...Gutters.tinyHMargin,
              }}
            />
          </View>
        </View>

        <ConfirmationPopupComponent
          visibility={submitModalVisible}
          dismissModal={() => {
            setSubmitModalVisible(false);
            navigation.goBack();
          }}
          title="Thank You!"
          message="Your submission has been received and we will get back to you shortly"
          actionRequired={false}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default IndexContactUsContainer;
