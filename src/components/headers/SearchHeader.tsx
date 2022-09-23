import {I18nManager, Image, Pressable, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import Colors, {
  ColorWithOpacity,
  Fonts,
  phoneWidth,
  PixelPerfect,
} from '../../styles/stylesConstants';
import {TextInput} from 'react-native-gesture-handler';
import {MicIcon, SearchIcon} from '../../assets/svg/icons';
import {useNavigation} from '@react-navigation/native';

interface ISearchHeader {
  placeholder: string;
  endIcon?: boolean | JSX.Element;
  searchIconColor?: string;
  onMicPress?: () => void;
  onSearchPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchHeader: FC<ISearchHeader> = ({
  placeholder,
  endIcon,
  searchIconColor,
  onMicPress,
  onSearchPress,
  ...props
}) => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.con}>
      <View style={styles.startIconCon}>
        <Image
          source={require('../../assets/main/logo-title.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View
        style={[
          styles.inputCon,
          {
            marginRight: endIcon ? 10 : 0,
          },
        ]}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={ColorWithOpacity('#0D0E10', 0.5)}
          style={styles.textInput}
          onSubmitEditing={onSearchPress}
          {...props}
        />
        <Pressable style={{padding: 2}} onPress={onSearchPress}>
          <SearchIcon color={searchIconColor} />
        </Pressable>
      </View>
      {endIcon && (
        <Pressable style={styles.endIconCon} onPress={onMicPress}>
          <MicIcon />
        </Pressable>
      )}
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  con: {
    width: phoneWidth,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginTop: 10,
  },
  startIconCon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  endIconCon: {
    // flex: 1,
    height: 36,
    width: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 10,
    backgroundColor: Colors.black,
  },
  inputCon: {
    height: PixelPerfect(90),
    flex: 7,
    marginVertical: 5,
    width: '100%',
    flexDirection: 'row',
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 0.3,
    borderColor: Colors.lightGray,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  logo: {
    height: 40,
    width: PixelPerfect(100),
  },
  textInput: {
    flex: 1,
    fontFamily: Fonts.Medium,
    fontSize: PixelPerfect(28),
    justifyContent: 'center',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    padding: 0,
    color: Colors.black,
  },
});
