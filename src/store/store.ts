import favoritesReducer from '../redux/favoritesReducer';
import authReducer from './auth/AuthReducer';
import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./theme/reducer";
import { confirmEmailReducer } from "./confirmEmail/reducer";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    favorites: favoritesReducer,
    confirmEmail: confirmEmailReducer,
    auth: authReducer, // Добавьте authReducer в состав редьюсеров
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;