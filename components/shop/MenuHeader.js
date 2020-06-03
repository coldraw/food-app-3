import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Platform, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/colors';

const MenuHeader = (props) => {
  const ratingNumberOfStars = props.ratingNumberOfStars === undefined ? 3 : props.ratingNumberOfStars;
  const menuIsFocusTab = props.menuIsFocusTab;

  const sellerImageString = props.menuImage;
  const base64image = `data:image/jpg;base64, ${sellerImageString}`;

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: base64image }} style={{ width: '100%', height: '100%' }}>
        <View style={styles.headerContent}>
          <View style={styles.ratingHub}>
            <View style={styles.ratingBox}>
              <View style={styles.ratingStarHolder}>
                <Ionicons color={ratingNumberOfStars > 0 ? Colors.lightPrimary : Colors.accentTransparent} size={23} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
              </View>
              <View style={styles.ratingStarHolder}>
                <Ionicons color={ratingNumberOfStars > 1 ? Colors.lightPrimary : Colors.accentTransparent} size={23} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
              </View>
              <View style={styles.ratingStarHolder}>
                <Ionicons color={ratingNumberOfStars > 2 ? Colors.lightPrimary : Colors.accentTransparent} size={23} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
              </View>
              <View style={styles.ratingStarHolder}>
                <Ionicons color={ratingNumberOfStars > 3 ? Colors.lightPrimary : Colors.accentTransparent} size={23} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
              </View>
              <View style={styles.ratingStarHolder}>
                <Ionicons color={ratingNumberOfStars > 4 ? Colors.lightPrimary : Colors.accentTransparent} size={23} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
              </View>
            </View>
          </View>

        </View>
        <View style={styles.tabButtons}>
          <View style={styles.tabButtonContainer}>
            <TouchableWithoutFeedback
              onPress={props.changeTabToMenu}
              useForeground
            >
              <View style={menuIsFocusTab === true ? styles.tabButtonMenu : styles.tabButtonMenuFocus}>
                <Text style={menuIsFocusTab === true ? styles.tabButtonText : styles.tabButtonTextFocus}>menu  </Text>
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-list-box' : 'ios-list-box'}
                  size={18}
                  color={menuIsFocusTab === true ? 'rgba(100,100,100,0.7)' : '#4d4d4d'}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.tabButtonContainer}>
            <TouchableWithoutFeedback
              onPress={props.changeTabToRatings}
              useForeground
            >
              <View style={menuIsFocusTab === true ? styles.tabButtonRatingsFocus : styles.tabButtonRatings}>
                <Text style={menuIsFocusTab === true ? styles.tabButtonTextFocus : styles.tabButtonText}>reviews </Text>
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'}
                  size={18}
                  color={menuIsFocusTab === true ? Colors.lightPrimary : Colors.primaryTransparent}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 180,
    alignItems: 'center'
  },
  headerContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ratingHub: {
    marginTop: 130,
    marginLeft: 220,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    opacity: 0.9,
  },
  ratingBox: {
    height: 32,
    marginHorizontal: 10,
    marginTop: 12,
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: Colors.lightRed,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 10,
    borderColor: Colors.primaryTransparent,
    borderWidth: 2
  },
  ratingStarHolder: {
    marginHorizontal: 2,
  },
  tabButtons: {
    flexDirection: 'row',
    height: 36,
    marginTop: -30,
    marginLeft: 10,
    width: '60%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  tabButtonContainer: {
    overflow: 'hidden',
    flex: 1,
  },
  tabButtonMenu: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: 'rgba(200,200,200,0.5)',
    backgroundColor: 'rgba(252, 237, 207, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '95%'
  },
  tabButtonMenuFocus: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: 'rgba(200,200,200,0.5)',
    backgroundColor: 'rgba(252, 237, 207, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '95%',
  },
  tabButtonRatings: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: 'rgba(200,200,200,0.5)',
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%'
  },
  tabButtonRatingsFocus: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: 'rgba(200,200,200,0.5)',
    backgroundColor: 'rgba(255,255,255,1)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
  },
  tabButtonText: {
    fontFamily: 'gloria-hallelujah',
    fontSize: 18,
    color: 'rgba(100, 100, 100, 0.8)',
  },
  tabButtonTextFocus: {
    fontFamily: 'gloria-hallelujah',
    fontSize: 18,
    color: '#4d4d4d',
  },
});

export default MenuHeader;