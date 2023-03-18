import { createSlice, configureStore } from "@reduxjs/toolkit";

// created a auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
  },

  reducers: {
    // actions created
    login(state) {
      state.isLogin = true;
    },

    logout(state) {
      state.isLogin = false;
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
