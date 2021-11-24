/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@ui-kitten/components';
import { View, StatusBar, TouchableOpacity, Modal, Text } from 'react-native';
import { useTheme } from '@/Theme';

function CheckpointScanToastComponent({
  visibility,
  dismissModal,
  checkpoint,
  nextCheckpoint,
  type,
}) {
  const { Layout, Gutters, Fonts, Colors } = useTheme();

  // useEffect(() => {
  //   if (visibility) {
  //     setTimeout(() => {
  //       dismissModal();
  //     }, 3500);
  //   }
  // }, [visibility]);

  useEffect(() => {
    if (visibility) {
      StatusBar.setHidden(true);
    }
    return () => {
      StatusBar.setHidden(false);
    };
  }, [visibility]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visibility}
      statusBarTranslucent={false}
      onRequestClose={() => {
        console.log('Action modal has been closed.');
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: Colors.backdrop,
        }}
        activeOpacity={1}
        onPress={dismissModal}
      >
        <View
          style={[
            Gutters.mediumBPadding,
            Gutters.mediumHPadding,
            Layout.center,
            {
              paddingTop: 35,
              backgroundColor: Colors.turqoise,
            },
          ]}
        >
          <View position="absolute" top={5} right={5} padding={10}>
            <TouchableOpacity onPress={dismissModal}>
              <Icon name="close" width={35} height={35} fill={Colors.white} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <Text
              style={[
                Fonts.h2,
                Fonts.textCenter,
                Gutters.tinyHMargin,
                Gutters.regularTPadding,
                { color: Colors.white },
              ]}
            >
              Checkpoint {checkpoint?.trail_index} {checkpoint?.title}{' '}
              Successfully Scanned!
            </Text>
            <View style={Gutters.mediumVMargin}>
              {type === 'training' || type === 'challenge_training' ? (
                <Text
                  style={[Fonts.h3, Fonts.textCenter, { color: Colors.white }]}
                >
                  Your next checkpoint is
                  {nextCheckpoint.length > 1 ? ' either' : ''} Checkpoint{' '}
                  {nextCheckpoint[0]?.trail_index} {nextCheckpoint[0]?.title}
                  {nextCheckpoint.length > 1
                    ? ` or Checkpoint ${nextCheckpoint[1]?.trail_index} ${nextCheckpoint[1]?.title}`
                    : ''}
                </Text>
              ) : (
                <Text
                  style={[Fonts.h3, Fonts.textCenter, { color: Colors.white }]}
                >
                  Your next checkpoint is Checkpoint{' '}
                  {nextCheckpoint[0]?.trail_index} {nextCheckpoint[0]?.title}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

CheckpointScanToastComponent.propTypes = {
  checkpoint: PropTypes.object,
  dismissModal: PropTypes.func,
  nextCheckpoint: PropTypes.array,
  type: PropTypes.string,
  visibility: PropTypes.bool,
};

export default CheckpointScanToastComponent;
