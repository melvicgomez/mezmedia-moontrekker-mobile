import React from 'react';
import { View, Image } from 'react-native';
import { useTheme } from '@/Theme';
import { Text } from '@ui-kitten/components';

function MoontrekkerPointComponent({
  pointValue = 0,
  style = {},
  textStyle = {},
}) {
  const { Gutters, Colors, Images, Fonts } = useTheme();
  return (
    <View
      flexDirection="row"
      alignItems="center"
      alignSelf="center"
      style={[
        Gutters.regularLPadding,
        Gutters.smallRPadding,
        Gutters.tinyVPadding,
        {
          borderRadius: 8,
          backgroundColor: Colors.white,
        },
        style,
      ]}
    >
      <Text
        style={[
          Fonts.bodyBold,
          Gutters.tinyLMargin,
          { color: Colors.primary },
          textStyle,
        ]}
      >
        {`${pointValue || 0}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Text>
      <Image
        source={Images.pointIcon}
        style={[
          Gutters.tinyLMargin,
          {
            width: 19,
            height: 19,
          },
        ]}
      />
    </View>
  );
}

export default MoontrekkerPointComponent;
