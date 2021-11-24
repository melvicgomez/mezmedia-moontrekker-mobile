import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { useTheme } from '@/Theme';

const headerText = {
  'solo-race-times': {
    title: 'Solo Race Times',
    description:
      'This leaderboard displays the current best race times for participants in the Solo category',
  },
  'duo-race-times': {
    title: 'Duo Race Times',
    description:
      'This leaderboard displays the current best average race times for participants in the Duo category. Race times are averaged from the best race times of each participant.',
  },
  'team-race-times': {
    title: 'Team Race Times',
    description:
      'This leaderboard displays the current best average race times for participants in the Team category. Race times are averaged from the best race times of each participant.',
  },
  'corporate-team-race-times': {
    title: 'Corporate Team Race Times',
    description:
      'This leaderboard displays the current best average race times for participants in the Corporate Team category. Race times are averaged from the best race times of each participant.',
  },
  'solo-moontrekker-points': {
    title: 'Solo MoonTrekker Points',
    description:
      'This leaderboard displays the most MoonTrekker points accumulated for participants in the Solo category.',
  },
  'duo-moontrekker-points': {
    title: 'Duo MoonTrekker Points',
    description:
      'This leaderboard displays the combined MoonTrekker points accumulated for all teams in the Duo category.',
  },
  'team-moontrekker-points': {
    title: 'Team MoonTrekker Points',
    description:
      'This leaderboard displays the combined MoonTrekker points accumulated for all teams in the Team category.',
  },
  'corporate-team-moontrekker-points': {
    title: 'Corporate Team Moontrekker Points',
    description:
      'This leaderboard displays the combined MoonTrekker points accumulated for all teams in the Corporate Team category.',
  },
  'corporate-cup-moontrekker-points': {
    title: 'Corporate Cup',
    description:
      'This leaderboard displays the combined MoonTrekker points accumulated for each company by their Corporate Teams.',
  },
  'corporate-cup-moontrekker-points-users': {
    title: 'Corporate Cup',
  },
};

function LeaderboardFlatListHeaderComponent({
  category = 'solo',
  type = 'race-times',
  jumpToPosition,
  business_name,
}) {
  const { Fonts, Gutters, Layout, Images, MetricsSizes } = useTheme();

  return (
    <View>
      <View
        style={[
          Gutters.regularVPadding,
          Gutters.regularHPadding,
          Layout.colCenter,
        ]}
      >
        <View
          style={[Layout.rowReverse, Layout.fullWidth, Gutters.regularBMargin]}
        >
          <TouchableOpacity activeOpacity={0.85} onPress={jumpToPosition}>
            <View style={[Layout.rowVCenter]}>
              <Images.RaceFlagIcon
                height={MetricsSizes.medium}
                style={{ marginRight: MetricsSizes.tiny }}
              />
              <Text style={[Fonts.bodyLink, Fonts.whiteText]}>
                Jump to My Position
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={[
            Fonts.h1,
            Fonts.whiteText,
            Gutters.smallBMargin,
            Fonts.textCenter,
            Gutters.mediumHMargin,
          ]}
        >
          {business_name || headerText[`${category}-${type}`].title}
        </Text>

        {headerText[`${category}-${type}`].description ? (
          <Text
            style={[
              Fonts.body,
              Fonts.whiteText,
              Fonts.textCenter,
              Gutters.mediumHMargin,
            ]}
          >
            {headerText[`${category}-${type}`].description}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

export default LeaderboardFlatListHeaderComponent;
