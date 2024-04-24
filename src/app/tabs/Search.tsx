import React, { useCallback, useState } from 'react';
import { TextInput, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import { useDispatch } from 'react-redux';
import { searchMovieRequest } from '@/src/redux/actions';
import { useSelector } from 'react-redux';
import { Movie, MovieState } from '@/src/redux/reducers';

type SearchMovieRequestAction = {
  type: string;
  [key: string]: any;
};

type State = {
  state: MovieState | undefined, action: {
    type: string;
    payload: any;
  }
};

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const { results, loading, error } = useSelector((state: any) => state.movie);
  const dispatch = useDispatch();

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      dispatch(searchMovieRequest(query.trim()) as SearchMovieRequestAction);
    }
  }, [query]);

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          value={query}
          placeholder="Escribe el nombre de la pelicula..."
          onChangeText={(text) => setQuery(text)}
        />
        <Button title="Buscar" onPress={handleSearch} />
      </View>
      <ScrollView>
        {/* Results */}
        {!loading ? !error ? results?.map((movie: Movie) => (
          <View key={movie.id} style={styles.card}>
            {movie.poster !== "N/A" ? <Image source={{ uri: movie.poster }} style={styles.poster} /> : <Text style={{...styles.text, marginVertical: 16, fontStyle: 'italic', textAlign: 'center' }}>Esta película no tiene imagen</Text>}
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.text}>{movie.year}</Text>
            <Text style={styles.text}>{movie.type}</Text>
          </View>
        )) : <View style={styles.error}><Text>Hubo un error al intentar hacer la llamada a la api: {JSON.stringify(error)}</Text></View>
          : <Text style={styles.loading}>Cargando...</Text>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  poster: {
    height: 150,
    marginBottom: 8,
  },
  card: {
    flex: 1,
    padding: 16,
    margin: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
});

export default SearchScreen;
