import Colors from '../constants/Colors';
import MapScreen from '../screens/MapScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import PlaceListScreen from '../screens/PlaceListScreen';
import { Platform } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const StackPlaceNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName='Places'
      screenOptions={{
        headerStyle: {
          backgroundColor:
            Platform.OS === 'android'
              ? Colors.primary
              : 'white',
        },
        headerTintColor:
          Platform.OS === 'android'
            ? 'white'
            : Colors.primary,
        headerTitleStyle: {
          fontSize: 25,
          fontWeight: '700',
        },
      }}
    >
      <Stack.Screen
        name='Places'
        component={PlaceListScreen}
      />
      <Stack.Screen
        name='Details'
        component={PlaceDetailScreen}
        options={({ route }) => ({
          title: route.params.placeTitle,
        })}
      />
      <Stack.Screen
        name='New'
        component={NewPlaceScreen}
        options={{
          title: 'Add Place',
        }}
      />
      <Stack.Screen
        name='Map'
        component={MapScreen}
      />
    </Stack.Navigator>
  );
};

export default StackPlaceNavigation;
