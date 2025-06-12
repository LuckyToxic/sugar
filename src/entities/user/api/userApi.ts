import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../model";
import axios from "axios";

interface ErrorPayload {
  error: string;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

async function fetchProfile(): Promise<User> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No auth token");
  }

  const response = await axios.get<User>(`${baseUrl}/profile`, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
}

export const getUserThunk = createAsyncThunk<
  User,
  void,
  { rejectValue: ErrorPayload }
>("user/getUser", async (_, { rejectWithValue }) => {
  try {
    const user = await fetchProfile();
    const userPhoto = localStorage.getItem("photo") || "";
    return {
      ...user,
      user_photo: userPhoto,
    };
  } catch (error: any) {
    return rejectWithValue({ error: error.message || "Unknown error" });
  }
});
