import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import Colors, {
  ColorWithOpacity,
  Fonts,
  PixelPerfect,
} from '../../styles/stylesConstants';
import {t} from 'i18next';

interface ISectionTitle {
  style: StyleProp<ViewStyle>;
  title?: string;
  hasMoreBtn?: boolean;
  onPress?: () => void;
}

const SectionTitle: FC<ISectionTitle> = ({
  style,
  title,
  hasMoreBtn,
  onPress,
}) => {
  return (
    <View style={[style, styles.con]}>
      <View style={{flex: 1, alignItems: 'flex-start'}}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      {hasMoreBtn && (
        <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.moreText}>{t('displayMore')} </Text>
        </Pressable>
      )}
    </View>
  );
};

export default SectionTitle;

const styles = StyleSheet.create({
  con: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  titleText: {
    color: Colors.black,
    fontSize: PixelPerfect(40),
    fontFamily: Fonts.SemiBold,
    flex: 1,
  },
  moreText: {
    fontSize: PixelPerfect(22),
    fontFamily: Fonts.Medium,
    color: Colors.mainBack,
  },
  button: {
    backgroundColor: Colors.black,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
});
