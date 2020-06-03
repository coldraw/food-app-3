import React, { useReducer, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch } from 'react-native-switch';

import Colors from '../../constants/colors';

const INPUT_CHANGE = 'INPUT_CHANGE';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        touched: true
      };
    default:
      return state;
  }
};

const SwitchInput = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : false,
    isValid: props.initiallyValid,
    touched: false
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      props.onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const valueChangeHandler = value => {
    let isValid = true;
    dispatch({ type: INPUT_CHANGE, value: value, isValid: isValid });
  }

  return (
    <View style={styles.switchContainer}>
      <Text style={styles.label}>{props.label}</Text>
      <Switch
        {...props}
        style={styles.input}
        value={inputState.value}
        onValueChange={valueChangeHandler}
        disabled={false}
        activeText={'On'}
        inActiveText={'Off'}
        backgroundActive={Colors.green}
        backgroundInactive={'gray'}
        circleActiveColor={'#30a566'}
        circleInActiveColor={'#000000'}
        circleSize={20}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  switchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '98%',
    paddingLeft: 13
  },
  label: {
    fontFamily: 'open-sans',
    marginVertical: 8,
    color: Colors.darkText,
    fontSize: 16,
  },
  input: {
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default SwitchInput;