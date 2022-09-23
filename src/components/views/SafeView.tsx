import React, {FC} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Colors from '../../styles/stylesConstants';

interface ISafeView {
  style?: StyleProp<ViewStyle>;
  children?: any;
}

const SafeView: FC<ISafeView> = ({style, children}) => {
  return (
    <View style={[styles.container, style]}>
      <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBack,
  },
});

export default SafeView;
