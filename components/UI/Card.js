import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
  return (
    <View style={{...styles.card, ...props.style}}>
      {props.children}
    </View>
  )
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.36,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 15,
    backgroundColor: 'white',
  }
});

export default Card;