import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import {connect} from 'react-redux';
import {setProductOption} from '../../../store/actions/productsActions';
import Colors, {PixelPerfect} from '../../../styles/stylesConstants';

class RadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_option_id: props.product_option_id,
      selectedValue: '',
      options: props.options,
    };
  }
  onRadioButtonPress(option) {
    let selectedValue = option.product_option_value_id;
    this.setState({
      selectedValue: selectedValue,
    });
    this.props.setProductOption(this.state.product_option_id, selectedValue);
  }
  renderOption(option) {
    let isActive = option.product_option_value_id == this.state.selectedValue;
    let textColor = isActive ? '#fff' : '#000';
    let backgroundColor = isActive
      ? {backgroundColor: Colors.black, borderColor: '#fff'}
      : undefined;

    return (
      <TouchableOpacity
        style={[
          styles.button,
          backgroundColor,
          {
            borderColor: isActive ? Colors.black : '#E1E1E1',
            borderWidth: isActive ? 0 : 1.5,
          },
        ]}
        onPress={() => this.onRadioButtonPress(option)}>
        <Text style={{color: textColor}}>{option.name}</Text>
      </TouchableOpacity>
    );
  }

  renderImage(option) {
    let isActive = option.product_option_value_id == this.state.selectedValue;

    return (
      <Pressable onPress={() => this.onRadioButtonPress(option)}>
        <Image
          source={{uri: option.image_product_option_value}}
          style={[
            styles.image,
            isActive && {borderWidth: 1, borderColor: Colors.black},
          ]}
        />
      </Pressable>
    );
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'flex-start'}}>
        <FlatList
          data={this.state.options}
          renderItem={({item}) => {
            return (
              <>
                {item?.image_product_option_value == 'NA'
                  ? this.renderOption(item)
                  : this.renderImage(item)}
              </>
            );
          }}
          keyExtractor={o => o.product_option_value_id}
          horizontal
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    // height: 50,
    // justifyContent: 'center',
    // alignItems: 'center',
    // margin: 3,
    // borderWidth: 1,
    // borderColor: '#a6a6a6',
    // borderRadius: 10,
    // backgroundColor: '#fff',

    paddingVertical: 7,
    paddingHorizontal: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 6,
  },
  image: {
    height: PixelPerfect(100),
    width: PixelPerfect(120),
    resizeMode: 'stretch',
    marginRight: 5,
  },
});

const mapStateToProps = (state: any) => ({});
const mapDispatchToProps = (dispatch: any) => ({
  setProductOption: (product_option_id: number, option_value_id: number) =>
    dispatch(setProductOption(product_option_id, option_value_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RadioGroup);
