import React, {FC} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {View, Text, Image, StyleSheet} from 'react-native';
import {regex, RemoveHTMLFromString} from '../../constants/helpers';
import Colors, {
  ColorWithOpacity,
  Fonts,
  phoneHeight,
  PixelPerfect,
} from '../../styles/stylesConstants';

interface UserComment {
  userName: string;
  userImage: string;
  comment: string;
  style?: StyleProp<ViewStyle>;
}

const UserComment: FC<UserComment> = ({
  userName,
  userImage,
  comment,
  style,
}) => {
  const commentText = comment?.split(regex).join(' ');

  return (
    <View style={[styles.container, style]}>
      {/* <View style={styles.imageContainer}>
        <Image
          resizeMode="stretch"
          style={styles.image}
          source={{uri: userImage}}
        />
      </View> */}
      <View style={styles.detailsContainer}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.comment}>{commentText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: ColorWithOpacity('#000000', 0.03),
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: phoneHeight * 0.01,
    borderRadius: 10,
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 5,
    alignItems: 'flex-start',
  },
  image: {
    height: phoneHeight * 0.05,
    width: phoneHeight * 0.05,
    borderRadius: phoneHeight * 0.4,
  },
  userName: {
    fontFamily: Fonts.Medium,
    color: Colors.black,
    fontSize: PixelPerfect(26),
  },
  comment: {
    color: ColorWithOpacity(Colors.black, 0.5),
    fontSize: PixelPerfect(25),
    fontFamily: Fonts.Regular,
  },
});

export default UserComment;
