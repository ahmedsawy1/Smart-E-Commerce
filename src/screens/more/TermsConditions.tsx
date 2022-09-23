import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import HtmlContent from '../../components/views/HTMLcontent';
import {PixelPerfect} from '../../styles/stylesConstants';

const TermsConditions = () => {
  const {terms} = useSelector((state: RootState) => state.initReducer);

  return (
    <SafeView>
      <MainHeader title={t('TermsConditions')} />
      <ScrollView contentContainerStyle={{paddingBottom: PixelPerfect(100)}}>
        <View style={{paddingHorizontal: 16}}>
          <HtmlContent content={terms.description} />
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default TermsConditions;

const styles = StyleSheet.create({});
