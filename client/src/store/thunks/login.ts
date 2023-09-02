import { createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await customFetch.post(`/auth/login`, {
      email,
      password,
    });
    return response;
  }
);
