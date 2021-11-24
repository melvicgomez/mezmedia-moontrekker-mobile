import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axiosInstance from '@/Services';
import { useFocusEffect } from '@react-navigation/native';

import { useTheme } from '@/Theme';
import AnnouncementListComponent from '@/Components/AnnouncementListComponent';
import { navigate } from '@/Navigators/Root';

function HeaderContent({ list, loadData }) {
  const { Fonts, Gutters, Layout, Colors, Images } = useTheme();

  const [announcements, setAnnouncements] = useState(list);
  const [loading, setLoading] = useState(loadData);

  useEffect(() => {
    setAnnouncements(list);
  }, [list]);

  useEffect(() => {
    setLoading(loadData);
  }, [loadData]);

  return (
    <View>
      <View style={Gutters.tinyHPadding}>
        {loading ? (
          <View style={Layout.center} flex={1} marginTop={10} marginBottom={20}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : announcements.length ? (
          <AnnouncementListComponent list={announcements} />
        ) : null}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigate('Training', { screen_view: 'Training' })}
        >
          <View
            style={[
              Layout.row,
              Layout.alignItemsCenter,
              Gutters.smallHMargin,
              Gutters.regularBMargin,
              Gutters.mediumHPadding,
              Gutters.regularTPadding,
              Gutters.mediumBPadding,
              { backgroundColor: Colors.primary, borderRadius: 8 },
            ]}
          >
            <Image
              source={Images.navigation.trainingIcon}
              resizeMode="contain"
              style={[
                Gutters.regularRMargin,
                { height: 44, width: 59, resizeMode: 'contain' },
              ]}
            />
            <View flex={1}>
              <Text
                style={[Fonts.h3, Gutters.tinyBMargin, { color: Colors.white }]}
              >
                MOONTREKKER TRAINING
              </Text>
              <Text
                style={[
                  Fonts.bodyBold,
                  {
                    color: Colors.white,
                    flex: 1,
                    flexWrap: 'wrap',
                  },
                ]}
              >
                Tap here to start training on the MoonTrekker Trail
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={[Layout.center, Gutters.regularBMargin]}>
          <Text
            style={[
              Fonts.h3,
              {
                color: Colors.white,
              },
            ]}
          >
            CHALLENGES
          </Text>
        </View>
      </View>
    </View>
  );
}

export default React.memo(HeaderContent);
