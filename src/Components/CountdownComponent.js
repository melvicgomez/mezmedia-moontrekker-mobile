import React, { useState, useEffect, useRef } from 'react';
import { View, PixelRatio, Text, Modal, AppState } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from '@/Theme';

function CountdownComponent({ visibility, dismissModal }) {
  const { Fonts, Gutters, Layout, Colors } = useTheme();

  const [count, setCount] = useState(10);

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    let tempCount = 10;

    const timer = setInterval(() => {
      setCount((preVal) => preVal - 1);
      tempCount -= 1;

      if (tempCount <= 0) {
        clearInterval(timer);
        setTimeout(() => {
          dismissModal();
        }, 500);
      }
    }, 1000);

    const handleAppStateChange = async (nextAppState) => {
      appState.current = nextAppState;

      if (appState.current.match(/inactive|background/)) {
        clearInterval(timer);
        dismissModal();
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visibility}
      onRequestClose={() => {
        console.log('Action modal has been closed.');
      }}
    >
      <View
        style={[
          Layout.fill,
          Layout.center,
          Gutters.largeHPadding,
          Gutters.largeBPadding,
          { backgroundColor: Colors.primary },
        ]}
      >
        {count > 0 ? (
          <>
            <Text
              style={[
                Fonts.h1,
                Fonts.textCenter,
                {
                  fontSize: RFValue(23) / PixelRatio.getFontScale(),
                  color: Colors.white,
                  marginBottom: -20,
                },
              ]}
            >
              GET READY...
            </Text>
            <Text
              style={[
                Fonts.h1,
                {
                  fontSize: RFValue(150) / PixelRatio.getFontScale(),
                  color: Colors.white,
                },
              ]}
            >
              {count}
            </Text>
          </>
        ) : (
          <View style={[Gutters.largeBMargin, Gutters.mediumTMargin]}>
            <Text
              style={[
                Fonts.h1,
                Fonts.textCenter,
                Gutters.mediumTMargin,
                {
                  fontSize: RFValue(50) / PixelRatio.getFontScale(),
                  color: Colors.white,
                },
              ]}
            >
              START
            </Text>
            <Text
              style={[
                Fonts.h1,
                Fonts.textCenter,
                {
                  fontSize: RFValue(50) / PixelRatio.getFontScale(),
                  color: Colors.white,
                },
              ]}
            >
              RUNNING!
            </Text>
          </View>
        )}

        <Text
          style={[
            Fonts.bodyBold,
            Fonts.textCenter,
            {
              color: Colors.white,
            },
          ]}
        >
          Leave the app running, you can lock your phone but do not quit the app
          or your challenge will be incomplete
        </Text>
      </View>
    </Modal>
  );
}

export default CountdownComponent;
