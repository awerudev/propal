import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  root: {
    borderRadius: 8,
    backgroundColor: '#F1F1F1',
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

const IconButton = ({ icon, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.root, style]} onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
};

export default IconButton;
