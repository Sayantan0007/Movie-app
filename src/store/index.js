import { combineReducers, createStore } from "redux";
import wishlistStore from "./wishlistStore";
import addstarReducer from "./storeReducer";
import storage from "redux-persist/lib/storage"; //default to localStorage
import { persistReducer, persistStore } from "redux-persist";
const persistConfig = {
  key: "root",
  storage,
};

const rootStore = combineReducers({
  wishlist: wishlistStore,
  addstarReducer: addstarReducer,
});

const persistedReducer = persistReducer(persistConfig,rootStore);
const store = createStore(persistedReducer);
const persistor = persistStore(store);
export { store, persistor };
