import React, { useState } from 'react';
import { TextInput, Button, StyleSheet } from 'react-native';
import { View } from '@/src/components/Themed';
import { useDispatch } from 'react-redux';
import { searchMovieRequest } from '@/src/redux/actions';

type SearchMovieRequestAction = {
  type: string;
  [key: string]: any; // This is the index signature
  // other properties...
};

const SearchScreen: React.FC = () => {
const [query, setQuery] = useState<string>('');
const dispatch = useDispatch();

const handleSearch = (): void => {
  if (query.trim()) {
    dispatch(searchMovieRequest(query.trim()) as SearchMovieRequestAction);
  }
};

return (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      value={query}
      placeholder="Escribe el nombre de la pelicula..."
      onChangeText={(text) => setQuery(text)}
    />
    <Button title="Buscar" onPress={handleSearch} />
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
});

export default SearchScreen;