import React from 'react';
import { Text, View, StyleSheet, Platform, TouchableWithoutFeedback, ToastAndroid, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CartItem from './CartItem';
import Colors from '../../constants/colors';

const SellerOrderItem = props => {

  return (
    <View style={styles.orderItem}>
      <View style={styles.orderContent}>
        <View style={styles.dateBox}>

          <Text style={styles.date}></Text>
        </View>
        <View style={styles.amountBox}>

          <Text style={styles.totalAmount}></Text>
        </View>
      </View>
      <View style={styles.summaryOrderStatus} >

        <View style={styles.orderStatusBar} >
          <View style={styles.orderStatusBarItem} >
            <View style={styles.statusActive}>
              <Text style={styles.orderStatusText}>Paid</Text>
            </View>
            <View style={styles.orderCheckmark}>
              <Ionicons size={23} name={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} color={Colors.greenTransparent} />
            </View>
          </View>
          <View style={styles.statusSeparator}>
            <Text style={{ fontSize: 28, color: '#888' }}>...</Text>
          </View>

          <View style={styles.orderStatusBarItem} >
            <View style={styles.orderStatusBarButton} >

              <View>
                <View style={styles.statusNotActive}>
                  <Text style={styles.orderStatusText}>Delivering</Text>
                </View>
              </View>

            </View>
            <View style={styles.orderCheckmark}>
              <Ionicons size={23} name={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} color={'rgba(57, 184, 91, 0.5)'} />
            </View>
          </View>

          <View style={styles.statusSeparator}>
            <Text style={{ fontSize: 28, color: '#888' }}>...</Text>
          </View>

          <View style={styles.orderStatusBarItem} >
            <View style={styles.orderStatusBarButton} >
              <View style={styles.statusNotActive}>
                <Text style={styles.orderStatusText}>Delivered</Text>
              </View>
            </View>
            <View style={styles.orderCheckmark}>
              <Ionicons size={23} name={Platform.OS === 'android' ? 'md-help' : 'ios-help'} color={'rgba(200,200,200, 0.5)'} />
            </View>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.summaryLabel}>(tap to expand)</Text>
      </View>
    </View>
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
    backgroundColor: 'rgba(57, 184, 91, 0.5)',
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
    backgroundColor: 'rgba(255, 185, 56, 0.5)',
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