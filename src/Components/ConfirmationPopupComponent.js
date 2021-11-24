import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Modal, PixelRatio } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { useTheme } from '@/Theme';
import PrimaryButtonComponent from '@/Components/PrimaryButtonComponent';

function ConfirmationPopupComponent({
  title,
  message,
  note,
  dismissModal,
  visibility,
  actionRequired,
  leftAction,
  leftLabel,
  rightAction,
  rightLabel,
  singleButton,
}) {
  const { Gutters, Layout, Colors, Fonts } = useTheme();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visibility}
      onRequestClose={() => {
        console.log('Action modal has been closed.');
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
        onPress={dismissModal}
      >
        <View
          paddingTop={50}
          paddingBottom={45}
          style={[
            Gutters.largeHPadding,
            {
              backgroundColor: Colors.white,
              borderRadius: 8,
              width: '90%',
            },
          ]}
        >
          <View position="absolute" right={0} padding={10}>
            <TouchableOpacity onPress={dismissModal}>
              <Icon
                name="close"
                width={35}
                height={35}
                fill={Colors.bodyText}
              />
            </TouchableOpacity>
          </View>
          <View style={Gutters.smallHPadding}>
            {title ? (
              <Text
                style={[
                  Fonts.textCenter,
                  Fonts.h3,
                  Gutters.regularBMargin,
                  {
                    color: Colors.bodyText,
                    lineHeight: 22 / PixelRatio.getFontScale(),
                  },
                ]}
              >
                {title}
              </Text>
            ) : null}
            <Text
              style={[
                Fonts.textCenter,
                Fonts.body,
                {
                  color: Colors.bodyText,
                  lineHeight: 22 / PixelRatio.getFontScale(),
                },
              ]}
            >
              {message}
            </Text>
            {!!note && (
              <Text
                style={[
                  Fonts.textCenter,
                  Fonts.body,
                  Gutters.regularTMargin,
                  {
                    color: Colors.bodyText,
                    lineHeight: 22 / PixelRatio.getFontScale(),
                  },
                ]}
              >
                {note}
              </Text>
            )}
          </View>
          {actionRequired ? (
            singleButton ? (
              <View
                flexDirection="row"
                style={[Layout.center, Gutters.mediumTMargin]}
              >
                <PrimaryButtonComponent
                  label={rightLabel}
                  loading={false}
                  onPress={rightAction}
                  labelStyle={Fonts.bodyBold}
                  outerStyle={{
                    width: '80%',
                  }}
                />
              </View>
            ) : (
              <View
                flexDirection="row"
                style={[Layout.center, Gutters.mediumTMargin]}
              >
                <PrimaryButtonComponent
                  label={leftLabel}
                  loading={false}
                  onPress={leftAction}
                  labelStyle={Fonts.bodyBold}
                  outerStyle={{
                    width: '35%',
                    marginRight: 10,
                  }}
                />
                <PrimaryButtonComponent
                  label={rightLabel}
                  loading={false}
                  onPress={rightAction}
                  labelStyle={Fonts.bodyBold}
                  outerStyle={{
                    width: '35%',
                    marginLeft: 10,
                  }}
                />
              </View>
            )
          ) : null}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

ConfirmationPopupComponent.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  note: PropTypes.string,
  dismissModal: PropTypes.func,
  visibility: PropTypes.bool,
  actionRequired: PropTypes.bool,
  leftAction: PropTypes.func,
  leftLabel: PropTypes.string,
  rightAction: PropTypes.func,
  rightLabel: PropTypes.string,
  singleButton: PropTypes.bool,
};

ConfirmationPopupComponent.defaultProps = {
  actionRequired: true,
  note: '',
  leftLabel: 'Yes',
  rightLabel: 'No',
  singleButton: false,
};

export default ConfirmationPopupComponent;
