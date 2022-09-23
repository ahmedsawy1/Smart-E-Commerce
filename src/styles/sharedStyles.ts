import {I18nManager, StyleSheet} from 'react-native';

export const SharedStyles = StyleSheet.create({
  shadow: {
    shadowColor: '#1B2B5D',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  centred: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  textAlign: {
    textAlign: I18nManager.isRTL ? 'left' : 'left',
  },
});
