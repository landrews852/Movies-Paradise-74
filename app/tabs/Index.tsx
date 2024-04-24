import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.jpeg')} style={styles.logo} />
      <Text style={styles.title}>Bienvenido a Movies Paradise 74</Text>
      <Text style={styles.subtitle}>¡Encuentra todas tus películas favoritas en un solo lugar!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 125,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});
