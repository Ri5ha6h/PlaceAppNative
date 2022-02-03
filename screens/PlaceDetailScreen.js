import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../constants/Colors';
import MapPreview from '../components/MapPreview';
import React from 'react';
import { useSelector } from 'react-redux';

const PlaceDetailScreen = ({
  navigation,
  route,
}) => {
  const { placeId } = route.params;
  const places = useSelector(
    (state) => state.place.places
  );

  const selectedPlace = places.find(
    (p) => p.id === placeId
  );

  const selectedLoc = {
    lat: selectedPlace.lat,
    lng: selectedPlace.lng,
  }

  const handleSelect = () => {
    navigation.navigate('Map',{
      readOnly: true,
      initialLocation: selectedLoc
    })
  }
  return (
    <ScrollView
      contentContainerStyle={styles.mainCont}
    >
      <Image
        style={styles.image}
        source={{ uri: selectedPlace.image }}
      />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>
            {selectedPlace.address}
          </Text>
        </View>

        <MapPreview
          style={styles.mapPreview}
          location={selectedLoc}
          onSelect={handleSelect}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainCont: {
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc',
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: 'center',
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default PlaceDetailScreen;
