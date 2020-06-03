import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Text, View, StyleSheet, Platform, Alert, ActivityIndicator, Button, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import MenuHeader from '../../components/shop/MenuHeader';
import RatingsTab from '../../components/shop/RatingsTab';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/colors';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';

const MenuScreen = (props) => {
  // STATEs
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewRatingsTab, setViewRatingsTab] = useState(false);
  const [error, setError] = useState();

  // CONSTs
  const sellerUserId = props.navigation.getParam('sellerUserId');
  const sellerMenuName = props.navigation.getParam('sellerMenuName');
  const menuImage = props.navigation.getParam('menuImage');
  const sellerRating = props.navigation.getParam('rating');
  const selectedMenu = useSelector(state => state.products.availableProducts.filter(product => product.sellerId === sellerUserId));
  const dispatch = useDispatch();

  // LOGIC TO FIND AVERAGE OF ALL LOADED RATINGS FOR THIS SELLER
  let sellerRatingsArray = [];
  sellerRatingsArray = useSelector(state => state.ratings.ratings.filter(rating => rating.sellerUserId === sellerUserId));
  const sellerRatingsTotal = sellerRatingsArray.map((rating) => rating.rating).reduce((sum, value) => sum + value, 0);
  const currentAverageRating = (sellerRatingsTotal / sellerRatingsArray.length).toFixed(1);
  const ratingNumberOfStars = sellerRatingsArray.length === 0 ? 3 : Math.round(currentAverageRating);


  // ANIMATION LOGIC

  const [animation] = useState(new Animated.Value(1));

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 350
    }).start( async () => {
      await setViewRatingsTab(prevState => !prevState);
      Animated.timing(animation, {
        toValue: 1,
        duration: 500
      }).start();
    })
  };

  const animatedStyles = {
    opacity: animation
  }

  // FUNCTIONS
  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadProducts
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  const editProductHandler = (id) => {
    props.navigation.navigate('EditProduct', { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert('Please confirm item delete action:', 'Do you really want to delete this item?', [
      { text: 'Cancel', style: 'default' },
      {
        text: 'Confirm', style: 'destructive', onPress: () => {
          dispatch(productActions.deleteProduct(id))
        }
      }
    ])
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loading}>An error occurred (data)</Text>
        <Text style={styles.loading}>(you may need to restart the app)</Text>
        <Button title='Try again' onPress={loadProducts} color={Colors.primary} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
        <Text style={styles.loading}>loading menu...</Text>
      </View>
    );
  };

  if (!isLoading && selectedMenu.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loading}>No products found.</Text>
        <Text style={styles.loading}>Please try again later...</Text>
      </View>
    );
  };

  const changeTabToMenuHandler = () => {
    setViewRatingsTab(false);
  };

  const changeTabToRatingsHandler = () => {
    setViewRatingsTab(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuHeaderContainer}>
        <MenuHeader
          sellerMenuName={sellerMenuName}
          menuImage={menuImage}
          sellerRating={sellerRating}
          changeTabToMenu={startAnimation}
          changeTabToRatings={startAnimation}
          menuIsFocusTab={viewRatingsTab}
          ratingNumberOfStars={ratingNumberOfStars}
          currentAverageRating={currentAverageRating}
        />
      </View>
      <Animated.View style={[styles.bottomContainer, animatedStyles]}>
        {viewRatingsTab && (
          <View>
            <View style={styles.ratingsTabContainer}>
              <RatingsTab
                sellerRating={sellerRating}
                sellerUserId={sellerUserId}
                ratingNumberOfStars={ratingNumberOfStars}
                currentAverageRating={currentAverageRating}
              />
            </View>
          </View>
        )}
        {!viewRatingsTab && (
          <View style={styles.productListTab}>
            <View style={styles.spacerTop}>
            </View>
            <View style={styles.headerShadowMaker}>
            </View>
            <FlatList
              onRefresh={loadProducts}
              refreshing={isRefreshing}
              data={selectedMenu}
              renderItem={itemData =>
                <ProductItem
                  productIdforPhotos={itemData.item.id}
                  imageString={itemData.item.imageString}
                  productSellerId={itemData.item.sellerId}
                  title={itemData.item.title}
                  description={itemData.item.description}
                  rating={itemData.item.rating}
                  prepTime={itemData.item.prepTime}
                  minOrder={itemData.item.minOrder}
                  price={itemData.item.price}
                  isMeatProduct={itemData.item.isMeatProduct}
                  isGlutenFreeProduct={itemData.item.isGlutenFreeProduct}
                  isVegetarianProduct={itemData.item.isVegetarianProduct}
                  onAddToCart={() => {
                    dispatch(cartActions.addToCart(itemData.item))
                  }}
                  onEditProductItem={() => {
                    editProductHandler(itemData.item.id);
                  }}
                  onDeleteProduct={deleteHandler.bind(this, itemData.item.id)}
                />
              }
              keyExtractor={item => item.id}
            />
          </View>
        )}
      </Animated.View>

    </View>
  );
};

MenuScreen.navigationOptions = (navData) => {
  const sellerUserId = navData.navigation.getParam('sellerUserId');
  const loggedInUser = navData.navigation.getParam('loggedInUser');

  return {
    headerTitle: navData.navigation.getParam('sellerMenuName'),
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
        {sellerUserId === loggedInUser ? (
          <Item
            title='Add New Item'
            iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            onPress={() => {
              navData.navigation.navigate('EditProduct', { sellerUserId });
            }}
          />) : (
            <Item
              title='Cart'
              iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              onPress={() => {
                navData.navigation.navigate('Cart')
              }}
            />
          )}
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },
  spacerTop: {
    height: 10,
    backgroundColor: Colors.lightLightAccent,
  },
  headerShadowMaker: {
    height: 0,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    elevation: 2,
    marginBottom: -2,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: Colors.lightAccent,
  },
  productListTab: {
    backgroundColor: Colors.lightAccent,
    flex: 1
  },
  ratingsTabContainer: {
    backgroundColor: 'rgba(220,220,220,0.1)',
    height: 1200,
    width: '100%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    backgroundColor: Colors.lightLightAccent,
  },
  menuHeaderContainer: {
    width: '100%',
    height: 181,
    marginBottom: -2,
    backgroundColor: Colors.lightLightAccent,
  },
  loading: {
    fontFamily: 'open-sans',
    fontSize: 23,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  bottomContainer: {
    width: '100%',

  }
});

export default MenuScreen;