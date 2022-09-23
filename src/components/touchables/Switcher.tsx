import React, {FC, useState} from 'react';
import {
  I18nManager,
  StyleProp,
  Switch,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors, {
  ColorWithOpacity,
  Fonts,
  phoneHeight,
  PixelPerfect,
} from '../../styles/stylesConstants';

interface Switcher {
  title: string;
  icon?: any;
  style?: StyleProp<ViewStyle>;
  hasIcon?: boolean;
  noBorder?: boolean;
  value?: boolean;
  onValueChange: () => void;
}

const Switcher: FC<Switcher> = ({
  title,
  icon,
  style,
  noBorder,
  onValueChange,
  value,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomWidth: noBorder ? 0 : 1,
        },
        style,
      ]}>
      <View style={[styles.titleContainer]}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={[styles.iconContainer]}>
        <Switch
          trackColor={{false: Colors.darkGray, true: Colors.medGreen}}
          //   thumbColor={isEnabled ? '#f5dd4b' : '#FFFFFF'}
          thumbColor={'#FFFFFF'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onValueChange}
          value={value}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomColor: ColorWithOpacity('#707070', 0.2),
    paddingBottom: 18,
    marginTop: 14,
    flexDirection: 'row',
    paddingHorizontal: 13,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 6,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: PixelPerfect(32),
    fontFamily: Fonts.Medium,
    color: Colors.black,
  },
  iconDimenssion: {
    width: 26,
    height: 26,
  },
});

export default Switcher;
