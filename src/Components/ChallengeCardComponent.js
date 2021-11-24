import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import { Config } from '@/Config';
import moment from 'moment';
import FastImage from 'react-native-fast-image';

import { useTheme } from '@/Theme';
import NoImagePlaceholder from '@/Components/NoImagePlaceholder';
import MoontrekkerPointComponent from '@/Components/MoontrekkerPointComponent';

function ChallengeCardComponent({ challengeData, attempt, isProfilePage }) {
  const { Gutters, Layout, Colors, Fonts, Images } = useTheme();

  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    setChallenge(isProfilePage ? attempt.challenge : challengeData);
  }, [isProfilePage, challengeData]);

  return challenge ? (
    <View
      style={[
        Gutters.smallHMargin,
        {
          backgroundColor: Colors.white,
          borderRadius: 8,
        },
      ]}
    >
      <View height={190}>
        {challenge.challenge_cover_image ? (
          <FastImage
            style={[
              Layout.fullSize,
              {
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              },
            ]}
            source={{
              uri: `${Config.IMAGE_URL_PREFIX}challenge/${challenge.challenge_id}/${challenge.challenge_cover_image}`,
            }}
            defaultSource={Images.imagePlaceholder}
            resizeMode="cover"
          />
        ) : (
          <View
            style={{
              borderColor: Colors.white,
              borderWidth: 1,
              borderTopEndRadius: 8,
              borderTopStartRadius: 8,
              backgroundColor: Colors.background,
            }}
          >
            <NoImagePlaceholder type="card" />
          </View>
        )}
        {challenge.moontrekker_point ? (
          <View
            position="absolute"
            style={{
              left: 10,
              bottom: 10,
            }}
          >
            <MoontrekkerPointComponent
              pointValue={challenge.moontrekker_point}
              style={{ ...Gutters.smallLPadding }}
            />
          </View>
        ) : null}
        {!!challenge.difficulty && (
          <View
            position="absolute"
            style={[
              Layout.row,
              Layout.center,
              Gutters.smallHPadding,
              Gutters.tinyVPadding,
              {
                left: 10,
                top: 10,
                borderRadius: 8,
                backgroundColor: Colors.greyish,
              },
            ]}
          >
            <Text style={[Fonts.bodyBold, { color: Colors.white }]}>
              DIFFICULTY
            </Text>
            {[...Array(3).keys()].map((index) => (
              <View
                key={index}
                style={{ opacity: index + 1 > challenge.difficulty ? 0.2 : 1 }}
              >
                <Images.JoinChallengeIcon
                  width={20}
                  height={18}
                  style={{ marginLeft: 2, marginBottom: 2, marginTop: 2 }}
                />
              </View>
            ))}
          </View>
        )}
        {((!challenge.multiple_attempt_available &&
          !!challenge.is_joined_challenge) ||
          (isProfilePage && attempt.status === 'complete')) && (
          <View
            position="absolute"
            style={[
              Layout.row,
              Layout.center,
              Gutters.smallHPadding,
              Gutters.tinyVPadding,
              {
                right: 10,
                bottom: 10,
                borderRadius: 8,
                backgroundColor: Colors.green,
              },
            ]}
          >
            <Image
              source={Images.completeIcon}
              resizeMode="contain"
              style={[
                Gutters.tinyRMargin,
                {
                  height: 18,
                  width: 20,
                  resizeMode: 'contain',
                  marginBottom: 2,
                },
              ]}
            />
            <Text style={[Fonts.bodyBold, { color: Colors.white }]}>
              COMPLETED
            </Text>
          </View>
        )}
        {!isProfilePage &&
          !challenge.is_joined_challenge &&
          !!challenge.reward_count &&
          challenge.reward_count - challenge.total_reward_claimed <= 0 && (
            <View
              position="absolute"
              style={[
                Layout.row,
                Layout.center,
                Gutters.smallHPadding,
                Gutters.tinyVPadding,
                {
                  right: 10,
                  bottom: 10,
                  borderRadius: 8,
                  backgroundColor: Colors.warning,
                },
              ]}
            >
              <Image
                source={Images.fullRedemptIcon}
                resizeMode="contain"
                style={[
                  Gutters.tinyRMargin,
                  { height: 18, width: 20, resizeMode: 'contain' },
                ]}
              />
              <Text style={[Fonts.bodyBold, { color: Colors.white }]}>
                FULLY REDEEMED
              </Text>
            </View>
          )}
      </View>
      <View
        style={[
          Gutters.smallTPadding,
          Gutters.mediumBPadding,
          Gutters.mediumHPadding,
          {
            backgroundColor: Colors.white,
            borderBottomEndRadius: 8,
            borderBottomStartRadius: 8,
          },
        ]}
      >
        <Text
          style={[Fonts.h3, Gutters.tinyBMargin, { color: Colors.primary }]}
        >
          {challenge.title}
        </Text>
        <Text
          style={[
            Fonts.body,
            Gutters.regularBMargin,
            { color: Colors.bodyText },
          ]}
        >
          {challenge.description}
        </Text>
        {(challenge.type !== 'challenge_training' ||
          !!challenge.reward_count) && (
          <View paddingBottom={13} style={Layout.row}>
            {!!challenge.reward_count && (
              <View style={[Layout.row, { width: 170 }]}>
                <Image
                  source={Images.rewardIcon}
                  resizeMode="contain"
                  style={[Gutters.tinyRMargin, { height: 20, width: 20 }]}
                />
                <Text style={[Fonts.body, { color: Colors.bodyText }]}>
                  {challenge.reward_count -
                    (challenge.total_reward_claimed || 0) <
                  0
                    ? 0
                    : challenge.reward_count -
                      (challenge.total_reward_claimed || 0)}{' '}
                  remaining
                </Text>
              </View>
            )}
            {challenge.type !== 'challenge_training' && (
              <View style={Layout.row}>
                <Image
                  source={Images.locationIcon}
                  resizeMode="contain"
                  style={[Gutters.tinyRMargin, { height: 20, width: 20 }]}
                />
                <Text style={[Fonts.bodyBold, { color: Colors.bodyText }]}>
                  {challenge.is_distance_required ? challenge.distance : 0}km
                </Text>
              </View>
            )}
          </View>
        )}

        <View style={Layout.row}>
          <Image
            source={Images.dateIcon}
            resizeMode="contain"
            style={[Gutters.tinyRMargin, { height: 20, width: 20 }]}
          />
          <Text style={[Fonts.body, { color: Colors.bodyText }]}>
            {isProfilePage
              ? `${moment
                  .utc(attempt.started_at)
                  .local()
                  .format('DD MMM HH:mm')} - ${moment
                  .utc(attempt.ended_at)
                  .local()
                  .format('DD MMM HH:mm')}`
              : moment.utc(challenge.ended_at) < moment.utc()
              ? 'Ended'
              : `Ends on ${moment
                  .utc(challenge.ended_at)
                  .local()
                  .format('DD MMM HH:mm')}`}
          </Text>
        </View>
      </View>
    </View>
  ) : null;
}

ChallengeCardComponent.propTypes = {
  attempt: PropTypes.object,
  challengeData: PropTypes.object,
  isProfilePage: PropTypes.bool,
};

ChallengeCardComponent.defaultProps = {
  attempt: null,
  challengeData: null,
  isProfilePage: false,
};

export default ChallengeCardComponent;
