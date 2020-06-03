import React, { useEffect, useCallback, useReducer, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform, Alert, KeyboardAvoidingView, ActivityIndicator, ToastAndroid } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/colors';
import HeaderButton from '../../components/UI/HeaderButton';
import * as userActions from '../../store/actions/users';
import Input from '../../components/UI/Input';

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

const EditUserScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const userId = useSelector(state => state.auth.userId);
  const editedUser = useSelector(
    state => state.users.availableUsers.find(user => user.loginUUID === userId)
  );

  const showToast = () => {
    ToastAndroid.showWithGravity(`Account details saved!`, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  console.log('EditUserScreen: ', editedUser ? 'edit mode' : 'create mode');

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      userEmail: editedUser ? editedUser.userEmail : '',
      firstName: editedUser ? editedUser.firstName : '',
      lastName: editedUser ? editedUser.lastName : '',
      phoneNumber: editedUser ? editedUser.phoneNumber : '',
      displayName: editedUser ? editedUser.displayName : '',
      addressStreetNumber: editedUser ? editedUser.addressStreetNumber : '',
      addressStreet: editedUser ? editedUser.addressStreet : '',
      addressSuburb: editedUser ? editedUser.addressSuburb : '', addressPostCode: editedUser ? editedUser.addressPostCode : '',
      addressState: editedUser ? editedUser.addressState : '',
      addressCountry: editedUser ? editedUser.addressCountry : '',
    },
    inputValidities: {
      userEmail: editedUser ? true : false,
      firstName: editedUser ? true : false,
      lastName: editedUser ? true : false,
      phoneNumber: editedUser ? true : false,
      displayName: editedUser ? true : false,
      addressStreetNumber: editedUser ? true : false,
      addressStreet: editedUser ? true : false,
      addressSuburb: editedUser ? true : false,
      addressPostCode: editedUser ? true : false,
      addressState: editedUser ? true : false,
      addressCountry: editedUser ? true : false,
    },
    formIsValid: editedUser ? true : false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'OK' }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Invalid user details', 'Please check for input errors.', [
        { text: 'OK' }
      ]);
      return;
    }
    setError(false);
    setIsLoading(true);

    try {
      if (editedUser) {
        await dispatch(
          userActions.updateUser(
            editedUser.id,
            formState.inputValues.userEmail,
            formState.inputValues.firstName,
            formState.inputValues.lastName,
            formState.inputValues.phoneNumber,
            formState.inputValues.displayName,
            formState.inputValues.addressStreetNumber,
            formState.inputValues.addressStreet,
            formState.inputValues.addressSuburb,
            formState.inputValues.addressPostCode,
            formState.inputValues.addressState,
            formState.inputValues.addressCountry,
          )
        );
      } else {
        await dispatch(
          userActions.createUser(
            formState.inputValues.userEmail,
            formState.inputValues.firstName,
            formState.inputValues.lastName,
            formState.inputValues.phoneNumber,
            formState.inputValues.displayName,
            formState.inputValues.addressStreetNumber,
            formState.inputValues.addressStreet,
            formState.inputValues.addressSuburb,
            formState.inputValues.addressPostCode,
            formState.inputValues.addressState,
            formState.inputValues.addressCountry,
          )
        );
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
    props.navigation.navigate('Startup');
    showToast();
  }, [dispatch, userId, formState]
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
              {editedUser ? (
                <View style={styles.detailItemEmail}>
                  <Text style={styles.detailTitleEmail}>Email:</Text>
                  <Text style={styles.textEmail}>{editedUser.userEmail}</Text>
                </View>
              ) : (
                  <View style={styles.detailItem}>
                    <Input
                      id='userEmail'
                      label='Email:'
                      inputErrorMsg="Please enter a valid email"
                      keyboardType='default'
                      initialValue={editedUser ? editedUser.userEmail : ''}
                      initiallyValid={!!editedUser}
                      onInputChange={inputChangeHandler}
                      required
                    />
                  </View>
                )}
              <View style={styles.detailItem}>
                <Input
                  id='firstName'
                  label='First name:'
                  inputErrorMsg="Please enter a valid first name"
                  keyboardType='default'
                  initialValue={editedUser ? editedUser.firstName : ''}
                  initiallyValid={!!editedUser}
                  onInputChange={inputChangeHandler}
                  required
                />
              </View>
              <View style={styles.detailItem}>
                <Input
                  id='lastName'
                  label='Last name:'
                  inputErrorMsg="Please enter a valid last name"
                  keyboardType='default'
                  initialValue={editedUser ? editedUser.lastName : ''}
                  initiallyValid={!!editedUser}
                  onInputChange={inputChangeHandler}
                  required
                />
              </View>
              <View style={styles.detailItem}>
                <Input
                  id='phoneNumber'
                  label='Phone number:'
                  inputErrorMsg="Please enter a valid mobile phone number"
                  keyboardType='default'
                  initialValue={editedUser ? editedUser.phoneNumber : ''}
                  initiallyValid={!!editedUser}
                  onInputChange={inputChangeHandler}
                  required
                />
              </View>
              <View style={styles.detailItem}>
                <Input
                  id='displayName'
                  label='User name:'
                  inputErrorMsg="Please enter a valid username"
                  keyboardType='default'
                  initialValue={editedUser ? editedUser.displayName : ''}
                  initiallyValid={!!editedUser}
                  onInputChange={inputChangeHandler}
                  required
                />
              </View>
              <View style={styles.detailItem}>
                <Input
                  id='addressStreetNumber'
                  label='Street no:'
                  inputErrorMsg="Please enter a valid street number"
                  keyboardType='default'
                  initialValue={editedUser ? editedUser.addressStreetNumber : ''}
                  initiallyValid={!!editedUser}
                  onInputChange={inputChangeHandler}
                  required
                />
              </View>
              <View style={styles.detailItem}>
                <Input
                  id='addressStreet'
                  label='Street:'
                  inputErrorMsg="Please enter a valid street"
                  keyboardType='default'
                  initialValue={editedUser ? editedUser.addressStreet : 'street'}
                  initiallyValid={!!editedUser}
                  onInputChange={inputChangeHandler}
                  required
                />
              </View>
              <View style={styles.detailItem}>
                <Input
                  id='addressSuburb'
                  label='Suburb:'
                  inputErrorMsg="Please enter a valid suburb"
                  keyboardType='default'
                  initialValue={editedUser ? editedUser.addressSuburb : ''}
                  initiallyValid={!!editedUser}
                  onInputChange={inputChangeHandler}
                  required
                />
              </View>
              <View style={styles.detailItem}>
                <Input
                  id='addressPostCode'
                  label='Post code:'
                  inputErrorMsg="Please enter a valid post code"
                  keyboardType='default'
                  initialValue={editedUser ? editedUser.addressPostCode : ''}
                  initiallyValid={!!editedUser}
                  onInputChange={inputChangeHandler}
                  maxLength={10}
                  required
                />
              </View>
              <View style={styles.detailItem}>
                <Input
                  id='addressState'
                  label='State:'
                  inputErrorMsg="Please enter a valid state/province"
                  keyboardType='default'
                  initialValue={editedUser ? editedUser.addressState : ''}
                  initiallyValid={!!editedUser}
                  onInputChange={inputChangeHandler}
                  required
                />
              </View>
              <View style={styles.detailItem}>
                <Input
                  id='addressCountry'
                  label='Country:'
                  inputErrorMsg="Please enter a valid country"
                  keyboardType='default'
                  initialValue={editedUser ? editedUser.addressCountry : ''}
                  initiallyValid={!!editedUser}
                  onInputChange={inputChangeHandler}
                  required
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

EditUserScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam('submit');

  return {
    headerTitle: 'Edit Account',
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
    marginTop: 35,
    marginHorizontal: 10,
  },
  textEmail: {
    fontFamily: 'open-sans',
    height: 35,
    width: 195,
    color: 'rgba(128, 128, 128, 0.7)',
    paddingTop: 5,
    paddingLeft: 10,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.7)',
    borderRadius: 10,
    fontSize: 16,
  },
  screen: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    height: 800,
    paddingBottom: 30,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: 10,
    marginHorizontal: 0,
    marginBottom: 25,
    paddingTop: 10,
  },
  detailItemEmail: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 15,
    marginLeft: 10,
  },
  detailTitleEmail: {
    width: 65,
    fontFamily: 'open-sans',
    color: Colors.darkText,
    fontSize: 16,
    paddingTop: 5,
    marginLeft: 15,
    marginRight: 25,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  inputErrorMsg: {
    color: Colors.lightPrimary,
  },
  saving: {
    fontFamily: 'open-sans',
    fontSize: 18,
    marginTop: 20
  },
  text: {
    fontFamily: 'open-sans',
    justifyContent: 'center',
    width: 160,
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.2)',
    borderRadius: 10,
    backgroundColor: Colors.lightLightAccent,
    color: Colors.darkText,
    fontSize: 18,
    paddingLeft: 20,
    marginTop: -5,
    marginLeft: -5,
  },
  detailTitle: {
    width: 130,
    fontFamily: 'open-sans',
    height: 30,
    color: Colors.darkText,
    fontSize: 16,
    marginRight: 30,
  },
});

export default EditUserScreen;