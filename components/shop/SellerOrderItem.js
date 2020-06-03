import React, { useState } from 'react';
import { Text, View, StyleSheet, Platform, TouchableWithoutFeedback, ToastAndroid, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as sellerOrdersActions from '../../store/actions/sellerorders';
import CartItem from './CartItem';
import SellerOrderItemDummy from '../shop/SellerOrderItemDummy';
import Colors from '../../constants/colors';

const SellerOrderItem = props => {
  const [viewOrder, setViewOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDelivering, setIsDelivering] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const buyerInfo = useSelector(state => state.users.availableUsers.find(user => user.loginUUID === props.orderBuyer));
  const orderId = props.sellerOrderId;

  const showToast = () => {
    ToastAndroid.showWithGravity(`Order status updated!`, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const dispatch = useDispatch();

  const updateStatusDeliveringHandler = () => {
    if (deliveryStatus === 'delivering') {
      setIsDelivering(true);
      return;
    } else if (deliveryStatus === 'delivered') {
      setIsDelivered(true);
      return;
    } else {
      deliveryStatus = 'delivering';
      dispatch(sellerOrdersActions.updateOrderStatus(
        orderId,
        deliveryStatus
      ));
      setIsDelivering(true);
      showToast();
    }
  };

  const updateStatusDeliveredHandler = () => {
    deliveryStatus = 'delivered';
    dispatch(sellerOrdersActions.updateOrderStatus(
      orderId,
      deliveryStatus
    ));
    setIsDelivered(true);
    showToast();
  };

  let deliveryStatus = props.deliveryStatus;

  const refreshOrderItem = () => {
    setIsLoading(true);
    dispatch(sellerOrdersActions.fetchSellerOrders()).then(() => {
      setIsLoading(false);
    });
  };

  const [animation] = useState(new Animated.Value(1));

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 0.5,
      duration: 100
    }).start(() => {
      if (!isExpanded) {
        setIsExpanded(true);
      };
      if (isExpanded) {
        setIsExpanded(false);
        setViewOrder(false);
      }
      Animated.timing(animation, {
        toValue: 1,
        duration: 200
      }).start();
    })
  };

  const animatedStyles = {
    opacity: animation
  }

  if (isLoading) {
    return (
      <SellerOrderItemDummy />
    );
  } else {
    return (
      <TouchableWithoutFeedback
        onPress={startAnimation}
      >
        <Animated.View style={[styles.orderItem, animatedStyles]}>
          {isExpanded && (
            <View>
              <Text style={styles.orderNumber}>Order # {orderId}</Text>
            </View>
          )}
          <View style={styles.orderContent}>
            <View style={styles.dateBox}>
              {isExpanded && (
                <View>
                  <Text style={styles.summaryLabel}>Order date/time:</Text>
                </View>
              )}
              <Text style={styles.date}>{props.date}</Text>
            </View>
            <View style={styles.amountBox}>
              {isExpanded && (
                <View>
                  <Text style={styles.summaryLabel}>Order amount:</Text>
                </View>
              )}
              <Text style={styles.totalAmount}>$ {props.amount.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.summaryOrderStatus} >
            {isExpanded && (
              <View>
                <Text style={styles.summaryLabelStatus}>Order status: </Text>
              </View>
            )}
            <View style={styles.orderStatusBar} >
              <View style={styles.orderStatusBarItem} >
                <View style={styles.statusActive}>
                  <Text style={styles.orderStatusText}>Paid</Text>
                </View>
                <View style={styles.orderCheckmark}>
                  <Ionicons size={23} name={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} color={Colors.green} />
                </View>
              </View>
              <View style={styles.statusSeparator}>
                <Text style={{ fontSize: 28, color: '#888' }}>...</Text>
              </View>
              {deliveryStatus === "" && (
                <View style={styles.orderStatusBarItem} >
                  <View style={styles.orderStatusBarButton} >
                    <TouchableWithoutFeedback
                      useForeground
                      onPress={() => {
                        updateStatusDeliveringHandler();
                        refreshOrderItem();
                      }}
                    >
                      <View>
                        <View style={styles.statusNotActive}>
                          <Text style={styles.orderStatusText}>Delivering</Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  <View style={styles.orderCheckmark}>
                    <Ionicons size={23} name={Platform.OS === 'android' ? 'md-help' : 'ios-help'} color={'#888'} />
                  </View>
                </View>
              )}
              {deliveryStatus !== '' && (
                <View style={styles.orderStatusBarItem} >
                  <View style={styles.orderStatusBarButton} >
                    <View>
                      {deliveryStatus === "delivering" && (
                        <View style={styles.statusActive}>
                          <Text style={styles.orderStatusText}>Delivering</Text>
                        </View>
                      )}
                      {deliveryStatus === 'delivered' && (
                        <View style={styles.statusActive}>
                          <Text style={styles.orderStatusText}>Delivering</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  {deliveryStatus === 'delivering' && (
                    <View style={styles.orderCheckmark}>
                      <Ionicons size={23} name={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} color={Colors.green} />
                    </View>
                  )}
                  {deliveryStatus === 'delivered' && (
                    <View style={styles.orderCheckmark}>
                      <Ionicons size={23} name={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} color={Colors.green} />
                    </View>
                  )}
                </View>
              )}
              <View style={styles.statusSeparator}>
                <Text style={{ fontSize: 28, color: '#888' }}>...</Text>
              </View>
              {deliveryStatus === "" && (
                <View style={styles.orderStatusBarItem} >
                  <View style={styles.orderStatusBarButton} >
                    <View style={deliveryStatus === 'delivered' ? styles.statusActive : styles.statusNotActive}>
                      <Text style={styles.orderStatusText}>Delivered</Text>
                    </View>
                  </View>
                  <View style={styles.orderCheckmark}>
                    <Ionicons size={23} name={Platform.OS === 'android' ? 'md-help' : 'ios-help'} color={'#888'} />
                  </View>
                </View>
              )}
              {deliveryStatus === "delivering" && (
                <View style={styles.orderStatusBarItem} >
                  <View style={styles.orderStatusBarButton} >
                    <TouchableWithoutFeedback
                      useForeground
                      onPress={() => {
                        updateStatusDeliveredHandler();
                        refreshOrderItem();
                      }}
                    >
                      <View style={styles.statusNotActive}>
                        <Text style={styles.orderStatusText}>Delivered</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  <View style={styles.orderCheckmark}>
                    <Ionicons size={23} name={Platform.OS === 'android' ? 'md-help' : 'ios-help'} color={'#888'} />
                  </View>
                </View>
              )}
              {deliveryStatus === "delivered" && (
                <View style={styles.orderStatusBarItem} >
                  <View style={styles.orderStatusBarButton} >
                    <View style={styles.statusActive}>
                      <Text style={styles.orderStatusText}>Delivered</Text>
                    </View>
                  </View>
                  <View style={styles.orderCheckmark}>
                    <Ionicons size={23} name={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} color={Colors.green} />
                  </View>
                </View>
              )}
            </View>
            {isExpanded && (
              <View style={styles.summary}>
                <View style={styles.summaryBuyerLeft}>
                  <Text style={styles.deliverToLabel}>Please deliver to: </Text>
                </View>
                <View style={styles.summaryBuyer}>
                  <Text style={styles.deliverTo}>{buyerInfo.firstName}</Text>
                  <Text style={styles.deliverTo}>{buyerInfo.addressStreetNumber} {buyerInfo.addressStreet} st.</Text>
                  <Text style={styles.deliverTo}>{buyerInfo.addressSuburb}</Text>
                </View>
              </View>
            )}
            {!isExpanded && (
              <View>
                <Text style={styles.summaryLabel}>(tap to expand)</Text>
              </View>
            )}
          </View>
          {isExpanded && (
            <View style={styles.buttonContainer}>
              <TouchableWithoutFeedback
                useForeground
                onPress={() => {
                  setViewOrder(prevState => !prevState)
                }}
              >
                <View style={styles.showHideButton}>
                  <Text style={{ color: 'rgba(100,100,100, 1)' }}>{viewOrder ? 'hide items' : 'see items'}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
          {viewOrder && (
            <View style={styles.viewOrderItems}>
              {props.items.map(cartItem => (
                <CartItem
                  key={cartItem.productId}
                  quantity={cartItem.quantity}
                  amount={cartItem.subTotal}
                  title={cartItem.productTitle.toUpperCase()}
                />
              ))}
            </View>
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: 'black',
    shadowOpacity: 0.36,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
  },
  orderNumber: {
    fontFamily: 'open-sans',
    fontSize: 12
  },
  centered: {
    height: 215,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    margin: 5,
    marginBottom: 0,
    paddingHorizontal: 10,
  },
  amountBox: {
    alignItems: 'flex-end'
  },
  totalAmount: {
    fontFamily: 'open-sans',
    fontSize: 18,
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#888',
  },
  viewOrderItems: {
    marginTop: 10,
    width: '100%'
  },
  summary: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 5
  },
  summaryLabel: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#888',
  },
  summaryLabelStatus: {
    fontFamily: 'open-sans-bold',
    fontSize: 14,
    color: '#888',
  },
  summaryBuyerLeft: {
    width: '20%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  summaryBuyer: {
    width: '78%',
    justifyContent: 'flex-start',
    textAlign: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.green,
    borderRadius: 10,
    paddingLeft: 10,
    paddingHorizontal: 7,
    paddingVertical: 5
  },
  deliverToLabel: {
    paddingTop: 10,
    textAlign: 'center',
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#888',
  },
  deliverTo: {
    textAlign: 'left',
    fontFamily: 'open-sans',
    fontSize: 16,
    color: Colors.green,
  },
  summaryOrderStatus: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  orderStatusBar: {
    flexDirection: 'row',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -10,
  },
  orderStatusBarItem: {
    flexDirection: 'column',
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
  },
  orderStatusBarButton: {
    flexDirection: 'column',
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
    borderRadius: 10,
    overflow: 'hidden',
  },
  orderStatusText: {
    fontFamily: 'open-sans-bold',
    fontSize: 12,
    color: 'white',
  },
  orderCheckmark: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  statusSeparator: {
    width: 25,
    marginBottom: 42,
  },
  statusActive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'rgba(200,200,200, 0.5)',
    borderWidth: 2,
    backgroundColor: Colors.green,
    paddingHorizontal: 5,
    paddingTop: 1,
    paddingBottom: 3,
    width: '100%',
    height: 30
  },
  statusNotActive: {
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
    width: '100%',
    height: 30,
    overflow: 'hidden',
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  showHideButton: {
    borderRadius: 10,
    borderColor: 'rgba(200,200,200, 0.5)',
    borderWidth: 2,
    padding: 5,
    paddingHorizontal: 10,
  },
});

export default SellerOrderItem;