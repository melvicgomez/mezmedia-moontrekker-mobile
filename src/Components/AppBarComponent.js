/* eslint-disable react/sort-prop-types */
/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import { Image, Text, View, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { useTheme } from '@/Theme';
import { useNavigation } from '@react-navigation/native';
import MoontrekkerPointComponent from '@/Components/MoontrekkerPointComponent';
import { useSelector, useDispatch } from 'react-redux';
import GetPoint from '@/Store/MoontrekkerPoint/GetMoontrekkerPoint';
/*
  type:
    - main: cyan background, text align left, showing menu/back button
    - race: checker background, text align center
    - any other: transparent background, text align center

  displayMenu: show/hide burger menu icon (default: true)
  displayBack: show/hide back button (default: false)
  showPoint: show Moontrekker Point
*/

function AppBarComponent({ title, type, showPoint, displayMenu, displayBack }) {
  const { Colors, Images, Gutters, Fonts, Layout } = useTheme();
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const point = useSelector((state) => state.moontrekkerPoint.item);
  const user = useSelector((state) => state.user.item);

  useEffect(() => {
    dispatch(GetPoint.action({ user_id: user.user_id, oldData: point }));
  }, []);

  const LeftMenuAction = () => (
    <View style={[Layout.rowHCenter, { marginLeft: -10 }]}>
      <TopNavigationAction
        icon={() =>
          displayBack ? (
            <View
              style={[
                Layout.center,
                Gutters.smallLPadding,
                Gutters.regularRPadding,
                { height: type === 'main' ? 50 : 30 },
              ]}
            >
              <Icon
                name="arrow-back-outline"
                width={30}
                height={35}
                fill={Colors.white}
              />
            </View>
          ) : displayMenu ? (
            <View
              style={[
                Layout.center,
                Gutters.smallLPadding,
                Gutters.regularRPadding,
                {
                  height: type === 'main' ? 50 : 30,
                },
              ]}
            >
              <Image
                style={{
                  width: 30,
                  height: 23,
                }}
                source={Images.menuIcon}
              />
            </View>
          ) : null
        }
        onPress={() => {
          displayBack
            ? navigation.goBack()
            : displayMenu
            ? navigation.toggleDrawer()
            : null;
        }}
      />
    </View>
  );

  const RightMenuAction = () => (
    <View>
      {Object.keys(user).length ? (
        <MoontrekkerPointComponent
          pointValue={point}
          style={[
            Gutters.smallRMargin,
            Gutters.smallVMargin,
            Fonts.h2,
            Gutters.tinyVPadding,
          ]}
          textStyle={Fonts.h3}
        />
      ) : null}
    </View>
  );

  const renderTitle = () =>
    type === 'main' ? (
      <View style={Layout.row}>
        <Text
          numberOfLines={1}
          style={[
            Fonts.h2,
            { color: Colors.white, marginLeft: -10, flex: 1, paddingRight: 5 },
          ]}
        >
          {title.toUpperCase()}
        </Text>
      </View>
    ) : (
      <View style={Layout.row}>
        {type === 'race' && (
          <Images.RaceFlagIcon height={23} style={{ marginRight: 5 }} />
        )}
        <Text
          style={[
            Fonts.h3,
            {
              color: Colors.white,
            },
          ]}
        >
          {title.toUpperCase()}
        </Text>
      </View>
    );

  return (
    <ImageBackground
      source={type === 'race' ? Images.checkerBG : null}
      style={[Layout.fullWidth]}
      resizeMode="cover"
    >
      <TopNavigation
        accessoryLeft={() => LeftMenuAction()}
        accessoryRight={showPoint ? () => RightMenuAction() : null}
        title={renderTitle}
        alignment={type === 'main' ? 'start' : 'center'}
        style={[
          Fonts.h3,
          type !== 'main' && Gutters.tinyVMargin,
          {
            color: Colors.white,
            backgroundColor:
              type === 'main' ? Colors.primary : Colors.transparent,
          },
        ]}
      />
    </ImageBackground>
  );
}

AppBarComponent.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  showPoint: PropTypes.bool,
  displayMenu: PropTypes.bool,
  displayBack: PropTypes.bool,
};

AppBarComponent.defaultProps = {
  type: 'main',
  showPoint: true,
  displayMenu: true,
  displayBack: false,
};

export default AppBarComponent;
