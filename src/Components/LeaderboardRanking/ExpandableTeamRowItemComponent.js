import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, PixelRatio } from 'react-native';
import moment from 'moment';
import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import { Icon } from '@ui-kitten/components';
import { useTheme } from '@/Theme';
import { Config } from '@/Config';
import SoloRowItemComponent from '@/Components/LeaderboardRanking/SoloRowItemComponent';

function ExpandableTeamRowItemComponent({ data, type, index, onPress }) {
  const { Fonts, Gutters, Layout, Colors, Images } = useTheme();
  const user = useSelector((state) => state.user.item);

  const [expanded, setExpanded] = useState(false);

  const TeamParticipants = () => {
    return (
      <View>
        {data.participants.map((participant, i) => (
          <View key={i}>
            {i === 0 && !data.corporate_id ? (
              <View
                height={1}
                backgroundColor={Colors.grey}
                width="100%"
                marginBottom={3}
                marginTop={3}
              />
            ) : null}
            <SoloRowItemComponent
              prefix="sub-row"
              key={participant.user_id}
              data={participant}
              type={type}
              index={i + 1}
            />

            {i !== data.participants.length - 1 &&
            data.participants.length > 0 ? (
              <View
                height={1}
                backgroundColor={Colors.grey}
                width="100%"
                marginBottom={3}
                marginTop={3}
              />
            ) : null}
          </View>
        ))}
      </View>
    );
  };

  const RegularTeamRowItem = () => (
    <View>
      <View
        backgroundColor={
          data.team_id === user.team_id ? Colors.greyish : 'transparent'
        }
        style={[Layout.rowCenter, Gutters.smallVPadding, Gutters.smallHPadding]}
      >
        <View flex={4}>
          <Text
            numberOfLines={1}
            style={[
              Fonts.bodyBold,
              Fonts.whiteText,
              Fonts.textLeft,
              { minWidth: 45 },
            ]}
          >
            #
            {(type === 'race-times' && !data.overall_total_time) ||
            (type !== 'race-times' && !data.mp_overall_total)
              ? 'UR'
              : index}
          </Text>
        </View>
        <View flex={16} style={Layout.row}>
          <Text
            numberOfLines={1}
            style={[Fonts.bodyBold, Fonts.whiteText, { marginLeft: 5 }]}
          >{`${data.team_name}`}</Text>
        </View>
        <View flex={7} style={[Layout.rowVEnd, Layout.alignItemsCenter]}>
          <Text style={[Fonts.bodyBold, Fonts.whiteText, Fonts.textRight]}>
            {type === 'race-times'
              ? data.overall_total_time
                ? moment()
                    .startOf('day')
                    .seconds(data.overall_total_time || 0)
                    .format('H:mm:ss')
                : '-'
              : data.mp_overall_total || 0}
          </Text>
          {type !== 'race-times' && (
            <Images.MPIconPrimary
              height={RFValue(14) / PixelRatio.getFontScale()}
              fill={Colors.primary}
              style={{ marginTop: 2 }}
            />
          )}
          {!!data.participants.length && (
            <Icon
              name={expanded ? 'arrow-down' : 'arrow-right'}
              width={20}
              height={25}
              fill={Colors.white}
              style={{
                marginTop: 2,
                marginLeft: type !== 'race-times' ? 0 : 3,
              }}
            />
          )}
        </View>
      </View>
    </View>
  );

  const CorporateTeamRowItem = () => (
    <View style={{ marginBottom: 5 }}>
      <View
        style={[
          Layout.row,
          Layout.elevation,
          {
            borderColor:
              data.team_id === user.team_id ? Colors.greyish : Colors.white,
            borderWidth: 1,
            borderRadius: 8,
            overflow: 'hidden',
            backgroundColor:
              data.team_id === user.team_id
                ? Colors.greyish
                : Colors.background,
          },
        ]}
      >
        <View
          flex={1}
          style={[Layout.row, Gutters.regularVPadding, Gutters.regularHPadding]}
        >
          <View paddingRight={10}>
            <Text
              numberOfLines={1}
              style={[
                Fonts.bodyBold,
                Fonts.whiteText,
                Fonts.textLeft,
                { minWidth: 45 },
              ]}
            >{`#${
              (type === 'race-times' && !data.overall_total_time) ||
              (type !== 'race-times' && !data.mp_overall_total)
                ? 'UR'
                : index
            }`}</Text>
          </View>
          <View flex={4}>
            <Text
              style={[
                Fonts.bodyBold,
                Fonts.whiteText,
                Fonts.textLeft,
                { marginBottom: 2 },
              ]}
            >
              {data.team_name}
            </Text>
            <View style={Layout.rowHCenter}>
              <Text style={[Fonts.bodyBold, Fonts.whiteText, Fonts.textLeft]}>
                {type === 'race-times'
                  ? data.overall_total_time
                    ? moment()
                        .startOf('day')
                        .seconds(data.overall_total_time || 0)
                        .format('H:mm:ss')
                    : '-'
                  : data.mp_overall_total || 0}
              </Text>
              {type !== 'race-times' && (
                <Images.MPIconPrimary
                  height={RFValue(14) / PixelRatio.getFontScale()}
                  style={{ marginTop: 2 }}
                  fill={Colors.primary}
                />
              )}
            </View>
          </View>
        </View>
        <FastImage
          style={{
            position: 'absolute',
            zIndex: 1,
            right: 10,
            width: 85,
            height: 72,
          }}
          source={{
            uri: `${Config.IMAGE_URL_PREFIX}corporate/${data.corporate.corporate_id}/${data.corporate.logo_filename}`,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Images.CorporateBg width={140} style={{ marginRight: -10 }} />
      </View>
    </View>
  );

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setExpanded(!expanded);
          onPress();
        }}
        activeOpacity={0.85}
        style={{ marginTop: data.corporate_id ? 10 : 0 }}
      >
        {data.corporate_id ? <CorporateTeamRowItem /> : <RegularTeamRowItem />}
      </TouchableOpacity>
      {expanded && <TeamParticipants />}
    </View>
  );
}

export default ExpandableTeamRowItemComponent;
