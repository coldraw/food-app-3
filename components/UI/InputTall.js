import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid,
    touched: false
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      props.onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      ``
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
    dispatch({ type: INPUT_BLUR });
  }

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      <View style={styles.detailItem}>
        <Text style={styles.detailTitle}>{props.label}</Text>
        <View style={styles.inputGroup}>
          <TextInput
            {...props}
            style={styles.input}
            value={inputState.value}
            onChangeText={textChangeHandler}
            onBlur={lostFocusHandler}
            // onEndEditing={() => {}} --- add a tick/cross for each entry depending on validation
            blurOnSubmit={true}
            multiline={true}
            numberOfLines={2}
          />
          {!inputState.isValid && inputState.touched && <View style={styles.inputErrorMsgContainer}><Text style={styles.inputErrorMsg}>{props.inputErrorMsg}</Text></View>}
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans',
    width: 100,
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.5)',
    borderRadius: 10,
    color: Colors.darkText,
    marginVertical: 5,
  },
  title: {
    marginTop: 5,
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
    borderWidth: 1,
    borderColor: Colors.darkText,
    borderRadius: 10,
    paddingVertical: 7,
  },
  detailTitle: {
    height: 130,
    fontFamily: 'open-sans',
    paddingTop: 1,
    width: 85,
    marginRight: 15,
    fontSize: 16,
  },
  input: {
    width: 195,
    color: Colors.darkText,
    fontFamily: 'open-sans',
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.2)',
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    backgroundColor: Colors.lightLightAccent,
    fontSize: 16,
    paddingLeft: 15,
    height: 60,
  },
  inputErrorMsgContainer: {
    marginBottom: 20,
  },
  inputErrorMsg: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 11,
  },
  detailItem: {
    width: '90%',
    height: 73,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 25,
    marginBottom: 15,
  },
});

export default Input;