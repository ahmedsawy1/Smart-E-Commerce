import {
  I18nManager,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
  Text,
} from 'react-native';
import React, {FC} from 'react';
import {EyeIcon} from '../../assets/svg/icons';
import Colors, {
  ColorWithOpacity,
  Fonts,
  PixelPerfect,
} from '../../styles/stylesConstants';

interface IMainInput {
  placeholder?: string;
  multiline?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: any;
  inputRef?: any;
  style?: StyleProp<ViewStyle>;
  styleInput?: StyleProp<TextStyle>;
  mainIcon?: boolean | JSX.Element;
  endIcon?: boolean | JSX.Element;
  value?: string;
  onChangeText: (param: string) => void;
  onEyePress?: () => void;
  underlineColorAndroid?: string;
  showError?: boolean;
  errorText?: string;
}

const MainInput: FC<IMainInput> = ({
  style,
  mainIcon,
  endIcon,
  placeholder,
  styleInput,
  onChangeText,
  secureTextEntry,
  onEyePress,
  errorText = '',
  inputRef,
  ...otherProps
}) => {
  return (
    <>
      <View
        style={[
          styles.con,
          {
            borderColor: errorText == '' ? '#E5E5E5' : 'red',
          },
          style,
        ]}>
        {mainIcon && <View style={styles.iconsCon}>{mainIcon}</View>}
        <View style={{flex: 6, flexDirection: 'row'}}>
          <View style={styles.inputCon}>
            <TextInput
              ref={inputRef}
              placeholder={placeholder}
              style={[styles.input, styleInput, {}]}
              placeholderTextColor={ColorWithOpacity('#0D0E10', 0.5)}
              onChangeText={onChangeText}
              secureTextEntry={secureTextEntry}
              returnKeyType={'next'}
              {...otherProps}
            />
          </View>

          {/* Use this line if you want to use ediffrent end icons */}
          {/* {endIcon && <View style={styles.iconsCon}>{endIcon}</View>} */}
          {endIcon && (
            <Pressable style={styles.iconsCon} onPress={onEyePress}>
              <EyeIcon />
            </Pressable>
          )}
        </View>
      </View>
      {errorText != '' && <Text style={styles.errorText}>{errorText}</Text>}
    </>
  );
};

export default MainInput;

const styles = StyleSheet.create({
  con: {
    height: PixelPerfect(100),
    width: '100%',
    flexDirection: 'row',
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  iconsCon: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputCon: {
    flex: 5,
    alignItems: 'flex-start',
  },
  input: {
    fontFamily: Fonts.Regular,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    width: '100%',
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    fontSize: PixelPerfect(30),
    padding: 0,
    color: Colors.black,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginTop: -10,
    marginBottom: 10,
    fontFamily: Fonts.Regular,
  },
});
