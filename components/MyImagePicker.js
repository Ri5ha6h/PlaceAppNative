import * as ImagePicker from 'expo-image-picker';

import {
  Alert,
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {
  useEffect,
  useState,
} from 'react';

import Colors from '../constants/Colors';

const MyImagePicker = (props) => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          Platform.OS === 'android'
            ? await ImagePicker.requestCameraPermissionsAsync()
            : await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission not granted',
            'Sorry, we need camera roll permissions to make this work!',
            [
              {
                type: 'Okay',
              },
            ]
          );
        }
      }
    })();
  }, []);

  const handlePick = async () => {
    let result =
      Platform.OS === 'android'
        ? await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          })
        : await ImagePicker.launchImageLibraryAsync(
            {
              mediaTypes:
                ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            }
          );

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      props.onImgTaken(result.uri);
    }
  };

  return (
    <View style={styles.mainCont}>
      <View style={styles.imgCont}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.img}
          />
        ) : (
          <Text>No image picked yet.</Text>
        )}
      </View>

      <Button
        title='Take Image'
        color={Colors.primary}
        onPress={handlePick}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainCont: {
    alignItems: 'center',
    marginVertical: 10,
  },
  imgCont: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});

export default MyImagePicker;
