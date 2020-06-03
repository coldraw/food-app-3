import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import ReviewItem from '../shop/ReviewItem';
import Colors from '../../constants/colors';

const RatingsTab = props => {
  const ratingNumberOfStars = props.ratingNumberOfStars;
  const currentAverageRating = props.currentAverageRating;
  const sellerUserId = props.sellerUserId;
  const sellerReviews = useSelector(state => state.reviews.reviews.filter(review => review.sellerUserId === sellerUserId));

  return (
    <View style={styles.container}>
      <View style={styles.starRatingSection}>
        <View style={styles.ratingSummaryTextHolder}>
          <Text style={styles.ratingSummaryText}>On average, customers rated this Yumchef:</Text>
        </View>
        <View style={styles.ratingHub}>
          <Text style={styles.ratingNumberText}>{currentAverageRating === undefined ? '?' : currentAverageRating.slice(0, 2)}</Text>
          <Text style={styles.ratingNumberTextDecimal}>{currentAverageRating === undefined ? '' : currentAverageRating.slice(2, 3)}</Text>
          <Text style={styles.ratingNumberTextSmall}>/</Text>
          <Text style={styles.ratingNumberTextLarge}>5</Text>
        </View>
      </View>
      <View>
        <View style={styles.customerReviewsHeader}>
          <Text style={styles.reviewHeaderText}>Customer reviews:</Text>
        </View>
        <View style={styles.reviewSection}>
          <FlatList
            data={sellerReviews}
            keyExtractor={item => item.id}
            renderItem={itemData => (
              <ReviewItem
                ratingNumberOfStars={ratingNumberOfStars}
                review={itemData.item.review}
                orderId={itemData.item.reviewOrderId}
                reviewerUserId={itemData.item.orderBuyerId}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    flex: 1,
    height: 1500,
    marginBottom: 10,
  },
  starRatingSection: {
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  ratingSummaryTextHolder: {
    height: 35,
    marginTop: 20,
    width: '50%',
    flexDirection: 'row',
    marginLeft: 30,
  },
  ratingHub: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
    marginBottom: 10,
  },
  ratingNumberText: {
    fontFamily: 'open-sans-bold',
    fontSize: 50,
    color: Colors.lightPrimary,
    marginTop: 0,
  },
  ratingNumberTextDecimal: {
    fontFamily: 'open-sans-bold',
    fontSize: 40,
    color: Colors.lightPrimary,
    marginTop: 10,
  },
  ratingNumberTextSmall: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    marginHorizontal: 5,
    marginTop: 20,
  },
  ratingNumberTextLarge: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    marginTop: 20
  },
  reviewSection: {
    borderColor: Colors.lightRed,
    borderWidth: 3,
    borderRadius: 10,
    marginHorizontal: 20,
    backgroundColor: Colors.lightLightRed,
    height: 300,
    marginBottom: 20,
  },
  reviewItem: {
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    paddingTop: 10,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    alignItems: 'center',
  },
  ratingSummaryText: {
    color: Colors.darkText,
    height: 35,
    textAlign: 'left',
    fontFamily: 'open-sans',
    fontSize: 14,
  },
  customerReviewsHeader: {
    marginBottom: 10,
    borderColor: 'rgba(200,200,200,0.5)',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    width: '50%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 90,
  },
  reviewHeaderText: {
    color: Colors.lightPrimary,
    fontFamily: 'open-sans',
    fontSize: 20,
  }
});

export default RatingsTab;