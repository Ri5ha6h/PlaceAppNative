import * as placeAction from '../store/place-action';

import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  HeaderButtons,
  Item,
} from 'react-navigation-header-buttons';
import React, {
  useEffect,
  useLayoutEffect,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import CustomHeaderButton from '../components/CustomHeaderButton';
import PlaceItem from '../components/PlaceItem';

const PlaceListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const places = useSelector(
    (state) => state.place.places
  );

  useEffect(() => {
    dispatch(placeAction.setPlaces());
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons
          HeaderButtonComponent={
            CustomHeaderButton
          }
        >
          <Item
            title='Add Place'
            iconName={
              Platform.OS === 'android'
                ? 'md-add'
                : 'ios-add'
            }
            onPress={() => {
              navigation.navigate('New', {
                loc: '',
              });
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <FlatList
      data={places}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.image}
          title={itemData.item.title}
          address={itemData.item.address}
          onSelect={() => {
            navigation.navigate('Details', {
              placeId: itemData.item.id,
              placeTitle: itemData.item.title,
            });
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default PlaceListScreen;
