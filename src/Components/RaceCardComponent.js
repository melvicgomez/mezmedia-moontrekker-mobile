import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import moment from 'moment';
import { useTheme } from '@/Theme';

function RaceCardComponent({ raceAttempt }) {
  const { Gutters, Layout, Colors, Fonts, Images } = useTheme();

  return (
    <View
      style={[
        Gutters.smallHMargin,
        Gutters.mediumTPadding,
        Gutters.largeBPadding,
        Gutters.largeHPadding,
        {
          backgroundColor: Colors.white,
          borderRadius: 8,
        },
      ]}
    >
      {raceAttempt.status === 'complete' ? (
        <View style={[Layout.row, Layout.justifyContentBetween]}>
          <Text style={[Fonts.h3, { color: Colors.bodyText }]}>
            MOONTREKKER RACE
          </Text>
          <Image
            source={Images.raceSymbolGrey}
            style={{
              height: 40,
              width: 31,
              resizeMode: 'contain',
              position: 'absolute',
              right: -10,
            }}
          />
        </View>
      ) : (
        <View>
          <Text style={[Fonts.h3, { color: Colors.warning }]}>
            MOONTREKKER RACE - INCOMPLETE
          </Text>
        </View>
      )}
      <View
        style={[Layout.row, Layout.alignItemsCenter, Gutters.regularTMargin]}
      >
        <Image
          source={Images.dateIcon}
          style={[
            Gutters.regularRMargin,
            { height: 18, width: 18, resizeMode: 'contain' },
          ]}
        />
        <Text style={[Fonts.h3, { color: Colors.bodyText }]}>
          {moment.utc(raceAttempt.started_at).local().format('DD MMM HH:mm')} -{' '}
          {moment.utc(raceAttempt.ended_at).local().format('DD MMM HH:mm')}
        </Text>
      </View>
      <View
        style={[Layout.row, Layout.alignItemsCenter, Gutters.regularTMargin]}
      >
        <Image
          source={Images.timingIcon}
          style={[
            Gutters.regularRMargin,
            { height: 18, width: 18, resizeMode: 'contain' },
          ]}
        />
        <Text style={[Fonts.h3, { color: Colors.bodyText }]}>
          Total Time{' '}
          {moment.utc(raceAttempt.total_time * 1000).format('HH:mm:ss')}
        </Text>
      </View>
      <View
        style={[Layout.row, Layout.alignItemsCenter, Gutters.regularTMargin]}
      >
        <Image
          source={Images.locationIcon}
          style={[
            Gutters.regularRMargin,
            { height: 18, width: 18, resizeMode: 'contain' },
          ]}
        />
        <Text style={[Fonts.h3, { color: Colors.bodyText }]}>
          Distance Ran {raceAttempt.total_distance}km
        </Text>
      </View>
      <View style={[Layout.row, Gutters.regularTMargin]}>
        <Image
          source={Images.pointIcon}
          style={[
            Gutters.regularRMargin,
            { height: 18, width: 18, resizeMode: 'contain', marginTop: 3 },
          ]}
        />
        <Text
          style={[
            Fonts.h3,
            {
              color: Colors.bodyText,
              flex: 1,
              flexWrap: 'wrap',
            },
          ]}
        >
          {raceAttempt.moontrekker_point} MoonTrekker Points Awarded
        </Text>
      </View>
    </View>
  );
}

export default RaceCardComponent;
