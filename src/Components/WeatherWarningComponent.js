import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text } from 'react-native';
import { useTheme } from '@/Theme';

import GetWeatherWarning from '@/Store/WeatherWarning/GetWeatherWarning';

function WeatherWarningComponent({ hasWarning, customViewStyles }) {
  const { Fonts, Gutters, Layout, Colors, MetricsSizes } = useTheme();
  const dispatch = useDispatch();

  const weatherWarning = useSelector((state) => state.weatherWarning.item);

  useFocusEffect(
    useCallback(() => {
      dispatch(GetWeatherWarning.action());
    }, []),
  );

  useEffect(() => {
    if (hasWarning) {
      hasWarning(weatherWarning?.data.length > 0);
    }
  }, [weatherWarning]);

  return weatherWarning?.data.length > 0 ? (
    <View
      style={[
        Layout.fullWidth,
        Layout.center,
        Gutters.mediumHPadding,
        Gutters.mediumVPadding,
        {
          backgroundColor: Colors.warning,
          marginBottom: MetricsSizes.regular,
        },
        customViewStyles,
      ]}
    >
      <Text
        style={[
          Fonts.h3,
          Fonts.textCenter,
          Gutters.tinyBMargin,
          { color: Colors.white, flex: 1 },
        ]}
      >
        {weatherWarning.data[0].title.toUpperCase()}
      </Text>
      <Text
        style={[
          Fonts.bodyBold,
          Fonts.textCenter,
          { color: Colors.white, flex: 1 },
        ]}
      >
        {weatherWarning.data[0].message}
      </Text>
    </View>
  ) : (
    <View
      style={[
        Layout.fullWidth,
        Layout.center,
        {
          marginBottom: MetricsSizes.regular,
        },
        customViewStyles,
      ]}
    />
  );
}

WeatherWarningComponent.propTypes = {
  customViewStyles: PropTypes.object,
  hasWarning: PropTypes.func,
};

WeatherWarningComponent.defaultProps = {
  customViewStyles: {},
  hasWarning: () => {},
};

export default WeatherWarningComponent;
