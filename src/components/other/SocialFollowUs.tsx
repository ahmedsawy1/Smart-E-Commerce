import React from 'react';
import {Image, Linking, Pressable, StyleSheet, View} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {TicTokIcon} from '../../assets/svg/icons';
import {RootState} from '../../store/store';
import Colors, {PixelPerfect} from '../../styles/stylesConstants';

const SocialFollowUs = ({style}: any) => {
  const {contact} = useSelector((state: RootState) => state.authReducer);

  return (
    <View style={[styles.con, style]}>
      <Pressable
        style={[
          styles.sharedCircle,
          {backgroundColor: Colors.socialBackground},
        ]}
        onPress={() => Linking.openURL(`https://wa.me/${contact.phone}`)}>
        <FontAwesome
          name="whatsapp"
          color={Colors.black}
          size={PixelPerfect(44)}
        />
      </Pressable>
      <Pressable
        onPress={() => Linking.openURL(contact.instagram)}
        style={[
          styles.sharedCircle,
          {backgroundColor: Colors.socialBackground},
        ]}>
        <AntDesign
          name="instagram"
          color={Colors.black}
          size={PixelPerfect(44)}
        />
      </Pressable>
      <Pressable
        onPress={() => Linking.openURL(contact.twitter)}
        style={[
          styles.sharedCircle,
          {backgroundColor: Colors.socialBackground},
        ]}>
        <AntDesign
          name="twitter"
          color={Colors.black}
          size={PixelPerfect(39)}
        />
      </Pressable>
      <Pressable
        onPress={() => Linking.openURL(contact.facebook)}
        style={[
          styles.sharedCircle,
          {backgroundColor: Colors.socialBackground},
        ]}>
        <EvilIcons
          name="sc-facebook"
          color={Colors.black}
          size={PixelPerfect(56)}
        />
      </Pressable>
      <Pressable
        onPress={() => Linking.openURL(contact.snapchat)}
        style={[
          styles.sharedCircle,
          {backgroundColor: Colors.socialBackground},
        ]}>
        <FontAwesome
          name="snapchat-ghost"
          color={Colors.black}
          size={PixelPerfect(40)}
        />
      </Pressable>
      <Pressable
        onPress={() => Linking.openURL(contact.maroof)}
        style={[
          styles.sharedCircle,
          {backgroundColor: Colors.socialBackground},
        ]}>
        <Image
          style={styles.maroofIcon}
          source={require('../../assets/icons/maroof.png')}
        />
      </Pressable>
      <Pressable
        onPress={() => Linking.openURL(contact.tiktok)}
        style={[
          styles.sharedCircle,
          {backgroundColor: Colors.socialBackground},
        ]}>
        <TicTokIcon />
      </Pressable>
    </View>
  );
};

export default SocialFollowUs;

const styles = StyleSheet.create({
  con: {
    alignSelf: 'center',
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: PixelPerfect(40),
  },
  sharedCircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maroofIcon: {
    height: PixelPerfect(40),
    width: PixelPerfect(40),
  },
});
