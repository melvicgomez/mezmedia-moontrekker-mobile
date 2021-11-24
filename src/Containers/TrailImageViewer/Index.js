import React, { useState } from 'react';
import { View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useTheme } from '@/Theme';
import { Icon } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

import { OfflineImage } from '@/Components/react-native-image-offline';

function IndexTrailImageViewerContainer({ navigation, route }) {
  const { Layout, Colors, Images } = useTheme();

  const internetStatus = useSelector((s) => s.internetStatus.item);

  const { uri } = route.params;
  const [imageOffline, setImageOffline] = useState(uri);

  return (
    <View
      style={[
        Layout.center,
        {
          flex: 1,
          backgroundColor: Colors.background,
        },
      ]}
    >
      <View position="absolute" right={10} top={10} zIndex={1}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="close-outline"
            width={35}
            height={40}
            fill={Colors.white}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            display: 'none',
          }}
        >
          <OfflineImage
            key={uri}
            resizeMode="contain"
            reloadImage={true}
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height,
            }}
            source={{
              uri: uri,
            }}
            getImage={(url) => setImageOffline(url)}
          />
        </View>
        <ReactNativeZoomableView
          maxZoom={1.5}
          minZoom={0.5}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders={true}
          style={{
            padding: 10,
            backgroundColor: Colors.background,
          }}
        >
          <Image
            source={
              internetStatus.isOnline
                ? { uri: uri }
                : imageOffline
                ? { uri: 'file://' + imageOffline }
                : Images.imagePlaceholder
            }
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height,
              resizeMode: 'contain',
            }}
            defaultSource={Images.imagePlaceholder}
          />
        </ReactNativeZoomableView>
      </View>
    </View>
  );
}

export default IndexTrailImageViewerContainer;
