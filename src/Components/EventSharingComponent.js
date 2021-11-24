import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  PixelRatio,
  Image,
  Text,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from '@/Theme';
import moment from 'moment';
import { Config } from '@/Config';

/*
  params:
  - type: race | training | challenge
*/

function EventSharingComponent({ type, title, attempt, challenge }) {
  const { Gutters, Layout, Colors, Fonts, Images } = useTheme();

  return (
    <View
      style={{
        width: 413,
        height: 413,
        backgroundColor: Colors.background,
        overflow: 'hidden',
      }}
    >
      <View
        style={[
          Layout.row,
          Layout.center,
          {
            backgroundColor: Colors.primary,
            height: 64,
          },
        ]}
      >
        <Image
          style={{ height: 45, width: 180 }}
          source={Images.moontrekkerLogoColor}
          resizeMode="contain"
        />
        <Text style={[Fonts.h3, Gutters.smallLMargin, { color: Colors.white }]}>
          #BarclaysMoonTrekker
        </Text>
      </View>

      <View
        style={[
          challenge.is_time_required
            ? Gutters.smallVPadding
            : Gutters.regularVPadding,
          Gutters.smallHPadding,
        ]}
      >
        <Text
          style={[
            Fonts.h3,
            {
              color: Colors.white,
            },
          ]}
        >
          {title.toUpperCase()}
        </Text>
        {!!challenge.is_time_required && (
          <View style={[Layout.row, Layout.alignItemsCenter]}>
            <Text
              style={[
                Fonts.h3,
                {
                  color: Colors.primary,
                },
              ]}
            >
              TIME
            </Text>
            <Text
              style={[
                Fonts.h1,
                Gutters.smallLMargin,
                {
                  color: Colors.white,
                },
              ]}
            >
              {moment.utc(attempt.total_time * 1000).format('HH:mm:ss')}
            </Text>
          </View>
        )}
      </View>
      <View>
        <Image
          source={
            challenge.type === 'training'
              ? Images.trainingImagePlaceholder
              : challenge.type === 'race'
              ? Images.raceImagePlaceholder
              : {
                  uri: `${Config.IMAGE_URL_PREFIX}challenge/${challenge.challenge_id}/${challenge.challenge_cover_image}`,
                }
          }
          style={[
            Layout.fullWidth,
            {
              height: challenge.is_time_required ? 190 : 200,
              backgroundColor: Colors.white,
              resizeMode: 'cover',
            },
          ]}
        />
      </View>
      <View style={[Gutters.smallHPadding, { marginTop: 5 }]}>
        <View
          style={[Layout.row, Layout.alignItemsCenter, Gutters.tinyTMargin]}
        >
          <Image
            source={Images.dateIcon}
            style={[
              Gutters.regularRMargin,
              { height: 18, width: 18, resizeMode: 'contain' },
            ]}
          />
          <Text style={[Fonts.body, { color: Colors.white }]}>
            {moment.utc(attempt.started_at).local().format('DD MMM HH:mm')} -{' '}
            {moment.utc(attempt.ended_at).local().format('DD MMM HH:mm')}
          </Text>
        </View>
        {!!challenge.is_distance_required && (
          <View style={[Layout.row, Layout.alignItemsCenter, { marginTop: 4 }]}>
            <Image
              source={Images.locationIcon}
              style={[
                Gutters.regularRMargin,
                { height: 18, width: 18, resizeMode: 'contain' },
              ]}
            />
            <Text style={[Fonts.body, { color: Colors.white }]}>
              Distance Ran {attempt.total_distance}km
            </Text>
          </View>
        )}
        <View style={[Layout.row, Layout.alignItemsCenter, { marginTop: 4 }]}>
          <Image
            source={Images.pointIcon}
            style={[
              Gutters.regularRMargin,
              { height: 18, width: 18, resizeMode: 'contain' },
            ]}
          />
          <Text
            style={[
              Fonts.body,
              {
                color: Colors.white,
                flex: 1,
                flexWrap: 'wrap',
              },
            ]}
          >
            {attempt.moontrekker_point} MoonTrekker Points Awarded
          </Text>
        </View>
      </View>
    </View>
  );
}

EventSharingComponent.propTypes = {
  attempt: PropTypes.object,
  title: PropTypes.string,
  type: PropTypes.string,
};

EventSharingComponent.defaultProps = {
  type: 'race',
  title: 'Race',
  attempt: null,
};

export default EventSharingComponent;
