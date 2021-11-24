import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, PixelRatio, TouchableOpacity } from 'react-native';
import { navigate } from '@/Navigators/Root';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';

import { Config } from '@/Config';
import { useTheme } from '@/Theme';

function CorporateCupRowItemComponent({ data, type, index }) {
  const { Fonts, Gutters, Layout, Colors, Images } = useTheme();
  const user = useSelector((state) => state.user.item);
  const rowCorpId = user?.team?.corporate?.corporate_id;

  return (
    <View>
      <View style={{ marginBottom: 15, marginTop: index === 1 ? 10 : 0 }}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
            navigate('Corporate Cup Users', data);
          }}
        >
          <View
            style={[
              Layout.row,
              Layout.elevation,
              {
                borderColor:
                  data.corporate_id === rowCorpId
                    ? Colors.greyish
                    : Colors.white,
                borderWidth: 1,
                borderRadius: 8,
                overflow: 'hidden',
                backgroundColor:
                  data.corporate_id === rowCorpId
                    ? Colors.greyish
                    : Colors.background,
              },
            ]}
          >
            <View
              flex={1}
              style={[
                Layout.row,
                Gutters.regularVPadding,
                Gutters.regularHPadding,
              ]}
            >
              <View paddingRight={10}>
                <Text
                  numberOfLines={1}
                  style={[
                    Fonts.bodyBold,
                    Fonts.whiteText,
                    Fonts.textLeft,
                    { minWidth: 45 },
                  ]}
                >{`#${
                  (type === 'race-times' && !data.overall_total_time) ||
                  (type !== 'race-times' && !data.mp_overall_total)
                    ? 'UR'
                    : index
                }`}</Text>
              </View>
              <View flex={4}>
                <Text
                  style={[
                    Fonts.bodyBold,
                    Fonts.whiteText,
                    Fonts.textLeft,
                    { marginBottom: 2 },
                  ]}
                >
                  {data.business_name}
                </Text>
                <View style={Layout.rowHCenter}>
                  <Text
                    style={[Fonts.bodyBold, Fonts.whiteText, Fonts.textLeft]}
                  >
                    {type === 'race-times'
                      ? data.overall_total_time
                        ? moment()
                            .startOf('day')
                            .seconds(data.overall_total_time || 0)
                            .format('H:mm:ss')
                        : '-'
                      : data.mp_overall_total || 0}
                  </Text>
                  {type !== 'race-times' && (
                    <Images.MPIconPrimary
                      height={RFValue(14) / PixelRatio.getFontScale()}
                      style={{ marginTop: 2 }}
                      fill={Colors.primary}
                    />
                  )}
                </View>
              </View>
            </View>

            <FastImage
              style={{
                position: 'absolute',
                zIndex: 1,
                right: 10,
                width: 85,
                height: 72,
              }}
              source={{
                uri: `${Config.IMAGE_URL_PREFIX}corporate/${data.corporate_id}/${data.logo_filename}`,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Images.CorporateBg width={140} style={{ marginRight: -10 }} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CorporateCupRowItemComponent;
