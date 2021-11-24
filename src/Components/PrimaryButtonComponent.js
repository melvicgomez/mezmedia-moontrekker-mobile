/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  ActivityIndicator,
  Keyboard,
  TouchableHighlight,
} from 'react-native';
import { Text } from '@ui-kitten/components';
import { useTheme } from '@/Theme';

function PrimaryButtonComponent({
  onPress,
  label,
  loading,
  outerStyle,
  innerStyle,
  labelStyle,
  iconLeft,
  disabled,
  buttonColor,
  labelColor,
}) {
  const { Fonts, Gutters, Layout, Colors } = useTheme();
  return (
    <View style={[Gutters.tinyBMargin, outerStyle]}>
      <TouchableHighlight
        activeOpacity={!disabled ? 0.8 : 1}
        onPress={
          disabled
            ? null
            : !loading
            ? () => {
                onPress();
                Keyboard.dismiss();
              }
            : null
        }
        style={{
          borderRadius: 8,
        }}
        underlayColor={buttonColor || Colors.primary}
      >
        <View
          style={[
            Layout.rowCenter,
            Layout.buttonBorderRadius,
            Layout.elevation,
            {
              backgroundColor: buttonColor || Colors.primary,
              borderRadius: 8,
              padding: 18,
            },
            Gutters.mediumHPadding,
            iconLeft && !loading
              ? Gutters.smallRPadding
              : Gutters.mediumHPadding,
            innerStyle,
          ]}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              color={Colors.white}
              style={Gutters.tinyRMargin}
            />
          ) : null}
          {iconLeft && !loading ? iconLeft : null}
          <Text
            style={[
              Fonts.h3,
              Fonts.textCenter,
              { color: labelColor, flex: 1 },
              labelStyle,
            ]}
          >
            {label || 'Submit'}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

PrimaryButtonComponent.propTypes = {
  buttonColor: PropTypes.string,
  disabled: PropTypes.bool,
  iconLeft: PropTypes.any,
  innerStyle: PropTypes.object,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  labelStyle: PropTypes.object,
  loading: PropTypes.bool,
  onPress: PropTypes.func,
  outerStyle: PropTypes.object,
};

PrimaryButtonComponent.defaultProps = {
  loading: false,
  disabled: false,
  labelStyle: {},
  labelColor: '#ffffff',
};

export default PrimaryButtonComponent;
