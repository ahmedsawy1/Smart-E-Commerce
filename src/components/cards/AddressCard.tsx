import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import Colors, {
  ColorWithOpacity,
  Fonts,
  PixelPerfect,
} from '../../styles/stylesConstants';
import ColoredButton from '../touchables/ColoredButton';
import {t} from 'i18next';
import {SharedStyles} from '../../styles/sharedStyles';
import {EditIcon, TrashIcon} from '../../assets/svg/icons';

interface IAddressCard {
  title: String;
  onDeletePress: () => void;
  onEditAddress: () => void;
}
const AddressCard: FC<IAddressCard> = ({
  title,
  onDeletePress,
  onEditAddress,
}) => {
  return (
    <View style={styles.con}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.buttonsCon}>
        <ColoredButton
          title={t('Edit')}
          style={[styles.sharedBtn, styles.editBtn]}
          styleTitle={[styles.sharedTitle, {}]}
          linearStyle={styles.sharedBtn}
          hasIcon={<EditIcon />}
          onPress={onEditAddress}
        />
        <ColoredButton
          onPress={onDeletePress}
          title={t('Delete')}
          style={[styles.sharedBtn, styles.deleteBtn]}
          styleTitle={[styles.sharedTitle, {color: Colors.red}]}
          isLinear={false}
          hasIcon={<TrashIcon />}
          styleTitleCon={{alignItems: 'flex-start'}}
        />
      </View>
    </View>
  );
};

export default AddressCard;

const styles = StyleSheet.create({
  con: {
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 0.5,
    paddingBottom: 15,
  },
  titleText: {
    paddingVertical: 20,
    fontFamily: Fonts.Regular,
    fontSize: PixelPerfect(30),
    color: Colors.black,
    ...SharedStyles.textAlign,
  },
  buttonsCon: {
    flexDirection: 'row',
  },
  sharedBtn: {
    height: PixelPerfect(60),
    width: PixelPerfect(184),
  },
  deleteBtn: {
    backgroundColor: ColorWithOpacity(Colors.red, 0.3),
    marginLeft: 8,
  },
  sharedTitle: {
    fontSize: PixelPerfect(24),
    fontFamily: Fonts.Medium,
  },
  editBtn: {},
});
