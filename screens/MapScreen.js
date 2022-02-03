import MapView, {
  Marker,
} from 'react-native-maps';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';

import Colors from '../constants/Colors';

const MapScreen = ({ navigation, route }) => {
  const { readOnly, initialLocation } =
    route.params;
  const [location, setLocation] = useState(
    initialLocation
  );

  const mapRegion = {
    latitude: initialLocation
      ? initialLocation.lat
      : 37.78,
    longitude: initialLocation
      ? initialLocation.lng
      : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const handleLocation = (event) => {
    if (readOnly) {
      return;
    }
    setLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  let markedCoords;
  if (location) {
    markedCoords = {
      latitude: location.lat,
      longitude: location.lng,
    };
  }

  const handleSave = useCallback(() => {
    if (!location) {
      return;
    }
    navigation.navigate('New', {
      saveLoc: location,
    });
  }, [location]);

  useLayoutEffect(() => {
    if (readOnly) {
      return;
    }
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={handleSave}
        >
          <Text style={styles.headerText}>
            Save
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleSave]);

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={handleLocation}
    >
      {markedCoords && (
        <Marker
          title='Marked Location'
          coordinate={markedCoords}
        ></Marker>
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerBtn: {
    marginHorizontal: 12,
  },
  headerText: {
    color:
      Platform.OS === 'android'
        ? 'white'
        : Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MapScreen;
