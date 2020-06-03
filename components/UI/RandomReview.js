import React, { useEffect, useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as reviewsActions from '../../store/actions/reviews';

const RandomReview = (props) => {
  const sellerUserId = props.sellerUserId;

  const randomReviewText = props.randomReviewText;

  // console.log(sellerRandomReviewText);
  return (
    <View>
      <Text style={styles.review}>"{randomReviewText}"</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  review: {
    fontSize: 12,
    fontFamily: 'open-sans',
    marginLeft: 15,
    marginBottom: 15,
    marginRight: 5,
    height: 100,
  },
});

export default RandomReview;