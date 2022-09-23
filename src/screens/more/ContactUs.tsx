import {t} from 'i18next';
import React, {useState} from 'react';
import {StyleSheet, ScrollView, Text, View, Keyboard} from 'react-native';
import {axiosAPI} from '../../api/config';
import {showMessage} from 'react-native-flash-message';
import MainHeader from '../../components/headers/MainHeader';
import MainInput from '../../components/inputs/MainInput';
import SocialFollowUs from '../../components/other/SocialFollowUs';
import ColoredButton from '../../components/touchables/ColoredButton';
import SafeView from '../../components/views/SafeView';
import {GetCookie} from '../../constants/helpers';
import Colors, {
  Fonts,
  phoneWidth,
  PixelPerfect,
} from '../../styles/stylesConstants';

const ContactUs = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    enquiry: '',
  });

  const addMessage = async (cb: (success?: boolean) => void) => {
    const cookie = await GetCookie();
    try {
      const {data} = await axiosAPI.post(
        `information/contact&cookie=${cookie}`,
        state,
      );

      if (data.hasOwnProperty('continue')) {
        cb(true);
        showMessage({
          message: t('messageSent'),
          type: 'success',
        });
      } else {
        cb(false);

        const errorArr = ['error_name', 'error_email', 'error_enquiry'];
        errorArr.forEach(element => {
          if (data.hasOwnProperty(element) && data[element].trim()) {
            showMessage({
              message: data[element],
              type: 'danger',
            });
          }
        });
      }
    } catch (error) {
      cb(false);
    }
  };

  return (
    <SafeView>
      <ScrollView contentContainerStyle={{paddingBottom: PixelPerfect(100)}}>
        <MainHeader title={t('ContactUs')} />

        <Text style={styles.mainTitle}>{t('Follow us on social media')}</Text>
        <SocialFollowUs />

        <View style={styles.inputsCon}>
          <Text style={styles.mainTitle}>{t('SendInquiry')}</Text>
          <MainInput
            value={state.name}
            placeholder={t('fullName')}
            style={styles.sharedInput}
            onChangeText={(text: string) =>
              setState(old => ({...old, name: text}))
            }
          />

          <MainInput
            value={state.email}
            placeholder={t('email')}
            keyboardType="email-address"
            style={styles.sharedInput}
            onChangeText={(text: string) =>
              setState(old => ({...old, email: text}))
            }
          />

          <MainInput
            value={state.enquiry}
            placeholder={t('messageContent')}
            style={[styles.sharedInput, styles.largeInput]}
            onChangeText={(text: string) =>
              setState(old => ({...old, enquiry: text}))
            }
            multiline={true}
            underlineColorAndroid="transparent"
          />

          <ColoredButton
            title={t('send')}
            style={styles.button}
            onPress={() => {
              addMessage(success => {
                success &&
                  setState(old => ({
                    ...old,
                    name: '',
                    email: '',
                    enquiry: '',
                  })),
                  success && Keyboard.dismiss();
              });
            }}
          />
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  inputsCon: {
    alignItems: 'center',
  },
  sharedInput: {
    marginVertical: 5,
    width: phoneWidth * 0.85,
    height: 50,
  },
  button: {
    marginTop: 15,
    width: phoneWidth * 0.85,
  },
  largeInput: {
    height: 100,
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  mainTitle: {
    fontFamily: Fonts.SemiBold,
    color: Colors.black,
    fontSize: PixelPerfect(32),
    alignSelf: 'center',
    marginBottom: 17,
    marginTop: 26,
  },
});
