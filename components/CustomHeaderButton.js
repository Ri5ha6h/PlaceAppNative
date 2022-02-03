import {
  Platform,
  StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={28}
      color={
        Platform.OS === 'android'
          ? 'white'
          : Colors.primary
      }
    />
  );
};

const styles = StyleSheet.create({});

export default CustomHeaderButton;
