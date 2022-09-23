import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import Colors, {Fonts, PixelPerfect} from '../../styles/stylesConstants';

interface ITitleText {
  title: String;
  subTitle: any;
  style?: StyleProp<ViewStyle>;
  styleSubTitle?: StyleProp<TextStyle>;
}

const TitleText: FC<ITitleText> = ({title, subTitle, style, styleSubTitle}) => {
  return (
    <View style={[styles.con, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.subTitle, styleSubTitle]}>{subTitle}</Text>
    </View>
  );
};

export default TitleText;

const styles = StyleSheet.create({
  con: {
    flex: 1,
  },
  title: {
    textAlign: 'left',
    color: Colors.black,
    fontSize: PixelPerfect(26),
    fontFamily: Fonts.Regular,
    marginBottom: 4,
  },
  subTitle: {
    textAlign: 'left',
    color: Colors.medGray,
    fontSize: PixelPerfect(26),
    fontFamily: Fonts.Regular,
  },
});
