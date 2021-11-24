import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  Dimensions,
  PixelRatio,
  ActivityIndicator,
} from 'react-native';
import { Config } from '@/Config';
import { useTheme } from '@/Theme';
import AppBarComponent from '@/Components/AppBarComponent';
import NoImagePlaceholder from '@/Components/NoImagePlaceholder';
import HTML from 'react-native-render-html';
import axiosInstance from '@/Services';

function IndexAnnouncementContainer({ route }) {
  const { Fonts, Gutters, Layout, Colors } = useTheme();

  const { announcementId } = route.params;

  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (announcement) {
      setLoading(false);
    } else {
      axiosInstance
        .get(`api/announcement/${announcementId}`)
        .then((res) => {
          setAnnouncement(res.data.data);
        })
        .catch((e) => console.log(e));
    }
  }, [announcement]);

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <AppBarComponent title="Challenges" type="main" displayBack={true} />
      <ScrollView
        bounces={false}
        style={[Layout.fill, { backgroundColor: Colors.background }]}
        contentContainerStyle={[Gutters.regularVPadding]}
      >
        {loading ? (
          <View style={Layout.center} flex={1} marginTop={50}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : (
          <View
            style={[
              Gutters.regularHMargin,
              Gutters.regularBMargin,
              {
                borderRadius: 8,
              },
            ]}
          >
            <View height={190}>
              {announcement.cover_image ? (
                <Image
                  source={{
                    uri: `${Config.IMAGE_URL_PREFIX}announcement/${announcement.announcement_id}/${announcement.cover_image}`,
                  }}
                  resizeMode="cover"
                  style={[
                    Layout.fullSize,
                    {
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    },
                  ]}
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
            </View>
            <View style={[Gutters.regularTPadding, Gutters.regularHPadding]}>
              <Text
                style={[
                  Fonts.h3,
                  {
                    color: Colors.primary,
                    lineHeight: 22 / PixelRatio.getFontScale(),
                  },
                ]}
              >
                {announcement.title}
              </Text>
              <HTML
                baseFontStyle={{
                  ...Fonts.body,
                  ...Gutters.smallTMargin,
                  ...{
                    color: Colors.white,
                    lineHeight: 22 / PixelRatio.getFontScale(),
                  },
                }}
                tagsStyles={{
                  a: {
                    color: Colors.primary,
                  },
                }}
                listsPrefixesRenderers={{
                  ul: () => {
                    return (
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: 16 / PixelRatio.getFontScale(),
                          marginRight: 5,
                        }}
                      >
                        •
                      </Text>
                    );
                  },
                }}
                source={{ html: announcement.html_content }}
                contentWidth={Dimensions.get('screen').width}
                // onLinkPress={(e, href, htmlAttribs) => {
                //   navigate("Video Player", {
                //     screen_view: "Video Player",
                //     href, //href is required
                //   });
                // }}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default IndexAnnouncementContainer;
