import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {TickMarkIcon} from '../../assets/svg/icons';
import LogoHeader from '../../components/headers/LogoHeader';
import ColoredButton from '../../components/touchables/ColoredButton';
import SafeView from '../../components/views/SafeView';
import {
  PaymentSetted,
  ShippingSetted,
} from '../../store/actions/CheckoutActions';
import {RootState} from '../../store/store';
import {ActionType} from '../../store/types/types';
import Colors, {Fonts, PixelPerfect} from '../../styles/stylesConstants';
const OrderSuccess = ({}) => {
  const navigation: any = useNavigation();
  const {order_id} = useSelector((state: RootState) => state.checkoutReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: ActionType.EMPTY_CART,
      paylaod: null,
    });
  }, []);

  return (
    <SafeView>
      <LogoHeader noArrow noShare />
      <View style={styles.centerView}>
        <View style={styles.cyrcle}>
          <TickMarkIcon />
        </View>
        <Text style={styles.successText}>{t('thanks')}</Text>
        <Text style={styles.youCanText}>
          {t('orderRecived')}{' '}
          <Text style={{color: Colors.medGreen}}>{order_id}</Text>
        </Text>

        <ColoredButton
          title={t('ContinueShopping')}
          onPress={() => {
            dispatch(PaymentSetted(false));
            dispatch(ShippingSetted(false));
            navigation.navigate('HomeScreen');
          }}
        />
      </View>
    </SafeView>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  centerView: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  cyrcle: {
    height: 111,
    width: 111,
    backgroundColor: Colors.medGreen,
    borderRadius: 100,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: PixelPerfect(40),
    fontFamily: Fonts.Bold,
    color: Colors.black,
    marginTop: 30,
  },
  youCanText: {
    fontSize: PixelPerfect(33),
    fontFamily: Fonts.Regular,
    color: Colors.black,
    marginTop: 5,
    textAlign: 'center',
    marginBottom: 30,
  },
});
