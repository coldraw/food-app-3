import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, View, StyleSheet, Platform, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import * as userActions from '../../store/actions/users';
import * as sellerActions from '../../store/actions/sellers';
import * as ratingsActions from '../../store/actions/ratings';
import * as reviewsActions from '../../store/actions/reviews';
import MenuSlide from '../../components/shop/MenuSlide';
import Colors from '../../constants/colors';
import HeaderButton from '../../components/UI/HeaderButton';
import YumLoLogo from '../../assets/images/YUMLo-logo5.jpg'

const HomeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [filterByName, setFilterByName] = useState(false);

  // const users = useSelector(state => state.users.availableUsers);
  const loggedInUser = useSelector(state => state.auth.userId);
  // const currentUser = useSelector(state => state.users.availableUsers.find(user => user.id === loggedInUser));
  const sellers = useSelector(state => state.sellers.availableSellers);
  // const ratings = useSelector(state => state.ratings.ratings);
  const dispatch = useDispatch();

  /// LOAD USERS ///

  const loadUsers = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(userActions.fetchUsers());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadUsers
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadUsers]);

  useEffect(() => {
    setIsLoading(true);
    loadUsers().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadUsers]);

  /// LOAD SELLERS ///

  const loadSellers = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(sellerActions.fetchSellers());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadSellers
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadSellers]);

  useEffect(() => {
    setIsLoading(true);
    loadSellers().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadSellers]);

  // LOAD RATINGS

  const loadRatings = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(ratingsActions.fetchRatings());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadRatings
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadRatings]);

  useEffect(() => {
    setIsLoading(true);
    loadRatings().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadRatings]);

  // LOAD REVIEWS

  const loadReviews = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(reviewsActions.fetchReviews());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadReviews
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadReviews]);

  useEffect(() => {
    setIsLoading(true);
    loadReviews().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadReviews]);

  /// DISPLAY CONTENT ///


  // FILTERS 

  // const filterByNameHandler = () => {
  //   setFilterByName(true);
  // }

  // const filterByDateCreated = () => {
  //   setFilterByName(false);
  // }

  // let sellersList = [];
  // if (filterByName) {
  //   sellersList = sellers.sort(
  //     (a, b) => a.menuName > b.menuName ? 1 : -1
  //   );
  // } else {
  //   sellersList = sellers.reverse();
  // };


  return (
    <View style={styles.container}>
      <View style={styles.filtersBar}>
        <View style={styles.filterItemHolder}>
          <TouchableWithoutFeedback
            // onPress={filterByDateCreated}
          >
            <View style={styles.filterItem}>
              <Text style={styles.filterItemText}>Filter (A-Z)</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.filterItemHolder}>
          <TouchableWithoutFeedback
            // onPress={filterByNameHandler}
          >
            <View style={styles.filterItem}>
              <Text style={styles.filterItemText}>cancel filter</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.headerShadowMaker}>
      </View>
      <FlatList
        data={sellers}
        renderItem={itemData =>
          <MenuSlide
            imageUrl={itemData.item.imageUrl}
            menuName={itemData.item.menuName}
            slogan={itemData.item.slogan}
            sellerUserId={itemData.item.sellerUserId}
            imageString={itemData.item.imageString}
            onViewMenu={() => {
              props.navigation.navigate('Menu', {
                loggedInUser: loggedInUser,
                sellerUserId: itemData.item.sellerUserId,
                sellerMenuName: itemData.item.menuName,
                menuImage: itemData.item.imageString,
              });
            }}
          // onViewRatings={() => { }}
          />
        }
        keyExtractor={item => item.id}
      />
    </View>
  );
};

HomeScreen.navigationOptions = navData => {
  return {
    headerBackground: () => (
      <Image
        source={YumLoLogo}
        style={{ height: 110, width: '100%' }}
      />
    ),
    headerTitle: '',
    headerLeft: () => (
      <HeaderButtons
        HeaderButtonComponent={HeaderButton} >
        <Item
          title='Side Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }} />
      </HeaderButtons>),
    headerRight: () => (
      <HeaderButtons
        HeaderButtonComponent={HeaderButton} >
        <Item
          title='Cart'
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart')
          }} />
      </HeaderButtons>),
    headerStyle: {
      backgroundColor: Colors.primary,
      height: 105,
      borderColor: Colors.darkText,
      borderWidth: 2
    },
    headerTintColor: 'white'
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightLightAccent,
    paddingTop: 4,
    paddingBottom: 50,
  },
  headerShadowMaker: {
    height: 0,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 0,
    backgroundColor: Colors.lightLightAccent,
    borderBottomColor: Colors.accent,
    borderBottomWidth: 1,
  },
  filtersBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderTopColor: Colors.accent,
    borderTopWidth: 2,
  },
  filterItem: {

  },
  filterItemText: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: Colors.lightPrimary,
    borderColor: Colors.accent,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
});

export default HomeScreen;