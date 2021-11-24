import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@/Theme";
import { Icon, Text } from "@ui-kitten/components";
import { View } from "react-native";

function NoImagePlaceholder({ mode }) {
  const { Layout, Colors, Fonts } = useTheme();
  return (
    <View
      height="100%"
      style={[
        Layout.colCenter,
        {
          borderColor: Colors.white,
          overflow: "hidden",
          borderWidth: 2,
          borderTopEndRadius: 8,
          borderTopStartRadius: 8,
        },
      ]}
    >
      <Icon name="image" width={75} height={75} fill={Colors.white} />
      <Text style={[Fonts.h3Bold, { color: Colors.white }]}>
        No image available
      </Text>
    </View>
  );
}

NoImagePlaceholder.propTypes = {
  mode: PropTypes.oneOf(["light", "dark"]),
};

NoImagePlaceholder.defaultProps = {
  mode: "dark",
};

export default NoImagePlaceholder;
