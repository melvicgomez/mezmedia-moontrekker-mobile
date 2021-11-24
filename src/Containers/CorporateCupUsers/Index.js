import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, FlatList, RefreshControl } from 'react-native';

import { useTheme } from '@/Theme';
import AppBarComponent from '@/Components/AppBarComponent';
import GetCorporateCupUsers from '@/Store/CorporateCupUsers/GetCorporateCupUsers';
import SoloRowItemComponent from '@/Components/LeaderboardRanking/SoloRowItemComponent';
import LeaderboardFlatListHeaderComponent from '@/Components/LeaderboardRanking/LeaderboardFlatListHeaderComponent';
import LeaderboardRankingHeaderComponent from '@/Components/LeaderboardRanking/LeaderboardRankingHeaderComponent';

function CorporateCupUsers({ route }) {
  const flatListRef = useRef(null);

  const dispatch = useDispatch();
  const { Fonts, Gutters, Layout, Colors } = useTheme();

  const corporateCupUsers = useSelector((state) => state.corporateCupUsers);
  const user = useSelector((state) => state.user.item);

  const fetchLeaderboardRanking = useCallback((page = 1) => {
    dispatch(
      GetCorporateCupUsers.action({
        page,
        corporate_id: route.params.corporate_id,
      }),
    );
  }, []);

  useEffect(async () => {
    fetchLeaderboardRanking(1);
  }, []);

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <AppBarComponent title="LEADERBOARDS" type="main" displayBack={true} />
      <FlatList
        ref={flatListRef}
        stickyHeaderIndices={
          (corporateCupUsers.item.data || []).length > 0 ? [1] : [0]
        }
        data={[null, ...(corporateCupUsers.item.data || [])]}
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
                <SoloRowItemComponent
                  data={item}
                  type="moontrekker-points"
                  index={index}
                />
              ) : (corporateCupUsers.item.data || []).length > 0 ? (
                <LeaderboardRankingHeaderComponent
                  category="corporate-cup"
                  type="moontrekker-points"
                  business_name={route.params.business_name}
                  corporate_id={route.params.corporate_id}
                  logo_filename={route.params.logo_filename}
                  mp_total={route.params.mp_overall_total}
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

            {corporateCupUsers.item.data ? (
              index !== corporateCupUsers.item.data.length &&
              corporateCupUsers.item.data.length > 0 &&
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
          if (distanceFromEnd > 0.75 && corporateCupUsers.item.next_page_url) {
            fetchLeaderboardRanking(corporateCupUsers.item.current_page + 1);
          }
        }}
        refreshControl={
          <RefreshControl
            refreshing={corporateCupUsers.loading}
            onRefresh={() => {
              fetchLeaderboardRanking(1);
            }}
            tintColor={Colors.primary}
          />
        }
        ListHeaderComponent={
          <LeaderboardFlatListHeaderComponent
            category="corporate-cup"
            type="moontrekker-points-users"
            business_name={route.params.business_name}
            jumpToPosition={() => {
              const listdata = flatListRef.current.props.data;
              let scrollIndex = null;
              let viewOffset = 0;
              scrollIndex =
                listdata.findIndex((item) => item?.user_id === user.user_id) -
                1;
              viewOffset = 0;
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
        ListFooterComponent={<View height={10} />}
      />
    </View>
  );
}

export default CorporateCupUsers;
