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
    if (props.required && text !== '' && text.trim().length === 0) {
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
          />
          {!inputState.isValid && inputState.touched && <View style={styles.inputErrorMsgContainer}><Text style={styles.inputErrorMsg}>{props.inputErrorMsg}</Text></View>
          }
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
    width: 150,
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
    paddingHorizontal: 15,
  },
  detailTitle: {
    width: 65,
    fontFamily: 'open-sans',
    height: 30,
    color: Colors.darkText,
    fontSize: 14,
    marginRight: 10,
    paddingTop: -5,
  },
  input: {
    width: 190,
    marginTop: 5,
    color: Colors.darkText,
    fontFamily: 'open-sans',
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.2)',
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'rgba(200, 200, 200, 0.2)',
    fontSize: 14,
    paddingLeft: 15,
    marginTop: -5,
    marginLeft: -5,
  },
  inputErrorMsgContainer: {
    marginBottom: 5,
  },
  inputErrorMsg: {
    fontFamily: 'open-sans',
    color: Colors.lightPrimary,
    fontSize: 12,
  },
  detailItem: {
    width: '90%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 12,
  },
});

export default Input;