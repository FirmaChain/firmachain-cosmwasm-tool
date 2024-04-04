import { persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import reducers from "./reducers";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["contract"]
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);
export { store, persistor };
