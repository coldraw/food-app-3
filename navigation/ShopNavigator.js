import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { createSwitchNavigator } from 'react-navigation';
import { Platform, SafeAreaView, Button, View, Text, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import HomeScreen from '../screens/shop/HomeScreen';
import MenuScreen from '../screens/shop/MenuScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import EditProductScreen from '../screens/seller/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import UserAccountScreen from '../screens/user/UserAccountScreen';
import EditUserScreen from '../screens/user/EditUserScreen';
import SellerAccountScreen from '../screens/seller/SellerAccountScreen';
import EditSellerScreen from '../screens/seller/EditSellerScreen';
import SellerOrdersScreen from '../screens/seller/SellerOrdersScreen';
import RateSellerScreen from '../screens/shop/RateSellerScreen';
import ReviewSellerScreen from '../screens/shop/ReviewSellerScreen';
import * as authActions from '../store/actions/auth';
import Colors from '../constants/colors';

const defaultNavOptions = {
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  }
};

const ProductsNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Menu: MenuScreen,
    Cart: CartScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'}
          size={30}
          color={drawerConfig.tintColor}
        />
      )
    }
  },
  {
    headerLayoutPreset: 'center'
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
    RateOrder: RateSellerScreen,
    ReviewOrder: ReviewSellerScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={30}
          color={drawerConfig.tintColor} />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  });

const UsersNavigator = createStackNavigator(
  {
    Account: UserAccountScreen,
    EditAccount: EditUserScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-person' : 'ios-person'}
          size={30}
          color={drawerConfig.tintColor} />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  });

const SellersNavigator = createStackNavigator(
  {
    YumChefAccount: SellerAccountScreen,
    CreateYumChef: EditSellerScreen,
    EditYumChef: EditSellerScreen,
    SellerOrders: SellerOrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-bonfire' : 'ios-bonfire'}
          size={30}
          color={drawerConfig.tintColor} />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  });

const ShopNavigator = createDrawerNavigator(
  {
    YUMLo: {
      screen: ProductsNavigator,
      navigationOptions: {
        title: 'YUM-Lo',
        headerTitleStyle: {
          fontFamily: 'gloria-hallelujah',
          fontWeight: 400,
        }
      }
    },
    Orders: OrdersNavigator,
    Account: UsersNavigator,
    YumChefAccount: SellersNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.lightPrimary,
      itemsContainerStyle: {
        marginVertical: 20,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'rgba(128, 128, 128, 0.5)',
        borderRadius: 10,
        backgroundColor: 'white',
        fontFamily: 'gloria-hallelujah',
        fontWeight: 400,
        padding: 5
      },
      iconContainerStyle: {
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        marginVertical: 7,
        marginLeft: 15
      },
    },
    drawerBackgroundColor: Colors.lightLightAccent,
    contentComponent: props => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }} >
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }} >
            <DrawerNavigatorItems {...props} />
            <TouchableWithoutFeedback
              onPress={() => {
                dispatch(authActions.logout());
              }}
            >
              <View style={{ marginTop: 5, marginHorizontal: 40, borderRadius: 15, borderWidth: 1, borderColor: Colors.darkText, backgroundColor: Colors.accent, padding: 10, }}>
                <Text style={{ fontSize: 18, fontFamily: 'gloria-hallelujah', textAlign: 'center', }}>logout</Text>
              </View>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen
});

const CreateAccountNavigator = createStackNavigator({
  CreateAccount: EditUserScreen,
});

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
  CreateAccount: CreateAccountNavigator,
});

export default createAppContainer(MainNavigator);