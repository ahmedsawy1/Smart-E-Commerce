import {
  I18nManager,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';

import Colors, {
  Fonts,
  phoneWidth,
  PixelPerfect,
} from '../../styles/stylesConstants';
import {LeftArrowIcon, RightArrowIcon} from '../../assets/svg/icons';
import {useNavigation} from '@react-navigation/native';

interface IMainHeader {
  title?: string;
  noArrow?: boolean;
  otherIcon?: boolean | JSX.Element;
  onOtherIconPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const {isRTL} = I18nManager;

const MainHeader: FC<IMainHeader> = ({
  title,
  noArrow,
  onOtherIconPress,
  otherIcon,
  style,
}) => {
  const navigation: any = useNavigation();
  return (
    <View style={[styles.con, style]}>
      <Pressable style={styles.iconsCon} onPress={() => navigation.goBack()}>
        {noArrow ? null : isRTL ? <RightArrowIcon /> : <LeftArrowIcon />}
      </Pressable>
      <View style={styles.titleCon}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Pressable
        onPress={onOtherIconPress}
        style={[styles.iconsCon, {alignItems: 'flex-end'}]}>
        {otherIcon}
      </Pressable>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  con: {
    height: 44,
    width: phoneWidth,
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 16,
  },
  titleCon: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconsCon: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: Colors.medGray,
    fontFamily: Fonts.Medium,
    fontSize: PixelPerfect(33),
  },
});
