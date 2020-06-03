import React, { useEffect, useCallback, useReducer, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform, Alert, KeyboardAvoidingView, ActivityIndicator, ToastAndroid, TouchableWithoutFeedback } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/colors';
import HeaderButton from '../../components/UI/HeaderButton';
import ImagePicker from '../../components/UI/ImagePicker';
import * as sellerActions from '../../store/actions/sellers';
import Input from '../../components/UI/Input';
import InputTall from '../../components/UI/InputTall';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const EditSellerScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // PHOTO SETUP
  const sellerId = props.navigation.getParam('sellerId');
  const [sellerImage, setSellerImage] = useState();

  const photoTakenHandler = imagePath => {
    setSellerImage(imagePath);
  };

  // END PHOTO SETUP
  const userId = useSelector(state => state.auth.userId);
  const editedSeller = useSelector(
    state => state.sellers.availableSellers.find(seller => seller.sellerUserId === userId)
  );
  console.log('EditSellerScreen: ', + editedSeller ? 'edit mode' : 'create mode');

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      menuName: editedSeller ? editedSeller.menuName : '',
      imageUrl: editedSeller ? editedSeller.imageUrl : '',
      slogan: editedSeller ? editedSeller.slogan : '',
    },
    inputValidities: {
      menuName: editedSeller ? true : false,
      imageUrl: editedSeller ? true : false,
      slogan: editedSeller ? true : false,
    },
    formIsValid: editedSeller ? true : false
  });

  // PHOTO UPLOAD LOGIC and SETUP


  const dispatch = useDispatch();

  const showToast = () => {
    ToastAndroid.showWithGravity(`Yumchef details saved!`, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'OK' }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Invalid seller details', 'Please check for input errors.', [
        { text: 'OK' }
      ]);
      return;
    }
    setError(false);
    setIsLoading(true);

    try {
      if (editedSeller) {
        await dispatch(
          sellerActions.updateSeller(
            editedSeller.id,
            formState.inputValues.menuName,
            formState.inputValues.imageUrl,
            formState.inputValues.slogan,
            sellerImage,
          )
        );
      } else {
        await dispatch(
          sellerActions.createSeller(
            formState.inputValues.menuName,
            formState.inputValues.imageUrl,
            formState.inputValues.slogan,
            sellerImage,
          )
        );
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
    props.navigation.navigate('Startup');
    showToast();
  }, [dispatch, userId, formState, sellerImage]
  );

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const deleteSellerHandler = async () => {
    await dispatch(sellerActions.deleteSeller(editedSeller.id));
    props.navigation.navigate('Startup');
    showToast();
  }

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  const currentImage = editedSeller ? `data:image/jpg;base64, ${editedSeller.imageString}` : '';

  if (isLoading) {
    return (
      <View style={styles.centered}><ActivityIndicator size='large' color={Colors.lightPrimary} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior='padding'
        keyboardVerticalOffset={-200}
      >
        <ScrollView>
          <View style={styles.detailsSection}>
            <View style={styles.form}>
              <View style={styles.detailItem}>
                <Input
                  id='menuName'
                  label='Menu name:'
                  inputErrorMsg="*menu name"
                  keyboardType='default'
                  maxLength={21}
                  // returnKeyType='next'
                  onInputChange={inputChangeHandler}
                  initialValue={editedSeller ? editedSeller.menuName : ''}
                  initiallyValid={!!editedSeller}
                  required
                />
              </View>
              <View style={styles.imagePickerHolder}>
                <ImagePicker
                  onPhotoTaken={photoTakenHandler}
                  currentImage={currentImage}
                />
              </View>
              <View style={styles.detailItemTall}>
                <InputTall
                  id='imageUrl'
                  label='image URL(optional)'
                  inputErrorMsg="*image URL"
                  keyboardType='default'
                  // returnKeyType='next'
                  onInputChange={inputChangeHandler}
                  initialValue={editedSeller ? editedSeller.imageUrl : ''}
                  initiallyValid={true}
                  required
                />
              </View>
              <View style={styles.detailItemTall}>
                <InputTall
                  id='slogan'
                  label='Menu slogan:'
                  inputErrorMsg="*slogan"
                  keyboardType='default'
                  // returnKeyType='next'
                  onInputChange={inputChangeHandler}
                  initialValue={editedSeller ? editedSeller.slogan : ''}
                  initiallyValid={!!editedSeller}
                  required
                  maxLength={32}
                />
              </View>
            </View>
          </View>
          {editedSeller && (
            <View style={styles.yumchefControls}>
              <View style={styles.buttonContainerDelete}>
                <TouchableWithoutFeedback onPress={deleteSellerHandler}>
                  <View style={styles.buttonDelete}>
                    <Text style={styles.buttonText}>Delete yumchef</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

EditSellerScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam('submit');

  return {
    headerTitle: 'Yumchef',
    headerStyle: {
      backgroundColor: Colors.lightPrimary,
      height: 80,
    },
    headerTitleStyle: {
      fontSize: 24,
      fontFamily: 'gloria-hallelujah',
    },
    headerTintColor: 'white',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Save'
          iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
          onPress={submitFn}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: 25,
    width: '100%',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailItem: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 15,
  },
  detailItemTall: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 15,
  },
  text: {
    fontFamily: 'open-sans',
    width: 170,
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.5)',
    borderRadius: 10,
    color: Colors.darkText,
    marginVertical: 5,
  },
  rating: {
    fontFamily: 'open-sans',
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.5)',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    color: Colors.darkText,
    marginBottom: 5,
    marginRight: 20,
    marginLeft: 38,
    marginTop: 5,
  },
  slogan: {
    height: 80,
    fontFamily: 'open-sans',
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.5)',
    borderRadius: 10,
    paddingVertical: 5,
    color: Colors.darkText,
    padding: 10,
    marginRight: 20,
    marginLeft: -5,
  },
  form: {
    marginTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  inputErrorMsg: {
    color: Colors.lightPrimary
  },
  yumchefControls: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    margin: 5,
    paddingHorizontal: 10,
  },
  buttonDelete: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'rgba(200,200,200, 0.5)',
    borderWidth: 2,
    backgroundColor: Colors.lightPrimary,
    paddingHorizontal: 20,
    paddingTop: 1,
    paddingBottom: 3,
    height: 40,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 20
  },
  buttonContainerDelete: {
    marginTop: 120,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imagePickerHolder: {
    marginTop: 30,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 25,
  },
});

export default EditSellerScreen;