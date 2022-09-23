import React, {FC} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Colors, {Fonts, PixelPerfect} from '../../styles/stylesConstants';
import LinearGradient from 'react-native-linear-gradient';

interface IButton {
  title: string;
  style?: StyleProp<ViewStyle>;
  linearStyle?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
  onPress?: () => void;
  isLinear?: boolean;
  loading?: boolean;
  hasIcon?: boolean | JSX.Element | JSX.Element[];
  styleTitleCon?: StyleProp<TextStyle>;
}

const ColoredButton: FC<IButton> = ({
  style,
  styleTitle,
  title,
  isLinear = false,
  onPress,
  linearStyle,
  hasIcon,
  styleTitleCon,
  loading,
}) => {
  return (
    <Pressable onPress={onPress} style={[styles.con, style]}>
      {/* {isLinear ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#ae7513', '#d5b745']}
          style={[styles.con, linearStyle]}>
          <View style={[styles.titleCon, styleTitleCon]}>
            {hasIcon && <View style={{marginRight: 6.5}}>{hasIcon}</View>}

            {loading ? (
              <ActivityIndicator
                color={Colors.mainBack}
                size={PixelPerfect(50)}
              />
            ) : (
              <Text style={[styles.title, styleTitle]}>{title}</Text>
            )}
          </View>
        </LinearGradient>
      ) : (
 
        )} */}
      <View style={[styles.titleCon, styleTitleCon]}>
        {hasIcon && <View style={{marginRight: 6.5}}>{hasIcon}</View>}
        {loading ? (
          <ActivityIndicator color={Colors.mainBack} size={PixelPerfect(50)} />
        ) : (
          <Text style={[styles.title, styleTitle]}>{title}</Text>
        )}
      </View>
    </Pressable>
  );
};

export default ColoredButton;

const styles = StyleSheet.create({
  con: {
    height: PixelPerfect(100),
    backgroundColor: Colors.black,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    color: Colors.mainBack,
    fontFamily: Fonts.Bold,
    fontSize: PixelPerfect(35),
  },
  titleCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
