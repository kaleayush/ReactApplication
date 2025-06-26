import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import authSlice from "./slices/authSlice.js";
import ProductSlice from "./slices/productSlice.js";
import DashBoardSlice from "./slices/dashBoardSlice.js";

const rootReducer = combineReducers({
  auth: authSlice,
  product: ProductSlice,
  dashBoard: DashBoardSlice,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
