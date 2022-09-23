import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {SharedStyles} from '../../styles/sharedStyles';
import Colors, {Fonts, PixelPerfect} from '../../styles/stylesConstants';

const RenderTotals = ({isOrderTotal = false}: any) => {
  const {cartData} = useSelector((state: RootState) => state.checkoutReducer);

  let totals = isOrderTotal ? isOrderTotal : cartData.totals;
  if (totals?.length > 0) {
    let children = [];
    for (let i = 0; i < totals.length; i++) {
      const t = totals[i];
      if (i === totals.length - 1) {
        //The last one
        children.push(
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.title}>{t?.title}</Text>
            <Text style={styles.price}>{t?.text}</Text>
          </View>,
        );
      } else {
        children.push(
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.title}>{t?.title}</Text>
            <Text style={[styles.price]}>{t?.text}</Text>
          </View>,
        );
      }
    }
    return <View style={{flex: 1}}>{children}</View>;
  }

  return null;
};

export default RenderTotals;

const styles = StyleSheet.create({
  title: {
    fontSize: PixelPerfect(32),
    fontFamily: Fonts.Medium,
    color: Colors.black,
    flex: 1,
    ...SharedStyles.textAlign,
  },
  price: {
    fontSize: PixelPerfect(32),
    fontFamily: Fonts.Medium,
    color: Colors.black,
  },
});
