import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../model";

interface ErrorPayload {
  error: string;
}

export const getUserThunk = createAsyncThunk<
  User,
  User,
  { rejectValue: ErrorPayload }
>("user/getUser", async (telegramData, { rejectWithValue }) => {
  try {
    return telegramData as User;
  } catch (error: any) {
    return rejectWithValue({ error: error.message || "Unknown error" });
  }
});
