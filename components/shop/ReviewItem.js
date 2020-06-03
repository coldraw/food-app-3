import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/colors';

const ReviewItem = props => {
  const reviewerUserId = props.reviewerUserId;
  const reviewOrderId = props.orderId;
  const reviewer = useSelector(state => state.users.availableUsers.find(user => user.loginUUID === reviewerUserId));
  const reviewRating = useSelector(state => state.ratings.ratings.find(rating => rating.ratingOrderId === reviewOrderId));

  return (
    <View style={styles.reviewItem}>
      <Text style={styles.labelText}>{reviewer.displayName} said:</Text>
      <Text style={styles.reviewItemText}>"{props.review}"</Text>
      <View style={styles.ratingHubSmall}>
        <View style={styles.ratingBoxSmall}>
          <View style={styles.ratingStarHolder}>
            <Ionicons color={reviewRating.rating > 0 ? Colors.lightPrimary : Colors.accentTransparent} size={18} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
          </View>
          <View style={styles.ratingStarHolder}>
            <Ionicons color={reviewRating.rating > 1 ? Colors.lightPrimary : Colors.accentTransparent} size={18} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
          </View>
          <View style={styles.ratingStarHolder}>
            <Ionicons color={reviewRating.rating > 2 ? Colors.lightPrimary : Colors.accentTransparent} size={18} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
          </View>
          <View style={styles.ratingStarHolder}>
            <Ionicons color={reviewRating.rating > 3 ? Colors.lightPrimary : Colors.accentTransparent} size={18} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
          </View>
          <View style={styles.ratingStarHolder}>
            <Ionicons color={reviewRating.rating > 4 ? Colors.lightPrimary : Colors.accentTransparent} size={18} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
          </View>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  ratingHubSmall: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    opacity: 0.8,
  },
  ratingBoxSmall: {
    height: 24,
    marginTop: 10,
    marginLeft: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: Colors.lightRed,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 10,
    borderColor: Colors.primaryTransparent,
    borderWidth: 2
  },
  ratingStarHolder: {
    marginHorizontal: 2,
  },
  reviewItem: {
    height: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    paddingTop: 10,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    borderRadius: 8,
    marginHorizontal: 5,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  reviewItemText: {
    color: Colors.darkText,
    height: 35,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'open-sans',
    fontSize: 12,
  },
  labelText: {
    fontFamily: 'open-sans',
    fontSize: 11,
    color: Colors.darkText
  },
});

export default ReviewItem;