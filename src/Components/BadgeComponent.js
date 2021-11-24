import React from 'react';
import { View, Image } from 'react-native';
import { useTheme } from '@/Theme';

function BadgeComponent({ point }) {
  const { Images } = useTheme();

  const getBadge = () => {
    const badgeProgress = [30, 60, 90, 120, 150];

    let rankIndex = 0;
    badgeProgress.forEach((progress, i) => {
      if (point > progress) {
        rankIndex = i;
      }
    });
    return rankIndex;
  };

  return (
    <View>
      {point > 20 && (
        <Image
          style={{
            width: 22,
            height: 22,
            resizeMode: 'contain',
          }}
          source={Images.badges[getBadge()]}
        />
      )}
    </View>
  );
}

export default BadgeComponent;
