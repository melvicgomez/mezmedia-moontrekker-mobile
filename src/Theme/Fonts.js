/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet, PixelRatio, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({ FontSize, Colors }) {
  return StyleSheet.create({
    textSmall: {
      fontSize: FontSize.small,
      color: Colors.text,
    },
    textRegular: {
      fontSize: FontSize.regular,
      color: Colors.text,
    },
    textMedium: {
      fontSize: FontSize.medium,
      color: Colors.text,
    },
    textLarge: {
      fontSize: FontSize.large,
      color: Colors.text,
    },
    titleSmall: {
      fontSize: FontSize.small * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleRegular: {
      fontSize: FontSize.regular * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleLarge: {
      fontSize: FontSize.large * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
    textUnderline: {
      textDecorationLine: 'underline',
    },

    h1: {
      fontFamily: 'Montserrat-Bold',
      fontSize: RFValue(21) / PixelRatio.getFontScale(),
      fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
    },
    h2: {
      fontFamily: 'Montserrat-Bold',
      fontSize: RFValue(18) / PixelRatio.getFontScale(),
      fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
    },
    h3: {
      fontFamily: 'Montserrat-Bold',
      fontSize: RFValue(14) / PixelRatio.getFontScale(),
      fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
    },
    body: {
      fontFamily: 'Montserrat-Regular',
      fontSize: RFValue(12) / PixelRatio.getFontScale(),
    },
    bodyLink: {
      fontFamily: 'Montserrat-Regular',
      fontSize: RFValue(12) / PixelRatio.getFontScale(),
      textDecorationLine: 'underline',
    },
    bodyBold: {
      fontFamily: 'Montserrat-Bold',
      fontSize: RFValue(12) / PixelRatio.getFontScale(),
      fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
    },
    caption: {
      fontFamily: 'Montserrat-Regular',
      fontSize: RFValue(10) / PixelRatio.getFontScale(),
    },
    captionBold: {
      fontFamily: 'Montserrat-Bold',
      fontSize: RFValue(10) / PixelRatio.getFontScale(),
      fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
    },
    bodyText: { color: Colors.bodyText },
    whiteText: { color: Colors.white },
    yellowText: { color: Colors.yellow },
  });
}
