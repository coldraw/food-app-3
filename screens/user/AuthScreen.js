import React, { useState, useReducer, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, ActivityIndicator, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import InputAuth from '../../components/UI/InputAuth';
import Card from '../../components/UI/Card';
import * as authActions from '../../store/actions/auth';
import Colors from '../../constants/colors';

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

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      dispatch(
        action = authActions.login(
          formState.inputValues.email,
          formState.inputValues.password
        )
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      if (isSignup) {
        await dispatch(action);
        props.navigation.navigate('CreateAccount');
      } else {
        await dispatch(action);
        props.navigation.navigate('Shop');
      }
    } catch (err) {
      setError(err.message)
      setIsLoading(false);
    }
  };

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

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred', error, [{ text: 'OK' }]);
    }
  }, [
    error
  ]);

  return (
    <KeyboardAvoidingView
      behavior='position'
      keyboardVerticalOffset={-500}
      style={styles.screen}
    >
      <Card style={styles.authContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <InputAuth
              id="email"
              label="Email"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              inputErrorMsg="Please enter a valid email address"
              onInputChange={inputChangeHandler}
              onBlur={inputChangeHandler}
              initialValue=""
            />
          </View>
          <View style={styles.input}>
            <InputAuth
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              inputErrorMsg="Please enter a valid password"
              onInputChange={inputChangeHandler}
              onBlur={inputChangeHandler}
              initialValue=""
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {isLoading ? (
            <View style={styles.loadingSpacer}>
              <View>
                <ActivityIndicator size='small' color={Colors.primary} />
                <Text style={styles.buttonText}>Authenticating...</Text>
              </View>
            </View>
          ) : (
              <TouchableWithoutFeedback onPress={authHandler}>
                <View style={styles.buttonLogin}>
                  <Text style={styles.buttonText}>{isSignup ? 'Create account' : 'Login'}</Text>
                </View>
              </TouchableWithoutFeedback>
            )
          }
          <TouchableWithoutFeedback onPress={() => {
            setIsSignup(prevState => !prevState);
          }}>
            <View style={styles.buttonSignup}>
              <Text style={styles.buttonTextSwitch}>Switch to {isSignup ? 'login' : 'signup'}</Text>
              <Ionicons
                size={30}
                color={'white'}
                name={Platform.OS === 'android' ? 'md-swap' : 'ios-swap'}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Card>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = navData => {
  return {
    headerTitle: 'YUM-Lo Login',
    headerStyle: {
      backgroundColor: Colors.lightPrimary,
      height: 80,
    },
    headerTitleStyle: {
      fontSize: 24,
      fontFamily: 'gloria-hallelujah',
      marginLeft: 80,
    },
    headerTintColor: 'white',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightLightAccent
  },
  authContainer: {
    flexDirection: 'column',
    width: 300,
    height: 260,
    maxHeight: 260,
    maxWidth: 400,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  input: {
    marginTop: 20
  },
  inputContainer: {
    flex: 2,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 1,
    paddingBottom: 20,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonLogin: {
    width: '70%',
    backgroundColor: Colors.lightPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 2,
    marginVertical: 5,
    overflow: 'hidden',
    height: 39,
    borderColor: Colors.primaryTransparent,
    borderWidth: 1,
    shadowColor: 'black',
    shadowOpacity: 0.36,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  buttonSignup: {
    width: '70%',
    backgroundColor: Colors.accentTransparent,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 10,
    overflow: 'hidden',
    height: 39,
    borderColor: Colors.accentTransparent,
    borderWidth: 1,
    shadowColor: 'black',
    shadowOpacity: 0.36,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  buttonText: {
    paddingTop: 15,
    fontFamily: 'gloria-hallelujah',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonTextSwitch: {
    paddingTop: 15,
    fontFamily: 'gloria-hallelujah',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 18,
    marginRight: 10
  },
  loadingSpacer: {
    height: 45,
  },
});

export default AuthScreen;