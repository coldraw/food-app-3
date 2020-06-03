import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/colors';

const UserAccountScreen = props => {
  const loggedInUser = useSelector(state => state.auth.userId);
  const selectedUser = useSelector(
    state => state.users.availableUsers.find(user => user.loginUUID === loggedInUser)
  );

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.detailsSection}>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Email:</Text>
            <Text style={styles.textEmail}>{selectedUser.userEmail}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>First name:</Text>
            <Text style={styles.text}>{selectedUser.firstName}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Last name:</Text>
            <Text style={styles.text}>{selectedUser.lastName}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Phone:</Text>
            <Text style={styles.text}>{selectedUser.phoneNumber}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Username:</Text>
            <Text style={styles.text}>{selectedUser.displayName}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Street no.:</Text>
            <Text style={styles.text}>{selectedUser.addressStreetNumber}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Street:</Text>
            <Text style={styles.text}>{selectedUser.addressStreet}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Suburb:</Text>
            <Text style={styles.text}>{selectedUser.addressSuburb}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Post Code:</Text>
            <Text style={styles.text}>{selectedUser.addressPostCode}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>State:</Text>
            <Text style={styles.text}>{selectedUser.addressState}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Country:</Text>
            <Text style={styles.text}>{selectedUser.addressCountry}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

UserAccountScreen.navigationOptions = (navData) => {
  const loggedInUser = navData.navigation.getParam('loggedInUser');

  return {
    headerTitle: 'User Account',
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
          title='Edit User Account'
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navData.navigation.navigate('EditAccount', { loggedInUser });
          }}
        />
      </HeaderButtons>
    )
  };
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 38,
    backgroundColor: 'white',
    paddingBottom: 20,
    paddingHorizontal: 25,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
    marginRight: 20,
    marginBottom: 35,
  },
  text: {
    fontFamily: 'open-sans',
    justifyContent: 'center',
    width: 200,
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.2)',
    borderRadius: 10,
    backgroundColor: 'white',
    color: Colors.darkText,
    fontSize: 16,
    paddingLeft: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginLeft: -5,
  },
  textEmail: {
    fontFamily: 'open-sans',
    justifyContent: 'center',
    width: 200,
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.2)',
    borderRadius: 10,
    backgroundColor: 'white',
    color: Colors.darkText,
    fontSize: 16,
    paddingLeft: 10,
    paddingVertical: 5,
    marginLeft: -5,
  },
  detailTitle: {
    width: 85,
    fontFamily: 'open-sans',
    height: 30,
    color: Colors.darkText,
    fontSize: 16,
    marginRight: 20,
    paddingTop: 5,
  },
});

export default UserAccountScreen;