import { createSlice } from "@reduxjs/toolkit";
import { login } from "../thunks/login";

// interface User {
//   name: string;
//   email: string;
// }

interface authState {
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string | null;
}

const initialState: authState = {
  isLoading: false,
  isLoggedIn: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state) => {
      state.isLoading = false;
      state.isLoggedIn = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.error = "Invalid credentials";
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
