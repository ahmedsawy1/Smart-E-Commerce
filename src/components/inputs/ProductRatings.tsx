import {StyleSheet, Text, Pressable, View} from 'react-native';
import React, {FC, useState} from 'react';
import MainInput from './MainInput';
import {t} from 'i18next';
import ColoredButton from '../touchables/ColoredButton';
import {useDispatch} from 'react-redux';
import {SharedStyles} from '../../styles/sharedStyles';
import Colors, {
  ColorWithOpacity,
  Fonts,
  PixelPerfect,
} from '../../styles/stylesConstants';
import {addReview} from '../../store/actions/productsActions';
import {RatingStarIcon} from '../../assets/svg/icons';
import {useNavigation} from '@react-navigation/native';
import {getPrivacyPage} from '../../store/actions/initActions';

interface IRating {
  productID: number;
}

const ProductRatings: FC<IRating> = ({productID}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const ratingsArr = [1, 2, 3, 4, 5];
  const [indexState, setIndexState] = useState(-1);

  const [rating, setRating] = useState({
    rating: indexState + 1,
    name: '',
    text: '',
  });

  return (
    <View>
      <MainInput
        value={rating.name}
        onChangeText={txt => setRating(old => ({...old, name: txt}))}
        placeholder={t('theName')}
        style={[styles.sharedInputs, , styles.smallInput]}
      />
      <MainInput
        value={rating.text}
        onChangeText={txt => setRating(old => ({...old, text: txt}))}
        placeholder={t('typeYourComment')}
        style={[styles.sharedInputs, styles.largeInput]}
        multiline
      />

      <Text style={styles.textAgree}>
        {t('byCommenting')}
        <Text
          style={{color: Colors.black}}
          onPress={() => {
            dispatch(getPrivacyPage());
            navigation.navigate('Privacy');
          }}>
          {t('PrivacyPolicy')}
        </Text>
      </Text>

      <View style={styles.ratingsCon}>
        <View style={styles.rateCon}>
          <Text style={styles.addRateText}>{t('addRatings')}</Text>
          <View style={{flexDirection: 'row'}}>
            {ratingsArr.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  setIndexState(index);
                  console.log(index);
                }}>
                <RatingStarIcon
                  size={PixelPerfect(50)}
                  color={index > indexState ? '#D2D2D2' : '#FADC46'}
                />
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.buttonCon}>
          <ColoredButton
            isLinear={false}
            title={t('send')}
            style={styles.rateButton}
            styleTitle={{
              color: Colors.black,
            }}
            onPress={() =>
              dispatch(
                addReview(
                  productID,
                  {
                    rating: indexState + 1,
                    name: rating.name,
                    text: rating.text,
                  },
                  () => setRating(old => ({...old, name: '', text: ''})),
                ),
              )
            }
          />
        </View>
      </View>
    </View>
  );
};

export default ProductRatings;

const styles = StyleSheet.create({
  rateButton: {
    backgroundColor: ColorWithOpacity(Colors.black, 0.3),
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    height: PixelPerfect(80),
    marginTop: PixelPerfect(20),
  },
  sharedInputs: {
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  buttonCon: {
    flex: 4,
    ...SharedStyles.centred,
  },
  smallInput: {
    marginTop: 13,
    marginBottom: 7,
  },
  largeInput: {
    height: 100,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  addRateText: {
    color: Colors.black,
    fontSize: PixelPerfect(30),
    fontFamily: Fonts.Medium,
    ...SharedStyles.textAlign,
  },
  ratingsCon: {
    width: '100%',
    flexDirection: 'row',
  },
  rateCon: {
    flex: 6,
  },
  textAgree: {
    fontSize: PixelPerfect(30),
    fontFamily: Fonts.Regular,
    textAlign: 'center',
    color: Colors.black,
    marginBottom: PixelPerfect(15),
  },
});
