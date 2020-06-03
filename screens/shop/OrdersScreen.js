import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import Colors from '../../constants/colors';
import * as orderActions from '../../store/actions/orders';

const OrdersScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const loggedInUser = useSelector(state => state.auth.userId);
  const orders = useSelector(state => state.orders.orders.filter(order => order.orderBuyerId === loggedInUser));

  const ordersReversed = orders.reverse();

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(orderActions.fetchOrders()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
        <Text style={styles.loading} >Loading orders...</Text>
      </View>
    );
  }

  if (orders.length !== 0) {
    return (
      <FlatList
        data={ordersReversed}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <OrderItem
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
            items={itemData.item.items}
            orderSeller={itemData.item.orderSellerId}
            isPaid={itemData.item.isPaid}
            deliveryStatus={itemData.item.deliveryStatus}
            orderBuyerId={itemData.item.orderBuyerId}
            orderId={itemData.item.id}
            onRateSeller={() => {
              props.navigation.navigate('RateOrder', {
                orderSeller: itemData.item.orderSellerId,
                orderId: itemData.item.id
              });
            }}
            onReviewSeller={() => {
              props.navigation.navigate('ReviewOrder', {
                orderSeller: itemData.item.orderSellerId,
                orderId: itemData.item.id
              });
            }}
          />
        )}
      />
    );
  } else {
    return (
      <View style={{ alignItems: 'center', margin: 50 }}>
        <Text style={{ textAlign: 'center', fontSize: 18, fontFamily: 'open-sans' }}>Once you place or save your first order it will appear here!</Text>
      </View>
    );
  };
};

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'YUM-Lo Orders',
    headerLeft: () => (
      <HeaderButtons
        HeaderButtonComponent={HeaderButton} >
        <Item
          title='Side Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerStyle: {
      backgroundColor: Colors.lightPrimary,
      height: 80,
    },
    headerTitleStyle: {
      fontSize: 24,
      fontFamily: 'gloria-hallelujah',
      color: 'white'
    },
    headerTintColor: 'white'
  };
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100
  },
  loading: {
    fontFamily: 'open-sans',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center'
  },
});

export default OrdersScreen;