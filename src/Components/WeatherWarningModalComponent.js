import React, { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

import { useTheme } from '@/Theme';
import UpdateWeatherWarning from '@/Store/WeatherWarning/UpdateWeatherWarning';

function WeatherWarningModalComponent({
  weatherWarningUpdate,
  onQuitPress,
  customViewStyles,
}) {
  const { Fonts, Gutters, Layout, Colors } = useTheme();
  const dispatch = useDispatch();

  const weatherWarning = useSelector((state) => state.weatherWarning.item);
  const [visibility, setVisibility] = useState(false);

  // firebase messaging to catch weather warning
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.data?.bad_weather_status === 'enabled') {
        weatherWarningUpdate();
        dispatch(UpdateWeatherWarning.action(remoteMessage.data));
        setVisibility(true);
      }
    });

    return unsubscribe;
  }, []);

  return weatherWarning?.data.length > 0 ? (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visibility}
      style={{ height: '100%' }}
    >
      <View flex={1} style={[Layout.col]}>
        <View
          style={[
            Layout.fullWidth,
            Layout.center,
            Gutters.mediumHPadding,
            Gutters.mediumVPadding,
            {
              backgroundColor: Colors.warning,
            },
            customViewStyles,
          ]}
        >
          <Text
            style={[
              Fonts.h3,
              Fonts.textCenter,
              Gutters.tinyBMargin,
              { color: Colors.white },
            ]}
          >
            {weatherWarning.data[0].title.toUpperCase()}
          </Text>
          <Text
            style={[Fonts.bodyBold, Fonts.textCenter, { color: Colors.white }]}
          >
            {weatherWarning.data[0].message}
          </Text>
        </View>
        <View
          backgroundColor="#333333E6"
          style={[Gutters.mediumHPadding, Gutters.mediumVPadding]}
          flex={1}
        >
          <Text
            style={[
              Fonts.h1,
              Fonts.textCenter,
              Fonts.whiteText,
              Gutters.largeTMargin,
              Gutters.largeBMargin,
            ]}
          >
            Sorry, this activity will now automatically end.
          </Text>
          <TouchableOpacity
            onPress={() => {
              setVisibility(false);
              onQuitPress();
            }}
            activeOpacity={0.85}
          >
            <View
              backgroundColor={Colors.bodyText}
              style={[
                Gutters.mediumHPadding,
                Gutters.mediumVPadding,
                {
                  borderRadius: 8,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,
                },
              ]}
            >
              <Text style={[Fonts.h2, Fonts.textCenter, Fonts.whiteText]}>
                QUIT
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  ) : null;
}

WeatherWarningModalComponent.propTypes = {
  customViewStyles: PropTypes.object,
  onQuitPress: PropTypes.func,
  weatherWarningUpdate: PropTypes.func,
};

WeatherWarningModalComponent.defaultProps = {
  customViewStyles: {},
  weatherWarningUpdate: () => {},
  onQuitPress: () => {},
};

export default WeatherWarningModalComponent;
