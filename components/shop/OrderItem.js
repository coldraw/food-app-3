import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Animated, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import CartItem from './CartItem';
import * as orderActions from '../../store/actions/orders';
import Colors from '../../constants/colors';

const OrderItem = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewOrder, setViewOrder] = useState(false);
  const orderSellerId = props.orderSeller;
  const sellerInfo = useSelector(state => state.sellers.availableSellers.find(seller => seller.sellerUserId === orderSellerId));
  const orderId = props.orderId;
  const orderRating = useSelector(state => state.ratings.ratings.find(rating => rating.ratingOrderId === orderId));
  const orderReview = useSelector(state => state.reviews.reviews.find(review => review.reviewOrderId === orderId));

  const dispatch = useDispatch();

  const refreshOrderStatus = () => {
    setIsLoading(true);
    dispatch(orderActions.fetchOrders()).then(() => {
      setIsLoading(false);
    });
  };

  // ANIMATION LOGIC
  const [animation] = useState(new Animated.Value(1));
  const [animationHeight] = useState(new Animated.Value(200));

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 0.8,
      duration: 150
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
    });

    if (!isExpanded) {
      Animated.timing(animationHeight, {
        toValue: 350,
        duration: 200
      }).start(setIsExpanded(true));

    } else {
      setIsExpanded(false);
      setViewOrder(false);
      Animated.timing(animationHeight, {
        toValue: 200,
        duration: 300
      }).start();
    };
  };

  const startShowItemsAnimation = () => {
    if (!viewOrder) {
      Animated.timing(animationHeight, {
        toValue: 470,
        duration: 200
      }).start(setViewOrder(true));
    } else {
      Animated.timing(animationHeight, {
        toValue: 350,
        duration: 300
      }).start(setViewOrder(false));
    };
  }

  const animatedStyles = {
    opacity: animation,
    height: animationHeight
  }

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
        <View style={styles.summary}>
          <View style={styles.summarySeller}>
            {isExpanded && (
              <View>
                <Text style={styles.summaryLabel}>Ordered from: </Text>
              </View>
            )}
            <Text style={styles.orderedFrom}>{sellerInfo.menuName}</Text>
          </View>
          <View style={styles.summaryRating}>
            {!orderRating && (
              <TouchableWithoutFeedback
                onPress={props.onRateSeller}
                useForeground
                disabled={props.deliveryStatus !== 'delivered'}
              >
                <View style={props.deliveryStatus === 'delivered' ? styles.rateOrderButton : styles.rateOrderButtonDisabled}>
                  <Text style={props.deliveryStatus === 'delivered' ? styles.rateOrderButtonText : styles.rateOrderButtonDisabledText}>rate order</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            {orderRating && isExpanded && (
              <View style={styles.orderRating}>
                <Text style={styles.summaryLabel}>Your rating:</Text>
                <Text style={styles.orderRatingText}>{orderRating.rating} / 5</Text>
              </View>
            )}
            {orderRating && !isExpanded && orderReview && (
              <View style={styles.orderRating}>
                <Text style={styles.orderRatingText}>{orderRating.rating} / 5</Text>
              </View>
            )}
            {orderRating && !orderReview && (
              <TouchableWithoutFeedback
                onPress={props.onReviewSeller}
                useForeground
              >
                <View style={styles.rateOrderButton}>
                  <Text style={styles.rateOrderButtonText}>write review</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
        <View style={styles.summaryStatus}>

          {isExpanded && (
            <View style={styles.buttonContainer}>
              <TouchableWithoutFeedback
                useForeground
                onPress={refreshOrderStatus}
              >
                <View style={styles.refreshButton}>
                  <Text style={{ color: Colors.green }}>{'refresh status '}</Text>
                  <Ionicons name={Platform.OS === 'android' ? 'md-refresh' : 'ios-refresh'} color={Colors.green} size={23} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}

          <View style={styles.summary}>
            <View style={styles.summaryOrderStatus} >
              {isExpanded && (
                <View>
                  <Text style={styles.summaryLabel}>Payment status: </Text>
                </View>
              )}
              {!props.isPaid ?
                (
                  <View style={styles.statusPaid}>
                    <Text style={styles.orderStatusText}>Paid</Text>
                  </View>
                ) : (
                  <View style={styles.statusNotPaid}>
                    <Text style={styles.orderStatusText}>Pay now  </Text>
                    <Ionicons color={'white'} size={18} name={Platform.OS === 'android' ? 'md-arrow-round-forward' : 'ios-arrow-round-forward'} />
                  </View>
                )}
            </View>

            <View style={styles.summaryOrderStatus} >
              {isExpanded && (
                <View>
                  <Text style={styles.summaryLabel}>Delivery status:</Text>
                </View>
              )}
              {props.deliveryStatus === '' && (
                <View style={styles.statusNotPaid}>
                  <Text style={styles.orderStatusText}>Preparing</Text>
                </View>
              )}
              {props.deliveryStatus === 'delivering' && (
                <View style={styles.statusNotPaid}>
                  <Text style={styles.orderStatusText}>On its way!</Text>
                </View>
              )}
              {props.deliveryStatus === 'delivered' && (
                <View style={styles.statusPaid}>
                  <Text style={styles.orderStatusText}>Delivered</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        {!isExpanded && (
          <View style={styles.buttonContainerNoMargin}>
            <View style={styles.showHideButtonNoBorder}>
              <Text style={{ color: 'rgba(100,100,100, 1)' }}>(tap to expand)</Text>
            </View>
          </View>

        )}
        {isExpanded && (

          <View style={styles.buttonContainer}>
            <TouchableWithoutFeedback
              useForeground
              onPress={startShowItemsAnimation}
            >
              <View style={styles.showHideButton}>
                <Text style={{ color: 'rgba(100,100,100, 1)' }}>{viewOrder ? 'hide items' : 'see items'}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

        )}
        {viewOrder && (
          <View style={styles.viewOrderItems}>
            <FlatList
              data={props.items}
              keyExtractor={item => item.productId}
              renderItem={itemData =>
                <CartItem
                  quantity={itemData.item.quantity}
                  title={itemData.item.productTitle}
                  amount={itemData.item.subTotal}
                />}
            />
          </View>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  )
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
  orderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    margin: 5,
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
    height: 150,
  },
  summary: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    marginTop: 5,
    alignItems: 'center',
  },
  summaryStatus: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: 5,
    marginTop: 5,
    borderWidth: 1,
    borderColor: Colors.greenTransparent,
    borderRadius: 10,
  },
  summaryLabel: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#888',
  },
  summarySeller: {
    width: '50%',
    justifyContent: 'flex-start',
    marginLeft: 10,

  },
  summaryRating: {
    width: '50%',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  orderedFrom: {
    fontFamily: 'open-sans-bold',
    fontSize: 15,
    color: Colors.darkText,
  },
  summaryOrderStatus: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderStatusText: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: 'white',
  },
  statusPaid: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'rgba(200,200,200, 0.5)',
    borderWidth: 2,
    backgroundColor: Colors.green,
    marginTop: 5,
    paddingHorizontal: 8,
    paddingTop: 1,
    paddingBottom: 3,
    width: '80%',
    height: 40
  },
  statusNotPaid: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'rgba(200,200,200, 0.5)',
    borderWidth: 2,
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingTop: 1,
    paddingBottom: 3,
    width: '80%',
    height: 40
  },
  buttonRow: {
    flexDirection: 'row',
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 30,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  buttonContainerNoMargin: {
    marginHorizontal: 30,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  showHideButton: {
    borderRadius: 10,
    borderColor: 'rgba(200,200,200, 0.5)',
    borderWidth: 2,
    padding: 5,
    paddingHorizontal: 10,
  },
  showHideButtonNoBorder: {
    paddingHorizontal: 10,
  },
  refreshButton: {
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: Colors.green,
    borderWidth: 1,
    padding: 5,
    paddingHorizontal: 10,
  },
  rateOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: Colors.green,
    borderWidth: 2,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingTop: 1,
    paddingBottom: 3,
    marginRight: 20,
    width: '65%',
    height: 35,
    marginTop: 1,
  },
  rateOrderButtonDisabled: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'rgba(100,100,100, 0.5)',
    borderWidth: 2,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingTop: 1,
    paddingBottom: 3,
    marginRight: 20,
    marginTop: 1,
    width: '65%',
    height: 35,
  },
  rateOrderButtonText: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: Colors.green,
  },
  rateOrderButtonDisabledText: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: 'rgba(100,100,100,0.5)',
  },
  orderRating: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 20,
  },
  orderRatingText: {
    fontFamily: 'gloria-hallelujah',
    fontSize: 18,
  },
});

export default OrderItem;