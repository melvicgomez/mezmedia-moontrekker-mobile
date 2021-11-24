/* eslint-disable react/require-default-props */
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Text, View, PixelRatio, Platform } from 'react-native';
import { useTheme } from '@/Theme';
import BackgroundTimer from 'react-native-background-timer';
import { RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import PushNotification from 'react-native-push-notification';

/*
  dismiss: function to handle event end if exceed 12 hrs
  stop: pass "stop" = true if user manually end the event
  secs: add prop to bypass secs value for continuation
*/

function TimerComponent({
  title,
  stop,
  dismiss,
  incomplete,
  lastScannedTime,
  startedTime,
}) {
  const { Colors, Gutters, Fonts, Layout } = useTheme();
  const [secs, setSecs] = useState(0);
  const [lastScanned, setLastScanned] = useState('');

  useEffect(() => {
    setLastScanned(lastScannedTime);
  }, [lastScannedTime]);

  const clearRaceTicker = useCallback(() => {
    PushNotification.clearLocalNotification(title, 21474);
  }, []);

  useEffect(() => {
    PushNotification.localNotification({
      id: 21474,
      tag: title,
      ticker: 'My Notification Ticker', // (optional)
      channelId: 'fcm_fallback_notification_channel', // (required)
      channelName: 'Default Notification', // (required)
      largeIcon: '',
      smallIcon: '',
      color: Colors.digital,
      title,
      message: `${title} currently in progress`,
      showWhen: true,
      when: Date.now(),
      allowWhileIdle: true,
      ongoing: true,
      onlyAlertOnce: true,
    });

    BackgroundTimer.runBackgroundTimer(() => {
      setSecs((prevVal) => prevVal + 1);
    }, 1000);

    return () => {
      clearRaceTicker();
      BackgroundTimer.stopBackgroundTimer();
    };
  }, []);

  useEffect(() => {
    if (stop) {
      clearRaceTicker();
      BackgroundTimer.stopBackgroundTimer();
    }
  }, [stop]);

  useEffect(() => {
    if (
      moment
        .utc(lastScanned)
        // .add(12, 'hours')
        .add(10, 'minutes') <= moment.utc()
    ) {
      clearRaceTicker();
      BackgroundTimer.stopBackgroundTimer();
      dismiss();
    }
  }, [secs]);

  return (
    <View
      style={[
        Layout.center,
        Gutters.mediumVPadding,
        Gutters.mediumBMargin,
        {
          borderColor: incomplete ? Colors.warning : Colors.white,
          borderRadius: 8,
          borderWidth: 2,
        },
      ]}
    >
      <Text style={[Fonts.h3, { color: Colors.primary }]}>TIME</Text>
      <Text
        style={[
          Fonts.h1,
          {
            color: incomplete ? Colors.warning : Colors.white,
            lineHeight: 75 / PixelRatio.getFontScale(),
            fontSize: RFValue(60) / PixelRatio.getFontScale(),
          },
        ]}
      >
        {`${moment()
          .startOf('day')
          .milliseconds(moment().diff(moment.utc(startedTime).local()))
          .format('HH:mm:ss')}`}
      </Text>
    </View>
  );
}

TimerComponent.propTypes = {
  dismiss: PropTypes.func,
  handleStop: PropTypes.func,
  incomplete: PropTypes.bool,
  restart: PropTypes.bool,
  startedTime: PropTypes.string,
  startingSecs: PropTypes.number,
  stop: PropTypes.bool,
};

TimerComponent.defaultProps = {
  stop: false,
  incomplete: false,
  startingSecs: 0,
  startedTime: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
};

export default TimerComponent;
