import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {t} from 'i18next';
import {Linking, Pressable, StyleSheet} from 'react-native';
import {View, Image, Text, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import GuestCheckoutScreen from '../screens/cart/checkout/GuestCheckoutScreen';
import ForgetPass from '../screens/auth/ForgetPass';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import RegisterSuccess from '../screens/auth/RegisterSuccess';
import ResetPass from '../screens/auth/ResetPass';
import HomeScreen from '../screens/home/HomeScreen';
import CategoriesScreen from '../screens/categories/CategoriesScreen';
import CatgeoryOverview from '../screens/categories/CatgeoryOverview';
import SearchScreen from '../screens/search/SearchScreen';
import MyProfile from '../screens/profile/MyProfile';
import MoreScreen from '../screens/more/MoreScreen';
import CartScreen from '../screens/cart/CartScreen';
import ProductOverview from '../screens/product/ProductOverview';
import AboutUs from '../screens/more/AboutUs';
import ContactUs from '../screens/more/ContactUs';
import SettingsScreen from '../screens/more/SettingsScreen';
import EditInfoScreen from '../screens/profile/EditInfoScreen';
import EditPassword from '../screens/profile/EditPassword';
import MailingList from '../screens/profile/MailingList';
import FavoriteScreen from '../screens/profile/FavoriteScreen';
import AddressBook from '../screens/profile/AddressBook';
import Colors, {
  Fonts,
  phoneHeight,
  PixelPerfect,
} from '../styles/stylesConstants';
import {
  CartIcon,
  DepartmentsIcon,
  HomeIcon2,
  ProfileIcon,
  ThreeDotsIcon,
} from '../assets/svg/icons';
import OrderSuccess from '../screens/cart/OrderSuccess';
import CheckoutScreen from '../screens/cart/checkout/CheckoutScreen';
import MyOrders from '../screens/cart/MyOrders';
import ReturnsScreen from '../screens/cart/ReturnsScreen';
import OrderOverview from '../screens/cart/OrderOverview';
import MyRewards from '../screens/profile/MyRewards';
import VoiceSearch from '../screens/search/VoiceSearch';
import ReturnOverview from '../screens/cart/ReturnOverview';
import AddAddress from '../screens/profile/AddAddress';
import TermsConditions from '../screens/more/TermsConditions';
import ShippingAndDliver from '../screens/more/ShippingAndDliver';
import ReturnsPolicy from '../screens/more/ReturnsPolicy';
import Privacy from '../screens/more/Privacy';
import CompareProducts from '../screens/product/CompareProducts';
import ReturnProduct from '../screens/profile/ReturnProduct';
import ShowMore from '../screens/home/ShowMore';
import {SharedStyles} from '../styles/sharedStyles';
import EmailSent from '../screens/auth/EmailSent';
import {NavigationProps} from '../constants/interfaces';
import {RootState} from '../store/store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getAllUrlParams} from '../constants/helpers';

const Stack = createStackNavigator();

function MainTabs({active}) {
  const navigation: NavigationProps = useNavigation();
  return (
    <View style={styles.imageBackgroundCon}>
      <Image
        source={require('../assets/main/curveTabs.png')}
        resizeMode="stretch"
        style={styles.imageBackground}
      />
      <View style={styles.allTabsCon}>
        <Pressable
          style={styles.tabCon}
          onPress={() => {
            navigation.navigate('MyProfile');
          }}>
          <View style={styles.tabSpace}>
            <ProfileIcon
              color={active == 'MyProfile' ? Colors.black : Colors.medGray}
            />
          </View>
          <Text
            style={[
              styles.tabName,
              {
                color: active == 'MyProfile' ? Colors.black : Colors.medGray,
              },
            ]}>
            {t('myAccount')}
          </Text>
        </Pressable>

        <Pressable
          style={styles.tabCon}
          onPress={() => {
            navigation.navigate('CartScreen');
          }}>
          <View style={styles.tabSpace}>
            {/* <AntDesign
              name="shoppingcart"
              size={PixelPerfect(55)}
              color={active == 'CartScreen' ? Colors.black : Colors.medGray}
            /> */}

            <CartIcon
              color={active == 'CartScreen' ? Colors.black : Colors.medGray}
            />
          </View>
          <Text
            style={[
              styles.tabName,
              {
                color: active == 'CartScreen' ? Colors.black : Colors.medGray,
              },
            ]}>
            {t('cart')}
          </Text>
        </Pressable>

        <Pressable
          style={styles.tabCon}
          onPress={() => navigation.navigate('HomeScreen')}>
          <View
            style={{
              height: '100%',
              marginBottom: PixelPerfect(100),
            }}>
            {/* <HomeIcon hasLinear={active == 'HomeScreen' ? true : false} /> */}

            <HomeIcon2 isActive={active == 'HomeScreen' ? true : false} />
          </View>
        </Pressable>

        <Pressable
          style={styles.tabCon}
          onPress={() => navigation.navigate('CategoriesScreen')}>
          <View style={styles.tabSpace}>
            <DepartmentsIcon
              color={
                active == 'CategoriesScreen' || active == 'CatgeoryOverview'
                  ? Colors.black
                  : Colors.medGray
              }
            />
          </View>
          <Text
            style={[
              styles.tabName,
              {
                color:
                  active == 'CategoriesScreen' || active == 'CatgeoryOverview'
                    ? Colors.black
                    : Colors.medGray,
              },
            ]}>
            {t('categories')}
          </Text>
        </Pressable>

        <Pressable
          style={styles.tabCon}
          onPress={() => navigation.navigate('MoreScreen')}>
          <View style={styles.tabSpace}>
            <ThreeDotsIcon
              color={active == 'MoreScreen' ? Colors.black : Colors.medGray}
            />
          </View>
          <Text
            style={[
              styles.tabName,
              {
                color: active == 'MoreScreen' ? Colors.black : Colors.medGray,
              },
            ]}>
            {t('more')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// export const navigationLinking: LinkingOptions = {
//   prefixes: [
//     'https://tumerfashion.com',
//     'https://*.tumerfashion.com',
//     'tumerfashion://',
//     // 'org.reactjs.native.example.tumerfashion.payments://',
//   ],
//   async getInitialURL() {
//     const url = await Linking.getInitialURL();
//     if (url != null) {
//       let mainUrl;
//       if (url.includes('code')) {
//         let fullUrl = url.toString().split('/');
//         mainUrl = fullUrl[3] + '/register/' + url.split('=')[1];
//         return 'tumerfashion://' + mainUrl;
//       }
//     }
//     return url;
//   },
//   config: {
//     screens: {
//       ResetPass: 'shop/index.php?route=account/reset/:cookie/:code',
//     },

//     // ResetPassword:
//     // ':storeLang/auth/resetPassword/:userName/:requestID/:requestDate',
//   },
// };

export const navigationLinking = {
  prefixes: [
    'https://tumerfashion.com',
    'https://*.tumerfashion.com',
    'tumerfashion://',
  ],
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url != null) {
      let urlParams = getAllUrlParams(url);
      if (urlParams?.code) {
        let mainUrl = '/ResetPass/' + urlParams?.cookie + '/' + urlParams?.code;
        return 'tumerfashion://' + mainUrl;
      }
    }
    return url;
  },
  config: {screens: {ResetPass: 'ResetPass/:cookie/:code'}},
};

export default function Navigation(props) {
  const {isSignedIn} = useSelector((state: RootState) => state.authReducer);
  const route = props.routeName;
  const navigation: NavigationProps = useNavigation();

  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!isSignedIn && (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="ResetPass" component={ResetPass} />
            <Stack.Screen name="ForgetPass" component={ForgetPass} />
            <Stack.Screen name="RegisterSuccess" component={RegisterSuccess} />
            <Stack.Screen name="EmailSent" component={EmailSent} />
          </>
        )}

        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="MoreScreen" component={MoreScreen} />
        <Stack.Screen name="ShowMore" component={ShowMore} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="ProductOverview" component={ProductOverview} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="EditInfoScreen" component={EditInfoScreen} />
        <Stack.Screen name="EditPassword" component={EditPassword} />
        <Stack.Screen name="MailingList" component={MailingList} />
        <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
        <Stack.Screen name="AddressBook" component={AddressBook} />
        <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        <Stack.Screen
          name="GuestCheckoutScreen"
          component={GuestCheckoutScreen}
        />
        <Stack.Screen name="MyOrders" component={MyOrders} />
        <Stack.Screen name="ReturnsScreen" component={ReturnsScreen} />
        <Stack.Screen name="OrderOverview" component={OrderOverview} />
        <Stack.Screen name="MyRewards" component={MyRewards} />
        <Stack.Screen name="VoiceSearch" component={VoiceSearch} />
        <Stack.Screen name="ReturnOverview" component={ReturnOverview} />
        <Stack.Screen name="AddAddress" component={AddAddress} />
        <Stack.Screen name="CatgeoryOverview" component={CatgeoryOverview} />
        <Stack.Screen name="TermsConditions" component={TermsConditions} />
        <Stack.Screen name="CompareProducts" component={CompareProducts} />
        <Stack.Screen name="ReturnProduct" component={ReturnProduct} />
        <Stack.Screen name="ShippingAndDliver" component={ShippingAndDliver} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="ReturnsPolicy" component={ReturnsPolicy} />
      </Stack.Navigator>

      {route == 'HomeScreen' ||
      route == 'CartScreen' ||
      route == 'MoreScreen' ||
      route == 'MyProfile' ||
      route == 'CategoriesScreen' ||
      route == 'CatgeoryOverview' ||
      route == 'SearchScreen' ||
      route == 'VoiceSearch' ||
      route == 'OrderSuccess' ? (
        <MainTabs active={route} />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  imageBackgroundCon: {
    zIndex: Platform.OS === 'android' ? 1 : 0,
    width: '100%',
  },
  imageBackground: {
    height: phoneHeight * 0.18,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  allTabsCon: {
    height: phoneHeight * 0.12,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  tabCon: {
    flex: 1,
    ...SharedStyles.centred,
  },
  tab: {
    height: 50,
    width: 50,
  },
  tabName: {
    fontFamily: Fonts.Medium,
    fontSize: PixelPerfect(25),
    marginBottom: 20,
    color: Colors.lightGray,
  },
  tabSpace: {
    ...SharedStyles.centred,
    height: PixelPerfect(100),
  },
});
