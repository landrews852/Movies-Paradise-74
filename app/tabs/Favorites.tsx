import React from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';

const FavoriteScreen = () => {
  const favorites = [
    { id: 1, title: 'Movie 1' },
    { id: 2, title: 'Movie 2' },
    { id: 3, title: 'Movie 3' },
    // Agrega aquí más películas favoritas
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Películas Favoritas</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Link href="/modal?:id" asChild>
            <Pressable>
              {index > 0 && <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />}
              <Text style={styles.movieTitle}>{item.title}</Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 52,
  },
  movieTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default FavoriteScreen;