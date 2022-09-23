import {
  I18nManager,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import SafeView from '../../components/views/SafeView';
import SearchHeader from '../../components/headers/SearchHeader';
import {t} from 'i18next';
import Colors, {Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {MicIcon, RedX} from '../../assets/svg/icons';
import {useNavigation} from '@react-navigation/native';
import {searchProducts} from '../../store/actions/productsActions';
import {useDispatch} from 'react-redux';
import Voice from '@react-native-voice/voice';
import {normalizeText} from '../../constants/helpers';
import {SharedStyles} from '../../styles/sharedStyles';

const VoiceSearch = () => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();

  const [visiable, setVisiable] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);

  const voiceToString = results.join();

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    // Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechPartialResults = (e: any) => {
    setResults(e.value);
    console.log('===============eee=====================');
    console.log(e);
  };

  const onSpeechError = (e: any) => {
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
    setVisiable(false);
  };

  const onSpeechResults = (e: any) => {
    setResults(e.value);
  };

  const startRecognizing = async () => {
    const selectedLang = I18nManager.isRTL ? 'ar-EG' : 'en-US';
    setVisiable(true);

    try {
      await Voice.start(selectedLang);
      setError('');
      setResults([]);
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
      if (error == '' && Object.keys(results).length !== 0) {
        console.log(error);
        console.log(Object.keys(results).length);

        navigation.navigate('SearchScreen');
        console.log('==============results======================');
        console.log(results);
        console.log(typeof results);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const voiceString = normalizeText(results.join());
    console.log('============results========================');
    console.log(results.join());
    console.log(voiceString);

    dispatch(searchProducts(voiceString));
    // dispatch(searchProducts(results.join()));
  }, [results.join()]);

  return (
    <>
      <SafeView>
        <SearchHeader
          placeholder={t('searchFor')}
          value={search == '' ? voiceToString : search}
          onChangeText={text => setSearch(text)}
          onSearchPress={() => {
            dispatch(searchProducts(search));
            navigation.navigate('SearchScreen');
          }}
        />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            paddingTop: PixelPerfect(230),
          }}>
          <Pressable
            style={styles.mic}
            onPress={() => {
              startRecognizing();
            }}>
            <MicIcon height={PixelPerfect(180)} width={PixelPerfect(150)} />
          </Pressable>
          <Text style={[styles.text, {marginTop: 50}]}>
            {t('ClickVoiceSearch')}
          </Text>

          {results.map((result: any, index) => {
            return <Text key={`result-${index}`}> {result}</Text>;
          })}

          <Text style={styles.errorText}>
            {/* {error != '' && `Error: \n ${error}`} */}
            {error != '' && t('pleaseTryAgain')}
          </Text>
        </View>
      </SafeView>
      <Modal visible={visiable}>
        <SafeView>
          <SearchHeader
            placeholder={t('searchFor')}
            value={search}
            onChangeText={text => setSearch(text)}
            onSearchPress={() => {
              navigation.navigate('SearchScreen');
              dispatch(searchProducts(search));
            }}
          />

          <Pressable
            onPress={() => {
              stopRecognizing();
            }}>
            <LottieView
              source={require('../../assets/animations/mic.json')}
              autoPlay
              loop
              style={{
                height: PixelPerfect(350),
                width: PixelPerfect(350),
                alignSelf: 'center',
                marginTop: PixelPerfect(100),
              }}
            />
          </Pressable>

          <View style={{alignItems: 'center'}}>
            <Text style={styles.text}>{t('SpeakTheName')}</Text>
            <Pressable
              style={{padding: 20}}
              onPress={() => {
                setVisiable(false);
                cancelRecognizing();
              }}>
              <RedX />
            </Pressable>
          </View>
        </SafeView>
      </Modal>
    </>
  );
};

export default VoiceSearch;

const styles = StyleSheet.create({
  text: {
    fontSize: PixelPerfect(38),
    color: Colors.medGray,
    fontFamily: Fonts.Regular,
    marginTop: 100,
    marginBottom: 48,
  },
  mic: {
    height: 130,
    width: 130,
    borderRadius: 130,
    overflow: 'hidden',
    backgroundColor: Colors.black,
    ...SharedStyles.centred,
  },
  linear: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginTop: -10,
    marginBottom: 10,
    fontFamily: Fonts.Medium,
  },
});
