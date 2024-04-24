import { StatusBar } from 'expo-status-bar';
import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import { useRoute } from '@react-navigation/native';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { searchMovieById } from '../redux/actions';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

type Movie = {
  id: string;
  Title: string;
}

export default function ModalScreen() {
  const route = useRoute();
  const dispatch = useDispatch();
  const { detail, loading, error } = useSelector((state: any) => state.movie);

  const { id } = route.params as { id: string };
  console.log('id', id);

  useMemo(() => dispatch(searchMovieById(id)), [id]);

  const handleAddFavorite = useCallback(({id, Title}: Movie) => {
    dispatch({ type: 'ADD_FAVORITE', payload: { id, Title } });
  }, []);

  return (
    <View style={styles.container}>
      {!loading
        ? !error || !detail
          ? <View
            key={detail?.id}
            style={styles.detailsContainer}
          >
            {detail?.Poster !== "N/A" ? <Image source={{ uri: detail?.Poster }} style={styles.poster} /> : <Text style={{ ...styles.text, marginVertical: 16, fontStyle: 'italic', textAlign: 'center' }}>Esta película no tiene imagen</Text>}
            <Text style={styles.movieTitle}>{detail?.Title}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <ScrollView style={{ width: '100%' }}>
              <Text style={styles.text}>Estreno: {detail?.Released}</Text>
              <Text style={styles.text}>Tipo: {detail?.Type}</Text>
              <Text style={styles.text}>Género: {detail?.Genre}</Text>
              <Text style={styles.text}>Idioma: {detail?.Language}</Text>
              <Text style={styles.text}>Director: {detail?.Director}</Text>
              <Text style={styles.text}>Actores: {detail?.Actors}</Text>
              <Text style={styles.text}>Duración: {detail?.Runtime}</Text>
              <Text style={styles.text}>País: {detail?.Country}</Text>
              <Text style={styles.text}>Premios: {detail?.Awards}</Text>
              <Text style={styles.text}>Clasificación: {detail?.Rated}</Text>
              <Text style={styles.text}>IMDB: {detail?.imdbRating}</Text>
            </ScrollView>
            <TouchableOpacity onPress={() => handleAddFavorite({id: detail.imdbID, Title: detail.Title})} style={styles.addFavorite}>
              <Ionicons name="heart" size={24} color="white" />
            </TouchableOpacity >
          </View>
          : <View style={styles.error}><Text style={{ textAlign: 'center' }}>Hubo un problema al intentar hacer la llamada a la api: {JSON.stringify(error)}</Text></View>
        : <Text style={styles.loading}>Cargando...</Text>}
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  detailsContainer: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    paddingHorizontal: 16,
  },
  addFavorite: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 56,
    right: 16,
    width: 42,
    height: 42,
    borderRadius: 100,
    backgroundColor: '#FF000090',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
  poster: {
    maxHeight: 300,
    width: 500,
    flex: 1,
    marginBottom: 8,
  },
  error: {
    alignSelf: 'center',
    marginVertical: 24,
    backgroundColor: '#FF474C90',
    padding: 12,
    borderRadius: 30
  },
  loading: {
    alignSelf: 'center',
    marginVertical: 24,
    fontSize: 24,
    color: 'gray',
  },
});
