import {
  Image,
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import Colors, {Fonts, PixelPerfect} from '../../styles/stylesConstants';

interface ICategoryCard {
  image: string;
  title: string;
  style?: StyleProp<ViewStyle>;
  styleImageCon?: StyleProp<ViewStyle>;
  styleImage?: StyleProp<ImageStyle>;
  styleTitle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const CategoryCard: FC<ICategoryCard> = ({
  image,
  title,
  style,
  styleImage,
  styleTitle,
  onPress,
  styleImageCon,
}) => {
  return (
    <Pressable style={[styles.con, style]} onPress={onPress}>
      <View style={[styles.imageCon, styleImageCon]}>
        <Image
          source={{uri: decodeURI(image)}}
          style={[styles.image, styleImage]}
          resizeMode="contain"
        />
      </View>
      <View style={styles.titleCon}>
        <Text style={[styles.titleText, styleTitle]}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  con: {
    // borderRadius: PixelPerfect(30),
    overflow: 'hidden',
  },
  image: {
    height: PixelPerfect(250),
    width: PixelPerfect(250),
  },
  titleText: {
    fontSize: PixelPerfect(26),
    fontFamily: Fonts.Medium,
    color: Colors.black,
    marginTop: 10,
    alignSelf: 'center',
  },
  titleCon: {
    flex: 2,
    paddingHorizontal: 2,
  },
  imageCon: {
    flex: 7,
    borderRadius: PixelPerfect(30),
  },
});
