import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import Colors, {phoneHeight} from '../../styles/stylesConstants';

interface ILoader {
  style?: StyleProp<ViewStyle>;
}

const Loader: FC<ILoader> = ({style}) => {
  return (
    <View style={[{flex: 1, marginTop: phoneHeight / 3}, style]}>
      <ActivityIndicator color={Colors.black} size={30} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
