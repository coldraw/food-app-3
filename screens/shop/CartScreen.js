import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, ActivityIndicator, Image, ToastAndroid, AlertIOS, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';

const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartSellerId = useSelector(state => state.cart.cartSellerId);

  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        subTotal: state.cart.items[key].subTotal,
        productSeller: state.cart.items[key].productSeller,
      });
    }
    return transformedCartItems.sort(
      (a, b) => a.productId > b.productId ? 1 : -1
    );
  });

  const dispatch = useDispatch();

  const showToast = () => {
    ToastAndroid.showWithGravity(`order saved to "ORDERS"`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
    showToast();
    setIsLoading(false);
  }

  const cartSeller = useSelector(state => state.sellers.availableSellers.find(seller => seller.sellerUserId === cartSellerId));
  const cartUser = useSelector(state => state.users.availableUsers.find(user => user.loginUUID === state.auth.userId));

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.orderTitleBox}>
          <Text style={styles.orderTitle}>Order # (unsaved)</Text>
        </View>
        <View style={styles.topSummary}>
          <View style={styles.leftSummary}>
            <View style={styles.addressDetailsBox}>
              <Text style={styles.addressDetailsText}>Your order will be delivered to: </Text>
              <View style={styles.addressLine}>
                <Text style={styles.addressDetails}>{cartUser.addressStreetNumber}</Text>
                <Text style={styles.addressDetails}>{cartUser.addressStreet} st.</Text>
              </View>
              <Text style={styles.addressDetails}>{cartUser.addressSuburb}</Text>
              <View style={styles.addressLine}>
                <Text style={styles.addressDetails}>{cartUser.addressState}</Text>
                <Text style={styles.addressDetails}>{cartUser.addressPostCode}</Text>
              </View>
            </View>
          </View>
          <View style={styles.rightSummary}>
            <View style={styles.summary}>
              <View style={styles.buttonHub}>
                <View style={styles.summaryPriceBox}>
                  <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  <View style={styles.saveOrderButtonDisabled}>
                    <Text style={styles.payButtonText}>Order & Pay</Text>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  {isLoading ? (<ActivityIndicator size='small' color={Colors.lightPrimary} />
                  ) : (
                      <TouchableWithoutFeedback
                        onPress={sendOrderHandler}
                        disabled={cartTotalAmount === 0}
                      >
                        <View style={cartTotalAmount === 0 ? styles.saveOrderButtonDisabled : styles.saveOrderButton}>
                          <Text style={styles.payButtonText}>Save order</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    )}
                </View>
              </View>
            </View>
          </View>
        </View>
        {cartTotalAmount !== 0 ? (
          <View style={styles.bottomSummary}>
            <View style={styles.orderItemsSection}>
              <Text style={styles.orderTitle}>Order items:</Text>
              <Text style={styles.orderTitleScroll}>(scroll down for more items)</Text>
            </View>
            <View style={styles.orderItemsSectionLabels}>
              <Text style={styles.orderItemLabelTitle}>Item</Text>
              <Text style={styles.orderItemLabelQuantity}>Qty</Text>
              <Text style={styles.orderItemLabelSubtotal}>Subtotal</Text>
            </View>
            <View style={styles.cartItemList}>
              <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData =>
                  <CartItem
                    quantity={itemData.item.quantity}
                    title={itemData.item.productTitle}
                    amount={itemData.item.subTotal}
                    editable
                    onRemove={() => {
                      dispatch(cartActions.removeFromCart(itemData.item.productId));
                    }}
                  />}
              />
            </View>
            <View style={styles.cartSellerHub}>
              <View style={styles.sellerInfoContainer}>
                <Text style={styles.sellerInfoText}>Prepared and delivered by:</Text>
                <Text style={styles.sellerInfoTitle}>{cartSeller.menuName}</Text>
              </View>
              <Image
                style={styles.imagePreview}
                source={{
                  uri: cartSeller.imageUrl,
                }} />
            </View>
          </View>
        ) : (
            <View style={styles.bottomSection}>
              <Text style={styles.bottomSectionMsg}>Items will appear here when you add them to the cart...</Text>
            </View>
          )}
      </View>
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'YUM-Lo Cart',

  headerStyle: {
    backgroundColor: Colors.lightPrimary,
    height: 70,
  },
  headerTitleStyle: {
    fontSize: 24,
    fontFamily: 'gloria-hallelujah'
  },
  headerTintColor: 'white'
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    borderRadius: 20,
    margin: 20,
    backgroundColor: 'white',
  },
  orderTitleBox: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 20,
    marginTop: 5,
  },
  orderItemsSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderTitle: {
    fontFamily: 'open-sans',
    fontSize: 16,
    marginTop: 15,
  },
  orderTitleScroll: {
    fontFamily: 'open-sans',
    fontSize: 12,
  },
  orderItemsSectionLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30
  },
  orderItemLabelTitle: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: Colors.darkGrey,
  },
  orderItemLabelQuantity: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: Colors.darkGrey,
    marginLeft: 105,
  },
  orderItemLabelSubtotal: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: Colors.darkGrey,
    marginRight: 15,
  },
  topSummary: {
    flexDirection: 'row',
    height: 130,
  },
  leftSummary: {
    width: '50%'
  },
  rightSummary: {
    width: '50%'
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 1,
    paddingHorizontal: 10,
    shadowColor: 'black',
    shadowOpacity: 0.36,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  addressDetailsBox: {
    marginLeft: 20,
    marginTop: 25,
    textAlign: 'left',
  },
  addressLine: {
    flexDirection: 'row'
  },
  addressDetailsText: {
    fontFamily: 'open-sans',
    fontSize: 12,
  },
  addressDetails: {
    fontFamily: 'open-sans',
    fontSize: 14,
    marginRight: 5,
    marginTop: 5,
  },
  summaryPriceBox: {
    marginTop: -32,
    paddingBottom: 30,
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 10,
    borderBottomColor: 'rgba(200,200,200, 0.5)',
    borderBottomWidth: 5,
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 20,
    color: Colors.darkText,
  },
  amount: {
    fontFamily: 'open-sans',
    fontSize: 22,
    color: Colors.darkText,
  },
  buttonHub: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  buttonContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden'
  },
  cartSellerHub: {
    flexDirection: 'row',
    padding: 20,
    width: '100%',
    height: 150,
    paddingHorizontal: 40,
  },
  imagePreview: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.5)',
    borderRadius: 10,
    padding: 5,
    marginLeft: 10,
  },
  sellerInfoContainer: {
    margin: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sellerInfoTitle: {
    fontFamily: 'open-sans',
    fontSize: 18,
    margin: 5
  },
  sellerInfoText: {
    fontFamily: 'open-sans',
    fontSize: 14,
    margin: 0
  },
  bottomSummary: {
    width: '100%'
  },
  bottomSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 90,
    flexDirection: 'column',
    borderColor: Colors.primaryTransparent,
    borderWidth: 2,
    borderRadius: 15,
    marginHorizontal: 30,
    paddingVertical: 20,
  },
  bottomSectionMsg: {
    color: Colors.primaryTransparent,
    width: 200,
    fontFamily: 'open-sans',
    fontSize: 14,
  },
  payButton: {
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'rgba(200,200,200, 0.5)',
    borderWidth: 2,
    backgroundColor: Colors.accent,
    paddingHorizontal: 5,
    paddingTop: 1,
    paddingBottom: 3,
    width: 95,
    height: 40
  },
  payButtonText: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: 'white',
  },
  saveOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'rgba(200,200,200, 0.5)',
    borderWidth: 2,
    backgroundColor: Colors.accent,
    paddingHorizontal: 5,
    paddingTop: 1,
    paddingBottom: 3,
    width: 95,
    height: 40
  },
  saveOrderButtonDisabled: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'rgba(200,200,200, 0.5)',
    borderWidth: 2,
    backgroundColor: 'rgba(100,100,100,0.3)',
    paddingHorizontal: 5,
    paddingTop: 1,
    paddingBottom: 3,
    width: 95,
    height: 40
  },
  cartItemList: {
    height: 160,
  }
});

export default CartScreen;