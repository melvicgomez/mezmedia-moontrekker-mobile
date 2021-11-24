/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useTheme } from '@/Theme';
import { Icon, Input } from '@ui-kitten/components';

function TextInputComponent({
  label,
  placeholder,
  maxLength,
  value,
  onChangeText,
  keyboardType,
  style,
  onFocus,
  onBlur,
  secureTextEntry,
  type,
}) {
  const { Colors, Fonts, Gutters, Layout, Images } = useTheme();

  const [secureEntry, setSecureEntry] = useState(secureTextEntry);

  useEffect(() => {
    setSecureEntry(secureTextEntry);
  }, [secureTextEntry]);

  return (
    <View>
      {!!label && (
        <Text style={[Fonts.h3, Gutters.smallBMargin, { color: Colors.white }]}>
          {label}
        </Text>
      )}
      <ImageBackground
        source={Images.inputBG}
        resizeMode="stretch"
        style={[
          Layout.fullWidth,
          // Platform.OS === 'ios' && Layout.center,
          { height: 55 },
        ]}
      >
        {type === 'password' ? (
          <Input
            value={value}
            textStyle={{
              color: Colors.white,
              ...Fonts.bodyBold,
              ...Fonts.textCenter,
            }}
            clearTextOnFocus={false}
            style={[
              Fonts.bodyBold,
              Layout.center,
              Fonts.textCenter,
              {
                fontWeight: 'normal',
                color: Colors.white,
                backgroundColor: Colors.transparent,
                height: '90%',
                paddingLeft: 25,
                borderColor: Colors.transparent,
              },
              style,
            ]}
            placeholder={placeholder}
            placeholderTextColor={Colors.placeholderTextColor}
            accessoryRight={() => (
              <View>
                <TouchableOpacity
                  onPress={() => setSecureEntry((prevVal) => !prevVal)}
                >
                  <Icon
                    name={secureEntry ? 'eye-off-outline' : 'eye-outline'}
                    width={25}
                    height={25}
                    fill={Colors.white}
                  />
                </TouchableOpacity>
              </View>
            )}
            secureTextEntry={secureEntry}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        ) : maxLength ? (
          <TextInput
            style={[
              Fonts.bodyBold,
              Layout.center,
              Fonts.textCenter,
              {
                fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
                color: Colors.white,
                height: '100%',
                marginRight: type === 'password' ? 35 : 0,
              },
              style,
            ]}
            maxLength={maxLength}
            textAlign="center"
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor={Colors.placeholderTextColor}
            value={value}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
            secureTextEntry={secureEntry}
            autoCapitalize="characters"
          />
        ) : (
          <Input
            value={value}
            textStyle={{
              color: Colors.white,
              ...Fonts.bodyBold,
              ...Fonts.textCenter,
            }}
            clearTextOnFocus={false}
            style={[
              Fonts.bodyBold,
              Layout.center,
              Fonts.textCenter,
              {
                fontWeight: 'normal',
                color: Colors.white,
                backgroundColor: Colors.transparent,
                height: '90%',
                borderColor: Colors.transparent,
              },
              style,
            ]}
            placeholder={placeholder}
            placeholderTextColor={Colors.placeholderTextColor}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        )}
      </ImageBackground>
    </View>
  );
}

TextInputComponent.propTypes = {
  errorChecking: PropTypes.bool,
  keyboardType: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.string,
};

TextInputComponent.defaultProps = {
  label: '',
  keyboardType: 'default',
  style: {},
  onFocus: () => {},
  onBlur: () => {},
  secureTextEntry: false,
  maxLength: 0,
  type: 'text',
};

export default TextInputComponent;
