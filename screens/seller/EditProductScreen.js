import React, { useEffect, useCallback, useReducer, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform, Alert, KeyboardAvoidingView, ActivityIndicator, ToastAndroid } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/colors';
import HeaderButton from '../../components/UI/HeaderButton';
import * as productActions from '../../store/actions/products';
import Input from '../../components/UI/Input';
import InputTall from '../../components/UI/InputTall';
import SwitchInput from '../../components/UI/SwitchInput';
import ImagePicker from '../../components/UI/ImagePicker';

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

const EditProductScreen = props => {
  // CORE PRODUCT LOGIC SETUP 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false); 
  //PHOTOS
  const [productImage, setProductImage] = useState();
  //
  const sellerId = props.navigation.getParam('sellerUserId');
  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector(
    state => state.products.availableProducts.find(prod => prod.id === prodId)
  );

  // PHOTO UPLOAD LOGIC and SETUP
  const productId = props.navigation.getParam('productId');

  const photoTakenHandler = image64 => {
    setProductImage(image64);
  };


  const dispatch = useDispatch();

  const currentImage = editedProduct ? `data:image/jpg;base64, ${editedProduct.imageString}` : '';

  const showToast = () => {
    ToastAndroid.showWithGravity(`Product saved!`, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      description: editedProduct ? editedProduct.description : '',
      price: '',
      minOrder: editedProduct ? editedProduct.minOrder : '',
      isMeatProduct: editedProduct ? editedProduct.isMeatProduct : false,
      isGlutenFreeProduct: editedProduct ? editedProduct.isGlutenFreeProduct : false,
      isVegetarianProduct: editedProduct ? editedProduct.isVegetarianProduct : false,
      prepTime: editedProduct ? editedProduct.prepTime : '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
      minOrder: editedProduct ? true : false,
      isMeatProduct: editedProduct ? true : true,
      isGlutenFreeProduct: editedProduct ? true : true,
      isVegetarianProduct: editedProduct ? true : true,
      prepTime: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'OK' }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Invalid item details', 'Please check for input errors.', [
        { text: 'OK' }
      ]);
      return;
    }
    setError(false);
    setIsLoading(true);
    try {
      if (editedProduct) {
        await dispatch(productActions.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          +formState.inputValues.minOrder,
          formState.inputValues.isMeatProduct,
          formState.inputValues.isGlutenFreeProduct,
          formState.inputValues.isVegetarianProduct,
          +formState.inputValues.prepTime,
          productImage,
        ));
      } else {
        await dispatch(productActions.createProduct(
          sellerId,
          formState.inputValues.title,
          formState.inputValues.description,
          +formState.inputValues.price,
          +formState.inputValues.minOrder,
          formState.inputValues.isMeatProduct,
          formState.inputValues.isGlutenFreeProduct,
          formState.inputValues.isVegetarianProduct,
          +formState.inputValues.prepTime,
          productImage,
        ));
      }
      props.navigation.goBack();
      showToast();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, prodId, formState, productImage]
  );

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

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


  if (isLoading) {
    return (
      <View style={styles.centered}><ActivityIndicator size='large' color={Colors.primary} />
        <Text style={styles.saving}>Saving</Text></View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.detailsSection}>
        <KeyboardAvoidingView
          style={{ flex: 1, margin: 0 }}
          behavior='position'
          keyboardVerticalOffset={-210}
        >
          <ScrollView>
            <View style={styles.form}>
              <View style={styles.detailItem}>
                <Input
                  id='title'
                  label='Item name:'
                  inputErrorMsg="*name"
                  keyboardType='default'
                  autoCorrect
                  autoCapitalize='sentences'
                  maxLength={25}
                  // returnKeyType='next'
                  onInputChange={inputChangeHandler}
                  onBlur={inputChangeHandler}
                  initialValue={editedProduct ? editedProduct.title : ''}
                  initiallyValid={!!editedProduct}
                  required
                />
              </View>
              <View style={styles.imagePickerHolder}>
                <ImagePicker
                  onPhotoTaken={photoTakenHandler}
                  currentImage={currentImage}
                />
              </View>
              {editedProduct ? null : (
                <View style={styles.detailItem}><Input
                  id='price'
                  label='Price:'
                  inputErrorMsg="*price"
                  keyboardType='decimal-pad'
                  // returnKeyType='next'
                  onInputChange={inputChangeHandler}
                  onBlur={inputChangeHandler}
                  required
                  min={1}
                />
                </View>
              )}
              <View style={styles.detailItemTall}>
                <InputTall
                  id='description'
                  label='Item details:'
                  inputErrorMsg="*description / ingredients etc"
                  keyboardType='default'
                  autoCorrect
                  autoCapitalize='sentences'
                  multiline
                  maxLength={70}
                  numberOfLines={2}
                  initialValue={editedProduct ? editedProduct.description.toString() : ''}
                  initiallyValid={!!editedProduct}
                  onInputChange={inputChangeHandler}
                  onBlur={inputChangeHandler}
                  required
                />
              </View>
              <View style={styles.detailItemTall}>
                <InputTall
                  id='minOrder'
                  label='Minimum Order Quantity:'
                  inputErrorMsg="*minimum order quantity"
                  keyboardType='decimal-pad'
                  // returnKeyType='next'
                  initialValue={editedProduct ? editedProduct.minOrder.toString() : ''}
                  onInputChange={inputChangeHandler}
                  onBlur={inputChangeHandler}
                  required
                  min={1}
                />
              </View>
              <View style={styles.detailItemSwitchOne}>
                <SwitchInput
                  id='isMeatProduct'
                  label='Does this product contain meat?'
                  initialValue={editedProduct ? editedProduct.isMeatProduct : false}
                  onInputChange={inputChangeHandler}
                  onBlur={inputChangeHandler}
                  required
                />
              </View>
              <View style={styles.detailItemSwitch}>
                <SwitchInput
                  id='isGlutenFreeProduct'
                  label='Is this product Gluten Free?'
                  initialValue={editedProduct ? editedProduct.isGlutenFreeProduct : false}
                  onInputChange={inputChangeHandler}
                  onBlur={inputChangeHandler}
                  required
                />
              </View>
              <View style={styles.detailItemSwitch}>
                <SwitchInput
                  id='isVegetarianProduct'
                  label='Is this product Vegan-friendly?'
                  initialValue={editedProduct ? editedProduct.isVegetarianProduct : false}
                  onInputChange={inputChangeHandler}
                  onBlur={inputChangeHandler}
                  required
                />
              </View>
              <View style={styles.detailItemTall}>
                <InputTall
                  id='prepTime'
                  label='Prep time:'
                  inputErrorMsg="*minimum time from payment to delivery"
                  keyboardType='decimal-pad'
                  initialValue={editedProduct ? editedProduct.prepTime.toString() : ''}
                  onInputChange={inputChangeHandler}
                  onPress={inputChangeHandler}
                  onBlur={inputChangeHandler}
                  required
                  min={1}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam('submit');

  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Menu Item',
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
  form: {
    paddingHorizontal: 10,
    height: 850,
    marginTop: 40,
  },
  screen: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    height: 1200
  },
  detailItemTall: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginBottom: 10,
  },
  detailItem: {
    width: '100%',
    height: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 20,
  },
  detailItemSwitchOne: {
    width: '92%',
    height: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 30,
    marginLeft: 12,
    marginRight: 50,
    marginBottom: 10,
  },
  detailItemSwitch: {
    width: '92%',
    height: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginLeft: 12,
    marginBottom: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  inputErrorMsg: {
    color: 'red'
  },
  saving: {
    fontFamily: 'open-sans',
    fontSize: 18,
    marginTop: 20
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

export default EditProductScreen;