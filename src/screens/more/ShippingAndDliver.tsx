import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import HtmlContent from '../../components/views/HTMLcontent';
import {PixelPerfect} from '../../styles/stylesConstants';

const ShippingAndDliver = () => {
  const {shippingDlivery} = useSelector(
    (state: RootState) => state.initReducer,
  );

  return (
    <SafeView>
      <MainHeader title={t('ShippingandDelivery')} />
      <ScrollView contentContainerStyle={{paddingBottom: PixelPerfect(100)}}>
        <View style={{}}>
          <HtmlContent content={shippingDlivery.description} />
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default ShippingAndDliver;

const styles = StyleSheet.create({});
