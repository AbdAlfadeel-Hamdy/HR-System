import { createSlice } from "@reduxjs/toolkit";
import { login } from "../thunks/login";

interface User {
  name: string;
  email: string;
}

interface authState {
  isLoading: boolean;
  loggedInUser: User | null;
  error: { [keys: string]: any } | null;
}

const initialState: authState = {
  isLoading: false,
  loggedInUser: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.loggedInUser = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.loggedInUser = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const authReducer = authSlice.reducer;
