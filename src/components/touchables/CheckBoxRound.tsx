import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors, {Fonts, PixelPerfect} from '../../styles/stylesConstants';

interface ICheckBoxRound {
  checked: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  styleIconCon?: StyleProp<ViewStyle>;
  title: string;
  diffrentTitle?: boolean | string;
  endText?: any;
}

const CheckBoxRound: FC<ICheckBoxRound> = ({
  checked,
  onPress,
  style,
  title,
  diffrentTitle,
  styleIconCon,
  endText,
}) => {
  return (
    <Pressable style={[styles.con, style]} onPress={onPress}>
      <View style={[{flex: 1, alignItems: 'flex-start'}, styleIconCon]}>
        {checked ? (
          <Icon name="checkbox-marked-circle" size={20} color={Colors.black} />
        ) : (
          <Icon
            name="checkbox-blank-circle-outline"
            size={20}
            color={Colors.lightGray}
          />
        )}
      </View>

      <View style={{flex: 10, flexDirection: 'row'}}>
        <Text style={styles.titleText}>{title} </Text>
        {diffrentTitle ? (
          <Text style={styles.diffrentTitle}>{diffrentTitle}</Text>
        ) : null}
        {endText && <Text style={styles.endText}>{endText}</Text>}
      </View>
    </Pressable>
  );
};

export default CheckBoxRound;

const styles = StyleSheet.create({
  con: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: PixelPerfect(32),
    fontFamily: Fonts.Regular,
    color: Colors.black,
  },
  diffrentTitle: {
    fontSize: PixelPerfect(16),
    fontFamily: Fonts.Regular,
    color: Colors.black,
  },
  endText: {
    color: Colors.medGray,
    fontFamily: Fonts.Regular,
    fontSize: PixelPerfect(30),
    flex: 1,
    textAlign: 'right',
  },
});
