import React from 'react';
import { Text, View, StyleSheet, Image, ToastAndroid, TouchableWithoutFeedback } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/colors';

const SellerAccountScreen = props => {

  const loggedInUser = useSelector(state => state.auth.userId);
  const selectedSeller = useSelector(state => state.sellers.availableSellers.find(seller => seller.sellerUserId === loggedInUser));

  const showToast = () => {
    ToastAndroid.showWithGravity(`seller deleted!`, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  // Decode imageString from Firebase stored product image:
  const sellerImageString = selectedSeller ? selectedSeller.imageString : '';
  const base64image = selectedSeller ? `data:image/jpg;base64, ${sellerImageString}` : '';

  return (
    <View style={styles.screen}>
      {selectedSeller && (
        <View style={styles.selectedSeller}>
          <View style={styles.yumchefControls}>
            <TouchableWithoutFeedback onPress={() => {
              props.navigation.navigate('SellerOrders');
            }}>
              <View style={styles.buttonSeeOrders}>
                <Text style={styles.buttonText}>See Orders</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.detailsSection}>
            <View style={styles.detailItem}>
              <Text style={styles.detailTitle}>Menu name:</Text>
              <Text style={styles.textTitle}>{selectedSeller.menuName}</Text>
            </View>
            <View style={styles.detailImageItem}>
              <Text style={styles.detailTitle}>Menu image:</Text>
              <Image
                style={styles.imagePreview}
                source={{
                  uri: base64image,
                }}
              />
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailTitle}>Menu slogan:</Text>
              <Text style={styles.slogan}>{selectedSeller.slogan}</Text>
            </View>
          </View>
        </View>
      )}
      {!selectedSeller && (
        <View style={styles.centered}>
          <Text style={styles.accountInactive}>Seller account has not been activated - Activate now!</Text>
        </View>
      )}
    </View>
  );
};


SellerAccountScreen.navigationOptions = (navData) => {
  const loggedInUser = navData.navigation.getParam('loggedInUser');

  return {
    headerTitle: 'YumChefAccount',
    headerStyle: {
      backgroundColor: Colors.lightPrimary,
      height: 80,
    },
    headerTitleStyle: {
      fontSize: 24,
      fontFamily: 'gloria-hallelujah',
    },
    headerTintColor: 'white',
    headerLeft: () => (
      <HeaderButtons
        HeaderButtonComponent={HeaderButton} >
        <Item
          title='Side Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Edit YumChef Account'
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navData.navigation.navigate('EditYumChef', { loggedInUser });
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 50,
    backgroundColor: 'white',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    backgroundColor: 'white',
  },
  imagePreview: {
    height: 150,
    width: 165,
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.5)',
    borderRadius: 10,
    padding: 5,
    marginLeft: -5,
  },
  detailItem: {
    width: '60%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    marginLeft: 20,
    marginVertical: 10,
  },
  detailImageItem: {
    width: '70%',
    height: 160,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    marginLeft: 20,
    marginTop: 10,
  },
  text: {
    fontFamily: 'open-sans',
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.5)',
    borderRadius: 10,
    backgroundColor: Colors.lightLightAccent,
    color: Colors.darkText,
    padding: 5,
    marginVertical: 5,
  },
  textTitle: {
    marginTop: 5,
    color: Colors.darkText,
    fontFamily: 'open-sans',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.5)',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 7,
    paddingLeft: 10,
    paddingRight: 10,
    width: '95%',
  },
  detailTitle: {
    marginRight: 20,
    fontFamily: 'open-sans',
    fontSize: 16,
    paddingTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  accountInactive: {
    textAlign: 'center',
    marginBottom: 300,
    fontFamily: 'open-sans',
    fontSize: 20,
  },
  rating: {
    fontFamily: 'open-sans',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.2)',
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    color: Colors.darkText,
    marginBottom: 5,
    marginRight: 20,
    marginLeft: 35,
    marginTop: 5,
    backgroundColor: 'white',
  },
  slogan: {
    width: '95%',
    height: 50,
    fontFamily: 'open-sans',
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.2)',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
    color: Colors.darkText,
    paddingLeft: 10,
    marginRight: 10,
    marginLeft: -10,
    backgroundColor: 'white',
    fontSize: 16,
  },
  yumchefControls: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonSeeOrders: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: Colors.green,
    borderWidth: 2,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 5,
    height: 70,
    marginLeft: 20,
  },
  buttonText: {
    color: Colors.green,
    fontFamily: 'open-sans',
    fontSize: 24
  },
  buttonContainerOrders: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default SellerAccountScreen;