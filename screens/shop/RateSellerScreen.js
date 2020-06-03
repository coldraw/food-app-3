import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform, KeyboardAvoidingView, ActivityIndicator, ToastAndroid, TouchableWithoutFeedback } from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/colors';
import * as ratingsActions from '../../store/actions/ratings';

const RateSellerScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const sellerUserId = props.navigation.getParam('orderSeller');
  const ratingOrderId = props.navigation.getParam('orderId');
  const [rating, setRating] = useState(0);

  const showToast = () => {
    ToastAndroid.showWithGravity(`Rating saved!`, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const dispatch = useDispatch();

  const addRatingHandler = async () => {
    setIsLoading(true);
    await dispatch(
      ratingsActions.addRating(
        sellerUserId,
        rating,
        ratingOrderId
      )
    );
    props.navigation.navigate('Orders');
    showToast();
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}><ActivityIndicator size='large' color={Colors.lightPrimary} />
        <Text style={styles.saving}>Saving</Text></View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.detailsSection}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior='padding'
          keyboardVerticalOffset={-200}
        >
          <ScrollView>
            <View style={styles.form}>
              <View style={styles.rateOrderCard}>
                <Text style={styles.rateOrderTitle}>Rate this order:</Text>
                <Text style={styles.rateOrderItem}>the food was...</Text>
                <View style={styles.ratingHub}>
                  <View style={styles.ratingBox}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setRating(1);
                      }}
                    >
                      <View style={styles.ratingStarHolder}>
                        <Ionicons color={rating > 0 ? Colors.lightPrimary : Colors.accentTransparent} size={38} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setRating(2);
                      }}
                    >
                      <View style={styles.ratingStarHolder}>
                        <Ionicons color={rating > 1 ? Colors.lightPrimary : Colors.accentTransparent} size={38} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setRating(3);
                      }}
                    >
                      <View style={styles.ratingStarHolder}>
                        <Ionicons color={rating > 2 ? Colors.lightPrimary : Colors.accentTransparent} size={38} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setRating(4);
                      }}
                    >
                      <View style={styles.ratingStarHolder}>
                        <Ionicons color={rating > 3 ? Colors.lightPrimary : Colors.accentTransparent} size={38} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setRating(5);
                      }}
                    >
                      <View style={styles.ratingStarHolder}>
                        <Ionicons color={rating > 4 ? Colors.lightPrimary : Colors.accentTransparent} size={38} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
                {rating > 0 ? (
                  <TouchableWithoutFeedback
                    onPress={addRatingHandler}
                    useForeground
                  >
                    <View style={styles.submitRatingButton}>
                      <Text style={styles.submitRatingButtonText}>submit rating!</Text>
                    </View>
                  </TouchableWithoutFeedback>
                ) : (
                    <View style={styles.submitRatingButtonDisabled}>
                      <Text style={styles.submitRatingButtonDisabledText}>submit rating!</Text>
                    </View>
                  )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

RateSellerScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Rate order',
    headerStyle: {
      backgroundColor: Colors.lightPrimary,
      height: 80,
    },
    headerTitleStyle: {
      fontSize: 24,
      fontFamily: 'gloria-hallelujah',
      color: 'white'
    },
    headerTintColor: 'white'
  };
}

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
    marginHorizontal: 15,
  },
  screen: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(100,100,100,0.9)',
    height: 1200,
    paddingBottom: 30,
  },
  rateOrderCard: {
    padding: 30,
    justifyContent: 'flex-start',
    borderRadius: 10,
    borderColor: 'rgba(200,200,200, 0.5)',
    borderWidth: 2,
    marginHorizontal: 10,
    marginBottom: 25,
    paddingTop: 10,
    shadowColor: 'black',
    shadowOpacity: 0.36,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  saving: {
    fontFamily: 'open-sans',
    fontSize: 18,
    marginTop: 20
  },
  rateOrderTitle: {
    fontFamily: 'open-sans',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.2)',
    borderRadius: 10,
    color: Colors.darkText,
    fontSize: 18,
    paddingLeft: 20,
    marginTop: 20,
    marginLeft: -5,
  },
  rateOrderItem: {
    fontFamily: 'gloria-hallelujah',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 10,
    color: Colors.darkText,
    fontSize: 16,
    marginTop: 10,
    marginLeft: -5,
  },
  submitRatingButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: Colors.green,
    borderWidth: 1,
    padding: 5,
    marginTop: 20,
  },
  submitRatingButtonText: {
    fontSize: 18,
    fontFamily: 'open-sans',
    color: Colors.green
  },
  submitRatingButtonDisabled: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: '#888',
    borderWidth: 1,
    padding: 5,
    marginTop: 20,
  },
  submitRatingButtonDisabledText: {
    fontSize: 18,
    fontFamily: 'open-sans',
    color: '#888'
  },
  ratingHub: {
    flexDirection: 'row',
    justifyContent: 'center',
    opacity: 0.9,
  },
  ratingBox: {
    height: 50,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default RateSellerScreen;