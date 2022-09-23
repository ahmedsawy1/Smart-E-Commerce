import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import Colors from '../../styles/stylesConstants';

interface ISeprator {
  style?: StyleProp<ViewStyle>;
}

const Seprator: FC<ISeprator> = ({style}) => {
  return <View style={[styles.con, style]} />;
};

export default Seprator;

const styles = StyleSheet.create({
  con: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.blueGray,
  },
});
