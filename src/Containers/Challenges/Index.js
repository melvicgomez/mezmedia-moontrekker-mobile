import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from 'react-native';
import { useTheme } from '@/Theme';
import { useSelector } from 'react-redux';
import AppBarComponent from '@/Components/AppBarComponent';
import BackToTopButtonComponent from '@/Components/BackToTopButtonComponent';
import ChallengeCardComponent from '@/Components/ChallengeCardComponent';
import WeatherWarningComponent from '@/Components/WeatherWarningComponent';
import PermissionPopupComponent from '@/Components/PermissionPopupComponent';
import { navigate } from '@/Navigators/Root';
import axiosInstance from '@/Services';
import messaging from '@react-native-firebase/messaging';
import {
  requestMultiple,
  PERMISSIONS,
  checkMultiple,
  RESULTS,
} from 'react-native-permissions';

import HeaderContent from './HeaderContent';

function IndexChallengesContainer() {
  const { Fonts, Gutters, Layout, Colors } = useTheme();

  const isMounted = useRef(false);
  const challengeListRef = useRef();

  const internetStatus = useSelector((s) => s.internetStatus.item);

  const [allowNotification, setAllowNotification] = useState(true);
  const [allowCamera, setAllowCamera] = useState(true);
  const [allowLocation, setAllowLocation] = useState(true);

  const [permissionModalVisible, setPermissionModalVisible] = useState(false);

  const [challenges, setChallenges] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [loadChallenge, setLoadChallenge] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [showRetry, setShowRetry] = useState(false);

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isMounted.current = true;

    permissionChecking();
    getChallenges(true);
    getAnnouncement();

    return () => (isMounted.current = false);
  }, []);

  const permissionChecking = async () => {
    if (isMounted.current) {
      let count = 0;
      const authStatus = await messaging().requestPermission();
      if (authStatus < 1) {
        count++;
        setAllowNotification(false);
      }

      const statuses = await checkMultiple(
        Platform.OS === 'ios'
          ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]
          : [
              PERMISSIONS.ANDROID.CAMERA,
              PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ],
      ).catch((error) => {
        console.log('Error: ', error);
      });

      if (
        (Platform.OS === 'ios' &&
          (statuses[PERMISSIONS.IOS.CAMERA] === RESULTS.DENIED ||
            statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] ===
              RESULTS.DENIED)) ||
        (Platform.OS === 'android' &&
          (statuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.DENIED ||
            statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] ===
              RESULTS.DENIED))
      ) {
        requestPermission();
      } else if (
        (Platform.OS === 'ios' &&
          (statuses[PERMISSIONS.IOS.CAMERA] === RESULTS.BLOCKED ||
            statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] ===
              RESULTS.BLOCKED)) ||
        (Platform.OS === 'android' &&
          (statuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.BLOCKED ||
            statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] ===
              RESULTS.BLOCKED))
      ) {
        if (
          (Platform.OS === 'ios' &&
            statuses[PERMISSIONS.IOS.CAMERA] === RESULTS.BLOCKED) ||
          (Platform.OS === 'android' &&
            statuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.BLOCKED)
        ) {
          count++;
          setAllowCamera(false);
        }

        if (
          (Platform.OS === 'ios' &&
            statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] ===
              RESULTS.BLOCKED) ||
          (Platform.OS === 'android' &&
            statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] ===
              RESULTS.BLOCKED)
        ) {
          count++;
          setAllowLocation(false);
        }
      }

      if (count > 0) {
        setPermissionModalVisible(true);
      }
    }
  };

  const getChallenges = (refresh = false) => {
    let nextPage = refresh ? true : hasNextPage;
    let page = refresh ? 1 : pageNum;

    if (refresh && !!challenges.length) {
      if (isMounted.current) {
        setIsRefreshing(true);
      }
    }

    if (nextPage) {
      axiosInstance
        .get(`api/challenge-list?per_page=20&page=${pageNum}`)
        .then((res) => {
          if (isMounted.current) {
            let list = refresh
              ? res.data.data
              : challenges.concat(res.data.data);
            setChallenges(list);
            if (res.data.next_page_url) {
              setPageNum(page + 1);
              setHasNextPage(true);
              setLoadChallenge(true);
            } else {
              setPageNum(page);
              setHasNextPage(false);
              setLoadChallenge(false);
            }
            setIsRefreshing(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoadChallenge(false);
          setIsRefreshing(false);

          if (!internetStatus.isOnline) {
            setShowRetry(true);
          }
        });
    }
  };

  const requestPermission = () => {
    requestMultiple(
      Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]
        : [
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ],
    ).then((statuses) => {
      console.log(JSON.stringify(statuses));
    });
  };

  const getAnnouncement = () => {
    axiosInstance
      .get('api/announcement')
      .then((res) => {
        setAnnouncements(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <AppBarComponent title="Challenges" type="main" />
      <BackToTopButtonComponent
        onPress={() => {
          challengeListRef.current.scrollToIndex({
            index: 0,
            animated: true,
            viewOffset: 480 + 10,
          });
        }}
      />
      <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
        <FlatList
          ref={challengeListRef}
          showsVerticalScrollIndicator={false}
          extraData={challenges}
          data={challenges}
          refreshing={loadChallenge}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => {
                getChallenges(true);
                getAnnouncement();
              }}
              tintColor={Colors.primary}
            />
          }
          contentContainerStyle={[Gutters.regularBPadding]}
          ItemSeparatorComponent={() => <View height={15} />}
          ListHeaderComponent={() => (
            <View>
              <WeatherWarningComponent />
              <HeaderContent list={announcements} loadData={loading} />
            </View>
          )}
          ListEmptyComponent={() =>
            showRetry || !loadChallenge ? (
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
                  Sorry, we could not load any Challenge content at the moment
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
                      getChallenges(true);
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
            ) : null
          }
          ListFooterComponent={() =>
            loadChallenge && (
              <ActivityIndicator
                size="large"
                color={Colors.primary}
                style={Gutters.mediumVMargin}
              />
            )
          }
          renderItem={({ item }) => (
            <View style={Gutters.tinyHPadding}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigate('Challenge Detail', {
                    id: item.challenge_id,
                    screen_view: `Challenge/${item.challenge_id}/item.title`,
                  })
                }
                key={item.challenge_id}
              >
                <ChallengeCardComponent challengeData={item} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.challenge_id.toString()}
          onEndReached={() => getChallenges()}
          onEndReachedThreshold={0.7}
        />
        {permissionModalVisible ? (
          <PermissionPopupComponent
            visibility={permissionModalVisible}
            dismissModal={() => {
              setPermissionModalVisible(false);
            }}
            allowNotif={allowNotification}
            allowCam={allowCamera}
            allowLocation={allowLocation}
          />
        ) : null}
      </View>
    </View>
  );
}

export default IndexChallengesContainer;
