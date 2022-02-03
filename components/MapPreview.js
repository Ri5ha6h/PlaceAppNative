import * as Location from 'expo-location';

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import ENV from '../env';
import React from 'react';

const MapPreview = (props) => {
  let imagePreviewUrl;
  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x150&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApi}`;
    // imagePreviewUrl = Location.setGoogleApiKey({
    //   apiKey: ENV.googleApi,
    // });
  }
  //   console.log(imagePreviewUrl);
  return (
    <TouchableOpacity
      style={{
        ...styles.mainCont,
        ...props.style,
      }}
      onPress={props.onSelect}
    >
      {props.location ? (
        <Image
          style={styles.img}
          source={{ uri: imagePreviewUrl }}
        />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainCont: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
  },
});

export default MapPreview;
