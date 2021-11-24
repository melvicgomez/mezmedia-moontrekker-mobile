import React from 'react';
import { View, Image } from 'react-native';
import { useTheme } from '@/Theme';
import AppBarComponent from '@/Components/AppBarComponent';

function IndexSponsorsContainer() {
  const { Layout, Colors } = useTheme();

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.white }]}>
      <AppBarComponent title="Sponsors" type="main" />
      <View flex={1}>
        <Image
          style={Layout.fullSize}
          source={{ uri: 'https://moontrekker.mezmedia.com/app/sponsor.png' }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

export default IndexSponsorsContainer;
