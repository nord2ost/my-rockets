import "regenerator-runtime/runtime";
import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import createSagaMiddleware from "@redux-saga/core";
import rootReducer, { modules } from "../reducer";
import { rootSaga } from "saga-slice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const reduxSaga = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: () => [reduxSaga],
});

export const persistor = persistStore(store);

reduxSaga.run(rootSaga(modules));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
