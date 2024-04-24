// store.ts
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers'; // Asume que todos tus reducers están combinados aquí
import rootSaga from './sagas'; // Asume que tienes sagas que escucharán las acciones

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

// Después de crear el store, ejecutas las sagas
sagaMiddleware.run(rootSaga);

export default store;
