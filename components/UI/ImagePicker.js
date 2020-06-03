import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Alert, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../../constants/colors';

const ImgPicker = props => {

  const [pickedImage, setPickedImage] = useState();
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert('Please allow Yum-Lo to access the camera.',
        'You can change permissions in your phone settings.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  // TAKE A PHOTO

  const takePhotoHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
      base64: true
    });
    setPickedImage(image.uri);
    props.onPhotoTaken(image.base64);
  };

  // CHOOSE AN IMAGE FROM GALLERY

  const chooseImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
      base64: true
    });
    setPickedImage(image.uri);
    props.onPhotoTaken(image.base64);
  };

  // DISPLAY CONTENT

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        <ImageBackground
          source={pickedImage ? { uri: pickedImage } : { uri: props.currentImage }}
          style={{ width: '100%', height: '100%' }}
        >
          {!pickedImage && !props.currentImage && (
            <View>
              <Text style={styles.noImagePickedText}>No Image...</Text>
              <View style={styles.buttonSpacerNoImage}>
              </View>
            </View>
          )}
          <View>
            <View style={styles.buttonHolder}>
              {pickedImage || props.currentImage ? <View style={styles.buttonSpacer}>
              </View> : <View></View>}
              <TouchableWithoutFeedback
                onPress={takePhotoHandler}
              >
                <View style={styles.takePhotoButton}>
                  <Text style={styles.takePhotoButtonText}>Take photo</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={chooseImageHandler}
              >
                <View style={styles.takePhotoButton}>
                  <Text style={styles.takePhotoButtonText}>Choose image</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </ImageBackground>
        <View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center'
  },
  imagePreview: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    height: 200,
    width: '100%'
  },
  buttonHolder: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  takePhotoButton: {
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'rgba(200,200,200, 0.5)',
    borderWidth: 2,
    backgroundColor: Colors.green,
    paddingVertical: 5,
    marginTop: 15,
    marginHorizontal: 15,
  },
  takePhotoButtonText: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: 'white',
  },
  noImagePickedText: {
    marginTop: 50,
    textAlign: 'center',
    fontFamily: 'open-sans',
    fontSize: 14,
    color: Colors.lightPrimary,
  },
  buttonSpacerNoImage: {
    height: 0
  },
  buttonSpacer: {
    height: 170
  },
});

export default ImgPicker;