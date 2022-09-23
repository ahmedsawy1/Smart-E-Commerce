import React from 'react';
import {View, Button, StyleSheet, TouchableOpacity, Text} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {connect} from 'react-redux';
import RoundSelector from '../../../components/touchables/RoundSelector';
import {setProductOption} from '../../../store/actions/productsActions';
import {SharedStyles} from '../../../styles/sharedStyles';
import {ColorWithOpacity, Fonts} from '../../../styles/stylesConstants';
class DateTimePickerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      Text: props.name,
    };
  }

  showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };

  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };

  handleDatePicked = date => {
    this.props.setProductOption(this.props.product_option_id, date);
    let text = '';
    switch (this.props.type) {
      case 'date':
        text = date.toLocaleDateString();
        break;
      case 'datetime':
        text = date.toLocaleString();
        break;
      case 'time':
        text = date.toLocaleTimeString();
        break;
    }
    this.setState({
      Text: text,
    });
    this.hideDateTimePicker();
  };

  render() {
    return (
      <>
        <TouchableOpacity
          style={[styles.con]}
          onPress={this.showDateTimePicker}>
          <Text style={styles.title}>{this.state.Text}</Text>
        </TouchableOpacity>

        <DateTimePicker
          mode={this.props.type}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({});
const mapDispatchToProps = (dispatch: any) => ({
  setProductOption: (product_option_id: number, option_value_id: number) =>
    dispatch(setProductOption(product_option_id, option_value_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DateTimePickerView);

const styles = StyleSheet.create({
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    borderWidth: 1,
    borderColor: '#a6a6a6',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  con: {
    paddingHorizontal: 27,
    backgroundColor: '#F3F3F3',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingVertical: 12,
    width: '100%',
    marginBottom: 8,
    justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.Medium,
    color: ColorWithOpacity('#0D0E10', 0.5),
    textAlign: 'center',
  },
});
