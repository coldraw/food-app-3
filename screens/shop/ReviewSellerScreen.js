import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, KeyboardAvoidingView, ActivityIndicator, ToastAndroid, TouchableWithoutFeedback, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../../constants/colors';
import * as reviewsActions from '../../store/actions/reviews';

const ReviewSellerScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const sellerUserId = props.navigation.getParam('orderSeller');
  const reviewOrderId = props.navigation.getParam('orderId');
  const [review, setReview] = useState();

  let reviewText;
  const showToast = () => {
    ToastAndroid.showWithGravity(`Review saved!`, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const dispatch = useDispatch();

  const textChangeHandler = reviewText => {
    setReview(reviewText);
    console.log(review);
  }

  const addReviewHandler = async () => {
    setIsLoading(true);
    await dispatch(
      reviewsActions.addReview(
        sellerUserId,
        review,
        reviewOrderId
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
                <Text style={styles.rateOrderTitle}>Write a review: </Text>
                <Text style={styles.rateOrderText}>- Describe your experience</Text>
                <Text style={styles.rateOrderText}>- Please note, reviews can not be edited after submitting</Text>
                <View style={styles.inputHolder}>
                  <TextInput
                    style={styles.input}
                    value={reviewText}
                    onChangeText={textChangeHandler}
                    onBlur={() => { }}
                    // onEndEditing={() => {}} --- add a tick/cross for each entry depending on validation
                    blurOnSubmit={true}
                    autoCapitalize={"sentences"}
                    autoCorrect
                    multiline
                    numberOfLines={3}
                    maxLength={90}
                  />
                </View>
                {!review ? (
                  <View style={styles.submitRatingButtonDisabled}>
                    <Text style={styles.submitRatingButtonDisabledText}>submit review!</Text>
                  </View>
                ) : (
                    <TouchableWithoutFeedback
                      onPress={addReviewHandler}
                      useForeground
                    >
                      <View style={styles.submitRatingButton}>
                        <Text style={styles.submitRatingButtonText}>submit review!</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

ReviewSellerScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Review order',
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
    backgroundColor: 'white'
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
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.2)',
    borderRadius: 10,
    color: Colors.darkText,
    fontSize: 18,
    paddingLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: -5,
  },
  rateOrderText: {
    fontFamily: 'open-sans',
    justifyContent: 'center',
    color: Colors.darkText,
    fontSize: 12,
    marginTop: 2,
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
  inputHolder: {
    marginTop: 10,
    borderColor: Colors.green,
    borderWidth: 2,
    borderRadius: 10,
  },
  input: {
    padding: 10,
    fontFamily: 'open-sans',
  },
});

export default ReviewSellerScreen;