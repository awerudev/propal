import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text>Here you can review our policies to understand how we handle your data.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
