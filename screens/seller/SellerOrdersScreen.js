import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import SellerOrderItem from '../../components/shop/SellerOrderItem';
import Colors from '../../constants/colors';
import * as sellerOrdersActions from '../../store/actions/sellerorders';

const SellerOrdersScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const loggedInSeller = useSelector(state => state.auth.userId);
  const sellerOrders = useSelector(state => state.sellerOrders.sellerOrders.filter(sellerOrders => sellerOrders.orderSellerId === loggedInSeller));

  const sellerOrdersReversed = sellerOrders.reverse();

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(sellerOrdersActions.fetchSellerOrders()).then(() => {
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
  };

  if (sellerOrders.length !== 0) {
    return (
      <FlatList
        data={sellerOrdersReversed}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <SellerOrderItem
            sellerOrderId={itemData.item.id}
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
            items={itemData.item.items}
            orderBuyer={itemData.item.orderBuyerId}
            isPaid={itemData.item.isPaid}
            deliveryStatus={itemData.item.deliveryStatus}
          />
        )}
      />
    );
  } else if (sellerOrders.length === 0) {
    return (
      <View style={{ alignItems: 'center', margin: 50 }}>
        <Text style={{ textAlign: 'center', fontSize: 18, fontFamily: 'open-sans' }}>Once you receive your first order it will appear here!</Text>
      </View>
    );
  };
};

SellerOrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Orders received',
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

export default SellerOrdersScreen;