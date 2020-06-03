import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/colors';

const CartItem = props => {
  const shortenedTitle = props.title.slice(0, 16);
  const itemQuantity = props.quantity;
  const removeItem = props.onRemove;

  const [animation] = useState(new Animated.Value(1));

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200
    }).start(() => {
      removeItem();
      if (itemQuantity > 0) {
        Animated.timing(animation, {
          toValue: 1,
          duration: 100
        }).start()
      } else {
        return;
      }
    });
  };

  const animatedStyles = {
    opacity: animation
  }

  return (
    <Animated.View style={[styles.cartItem, animatedStyles]}>
      <View style={styles.itemDataTitle}>
        <View style={styles.itemDataItem}>
          <Text style={styles.title}>{shortenedTitle}{props.title.length > 16 ? '...' : ''}</Text>
        </View>
      </View>
      <View style={styles.itemData}>
        <View style={styles.itemDataItem}>
          <Text style={styles.quantity}> x {itemQuantity}</Text>
        </View>
        <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
        {props.editable && <TouchableOpacity onPress={startAnimation} style={styles.deleteButton}>
          <Ionicons
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={23}
            color={Colors.lightPrimary} />
        </TouchableOpacity>}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: Colors.accent,
    borderWidth: 1,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemDataTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDataItem: {
    marginRight: 15,
  },
  quantity: {
    fontFamily: 'open-sans',
    color: Colors.darkText,
    fontSize: 16,
  },
  title: {
    fontFamily: 'open-sans',
    fontSize: 14,
  },
  amount: {
    fontFamily: 'open-sans',
    fontSize: 16,
    width: 60,
    textAlign: 'right',
  },
  deleteButton: {
    marginLeft: 5,
  },
});

export default CartItem;