import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, PixelRatio } from 'react-native';
import moment from 'moment';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from '@/Theme';
import BadgeComponent from '@/Components/BadgeComponent';

function SoloRowItemComponent({ data, type, index, prefix = 'main-row' }) {
  const { Fonts, Gutters, Layout, Colors, Images } = useTheme();
  const user = useSelector((state) => state.user.item);

  return (
    <View
      backgroundColor={
        data.user_id === user.user_id
          ? Colors.turqoise
          : prefix === 'main-row'
          ? Colors.background
          : Colors.grey
      }
      style={[Layout.rowCenter, Gutters.smallVPadding, Gutters.smallHPadding]}
    >
      <View flex={prefix === 'main-row' ? 2 : 1}>
        <Text
          numberOfLines={1}
          style={[
            Fonts.bodyBold,
            Fonts.whiteText,
            Gutters.smallRMargin,
            prefix === 'main-row' ? Fonts.textCenter : Fonts.textRight,
          ]}
        >
          {prefix === 'main-row'
            ? (type === 'race-times' && !data.total_time) ||
              (type !== 'race-times' && !data.mp_total)
              ? '#UR'
              : `#${index}`
            : `${index}.`}
        </Text>
      </View>
      <View flex={8} style={Layout.row}>
        <View style={{ width: 22 }}>
          <BadgeComponent point={data.mp_total || 0} />
        </View>
        <Text
          numberOfLines={1}
          style={[Fonts.bodyBold, Fonts.whiteText, { marginLeft: 8 }]}
        >{`${data.first_name} ${data.last_name}`}</Text>
      </View>
      <View flex={4} style={[Layout.rowVEnd, Layout.alignItemsCenter]}>
        <Text style={[Fonts.bodyBold, Fonts.whiteText, Fonts.textRight]}>
          {type === 'race-times'
            ? data.total_time
              ? moment()
                  .startOf('day')
                  .seconds(data.total_time || 0)
                  .format('H:mm:ss')
              : '-'
            : data.mp_total || 0}
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
  );
}

export default SoloRowItemComponent;
