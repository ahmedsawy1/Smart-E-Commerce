import {t} from 'i18next';
import React, {useState} from 'react';
import {View, StyleSheet, Text, FlatList, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MainInput from '../../../components/inputs/MainInput';
import CheckBoxRound from '../../../components/touchables/CheckBoxRound';
import RoundSelector from '../../../components/touchables/RoundSelector';
import PopUp from '../../../components/views/PopUp';
import {
  removeProductOption,
  SetGroupOfProductOption,
  setProductOption,
} from '../../../store/actions/productsActions';
import {RootState} from '../../../store/store';
import {SharedStyles} from '../../../styles/sharedStyles';
import Colors, {Fonts, PixelPerfect} from '../../../styles/stylesConstants';
import RadioGroup from './RadioGroup';
import DateTimePicker from './DateTime';
import CheckboxGroup from './CheckboxGroup';

export const ProductCustomize = ({string, prodId}) => {
  const dispatch = useDispatch();

  const {singleProduct} = useSelector(
    (state: RootState) => state.productsReducer,
  );

  function onTextChange(product_option_id, text) {
    if (text === '') {
      dispatch(removeProductOption(product_option_id));
      return;
    }
    dispatch(setProductOption(product_option_id, text));
  }

  const renderRightComponenet = (option: any) => {
    switch (option.type) {
      case 'radio':
      case 'select':
        return (
          <View>
            <Text style={[styles.title]}>{option.name}</Text>

            <View style={{flexDirection: 'row'}}>
              <RadioGroup
                product_option_id={option.product_option_id}
                // SetProductOption={this.props.SetProductOption}
                options={option.product_option_value || option.option_value}
              />
            </View>
          </View>
        );
      case 'checkbox':
        return (
          <View>
            <Text style={styles.title}>{option.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <CheckboxGroup
                product_option_id={option.product_option_id}
                SetGroupOfProductOption={(arr: []) =>
                  dispatch(SetGroupOfProductOption(arr))
                }
                RemoveProductOption={() =>
                  dispatch(removeProductOption(option.product_option_id))
                }
                options={option.product_option_value || option.option_value}
              />
            </View>
          </View>
        );
      case 'text':
        return (
          <View style={{paddingBottom: 5}}>
            <Text style={styles.title}>{option.name}</Text>

            <MainInput
              placeholder={option.value}
              onChangeText={text =>
                onTextChange(option.product_option_id, text)
              }
            />
          </View>
        );
      case 'textarea':
        return (
          <View style={{paddingBottom: 5}}>
            <Text style={styles.title}>{option.name}</Text>
            <MainInput
              placeholder={option.value}
              onChangeText={text =>
                onTextChange(option.product_option_id, text)
              }
              style={styles.largeInput}
            />
          </View>
        );
      case 'time':
      case 'datetime':
      case 'date':
        return (
          <View>
            <Text style={[styles.title]}>{option.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <DateTimePicker
                product_option_id={option.product_option_id}
                name={option.name}
                type={option.type}
                SetProductOption={() => dispatch(setProductOption())}
              />
            </View>
          </View>
        );
      case 'file':
        return <Text>file</Text>;
    }
    return null;
  };

  return (
    <View>
      {singleProduct?.options
        ? singleProduct?.options.map((i: any) => renderRightComponenet(i))
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: PixelPerfect(36),
    fontFamily: Fonts.Bold,
    color: Colors.black,
    ...SharedStyles.textAlign,
  },
  largeInput: {
    marginVertical: 5,
    height: 100,
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    paddingTop: 10,
  },
});
