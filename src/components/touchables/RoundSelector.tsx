import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {ChevronDown} from '../../assets/svg/icons';
import {SharedStyles} from '../../styles/sharedStyles';
import {ColorWithOpacity, Fonts} from '../../styles/stylesConstants';

interface IRoundSelector {
  title: String;
  styleTitle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  iconColor?: string;
  errorText?: string;
  onPress: () => void;
}

const RoundSelector: FC<IRoundSelector> = ({
  title,
  styleTitle,
  style,
  iconColor,
  onPress,
  errorText = '',
}) => {
  return (
    <>
      <Pressable onPress={onPress} style={[styles.con, style]}>
        <Text style={[styles.title, styleTitle]}>{title}</Text>
        <ChevronDown color={iconColor} />
      </Pressable>
      {errorText != '' && <Text style={styles.errorText}>{errorText}</Text>}
    </>
  );
};

export default RoundSelector;

const styles = StyleSheet.create({
  con: {
    paddingHorizontal: 27,
    paddingVertical: 12,
    backgroundColor: '#F3F3F3',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  title: {
    ...SharedStyles.textAlign,
    flex: 1,
    fontFamily: Fonts.Medium,
    color: ColorWithOpacity('#0D0E10', 0.5),
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginTop: -10,
    marginBottom: 10,
    fontFamily: Fonts.Regular,
  },
});
