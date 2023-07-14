import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  // Другие свойства вашего состояния аутентификации, если такие имеются
}

const initialState: AuthState = {
  isAuthenticated: false,
  // Инициализируйте другие свойства вашего состояния аутентификации по необходимости
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;