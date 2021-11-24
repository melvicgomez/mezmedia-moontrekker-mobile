/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@/Theme';

function LoadingOverlayComponent({ visibility }) {
  const { Layout, Colors } = useTheme();

  const [modalVisible, setModalVisible] = useState(visibility);
  useEffect(() => {
    setModalVisible(visibility);
  }, [visibility]);

  return modalVisible ? (
    <View
      position="absolute"
      flex={1}
      style={{
        backgroundColor: Colors.transparent,
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
      }}
    >
      <TouchableOpacity
        style={[
          Layout.center,
          {
            flex: 1,
            backgroundColor: Colors.backdrop,
          },
        ]}
        activeOpacity={1}
      >
        <View
          style={{
            backgroundColor: Colors.transparent,
          }}
        >
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </TouchableOpacity>
    </View>
  ) : null;
}

LoadingOverlayComponent.propTypes = {
  visibility: PropTypes.bool,
};

export default LoadingOverlayComponent;
