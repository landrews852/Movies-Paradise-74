import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import { Link } from 'expo-router';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

type Movie = {
  id: string;
  Title: string;
}

const FavoriteScreen = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.movie.favorites);
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleRemoveFavorite = (id: string) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: { id } });
  }

  useEffect(() => {
    setMovies(favorites);
  }, [favorites]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Películas Favoritas</Text>
      {!favorites.length && <Text style={{ textAlign: 'center', fontSize: 16, color: 'gray' }}>Aún no tienes películas favoritas</Text>}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Link
            href={{
              pathname: "/modal",
              params: { id: item.id },
            }}
            asChild>
            <Pressable>
              {index > 0 && <View style={styles.separator} lightColor="#e1e1e1" darkColor="rgba(255,255,255,0.1)" />}
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => handleRemoveFavorite(item.id)} style={styles.removeFavorite}>
                  <Ionicons name="trash" size={24} color="gray" />
                </TouchableOpacity>
                <Text style={styles.movieTitle}>{item.Title}</Text>
              </View>
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
    width: '90%',
    alignSelf: 'center',
  },
  removeFavorite: {
    marginRight: 16,
  },
});

export default FavoriteScreen;