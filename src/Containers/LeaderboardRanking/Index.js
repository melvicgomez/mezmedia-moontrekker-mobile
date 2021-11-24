import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, RefreshControl } from 'react-native';

import { useTheme } from '@/Theme';
import GetLeaderboardRanking from '@/Store/Leaderboard/GetLeaderboardRanking';

import AppBarComponent from '@/Components/AppBarComponent';
import LeaderboardRankingHeaderComponent from '@/Components/LeaderboardRanking/LeaderboardRankingHeaderComponent';
import LeaderboardFlatListHeaderComponent from '@/Components/LeaderboardRanking/LeaderboardFlatListHeaderComponent';
import SoloRowItemComponent from '@/Components/LeaderboardRanking/SoloRowItemComponent';
import ExpandableTeamRowItemComponent from '@/Components/LeaderboardRanking/ExpandableTeamRowItemComponent';
import CorporateCupRowItemComponent from '@/Components/LeaderboardRanking/CorporateCupRowItemComponent';

import { Transitioning, Transition } from 'react-native-reanimated';

function IndexLeaderboardRankingContainer({ route }) {
  const { category, type } = route.params;

  const dispatch = useDispatch();
  const { Fonts, Gutters, Layout, Colors, Images } = useTheme();

  const leaderboard = useSelector((state) => state.leaderboard);
  const user = useSelector((state) => state.user.item);

  // api call here

  const flatListRef = useRef(null);

  const onRefresh = () => {
    fetchLeaderboardRanking(1);
  };

  const fetchLeaderboardRanking = useCallback((page = 1) => {
    dispatch(
      GetLeaderboardRanking.action({
        type,
        category,
        page,
      }),
    );
  }, []);

  useEffect(() => {
    fetchLeaderboardRanking(1);
  }, []);

  const transitionRef = useRef();
  const transition = (
    <Transition.Change interpolation="easeInOut" durationMs={500} delayMs={0} />
  );

  const rowItemonPress = () => {
    transitionRef.current.animateNextTransition();
  };

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <AppBarComponent title="LEADERBOARDS" type="main" displayBack={true} />

      <Transitioning.View
        ref={transitionRef}
        transition={transition}
        style={{ flex: 1 }}
      >
        <FlatList
          ref={flatListRef}
          stickyHeaderIndices={
            (leaderboard.item.data || []).length > 0 ? [1] : [0]
          }
          data={[null, ...(leaderboard.item.data || [])]}
          keyExtractor={(item, index) =>
            `${
              item
                ? item.hasOwnProperty('user_id')
                  ? `user_${item.user_id}`
                  : item.hasOwnProperty('team_id')
                  ? `team_${item.team_id}`
                  : `corporate_${item.corporate_id}`
                : 0
            }-${index}`
          }
          renderItem={({ item, index }) => (
            <View style={Gutters.regularHPadding}>
              <View>
                {item ? (
                  item.user_id ? (
                    <SoloRowItemComponent
                      data={item}
                      type={type}
                      index={index}
                    />
                  ) : item.team_id ? (
                    <ExpandableTeamRowItemComponent
                      data={item}
                      type={type}
                      index={index}
                      onPress={rowItemonPress}
                    />
                  ) : item.corporate_id ? (
                    <CorporateCupRowItemComponent
                      data={item}
                      type={type}
                      index={index}
                    />
                  ) : null
                ) : (leaderboard.item.data || []).length > 0 ? (
                  <LeaderboardRankingHeaderComponent
                    type={type}
                    category={category}
                  />
                ) : (
                  <View style={[Layout.fill, Layout.colCenter]}>
                    <View>
                      <Text style={[Fonts.h1, Fonts.whiteText]}>
                        NO DATA FOUND.
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              {leaderboard.item.data ? (
                index !== leaderboard.item.data.length &&
                leaderboard.item.data.length > 0 &&
                index > 0 &&
                !item.corporate_id ? (
                  <View
                    height={1}
                    backgroundColor={Colors.grey}
                    width="100%"
                    marginBottom={3}
                    marginTop={3}
                  />
                ) : null
              ) : null}
            </View>
          )}
          onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd > 0.75 && leaderboard.item.next_page_url) {
              fetchLeaderboardRanking(leaderboard.item.current_page + 1);
            }
          }}
          refreshControl={
            <RefreshControl
              refreshing={leaderboard.loading}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
            />
          }
          ListHeaderComponent={
            <LeaderboardFlatListHeaderComponent
              category={category}
              type={type}
              jumpToPosition={() => {
                const listdata = flatListRef.current.props.data;
                let scrollIndex = null;
                let viewOffset = 0;
                switch (category) {
                  case 'solo':
                    scrollIndex =
                      listdata.findIndex(
                        (item) => item?.user_id === user.user_id,
                      ) - 1;
                    viewOffset = 0;
                    break;
                  case 'duo':
                    scrollIndex = listdata.findIndex(
                      (item) => item?.team_id === user.team_id,
                    );
                    break;
                  case 'team':
                    scrollIndex = listdata.findIndex(
                      (item) => item?.team_id === user.team_id,
                    );
                    break;
                  case 'corporate-team':
                    scrollIndex = listdata.findIndex(
                      (item) => item?.corporate_id === user?.team?.corporate_id,
                    );
                    viewOffset = 42;
                    break;
                  case 'corporate-cup':
                    break;
                  default:
                    break;
                }
                console.log('scrollIndex', scrollIndex);
                if (scrollIndex > 0) {
                  flatListRef.current.scrollToIndex({
                    animated: true,
                    index: scrollIndex,
                    viewOffset,
                  });
                }
              }}
            />
          }
          ListFooterComponent={
            category === 'corporate-team' || category === 'corporate-cup' ? (
              <View padding={20} marginBottom={5}>
                <Text
                  style={[
                    Fonts.body,
                    Fonts.textCenter,
                    { color: Colors.white },
                  ]}
                >
                  If you would like to include your company logo, please email
                  hello@moontrekker.com
                </Text>
              </View>
            ) : (
              <View height={10} />
            )
          }
        />
      </Transitioning.View>
    </View>
  );
}

export default IndexLeaderboardRankingContainer;
