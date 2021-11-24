import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
} from 'react-native';
import { useTheme } from '@/Theme';
import HTML from 'react-native-render-html';

import PrimaryButtonComponent from '@/Components/PrimaryButtonComponent';
import PhotoGalleryComponent from '@/Components/PhotoGalleryComponent';

function CheckpointTrailCardComponent({
  type,
  trail,
  requireButton,
  isStartPoint,
  isEndPoint,
  buttonAction, // required if requireButton = true
  openIssueScreen,
  disableQRScan,
  isSingleCheckpoint,
}) {
  const { Gutters, Layout, Colors, Fonts, Images } = useTheme();

  const [selectedImage, setSelectedImage] = useState(0);

  const updateDesc = (index) => {
    setSelectedImage(index);
  };

  useEffect(() => {
    setSelectedImage(0);
  }, [trail]);

  return (
    <TouchableOpacity activeOpacity={1}>
      {trail ? (
        <View
          style={[
            Gutters.mediumBMargin,
            {
              backgroundColor: Colors.white,
              borderRadius: 8,
            },
          ]}
        >
          <View
            style={[
              Layout.row,
              Layout.justifyContentBetween,
              Gutters.smallVPadding,
              Gutters.regularHPadding,
            ]}
          >
            <View flex={1}>
              <Text style={[Fonts.h3, { color: Colors.primary }]}>
                CHECKPOINT {trail.trail_index}
              </Text>
              <Text style={[Fonts.h3, { color: Colors.primary }]}>
                {trail.title.toUpperCase()}
              </Text>
            </View>
            <View
              style={[
                Layout.center,
                Gutters.smallLMargin,
                {
                  backgroundColor: Colors.darkGrey,
                  height: 45,
                  width: 45,
                  borderRadius: 50,
                },
              ]}
            >
              <Text style={[Fonts.h2, { color: Colors.white }]}>
                {trail.trail_index}
              </Text>
            </View>
          </View>
          <View>
            <PhotoGalleryComponent
              type={type}
              data={trail.images}
              updateDesc={updateDesc}
            />
          </View>
          <View
            style={[
              Gutters.mediumHPadding,
              Gutters.smallVPadding,
              Gutters.tinyTPadding,
            ]}
          >
            {trail?.images[selectedImage]?.description ? (
              <HTML
                baseFontStyle={{
                  ...Fonts.body,
                  ...{
                    color: Colors.bodyText,
                  },
                }}
                tagsStyles={{
                  a: {
                    color: Colors.primary,
                  },
                }}
                listsPrefixesRenderers={{
                  ul: () => {
                    return (
                      <Text
                        style={{
                          color: Colors.bodyText,
                          fontSize: 16 / PixelRatio.getFontScale(),
                          marginRight: 5,
                        }}
                      >
                        •
                      </Text>
                    );
                  },
                }}
                source={{ html: trail.images[selectedImage].description }}
                contentWidth={Dimensions.get('screen').width}
              />
            ) : null}
            {requireButton && (
              <>
                <PrimaryButtonComponent
                  disabled={disableQRScan}
                  onPress={buttonAction}
                  iconLeft={
                    <Image
                      source={
                        isStartPoint
                          ? Images.timingIconWhite
                          : isEndPoint || isSingleCheckpoint
                          ? Images.raceSymbol
                          : Images.flagIconGrey
                      }
                      resizeMode="contain"
                      style={[
                        Gutters.smallRMargin,
                        { height: 42, width: 37, resizeMode: 'contain' },
                      ]}
                    />
                  }
                  buttonColor={
                    disableQRScan
                      ? Colors.bodyText
                      : isStartPoint
                      ? Colors.green
                      : isEndPoint || isSingleCheckpoint
                      ? Colors.orange
                      : Colors.yellow
                  }
                  labelColor={
                    isStartPoint || isEndPoint ? Colors.white : Colors.bodyText
                  }
                  label={
                    isSingleCheckpoint
                      ? 'TAP TO SCAN QR CODE TO REDEEM REWARD'
                      : isStartPoint
                      ? `TAP TO SCAN QR CODE TO BEGIN ${type.toUpperCase()}`
                      : isEndPoint
                      ? 'TAP TO SCAN QR CODE AT FINAL CHECKPOINT'
                      : 'TAP TO SCAN QR CODE AT THIS CHECKPOINT'
                  }
                  innerStyle={{ paddingLeft: 30, paddingRight: 30 }}
                  labelStyle={Fonts.h3}
                  outerStyle={{
                    ...Gutters.regularBMargin,
                    marginTop: trail?.images[selectedImage]?.description
                      ? 5
                      : 10,
                  }}
                />
                {!isSingleCheckpoint ? (
                  <Text
                    style={[
                      Fonts.bodyLink,
                      Fonts.textUnderline,
                      Fonts.textCenter,
                      Gutters.smallHMargin,
                      Gutters.smallBMargin,
                      { color: Colors.bodyText },
                    ]}
                    onPress={openIssueScreen}
                  >
                    Help! I can’t scan or can’t find the QR Code
                  </Text>
                ) : null}
              </>
            )}
          </View>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

CheckpointTrailCardComponent.propTypes = {
  buttonAction: PropTypes.func,
  disableQRScan: PropTypes.bool,
  isEndPoint: PropTypes.bool,
  isSingleCheckpoint: PropTypes.bool,
  isStartPoint: PropTypes.bool,
  openIssueScreen: PropTypes.func,
  requireButton: PropTypes.bool,
  trail: PropTypes.object,
  type: PropTypes.string,
};

CheckpointTrailCardComponent.defaultProps = {
  trail: null,
  requireButton: false,
  isStartPoint: false,
  isEndPoint: false,
  buttonAction: () => {},
  type: 'challenge',
  openIssueScreen: () => {},
  disableQRScan: false,
  isSingleCheckpoint: false,
};

export default CheckpointTrailCardComponent;
