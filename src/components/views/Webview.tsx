import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeView from './SafeView';
import WebView from 'react-native-webview';
import {phoneHeight, phoneWidth} from '../../styles/stylesConstants';

const Webview = ({source}: any) => {
  return (
    <SafeView>
      <WebView
        style={{
          height: phoneHeight,
          width: phoneWidth,
        }}
        source={source}
        // onNavigationStateChange={this._onNavigationStateChange.bind(this)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </SafeView>
  );
};

export default Webview;

const styles = StyleSheet.create({});
