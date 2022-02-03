import * as Location from 'expo-location';

import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {
  useEffect,
  useState,
} from 'react';

import Colors from '../constants/Colors';
import MapPreview from './MapPreview';

const LocationPicker = (props) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    navigation,
    savedLocation,
    onLocationPicked,
  } = props;

  useEffect(() => {
    if (savedLocation) {
      setLocation(savedLocation);
      onLocationPicked(savedLocation);
    }
  }, [savedLocation, onLocationPicked]);

  useEffect(() => {
    (async () => {
      let { status } =
        await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission denied',
          'Permission to access location was denied',
          [
            {
              type: 'Okay',
            },
          ]
        );
        return;
      }
    })();
  }, []);

  const handleLocation = async () => {
    setLoading(true);
    let location =
      await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
    // console.log(location);
    setLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    onLocationPicked({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    setLoading(false);
  };

  const handlePick = () => {
    navigation.navigate('Map', {
      param: '',
    });
  };
  return (
    <View style={styles.mainCont}>
      <MapPreview
        style={styles.map}
        location={location}
        onSelect={handlePick}
      >
        {loading ? (
          <ActivityIndicator
            size='large'
            color={Colors.primary}
          />
        ) : (
          <Text>No location yet.</Text>
        )}
      </MapPreview>
      <View style={styles.btnCont}>
        <Button
          title='User Location'
          color={Colors.primary}
          onPress={handleLocation}
        />
        <Button
          title='Pick on Map'
          color={Colors.primary}
          onPress={handlePick}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCont: {
    marginBottom: 10,
    alignItems: 'center',
  },
  map: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  btnCont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default LocationPicker;
