import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const { data } = await axios.post(
      `/login`,
      {
        email,
        password,
      },
      {
        baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true,
      }
    );

    return data.user;
  }
);
