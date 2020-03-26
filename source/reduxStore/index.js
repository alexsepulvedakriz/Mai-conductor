import reducers from '../reducers'
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/index';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
const sagaMiddleware = createSagaMiddleware();


// Middleware: Redux Persist Config
const persistConfig = {
    // Root
    key: 'root',
    // Storage Method (React Native)
    storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
    persistedReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

let persistor = persistStore(store);

export default {store, persistor};
