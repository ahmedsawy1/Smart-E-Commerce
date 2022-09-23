import React, {FC} from 'react';
import {
  I18nManager,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors, {
  ColorWithOpacity,
  Fonts,
  PixelPerfect,
} from '../../styles/stylesConstants';

interface ProfileSection {
  title: string;
  style?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
  hasIcon?: boolean;
  noBorder?: boolean;
  onPress?: () => void;
  iconColor?: boolean | string;
}

const ProfileSection: FC<ProfileSection> = ({
  title,
  style,
  onPress,
  noBorder,
  styleTitle,
  iconColor,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          borderBottomWidth: noBorder ? 0 : 1,
        },
        style,
      ]}>
      <View style={[styles.titleContainer]}>
        <Text style={[styles.title, styleTitle]}>{title}</Text>
      </View>
      <View style={[styles.iconContainer]}>
        <Icon
          name={I18nManager.isRTL ? 'arrow-back-ios' : 'arrow-forward-ios'}
          size={PixelPerfect(28)}
          color={iconColor ? iconColor : '#B7B7B7'}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomColor: ColorWithOpacity('#707070', 0.2),
    paddingBottom: 18,
    marginTop: 14,
    flexDirection: 'row',
  },
  iconContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 5,
    justifyContent: 'flex-start',
    marginHorizontal: 8,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: PixelPerfect(32),
    fontFamily: Fonts.Regular,
    color: Colors.black,
  },
  iconDimenssion: {
    width: 26,
    height: 26,
  },
});

export default ProfileSection;
