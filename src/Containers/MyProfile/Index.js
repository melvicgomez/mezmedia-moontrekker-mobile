import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { navigate } from '@/Navigators/Root';
import { useSelector } from 'react-redux';
import { useTheme } from '@/Theme';
import axiosInstance from '@/Services';

import ProfileContent from './ProfileContent';
import ChallengeCardComponent from '@/Components/ChallengeCardComponent';
import AppBarComponent from '@/Components/AppBarComponent';
import RaceCardComponent from '@/Components/RaceCardComponent';
import TrainingSessionCardComponent from '@/Components/TrainingSessionCardComponent';

function IndexMyProfileContainer() {
  const { Fonts, Gutters, Layout, Colors } = useTheme();
  const user = useSelector((state) => state.user.item);
  const internetStatus = useSelector((s) => s.internetStatus.item);

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // load training
  const [training, setTraining] = useState({
    name: 'Training',
    data: [],
  });
  const [loadTraining, setLoadTraining] = useState(true);
  const [trainingNextPage, setTrainingNextPage] = useState(true);
  const [trainingPageNum, setTrainingPageNum] = useState(1);

  // load challenge
  const [challenges, setChallenges] = useState({
    name: 'Challenge',
    data: [],
  });
  const [loadChallenge, setLoadChallenge] = useState(true);
  const [challengeNextPage, setChallengeNextPage] = useState(true);
  const [challengePageNum, setChallengePageNum] = useState(1);

  // load race
  const [races, setRaces] = useState({
    name: 'Race',
    data: [],
  });
  const [loadRace, setLoadRace] = useState(true);
  const [raceNextPage, setRaceNextPage] = useState(true);
  const [racePageNum, setRacePageNum] = useState(1);

  const [tabIndex, setTabIndex] = useState(1);
  const [showRetry, setShowRetry] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getProfileData();
      getChallenge(true);
      getTraining(true);
      getRace(true);
    }, []),
  );

  // useEffect(() => {
  //   setLoading(true);
  //   getProfileData();
  //   getChallenge(true);
  //   getTraining(true);
  //   getRace(true);
  // }, []);

  const getProfileData = () => {
    axiosInstance
      .get(`api/profile/${user.user_id}`)
      .then((res) => {
        setProfileData(res.data);
        setIsRefreshing(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setIsRefreshing(false);
      });
  };

  useEffect(() => {
    if (profileData) {
      setLoading(false);
    }
  }, [profileData]);

  const getChallenge = (refresh = false) => {
    const hasMore = refresh ? true : challengeNextPage;
    const page = refresh ? 1 : challengePageNum;

    if (hasMore) {
      axiosInstance
        .get(`api/profile/${user.user_id}/challenge`)
        .then((res) => {
          let challengeList = {
            ...challenges,
            data:
              page === 1
                ? res.data.data
                : challenges.data.concat(res.data.data),
          };
          setChallenges(challengeList);

          if (res.data.next_page_url) {
            setChallengePageNum(page + 1);
            setChallengeNextPage(true);
            setLoadChallenge(true);
          } else {
            setChallengePageNum(page);
            setChallengeNextPage(false);
            setLoadChallenge(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoadChallenge(false);

          if (!internetStatus.isOnline) {
            setShowRetry(true);
          }
        });
    }
  };

  const getRace = (refresh = false) => {
    const hasMore = refresh ? true : raceNextPage;
    const page = refresh ? 1 : racePageNum;

    if (hasMore) {
      axiosInstance
        .get(`api/profile/${user.user_id}/race`)
        .then((res) => {
          let raceList = {
            ...races,
            data: page === 1 ? res.data.data : races.data.concat(res.data.data),
          };
          setRaces(raceList);

          if (res.data.next_page_url) {
            setRacePageNum(page + 1);
            setRaceNextPage(true);
            setLoadRace(true);
          } else {
            setRacePageNum(page);
            setRaceNextPage(false);
            setLoadRace(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoadRace(false);

          if (!internetStatus.isOnline) {
            setShowRetry(true);
          }
        });
    }
  };

  const getTraining = (refresh = false) => {
    const hasMore = refresh ? true : trainingNextPage;
    const page = refresh ? 1 : trainingPageNum;

    if (hasMore) {
      axiosInstance
        .get(`api/profile/${user.user_id}/training`)
        .then((res) => {
          let trainingList = {
            ...training,
            data:
              page === 1 ? res.data.data : training.data.concat(res.data.data),
          };
          setTraining(trainingList);

          if (res.data.next_page_url) {
            setTrainingPageNum(page + 1);
            setTrainingNextPage(true);
            setLoadTraining(true);
          } else {
            setTrainingPageNum(page);
            setTrainingNextPage(false);
            setLoadTraining(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoadTraining(false);

          if (!internetStatus.isOnline) {
            setShowRetry(true);
          }
        });
    }
  };

  const onRefresh = async (autoRefresh = false) => {
    setIsRefreshing(true);
    getProfileData();
    getChallenge(true);
    getTraining(true);
    getRace(true);
  };

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <AppBarComponent title="My Profile" type="main" />
      {loading ? (
        <View style={Layout.center} flex={1} marginTop={10} marginBottom={20}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <SectionList
          bounces={false}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={true}
          sections={
            tabIndex === 0
              ? [training]
              : tabIndex === 1
              ? [challenges]
              : [races]
          }
          contentContainerStyle={[
            Gutters.mediumVPadding,
            {
              backgroundColor: Colors.background,
            },
          ]}
          refreshing={loading}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => onRefresh()}
              tintColor={Colors.primary}
            />
          }
          ItemSeparatorComponent={() => (
            <View height={20} style={{ backgroundColor: Colors.transparent }} />
          )}
          ListHeaderComponent={() => (
            <ProfileContent profileData={profileData} />
          )}
          ListEmptyComponent={() =>
            showRetry ? (
              <View
                flex={1}
                justifyContent="center"
                style={[Gutters.largeVPadding, Gutters.mediumHPadding]}
              >
                <Text
                  style={[
                    Fonts.h3,
                    Fonts.textCenter,
                    { color: Colors.disabled },
                  ]}
                >
                  Sorry, we could not load your{' '}
                  {tabIndex === 0
                    ? 'Training '
                    : tabIndex === 1
                    ? 'Challenge '
                    : 'Race '}
                  data at the moment
                </Text>
                <View
                  style={[
                    Gutters.smallTMargin,
                    {
                      alignItems: 'center',
                    },
                  ]}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      onRefresh();
                    }}
                    style={[
                      Layout.center,
                      {
                        width: 80,
                        borderRadius: 8,
                        height: 40,
                        backgroundColor: Colors.bodyText,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        Fonts.bodyBold,
                        Fonts.textCenter,
                        { color: Colors.white },
                      ]}
                    >
                      RETRY
                    </Text>
                  </TouchableOpacity>
                  {/* <PrimaryButtonComponent
                    label="RETRY"
                    onPress={() => {
                      getAnnouncement();
                      getChallenges(true);
                    }}
                    labelStyle={Fonts.bodyBold}
                    buttonColor={Colors.bodyText}
                    outerStyle={{
                      width: '50%',
                    }}
                  /> */}
                </View>
              </View>
            ) : null
          }
          ListFooterComponent={() => (
            <>
              {((tabIndex === 0 && loadTraining) ||
                (tabIndex === 1 && loadChallenge) ||
                (tabIndex === 2 && loadRace)) && (
                <ActivityIndicator
                  size="large"
                  color={Colors.primary}
                  style={Gutters.mediumVMargin}
                />
              )}
              {((tabIndex === 0 &&
                !loadTraining &&
                training.data.length === 0) ||
                (tabIndex === 1 &&
                  !loadChallenge &&
                  challenges.data.length === 0) ||
                (tabIndex === 2 && !loadRace && races.data.length === 0)) &&
                (showRetry ? (
                  <View
                    flex={1}
                    justifyContent="center"
                    style={[Gutters.largeVPadding, Gutters.largeHPadding]}
                  >
                    <Text
                      style={[
                        Fonts.h3,
                        Fonts.textCenter,
                        { color: Colors.disabled },
                      ]}
                    >
                      Sorry, we could not load your{' '}
                      {tabIndex === 0
                        ? 'training '
                        : tabIndex === 1
                        ? 'challenge '
                        : 'race '}
                      data at the moment
                    </Text>
                    <View
                      style={[
                        Gutters.smallTMargin,
                        {
                          alignItems: 'center',
                        },
                      ]}
                    >
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          onRefresh();
                        }}
                        style={[
                          Layout.center,
                          {
                            width: 80,
                            borderRadius: 8,
                            height: 40,
                            backgroundColor: Colors.bodyText,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            Fonts.bodyBold,
                            Fonts.textCenter,
                            { color: Colors.white },
                          ]}
                        >
                          RETRY
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: Colors.transparent,
                      flex: 1,
                    }}
                  >
                    <View alignItems="center" style={Gutters.largeVPadding}>
                      <Text
                        style={[
                          Fonts.h3,
                          Gutters.regularBPadding,
                          { color: Colors.bodyText },
                        ]}
                      >
                        No Record Found
                      </Text>
                    </View>
                  </View>
                ))}
            </>
          )}
          renderItem={({ item, index, separators }) => (
            <TouchableOpacity
              activeOpacity={1}
              key={item.attempt_id}
              onPress={() => {
                if (internetStatus.isOnline) {
                  navigate('Record Details', { attempt_id: item.attempt_id });
                }
              }}
            >
              <View style={Gutters.tinyHPadding}>
                {tabIndex === 0 ? (
                  <TrainingSessionCardComponent trainingAttempt={item} />
                ) : tabIndex === 1 ? (
                  <ChallengeCardComponent attempt={item} isProfilePage={true} />
                ) : (
                  <View>
                    <RaceCardComponent raceAttempt={item} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
          renderSectionHeader={() => (
            <View
              style={[
                Layout.row,
                Layout.justifyContentBetween,
                Gutters.mediumBPadding,
                Gutters.smallTPadding,
                Gutters.regularHPadding,
                { backgroundColor: Colors.background },
              ]}
            >
              {['TRAINING', 'CHALLENGES', 'RACES'].map((tab, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={tabIndex === index ? 1 : 0.8}
                  onPress={tabIndex !== index ? () => setTabIndex(index) : null}
                >
                  <Text
                    style={[
                      Fonts.bodyBold,
                      {
                        color:
                          tabIndex === index ? Colors.white : Colors.disabled,
                      },
                    ]}
                    key={index}
                  >
                    {tab}
                  </Text>
                  {tabIndex === index && (
                    <View
                      style={[
                        Gutters.tinyTMargin,
                        { height: 2, backgroundColor: Colors.white },
                      ]}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
          keyExtractor={(item) => item.attempt_id}
          onEndReached={
            tabIndex === 0
              ? getTraining
              : tabIndex === 1
              ? getChallenge
              : getRace
          }
          onEndReachedThreshold={0.7}
        />
      )}
    </View>
  );
}

export default IndexMyProfileContainer;
