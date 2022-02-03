import * as placeAction from '../store/place-action';

import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {
  useCallback,
  useState,
} from 'react';

import Colors from '../constants/Colors';
import LocationPicker from '../components/LocationPicker';
import MyImagePicker from '../components/MyImagePicker';
import { useDispatch } from 'react-redux';

const NewPlaceScreen = ({
  navigation,
  route,
}) => {
  const { saveLoc, loc } = route.params;
  // const s = JSON.stringify(saveLoc);
  // console.log(saveLoc);
  const [titleValue, setTitleValue] =
    useState('');
  const [image, setImage] = useState();
  const [selectLocation, setSelectLocation] =
    useState();

  const dispatch = useDispatch();
  const handleInput = (text) => {
    setTitleValue(text);
  };
  const handleSave = () => {
    dispatch(
      placeAction.addPlace(
        titleValue,
        image,
        selectLocation
      )
    );
    navigation.goBack();
  };

  const handlePickedLocation = useCallback(
    (location) => {
      setSelectLocation(location);
    },
    []
  );

  const handleImage = (imgPath) => {
    setImage(imgPath);
  };
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={titleValue}
          onChangeText={handleInput}
          style={styles.input}
        />
        <MyImagePicker onImgTaken={handleImage} />
        <LocationPicker
          navigation={navigation}
          savedLocation={saveLoc}
          onLocationPicked={handlePickedLocation}
        />
        <View style={styles.btnCont}>
          <Button
            title='Save Place'
            color={Colors.primary}
            onPress={handleSave}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 3,
  },
  btnCont: {
    alignItems: 'center',
    marginVertical: 12,
  },
});

export default NewPlaceScreen;
