import {
  Alert,
  I18nManager,
  Image,
  Pressable,
  Share,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import Colors, {PixelPerfect} from '../../styles/stylesConstants';
import {LeftArrowIcon, RightArrowIcon, ShareIcon} from '../../assets/svg/icons';
import {useNavigation} from '@react-navigation/native';
import {SharedStyles} from '../../styles/sharedStyles';

import AntDesign from 'react-native-vector-icons/AntDesign';

interface ILogoHeader {
  noArrow?: boolean;
  noShare?: boolean;
  hasCartIcon?: boolean;
  style?: StyleProp<ViewStyle>;
  shareMessage?: any;
}

const LogoHeader: FC<ILogoHeader> = ({
  noArrow,
  noShare,
  style,
  shareMessage,
  hasCartIcon,
}) => {
  const {isRTL} = I18nManager;
  const navigation: any = useNavigation();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: shareMessage,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
      console.log(error);
    }
  };

  return (
    <View style={[styles.con, style]}>
      <Pressable style={styles.iconsCon} onPress={() => navigation.goBack()}>
        {noArrow ? null : isRTL ? <RightArrowIcon /> : <LeftArrowIcon />}
      </Pressable>
      <View style={styles.logoCon}>
        <Image
          source={require('../../assets/main/logo-title.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View
        style={[
          styles.iconsCon,
          hasCartIcon && styles.cartCont,
          !hasCartIcon && {alignItems: 'flex-end'},
        ]}>
        {hasCartIcon && (
          <AntDesign
            onPress={() => navigation.navigate('CartScreen')}
            name="shoppingcart"
            size={PixelPerfect(55)}
            color={Colors.lightGray}
          />
        )}
        <Pressable onPress={onShare}>
          {noShare ? null : <ShareIcon />}
        </Pressable>
      </View>
    </View>
  );
};

export default LogoHeader;

const styles = StyleSheet.create({
  con: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  iconsCon: {
    flex: 1.8,
    justifyContent: 'center',
  },
  logoCon: {
    flex: 7,
    ...SharedStyles.centred,
  },
  logo: {
    height: PixelPerfect(68),
    width: PixelPerfect(168),
  },
  cartCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
