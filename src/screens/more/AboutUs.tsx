import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import HtmlContent from '../../components/views/HTMLcontent';
import {PixelPerfect} from '../../styles/stylesConstants';

const AboutUs = () => {
  const {aboutUs} = useSelector((state: RootState) => state.initReducer);
  const check = Object.keys(aboutUs).length === 0;
  return (
    <SafeView>
      <MainHeader title={t('AboutUs')} />
      <ScrollView contentContainerStyle={{paddingBottom: PixelPerfect(100)}}>
        <View style={{marginHorizontal: 16}}>
          <HtmlContent content={aboutUs.description} />
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default AboutUs;

const styles = StyleSheet.create({});
