import * as React from 'react';
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import axios from "axios";
import SearchScreen from "@/src/app/tabs/Search";

jest.mock("axios");

const mockStore = configureStore([]);

describe("SearchScreen", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      movie: {
        loading: false,
        favorites: [],
        results: [],
        error: null,
        lastQuery: '',
      },
    });

    store.dispatch = jest.fn();

    // Simulate a successful API response
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        results: [
          {
            title: "Test Movie",
            overview: "This is a test movie",
            // Add other movie properties here
          },
        ],
      },
    });
  });

  it("should display movie data after search", async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <SearchScreen />
      </Provider>
    );

    const input = getByPlaceholderText("Escribe el nombre de la pelicula...");
    const button = getByText("Buscar");

    fireEvent.changeText(input, "test movie");
    fireEvent.press(button);

    // Wait for the movie data to be displayed
    await waitFor(() => {
      expect(getByText("Test Movie")).toBeTruthy();
      expect(getByText("This is a test movie")).toBeTruthy();
    });
  });

  it("should dispatch an action on button press", async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <SearchScreen />
      </Provider>
    );

    const input = getByPlaceholderText("Escribe el nombre de la pelicula...");
    const button = getByText("Buscar");

    fireEvent.changeText(input, "test movie");
    fireEvent.press(button);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith({
        type: "SEARCH_MOVIE_REQUEST",
        payload: { query: "test movie" },
      });
    });
  });
});
