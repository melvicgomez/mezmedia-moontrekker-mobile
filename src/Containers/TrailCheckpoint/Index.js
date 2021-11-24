import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  PixelRatio,
  Image,
} from 'react-native';
import { Config } from '@/Config';
import { useTheme } from '@/Theme';
import AppBarComponent from '@/Components/AppBarComponent';
import CheckpointTrailCardComponent from '@/Components/CheckpointTrailCardComponent';
import { useSelector } from 'react-redux';
import HTML from 'react-native-render-html';

import { OfflineImage } from '@/Components/react-native-image-offline';

function IndexTrailCheckpointContainer({ route }) {
  const { Fonts, Gutters, Layout, Colors, Images } = useTheme();
  const { type } = route.params;

  const internetStatus = useSelector((s) => s.internetStatus.item);

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageOffline, setImageOffline] = useState('');

  const trainingData = useSelector((state) => state.training.item);
  const raceData = useSelector((state) => state.race.item);
  const challengeData = useSelector((state) => state.challenge.item);

  useEffect(() => {
    setChallenge(
      type === 'training'
        ? trainingData
        : type === 'race'
        ? raceData
        : challengeData,
    );
    let timer = setTimeout(() => setLoading(false), 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
      <AppBarComponent
        title={type === 'race' ? 'Race' : 'Checkpoints'}
        type={type === 'race' ? 'race' : 'main'}
        displayBack={true}
        displayMenu={false}
        showPoint={type === 'race' ? false : true}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={Gutters.largeVMargin}
        />
      ) : (
        <ScrollView
          bounces={false}
          style={Layout.fill}
          contentContainerStyle={[
            Gutters.mediumTPadding,
            Gutters.regularHPadding,
          ]}
        >
          <Text
            style={[
              Fonts.h2,
              Fonts.textCenter,
              Gutters.smallHMargin,
              {
                color: Colors.white,
              },
            ]}
          >
            {type === 'race' || type === 'training'
              ? 'MOONTREKKER TRAIL'
              : challenge.title.toUpperCase()}
          </Text>
          {!!challenge.checkpoint_preview_image && (
            <>
              <View
                style={{
                  display: 'none',
                }}
              >
                <OfflineImage
                  key={`${Config.IMAGE_URL_PREFIX}challenge/${challenge.challenge_id}/${challenge.checkpoint_preview_image}`}
                  reloadImage={true}
                  source={{
                    uri: `${Config.IMAGE_URL_PREFIX}challenge/${challenge.challenge_id}/${challenge.checkpoint_preview_image}`,
                  }}
                  getImage={(uri) => {
                    setImageOffline(uri);
                  }}
                />
              </View>
              <Image
                source={
                  internetStatus.isOnline
                    ? {
                        uri: `${Config.IMAGE_URL_PREFIX}challenge/${challenge.challenge_id}/${challenge.checkpoint_preview_image}`,
                      }
                    : imageOffline
                    ? { uri: 'file://' + imageOffline }
                    : Images.imagePlaceholder
                }
                style={[
                  Gutters.regularTMargin,
                  Gutters.mediumBMargin,
                  Gutters.tinyHMargin,
                  // Layout.fullWidth,
                  {
                    height: 220,
                  },
                ]}
                resizeMode="contain"
              />
            </>
          )}
          {!!challenge.trail_overview_html && (
            <View style={[Gutters.regularHPadding, Gutters.smallTPadding]}>
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
                source={{ html: challenge.trail_overview_html }}
                contentWidth={Dimensions.get('screen').width}
                // onLinkPress={(e, href, htmlAttribs) => {
                //   // to webview
                // }}
              />
            </View>
          )}
          <Text
            style={[
              Fonts.h2,
              Fonts.textCenter,
              Gutters.regularBMargin,
              Gutters.smallHMargin,
              Gutters.regularTMargin,
              {
                color: Colors.white,
              },
            ]}
          >
            ABOUT THE CHECKPOINTS
          </Text>
          {challenge.trails.map((trail, i) => (
            <CheckpointTrailCardComponent key={i} trail={trail} type={type} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

export default IndexTrailCheckpointContainer;
