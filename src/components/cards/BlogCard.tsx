import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import {
  phoneHeight,
  phoneWidth,
  PixelPerfect,
} from '../../styles/stylesConstants';
import {t} from 'i18next';
import {SharedStyles} from '../../styles/sharedStyles';
import Colors, {Fonts} from '../../styles/stylesConstants';

interface BlogCard {
  imageURL: string;
  title: string;
}

const BlogCard: FC<BlogCard> = ({imageURL, title}) => {
  const [isFav, setIsFav] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        resizeMode="stretch"
        style={styles.image}
        source={{uri: decodeURI(imageURL)}}
      />
      <Text style={styles.blogTitle}>{title}</Text>
      <Text style={styles.readMore}>{t('readMore')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...SharedStyles.shadow,

    height: phoneHeight * 0.3,
    width: phoneWidth * 0.9,
    marginTop: 10,

    backgroundColor: 'white',
    borderRadius: 10,
  },
  image: {
    height: phoneHeight * 0.19,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    width: '100%',
  },
  blogTitle: {
    ...SharedStyles.textAlign,
    fontSize: PixelPerfect(30),
    fontFamily: Fonts.Regular,
    color: Colors.black,
    marginVertical: 12,
    marginHorizontal: 16,
  },
  readMore: {
    ...SharedStyles.textAlign,
    fontSize: PixelPerfect(25),
    fontFamily: Fonts.SemiBold,
    color: Colors.lightGray,
    marginHorizontal: 16,
  },
});

export default BlogCard;
