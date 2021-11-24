import React from 'react';
import { View, Text, PixelRatio } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Config } from '@/Config';

import { useTheme } from '@/Theme';
import { RFValue } from 'react-native-responsive-fontsize';

function LeaderboardRankingHeaderComponent({
  type,
  category,
  corporate_id,
  logo_filename,
  mp_total,
}) {
  const { Fonts, Gutters, Layout, Colors, Images } = useTheme();
  return (
    <View>
      <View
        backgroundColor={Colors.background}
        style={[
          Layout.rowCenter,
          Gutters.smallVPadding,
          Gutters.smallHPadding,
          { borderBottomColor: Colors.yellow, borderBottomWidth: 2 },
        ]}
      >
        <View flex={2}>
          <Text style={[Fonts.h3, Fonts.yellowText, Fonts.textLeft]}>Rank</Text>
        </View>
        <View
          flex={type === 'race-times' ? 6 : 4}
          marginLeft={
            category === 'team' ||
            category === 'duo' ||
            category === 'corporate-team' ||
            category === 'corporate-cup'
              ? 0
              : 32
          }
        >
          <Text style={[Fonts.h3, Fonts.yellowText]}>Name</Text>
        </View>
        <View flex={type === 'race-times' ? 4 : 6}>
          <Text
            style={[
              Fonts.h3,
              Fonts.yellowText,
              Fonts.textRight,
              Gutters.smallRPadding,
            ]}
          >
            {category === 'corporate-team' || category === 'corporate-cup'
              ? 'Company'
              : type === 'race-times'
              ? 'Time'
              : 'MoonTrekker Pts'}
          </Text>
        </View>
      </View>
      {logo_filename && (
        <View
          style={[
            Layout.rowCenter,
            Layout.elevation,
            {
              marginTop: 10,
              marginBottom: 10,
              backgroundColor: Colors.white,
              justifyContent: 'space-between',
              borderRadius: 8,
              paddingHorizontal: 15,
              paddingVertical: 5,
            },
          ]}
        >
          <FastImage
            style={{
              height: 50,
              width: 100,
            }}
            source={{
              uri: `${Config.IMAGE_URL_PREFIX}corporate/${corporate_id}/${logo_filename}`,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={[Layout.row, Layout.alignItemsCenter]}>
            <Text style={[Fonts.bodyBold, Fonts.bodyText, Fonts.textRight]}>
              {mp_total || 0}
            </Text>
            <Text style={{ marginTop: 2 }}>
              {type !== 'race-times' && (
                <Images.MPIconPrimary
                  height={RFValue(14) / PixelRatio.getFontScale()}
                  fill={Colors.primary}
                />
              )}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

export default LeaderboardRankingHeaderComponent;
