import React from 'react';
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  Linking,
} from 'react-native';

import { navigate } from '@/Navigators/Root';
import { useTheme } from '@/Theme';
import AppBarComponent from '@/Components/AppBarComponent';

const menuData = [
  {
    title: 'Race Times',
    index: 0,
    data: [
      {
        title: 'Solo Race Times',
        category: 'solo',
      },
      {
        title: 'Duo Race Times',
        category: 'duo',
      },
      {
        title: 'Team Race Times',
        category: 'team',
      },
      {
        title: 'Corporate Teams Race Times',
        category: 'corporate-team',
      },
    ],
  },
  {
    title: 'MoonTrekker Points',
    index: 1,
    data: [
      {
        title: 'Solo MoonTrekker Points',
        category: 'solo',
      },
      {
        title: 'Duo MoonTrekker Points',
        category: 'duo',
      },
      {
        title: 'Team MoonTrekker Points',
        category: 'team',
      },
      {
        title: 'Corporate Team MoonTrekker Points',
        category: 'corporate-team',
      },
      {
        title: 'Corporate Cup',
        category: 'corporate-cup',
      },
    ],
  },
  {
    title: 'Fund Raising',
    index: 2,
    data: [
      {
        title: 'Fund Raising',
      },
    ],
  },
];

function IndexLeaderboardsContainer() {
  const { Fonts, Gutters, Layout, Colors, Images } = useTheme();

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <AppBarComponent title="Leaderboards" type="main" />
      <View flex={1}>
        <SectionList
          bounces={false}
          stickySectionHeadersEnabled={false}
          sections={menuData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, section, index }) => (
            <View
              style={[
                index !== 0 ? Gutters.smallTPadding : {},
                Gutters.smallBPadding,
                Gutters.regularHPadding,
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.85}
                style={[
                  Gutters.mediumVPadding,
                  {
                    borderRadius: 8,
                    backgroundColor:
                      section.title === menuData[0].title
                        ? Colors.turqoise
                        : section.title === menuData[1].title
                        ? Colors.greyish
                        : Colors.turqoise,
                  },
                ]}
                onPress={() => {
                  if (section.title === menuData[2].title) {
                    // navigate('Fund Raising', {
                    //   screen_view: item.title,
                    // });
                    Linking.openURL(
                      'https://www.simplygiving.com/event/barclaysmoontrekker2021',
                    );
                  } else {
                    navigate('Leaderboard Ranking', {
                      screen_view: item.title,
                      type:
                        section.title === menuData[0].title
                          ? 'race-times'
                          : 'moontrekker-points',
                      category: item.category,
                    });
                  }
                }}
              >
                <View style={Layout.rowVCenter}>
                  <Text
                    style={[
                      Fonts.h3,
                      {
                        color: Colors.white,
                        marginLeft: 10,
                      },
                    ]}
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          renderSectionHeader={({ section: { title, index } }) => (
            <View
              style={[
                Layout.center,
                Layout.row,
                Gutters.mediumVPadding,
                { backgroundColor: Colors.background },
              ]}
            >
              {index === 0 ? (
                <Images.RaceFlagIcon />
              ) : index === 1 ? (
                <Images.MPIcon />
              ) : (
                <Images.FundRaisingIcon />
              )}
              <Text style={[Fonts.h1, { color: Colors.white, marginLeft: 10 }]}>
                {title}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

export default IndexLeaderboardsContainer;
