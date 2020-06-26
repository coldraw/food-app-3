import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableWithoutFeedback, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import RandomReview from '../UI/RandomReview';
import Colors from '../../constants/colors';

const MenuSlide = props => {
  const [isLoading, setIsLoading] = useState(false);
  const sellerUserId = props.sellerUserId;

  // LOGIC TO FIND AVERAGE OF ALL LOADED RATING FOR THIS SELLER
  let sellerRatingsArray = [];
  sellerRatingsArray = useSelector(state => state.ratings.ratings.filter(rating => rating.sellerUserId === sellerUserId));
  const sellerRatingsTotal = sellerRatingsArray.map((rating) => rating.rating).reduce((sum, value) => sum + value, 0);
  const currentAverageRating = (sellerRatingsTotal / sellerRatingsArray.length).toFixed(1);
  const ratingNumberOfStars = sellerRatingsArray.length === 0 ? 3 : Math.round(currentAverageRating);
  // END OF RATING LOGIC

  const sellerImageString = props.imageString;
  const base64image = `data:image/jpg;base64, ${sellerImageString}`;

  // let sellerRandomReview;
  // let randomReviewText = '';

  // const sellerReviewsArray = useCallback(async () => {
  //   setIsLoading(true);
  //   await useSelector(state => state.reviews.reviews.filter(review => review.sellerUserId === sellerUserId));
  //   sellerRandomReview = sellerReviewsArray[Math.floor(Math.random() * sellerReviewsArray.length)];
  //   randomReviewText = sellerRandomReview.review;
  //   setIsLoading(false);
  // }, [isLoading => !isLoading]);

  // console.log(randomReviewText);

  return (
    <TouchableWithoutFeedback useForeground onPress={props.onViewMenu}>
      <View style={styles.menuSlide}>
        <View style={styles.slideColumnLeft}>
          <View style={styles.imageBox}>
            <ImageBackground style={styles.image} source={{ uri: base64image }} >
              <View style={styles.ratingHub}>
                <View style={styles.ratingBox}>
                  <View style={styles.ratingStarHolder}>
                    <Ionicons color={ratingNumberOfStars > 0 ? Colors.lightPrimary : Colors.accentTransparent} size={26} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
                  </View>
                  <View style={styles.ratingStarHolder}>
                    <Ionicons color={ratingNumberOfStars > 1 ? Colors.lightPrimary : Colors.accentTransparent} size={26} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
                  </View>
                  <View style={styles.ratingStarHolder}>
                    <Ionicons color={ratingNumberOfStars > 2 ? Colors.lightPrimary : Colors.accentTransparent} size={26} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
                  </View>
                  <View style={styles.ratingStarHolder}>
                    <Ionicons color={ratingNumberOfStars > 3 ? Colors.lightPrimary : Colors.accentTransparent} size={26} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
                  </View>
                  <View style={styles.ratingStarHolder}>
                    <Ionicons color={ratingNumberOfStars > 4 ? Colors.lightPrimary : Colors.accentTransparent} size={26} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
                  </View>
                </View>
              </View>
              <View style={styles.actions}>
                <View style={styles.buttonContainer}>
                  <View style={styles.buttonEmpty}>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableWithoutFeedback onPress={props.onViewMenu} useForeground>
                    <View style={styles.buttonSeeMenu}>
                      <View style={styles.buttonSeeMenuTextBox}>
                        <Text style={styles.buttonSeeMenuText}>menu</Text>
                      </View>
                      <Ionicons color={'white'} size={24} name={Platform.OS === 'android' ? 'md-arrow-round-forward' : 'ios-arrow-round-forward'} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
        <View style={styles.slideColumnRight}>
          <View style={styles.textBox}>
            <View style={styles.menuNameContainer}>
              <Text style={styles.menuName}>{props.menuName.toUpperCase()}</Text>
            </View>
            <Text style={styles.slogan}>*{props.slogan}</Text>
            {isLoading && (
              <View>
                <ActivityIndicator size={23} color={Colors.greenTransparent} />
              </View>
            )}
            {!isLoading && (
              <View style={styles.keywordsBox}>
                <Text style={styles.keywords}>Offers gluten-free</Text>
                <Text style={styles.keywords}>Offers vegetarian</Text>
              </View>
            )}
          </View>
        </View>

      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  menuSlide: {
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    height: 255,
    width: '93%',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  slideColumnLeft: {
    flex: 5,
  },
  imageBox: {
    width: '100%',
    height: '100%'
  },
  image: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    width: '100%',
    height: '100%'
  },
  ratingHub: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  ratingBox: {
    height: 32,
    marginHorizontal: 10,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  slideColumnRight: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  menuNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
    marginHorizontal: 8,
    paddingTop: 10,
    backgroundColor: Colors.lightPrimary,
    borderRadius: 10,
    borderColor: Colors.primaryTransparent,
    borderWidth: 3,
    height: 90,
  },
  menuName: {
    fontSize: 18,
    fontFamily: 'gloria-hallelujah',
    lineHeight: 27,
    textAlign: 'center',
    color: 'white',
    elevation: 5,
  },
  slogan: {
    marginTop: 15,
    lineHeight: 20,
    fontSize: 14,
    fontFamily: 'open-sans',
    marginBottom: 10,
    textAlign: 'center',
    marginHorizontal: 10,
    height: 60,
    color: Colors.darkText
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '50%',
    marginTop: 115,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 0,
  },
  buttonSeeMenu: {
    backgroundColor: Colors.primaryTransparent,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 1,
    paddingVertical: 5,
    marginLeft: 15,
    marginTop: 8,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    height: 42,
    borderRadius: 10,
    borderColor: Colors.lightPrimary,
    borderWidth: 1,
    overflow: 'hidden'
  },
  buttonSeeMenuTextBox: {
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 3
  },
  buttonEmpty: {
    paddingVertical: 5,
    height: 30,
    marginBottom: 3,
  },
  buttonText: {
    fontFamily: 'open-sans',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 3
  },
  buttonSeeMenuText: {
    fontFamily: 'open-sans',
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  },
  keywordsBox: {
    fontSize: 12,
    fontFamily: 'open-sans',
    marginLeft: 15,
    marginRight: 5,
    marginBottom: 5,
    marginTop: 10,
    height: 55,
  },
  keywords: {
    fontSize: 12,
    fontFamily: 'open-sans',
    marginBottom: 5,
    color: Colors.darkText,
  },
});

export default MenuSlide;
