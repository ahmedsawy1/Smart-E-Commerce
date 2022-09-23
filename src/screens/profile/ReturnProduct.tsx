import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import RoundSelector from '../../components/touchables/RoundSelector';
import MainInput from '../../components/inputs/MainInput';
import Colors, {
  ColorWithOpacity,
  Fonts,
  PixelPerfect,
} from '../../styles/stylesConstants';
import CheckBox from '../../components/touchables/CheckBox';
import ColoredButton from '../../components/touchables/ColoredButton';

import PopUp from '../../components/views/PopUp';
import {useRoute} from '@react-navigation/native';
import {axiosAPI} from '../../api/config';
import {GetCookie} from '../../constants/helpers';
import {showMessage} from 'react-native-flash-message';

const ReturnProduct = () => {
  const {params}: any = useRoute();

  const [pupUp, setpupUp] = useState({
    reason: false,
    productOpened: false,
  });

  const [name, setNames] = useState({
    name: '',
    productOpened: '',
  });

  const [reasonsData, setReasonsData] = useState([]);

  const getReasons = async () => {
    const cookie = await GetCookie();
    const {data} = await axiosAPI.get(`/account/return/add&cookie=${cookie}`);
    setReasonsData(data.return_reasons);
  };

  useEffect(() => {
    getReasons();
  }, []);

  const [state, setState] = useState({
    firstname: '',
    lastname: '',
    email: '',
    telephone: '',
    order_id: params.orderID,
    date_ordered: '',
    product: '',
    model: '',
    return_reason_id: 0,
    opened: 0,
    fault_detail: '',
    quantity: '1',
    agree: '1',
  });

  const changeAgree = () => {
    console.log(state.agree);

    if (state.agree == '0') {
      setState(old => ({...old, agree: '1'}));
    } else {
      setState(old => ({...old, agree: '0'}));
    }
  };

  const makeReturnRequest = async () => {
    try {
      const cookie = await GetCookie();
      const {data} = await axiosAPI.post(
        `/account/return/add&order_id=${params.orderProductId}&cookie=${cookie}`,
        state,
      );

      if (data.hasOwnProperty('error_warning')) {
        const errorArr = [
          'error_firstname',
          'error_lastname',
          'error_email',
          'error_telephone',
          'error_model',
          'error_reason',
          'error_fault_detail',
          'error_opened',
          'error_order_id',
          'error_quantity',
          'error_product',
          // 'error_agree',
        ];
        errorArr.forEach(element => {
          if (data.hasOwnProperty(element) && data[element].trim()) {
            showMessage({
              message: data[element],
              type: 'danger',
            });
          }
        });
      }
      console.log(data);

      if (data.hasOwnProperty('continue')) {
        showMessage({
          message: t('Request Sent'),
          type: 'success',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeView>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <MainHeader title={params ? t('Edit') : t('ReturnProduct')} />
        <View style={styles.centred}>
          <MainInput
            style={styles.sharedInputs}
            placeholder={t('firstName')}
            value={state.firstname}
            onChangeText={text => setState(old => ({...old, firstname: text}))}
          />
          <MainInput
            style={styles.sharedInputs}
            placeholder={t('lastName')}
            value={state.lastname}
            onChangeText={text => setState(old => ({...old, lastname: text}))}
          />
          <MainInput
            style={styles.sharedInputs}
            placeholder={t('email')}
            value={state.email}
            onChangeText={text => setState(old => ({...old, email: text}))}
          />
          <MainInput
            style={styles.sharedInputs}
            placeholder={t('phone')}
            value={state.telephone}
            onChangeText={text => setState(old => ({...old, telephone: text}))}
          />

          {/* <MainInput
            style={styles.sharedInputs}
            placeholder={t('ReturntNumber')}
            value={state.order_id}
            onChangeText={text => setState(old => ({...old, order_id: text}))}
          /> */}
          {/* <MainInput
            style={styles.sharedInputs}
            placeholder={t('orderDate')}
            value={state.date_ordered}
            onChangeText={text =>
              setState(old => ({...old, date_ordered: text}))
            }
          /> */}
          <MainInput
            style={styles.sharedInputs}
            placeholder={t('productName')}
            value={state.product}
            onChangeText={text => setState(old => ({...old, product: text}))}
          />
          <MainInput
            style={styles.sharedInputs}
            placeholder={t('productModel')}
            value={state.model}
            onChangeText={text => setState(old => ({...old, model: text}))}
          />

          <RoundSelector
            onPress={() => setpupUp(old => ({...old, reason: true}))}
            styleTitle={{
              color:
                state.return_reason_id == 0
                  ? ColorWithOpacity('#0D0E10', 0.5)
                  : 'black',
              fontFamily: Fonts.Regular,
            }}
            style={styles.sharedSelectors}
            title={name.name ? name.name : t('returnReason')}
            iconColor={'#B7B7B7'}
          />
          <RoundSelector
            onPress={() => setpupUp(old => ({...old, productOpened: true}))}
            styleTitle={{
              color:
                state.opened == 0 ? ColorWithOpacity('#0D0E10', 0.5) : 'black',
              fontFamily: Fonts.Regular,
            }}
            style={styles.sharedSelectors}
            title={name.productOpened ? name.productOpened : t('isProductOpen')}
            iconColor={'#B7B7B7'}
          />

          <MainInput
            value={state.opened}
            placeholder={t('otherNotes')}
            style={[styles.sharedInputs, styles.largeInput]}
            onChangeText={text => setState(old => ({...old, opened: text}))}
            multiline={true}
            underlineColorAndroid="transparent"
          />

          <CheckBox
            style={{marginVertical: 10}}
            checked={state.agree == '1' ? true : false}
            onPress={changeAgree}
            title={t('iRead')}
            diffrentTitle={t('terms')}
          />
          <ColoredButton title={t('send')} onPress={makeReturnRequest} />

          <PopUp
            visible={pupUp.reason}
            onRequestClose={() => setpupUp(old => ({...old, reason: false}))}>
            <FlatList
              contentContainerStyle={{paddingHorizontal: 16}}
              data={reasonsData}
              keyExtractor={item => item.return_reason_id}
              renderItem={({item}: any) => (
                <CheckBox
                  title={item.name}
                  onPress={() => {
                    setState(old => ({
                      ...old,
                      return_reason_id: item.return_reason_id,
                    }));
                    setNames(old => ({...old, name: item.name}));
                    setpupUp(old => ({...old, reason: false}));
                  }}
                />
              )}
            />
          </PopUp>
          <PopUp
            visible={pupUp.productOpened}
            onRequestClose={() => setpupUp(old => ({...old, reason: false}))}>
            <View style={{paddingHorizontal: 16}}>
              <CheckBox
                title={t('yes')}
                onPress={() => {
                  setState(old => ({
                    ...old,
                    opened: 1,
                  }));
                  setNames(old => ({...old, productOpened: t('yes')}));
                  setpupUp(old => ({...old, productOpened: false}));
                }}
              />
              <CheckBox
                title={t('no')}
                onPress={() => {
                  setState(old => ({
                    ...old,
                    opened: 0,
                  }));
                  setNames(old => ({...old, productOpened: t('no')}));
                  setpupUp(old => ({...old, productOpened: false}));
                }}
              />
            </View>
          </PopUp>
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default ReturnProduct;

const styles = StyleSheet.create({
  centred: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sharedInputs: {
    marginBottom: 10,
  },
  sharedSelectors: {
    backgroundColor: Colors.mainBack,
    marginBottom: 10,
    height: 50,
  },
  selectCountryText: {
    fontSize: PixelPerfect(30),
    fontFamily: Fonts.Medium,
    textAlign: 'center',
  },
  largeInput: {
    height: 100,
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
});
