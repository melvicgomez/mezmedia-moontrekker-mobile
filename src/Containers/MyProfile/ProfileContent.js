import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/Theme';
import { Config } from '@/Config';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import ConfirmationPopupComponent from '@/Components/ConfirmationPopupComponent';

import GetPoint from '@/Store/MoontrekkerPoint/GetMoontrekkerPoint';

function ProfileContent({ profileData }) {
  const { Fonts, Gutters, Layout, Colors, Images } = useTheme();

  const dispatch = useDispatch();
  const point = useSelector((state) => state.moontrekkerPoint.item);
  const user = useSelector((state) => state.user.item);

  useEffect(() => {
    dispatch(GetPoint.action({ user_id: user.user_id, oldData: point }));
  }, []);

  const badgeRankNames = [
    'None',
    'Bronze',
    'Silver',
    'Gold',
    'Platinum',
    'Diamond',
  ];

  const [badgeModalVisible, setBadgeModalVisible] = useState(false);
  const [personalRaceTimeModalVisible, setPersonalRaceTimeModalVisible] =
    useState(false);
  const [teamRaceTimeModalVisible, setTeamRaceTimeModalVisible] =
    useState(false);

  const getBadge = () => {
    const badgeProgress = [0, 30, 60, 90, 120, 150];

    let rankIndex = 0;
    badgeProgress.forEach((progress, i) => {
      if ((point || 0) > progress) {
        rankIndex = i;
      }
    });

    return {
      rankIndex,
      point:
        badgeProgress[
          rankIndex === badgeProgress.length - 1 ? rankIndex : rankIndex + 1
        ],
    };
  };

  const getMPProgress = () => {
    return ((point || 0) / getBadge().point) * 100;
  };

  return (
    <View contentContainerStyle={Gutters.regularVPadding}>
      {!!profileData && (
        <View
          style={[
            Layout.row,
            Layout.alignItemsCenter,
            Layout.justifyContentBetween,
            Gutters.regularHMargin,
            Gutters.mediumBMargin,
            Layout.elevation,
            {
              backgroundColor: Colors.bodyText,
              borderBottomRightRadius: 8,
              borderTopRightRadius: 8,
            },
          ]}
        >
          <View
            style={[
              Gutters.regularVPadding,
              Gutters.mediumLMargin,
              { flex: 1 },
            ]}
          >
            <Text
              style={[Fonts.bodyBold, { color: Colors.white, marginBottom: 2 }]}
            >
              {profileData.first_name} {profileData.last_name}
            </Text>
            <Text
              style={[
                Fonts.bodyBold,
                { color: Colors.white, flex: 1, flexWrap: 'wrap' },
              ]}
            >
              {profileData.team_id
                ? profileData.team.team_type === 'duo'
                  ? 'Duo '
                  : profileData.team.team_type === 'team'
                  ? 'Team '
                  : 'Corporate Team '
                : 'Solo '}
              Participant
            </Text>
          </View>
          {profileData.team_id && profileData.team.team_type === 'corporate' ? (
            <FastImage
              source={Images.corporateBG}
              style={[
                Layout.center,
                Layout.column,
                Layout.alignItemsEnd,
                Gutters.tinyRPadding,
                {
                  width: 110,
                  alignSelf: 'stretch',
                  backgroundColor: Colors.grey,
                },
              ]}
              resizeMode="stretch"
            >
              <View
                style={{
                  backgroundColor: Colors.white,
                  width: 80,
                }}
              >
                <FastImage
                  style={{
                    width: 75,
                    height: 50,
                  }}
                  source={{
                    uri: `${Config.IMAGE_URL_PREFIX}corporate/${profileData.team.corporate_id}/${profileData.team.corporate.logo_filename}`,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
            </FastImage>
          ) : null}
        </View>
      )}
      <View
        style={[
          Layout.justifyContentCenter,
          Gutters.mediumBMargin,
          Gutters.regularHMargin,
          Gutters.mediumVPadding,
          Gutters.mediumHPadding,
          Layout.elevation,
          { backgroundColor: Colors.bodyText, borderRadius: 8 },
        ]}
      >
        <View
          style={[Layout.row, Layout.alignItemsCenter, Gutters.smallBMargin]}
        >
          <TouchableOpacity
            style={[
              Layout.center,
              Gutters.smallRMargin,
              {
                backgroundColor: Colors.primary,
                borderRadius: 50,
                width: 22,
                height: 22,
              },
            ]}
            activeOpacity={0.8}
            onPress={() => setBadgeModalVisible(true)}
          >
            <Text style={[Fonts.body, { color: Colors.white }]}>𝙞</Text>
          </TouchableOpacity>
          <Text style={[Fonts.bodyBold, { color: Colors.white }]}>
            Current Badge : {badgeRankNames[getBadge().rankIndex]}
          </Text>
        </View>

        <View
          style={[Layout.row, Layout.alignItemsCenter, Gutters.mediumBMargin]}
        >
          {!!getBadge().rankIndex && (
            <Image
              style={[Gutters.smallRMargin, { height: 25, width: 25 }]}
              source={Images.badges[getBadge().rankIndex - 1]}
            />
          )}

          <View
            height={14}
            flex={1}
            style={{
              backgroundColor: Colors.disabled,
              borderRadius: 16,
              shadowColor: Colors.black,
              shadowOffset: {
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 2,
              elevation: 4,
              overflow: 'hidden',
            }}
          >
            <View
              style={[
                Layout.fullHeight,
                {
                  backgroundColor: Colors.primary,
                  borderRadius: 16,
                  width: `${getMPProgress() > 100 ? 100 : getMPProgress()}%`,
                },
              ]}
            />
          </View>
          <Text
            style={[
              Fonts.bodyBold,
              Gutters.regularLMargin,
              { color: Colors.white },
            ]}
          >
            {`${point || 0}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/
            {getBadge()
              .point.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
          <Image
            source={Images.pointIcon}
            style={[
              Gutters.tinyLMargin,
              {
                width: 19,
                height: 19,
              },
            ]}
          />
        </View>
        <View
          style={[
            Layout.row,
            Layout.alignItemsCenter,
            Gutters.tinyBMargin,
            Layout.justifyContentBetween,
          ]}
        >
          <View style={[Layout.row, Layout.alignItemsCenter]}>
            <Text
              style={[
                Fonts.bodyBold,
                Gutters.smallRMargin,
                { color: Colors.white },
              ]}
            >
              Personal Best Race Time
            </Text>
            <TouchableOpacity
              style={[
                Layout.center,

                {
                  backgroundColor: Colors.primary,
                  borderRadius: 50,
                  width: 22,
                  height: 22,
                },
              ]}
              activeOpacity={0.8}
              onPress={() => setPersonalRaceTimeModalVisible(true)}
            >
              <Text style={[Fonts.body, { color: Colors.white }]}>𝙞</Text>
            </TouchableOpacity>
          </View>
          <Text style={[Fonts.bodyBold, { color: Colors.white }]}>
            {profileData?.race_best_time_attempts
              ? moment
                  .utc(profileData.race_best_time_attempts.total_time * 1000)
                  .format('HH:mm:ss')
              : '-'}
          </Text>
        </View>
      </View>
      {!!profileData && !!profileData.team_id && !!profileData.team && (
        <View
          style={[
            Layout.justifyContentCenter,
            Gutters.regularBMargin,
            Gutters.regularHMargin,
            Gutters.mediumVPadding,
            Gutters.mediumHPadding,
            Layout.elevation,
            { backgroundColor: Colors.bodyText, borderRadius: 8 },
          ]}
        >
          <View style={Gutters.smallBMargin}>
            <Text style={[Fonts.h3, { color: Colors.primary }]}>
              {profileData.team.team_name.toUpperCase()}
            </Text>
          </View>
          <View
            style={[
              Layout.row,
              Layout.alignItemsCenter,
              Layout.justifyContentBetween,
            ]}
          >
            <View style={[Layout.row, Layout.alignItemsCenter]}>
              <Text
                style={[
                  Fonts.bodyBold,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                Best Team Average Time
              </Text>
              <TouchableOpacity
                style={[
                  Layout.center,

                  {
                    backgroundColor: Colors.primary,
                    borderRadius: 50,
                    width: 22,
                    height: 22,
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => setTeamRaceTimeModalVisible(true)}
              >
                <Text style={[Fonts.body, { color: Colors.white }]}>𝙞</Text>
              </TouchableOpacity>
            </View>
            <Text style={[Fonts.bodyBold, { color: Colors.white }]}>
              {profileData?.team.team_race_best_time
                ? moment
                    .utc(profileData.team.team_race_best_time * 1000)
                    .format('HH:mm:ss')
                : '-'}
            </Text>
          </View>
          <View
            style={[
              Gutters.smallVMargin,
              { backgroundColor: Colors.white, height: 1 },
            ]}
          />
          {profileData.team.participants.map((member, i) => (
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Gutters.smallBMargin,
                Layout.justifyContentBetween,
              ]}
              key={i}
            >
              <Text
                style={[
                  Fonts.bodyBold,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                {member.first_name} {member.last_name}
              </Text>
              <Text style={[Fonts.bodyBold, { color: Colors.white }]}>
                {member.total_time
                  ? moment.utc(member.total_time * 1000).format('HH:mm:ss')
                  : member.total_time === 0
                  ? moment.utc(0).format('HH:mm:ss')
                  : '-'}
              </Text>
            </View>
          ))}
        </View>
      )}
      <ConfirmationPopupComponent
        visibility={badgeModalVisible}
        dismissModal={() => {
          setBadgeModalVisible(false);
        }}
        title="About Badges"
        message="This badge shows your current progress in MoonTrekker. As you gain MoonTrekker points, your badge rank will increase. You can increase your rank by reaching the next tier of MoonTrekker points displayed."
        actionRequired={false}
      />
      <ConfirmationPopupComponent
        visibility={personalRaceTimeModalVisible}
        dismissModal={() => {
          setPersonalRaceTimeModalVisible(false);
        }}
        title="About Best Race Time"
        message="This is your personal best Race Time for MoonTrekker. You can make as many attempts as possible in order to improve this time."
        actionRequired={false}
      />
      <ConfirmationPopupComponent
        visibility={teamRaceTimeModalVisible}
        dismissModal={() => {
          setTeamRaceTimeModalVisible(false);
        }}
        title="About Best Team Average Time"
        message="Your leaderboard team time is the average time of all members of your team. This will be entered as your team's time in the leaderboards. You can improve this time by making more race attempts. Only when all members of the team have clocked a race time will this average time appear and be entered in the leaderboards."
        actionRequired={false}
      />
    </View>
  );
}

export default React.memo(
  ProfileContent,
  (prevProps, nextProps) => nextProps.profileData === prevProps.profileData,
);
