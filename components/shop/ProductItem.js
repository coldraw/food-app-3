import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableWithoutFeedback, Platform, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import Colors from '../../constants/colors';


const ProductItem = (props) => {
  const [viewExpanded, setViewExpanded] = useState(false);
  const loggedInUser = useSelector(state => state.auth.userId);

  const [animation] = useState(new Animated.Value(1));
  const [animationHeight] = useState(new Animated.Value(170))

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 0.3,
      duration: 100
    }).start(() => {

      Animated.timing(animation, {
        toValue: 1,
        duration: 300
      }).start();
    });

    if (!viewExpanded) {
      Animated.timing(animationHeight, {
        toValue: 270,
        duration: 300
      }).start(setViewExpanded(true));
    } else {
      setViewExpanded(false);
      Animated.timing(animationHeight, {
        toValue: 170,
        duration: 300
      }).start();
    };
  };

  const onViewProduct = () => {
    startAnimation();

  };

  const animatedStyles = {
    opacity: animation,
    height: animationHeight
  }

  // Decode imageString from Firebase stored product image:
  const productImageString = props.imageString;
  const base64image = `data:image/jpg;base64, ${productImageString}`;

  // Display content:
  if (props.productSellerId === loggedInUser) {
    return (
      <TouchableWithoutFeedback onPress={onViewProduct} useForeground>
        <Animated.View style={viewExpanded ? [styles.productItemExpanded, animatedStyles] : [animatedStyles, styles.productItem]}>
          <View style={styles.columnLeft}>
            <ImageBackground style={styles.image} source={{ uri: base64image }} >
              <View style={styles.columnLeftContent}>
                <View style={viewExpanded ? styles.actionsExpanded : styles.actions}>
                  <View style={styles.buttonContainer}>
                    <TouchableWithoutFeedback onPress={props.onEditProductItem} useForeground>
                      <View style={styles.buttonEdit}>
                        <Text style={styles.buttonText}>edit</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableWithoutFeedback onPress={props.onDeleteProduct} useForeground>
                      <View style={styles.buttonDelete}>
                        <Ionicons
                          name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                          size={24}
                          color={'white'}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.columnRight}>
            <View style={styles.titleBox}>
              <Text style={styles.title}>{props.title}</Text>
            </View>
            {viewExpanded &&
              <View style={styles.expandedView}>
                <Text style={styles.expandedText}>{props.description.toString()}</Text>
                <Text style={styles.expandedTextLarge}>Min. order: {props.minOrder.toString()}</Text>
                {props.isMeatProduct === true && <Text style={styles.expandedTextLarge}>Contains meat</Text>}
                {props.isGlutenFreeProduct === true && <Text style={styles.expandedTextLarge}>Gluten free</Text>}
                {props.isVegetarianProduct === true && <Text style={styles.expandedTextLarge}>Vegetarian</Text>}
              </View>
            }
            {!viewExpanded &&
              <View style={styles.iconHub}>
                <View style={styles.iconContainer}>
                  <Text style={styles.description}>{props.isMeatProduct ? 'MEAT' : ''}</Text>
                </View>
                <View style={styles.iconContainer}>
                  <Text style={styles.description}>{props.isGlutenFreeProduct ? 'GF' : ''}</Text>
                </View>
                <View style={styles.iconContainer}>
                  <Text style={styles.description}>{props.isVegetarianProduct ? 'VEG' : ''}</Text>
                </View>
              </View>
            }
            <View style={styles.prepTimeContainer}>
              <View style={styles.prepTimeIcon}>
                <Ionicons
                  color={Colors.darkText}
                  size={24}
                  name={Platform.OS === 'android' ? 'md-time' : 'ios-time'} />
              </View>
              <View style={styles.prepTimeData}>
                <Text style={styles.prepTime}>{props.prepTime} hrs</Text>
              </View>
            </View>
            <Text style={styles.price}>${props.price.toFixed(2)} <Text style={styles.each}>ea</Text></Text>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  } else {
    return (
      <TouchableWithoutFeedback onPress={onViewProduct} useForeground>
        <Animated.View style={viewExpanded ? [styles.productItemExpanded, animatedStyles] : [animatedStyles, styles.productItem]}>
          <View style={styles.columnLeft}>
            <ImageBackground style={styles.image} source={{ uri: base64image }} >
              <View style={styles.columnLeftContent}>
                <View style={viewExpanded ? styles.actionsExpanded : styles.actions}>
                  <View style={styles.buttonContainer}>
                    <TouchableWithoutFeedback onPress={props.onAddToCart} useForeground>
                      <View style={styles.buttonEdit}>
                        <Text style={styles.buttonText}>add</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableWithoutFeedback onPress={onViewProduct} useForeground>
                      <View style={styles.buttonDelete}>
                        <Ionicons
                          color={'white'}
                          size={26}
                          name={Platform.OS === 'android' ? 'md-information-circle' : 'ios-information-circle'}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.columnRight}>
            <View style={styles.titleBox}>
              <Text style={styles.title}>{props.title}</Text>
            </View>
            {viewExpanded && (
              <View style={styles.expandedView}>
                <Text style={styles.expandedText}>{props.description.toString()}</Text>
                <Text style={styles.expandedTextLarge}>Min. order: {props.minOrder.toString()}</Text>
                {props.isMeatProduct === true && <Text style={styles.expandedTextLarge}>Contains meat</Text>}
                {props.isGlutenFreeProduct === true && <Text style={styles.expandedTextLarge}>Gluten Free</Text>}
                {props.isVegetarianProduct === true && <Text style={styles.expandedTextLarge}>Vegetarian</Text>}
              </View>
            )}
            {!viewExpanded && (
              <View style={styles.iconHub}>
                <View style={styles.iconContainer}>
                  <Text style={styles.description}>{props.isMeatProduct ? 'MEAT' : ''}</Text>
                </View>
                <View style={styles.iconContainer}>
                  <Text style={styles.description}>{props.isGlutenFreeProduct ? 'GF' : ''}</Text>
                </View>
                <View style={styles.iconContainer}>
                  <Text style={styles.description}>{props.isVegetarianProduct ? 'VEG' : ''}</Text>
                </View>
              </View>
            )}
            <View style={styles.prepTimeContainer}>
              <View style={styles.prepTimeIcon}>
                <Ionicons
                  color={Colors.darkText}
                  size={24}
                  name={Platform.OS === 'android' ? 'md-time' : 'ios-time'}
                />
              </View>
              <View style={styles.prepTimeData}>
                <Text style={styles.prepTime}>{props.prepTime} hrs</Text>
              </View>
            </View>
            <Text style={styles.price}>${props.price.toFixed(2)} <Text style={styles.each}>ea</Text></Text>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  productItem: {
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.36,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    // height: 170,
    marginTop: 7,
    marginBottom: 5,
    marginHorizontal: 8,
    overflow: 'hidden'
  },
  productItemExpanded: {
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.36,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 270,
    marginTop: 7,
    marginBottom: 5,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  expandedView: {
    marginHorizontal: 10,
    height: 120,
  },
  expandedText: {
    marginVertical: 1,
    fontSize: 12,
    fontFamily: 'open-sans'
  },
  expandedTextLarge: {
    marginVertical: 1,
    fontSize: 12,
    fontFamily: 'open-sans-bold'
  },
  columnLeft: {
    flex: 2,
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  columnLeftContent: {
    height: '100%',
  },
  actions: {
    flexDirection: 'row',
    height: '100%',
    marginTop: 125,
    marginHorizontal: 5
  },
  actionsExpanded: {
    flexDirection: 'row',
    height: '100%',
    marginTop: 225,
    marginHorizontal: 5
  },
  buttonContainer: {
    width: '50%',
  },
  buttonEdit: {
    backgroundColor: Colors.primaryTransparent,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 1,
    paddingVertical: 5,
    marginRight: 15,
    marginLeft: 25,
    overflow: 'hidden',
    height: 30,
    borderColor: Colors.lightPrimary,
    borderWidth: 1,
  },
  buttonDelete: {
    backgroundColor: Colors.accentTransparent,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 1,
    paddingVertical: 5,
    marginRight: 25,
    marginLeft: 15,
    overflow: 'hidden',
    height: 30,
    borderColor: Colors.accent,
    borderWidth: 1,
  },
  buttonText: {
    fontFamily: 'open-sans',
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  columnRight: {
    flex: 1,
    margin: 5,
    marginLeft: 3,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  titleBox: {
    marginLeft: 2,
    paddingHorizontal: 2,
    paddingVertical: 2,
    height: 75,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    marginTop: 6,
    justifyContent: 'center',
    color: Colors.darkText,
    fontFamily: 'open-sans',
    textAlign: 'center',
  },
  iconHub: {
    marginHorizontal: 8,
    flexDirection: 'row',
    marginBottom: 2,
    alignItems: 'center'
  },
  iconContainer: {
    flex: 1,
    width: '30%',
    marginTop: 3,
    backgroundColor: Colors.primaryTransparent,
    margin: 1,
    borderRadius: 5,
    marginHorizontal: 1,
  },
  description: {
    margin: 1,
    fontSize: 9,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
  },
  price: {
    fontSize: 20,
    fontFamily: 'open-sans',
    color: Colors.darkText,
    marginTop: 2,
    marginBottom: 7,
    textAlign: 'center'
  },
  each: {
    fontSize: 12,
  },
  prepTimeContainer: {
    marginVertical: 1,
    marginHorizontal: 1,
    flexDirection: 'row',
    justifyContent: "center",
  },
  prepTimeIcon: {
    marginRight: 1,
  },
  prepTimeData: {
    marginHorizontal: 5,
    marginBottom: 0,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  prepTime: {
    fontSize: 14,
    fontFamily: 'open-sans',
    textAlign: 'center'
  },
});

export default ProductItem;