import { createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";
import { Navigate } from "react-router-dom";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const { data } = await customFetch.post(`/auth/login`, {
      email,
      password,
    });

    Navigate({ to: "/dashboard" });

    return data.user;
  }
);
