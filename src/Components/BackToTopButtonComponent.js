import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@/Theme';
import { Icon } from '@ui-kitten/components';

function BackToTopButtonComponent({ onPress }) {
  const { Colors, Layout } = useTheme();
  return (
    <View
      style={[
        Layout.rowCenter,
        Layout.justifyContentEnd,
        {
          position: 'absolute',
          zIndex: 5,
          width: '100%',
          bottom: 10,
          right: 16,
        },
      ]}
    >
      <TouchableOpacity onPress={() => onPress()} activeOpacity={0.8}>
        <View
          backgroundColor={Colors.primary}
          style={[
            Layout.elevation3,
            {
              borderRadius: 8,
              padding: 4,
            },
          ]}
        >
          <Icon
            name="arrow-ios-upward-outline"
            width={28}
            height={28}
            fill={Colors.white}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default BackToTopButtonComponent;
