import {t} from 'i18next';
import React, {FC} from 'react';
import {View, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {SmallTick, XIcon} from '../../assets/svg/icons';
import {SharedStyles} from '../../styles/sharedStyles';
import Colors, {Fonts, PixelPerfect} from '../../styles/stylesConstants';

interface IOrderStatus {
  style: StyleProp<ViewStyle>;
  status: String;
}

const OrderStatus: FC<IOrderStatus> = ({style, status}) => {
  return (
    <>
      <View style={[styles.con, style]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <View
              style={[
                styles.cyrcle,
                {backgroundColor: status == 'ملغي' ? 'red' : Colors.medGreen},
              ]}>
              {status === 'ملغي' ? (
                <XIcon size={PixelPerfect(16)} color={Colors.mainBack} />
              ) : (
                <SmallTick />
              )}
            </View>
          </View>

          <View
            style={[
              styles.line,
              {
                backgroundColor:
                  status == 'ملغي'
                    ? Colors.lightGray2
                    : status == 'معلق'
                    ? Colors.lightGray2
                    : Colors.medGreen,
              },
            ]}
          />
          <View
            style={[
              styles.cyrcle,
              {
                backgroundColor:
                  status == 'ملغي'
                    ? Colors.lightGray2
                    : status == 'جاري التجهيز'
                    ? Colors.medGreen
                    : status == 'مكتمل'
                    ? Colors.medGreen
                    : Colors.lightGray2,
              },
            ]}>
            <SmallTick />
          </View>
          <View
            style={[
              styles.line,
              {
                backgroundColor:
                  status == 'ملغي'
                    ? Colors.lightGray2
                    : status == 'مكتمل'
                    ? Colors.medGreen
                    : Colors.lightGray2,
              },
            ]}
          />
          <View
            style={[
              styles.cyrcle,
              {
                backgroundColor:
                  status == 'ملغي'
                    ? Colors.lightGray2
                    : status == 'مكتمل'
                    ? Colors.medGreen
                    : Colors.lightGray2,
              },
            ]}>
            <SmallTick />
          </View>
        </View>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <Text
            style={[
              styles.statusText,
              {
                textAlign: 'left',
                color:
                  status == 'ملغي'
                    ? Colors.red
                    : status == 'معلق'
                    ? Colors.medGreen
                    : status == 'جاري التجهيز'
                    ? Colors.medGreen
                    : status == 'مكتمل'
                    ? Colors.medGreen
                    : Colors.lightGray2,
              },
            ]}>
            {status === 'ملغي' ? `${t('Canceled')}` : `${t('OrderRecived')}`}
          </Text>
          <Text
            style={[
              styles.statusText,
              {
                textAlign: 'center',
                color:
                  status == 'ملغي'
                    ? Colors.lightGray2
                    : status == 'جاري التجهيز'
                    ? Colors.medGreen
                    : status == 'مكتمل'
                    ? Colors.medGreen
                    : Colors.lightGray2,
              },
            ]}>
            {t('Processing')}
          </Text>
          <Text
            style={[
              styles.statusText,
              {
                textAlign: 'right',
                color:
                  status == 'ملغي'
                    ? Colors.lightGray2
                    : status == 'مكتمل'
                    ? Colors.medGreen
                    : Colors.lightGray2,
              },
            ]}>
            {t('complete')}
          </Text>
        </View>
      </View>
    </>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  con: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  cyrcle: {
    height: PixelPerfect(40),
    width: PixelPerfect(40),
    backgroundColor: Colors.lightGray2,
    borderRadius: PixelPerfect(40),
    ...SharedStyles.centred,
  },
  line: {
    flex: 5,
    backgroundColor: Colors.lightGray2,
    height: 5,
    marginHorizontal: 2,
  },
  statusText: {
    flex: 1,
    fontSize: PixelPerfect(24),
    fontFamily: Fonts.Medium,
  },
});
