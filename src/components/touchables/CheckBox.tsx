import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import Colors, {Fonts, PixelPerfect} from '../../styles/stylesConstants';

interface ICheckBox {
  checked: boolean;
  onPress: () => void;
  onDiffrentTitlePress?: () => void;
  style?: StyleProp<ViewStyle>;
  title: string;
  diffrentTitle?: any;
}

const CheckBox: FC<ICheckBox> = ({
  checked,
  onPress,
  style,
  title,
  diffrentTitle,
  onDiffrentTitlePress,
}) => {
  return (
    <Pressable style={[styles.con, style]} onPress={onPress}>
      <View style={{flex: 1, alignItems: 'flex-start'}}>
        {checked ? (
          <Icon name="check-square" size={20} color={Colors.black} />
        ) : (
          <Icon name="square-o" size={20} color={Colors.lightGray} />
        )}
      </View>

      <View style={{flex: 10, flexDirection: 'row'}}>
        <Text style={styles.titleText}>{title} </Text>
        {diffrentTitle && (
          <Text onPress={onDiffrentTitlePress} style={styles.diffrentTitle}>
            {diffrentTitle}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  con: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: PixelPerfect(33),
    fontFamily: Fonts.Regular,
    color: Colors.black,
  },
  diffrentTitle: {
    fontSize: PixelPerfect(33),
    fontFamily: Fonts.Regular,
    color: Colors.black,
    textDecorationLine: 'underline',
  },
});
