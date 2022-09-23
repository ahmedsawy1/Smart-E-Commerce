import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import HtmlContent from '../../components/views/HTMLcontent';
import {PixelPerfect} from '../../styles/stylesConstants';
import Loader from '../../components/other/Loader';

const Privacy = () => {
  const {privacy} = useSelector((state: RootState) => state.initReducer);
  const check = Object.keys(privacy).length === 0;

  return (
    <SafeView>
      <MainHeader title={t('PrivacyPolicy')} />
      <ScrollView contentContainerStyle={{paddingBottom: PixelPerfect(100)}}>
        <View style={{paddingHorizontal: 16}}>
          {check ? <Loader /> : <HtmlContent content={privacy.description} />}
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default Privacy;

const styles = StyleSheet.create({});
