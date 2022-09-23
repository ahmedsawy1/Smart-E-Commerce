import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import HtmlContent from '../../components/views/HTMLcontent';
import {PixelPerfect} from '../../styles/stylesConstants';

const ReturnsPolicy = () => {
  const {returnPolicy} = useSelector((state: RootState) => state.initReducer);

  return (
    <SafeView>
      <ScrollView contentContainerStyle={{paddingBottom: PixelPerfect(100)}}>
        <MainHeader title={t('ReturnPolicy')} />
        <View style={{paddingHorizontal: 16}}>
          <HtmlContent content={returnPolicy.description} />
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default ReturnsPolicy;

const styles = StyleSheet.create({});
