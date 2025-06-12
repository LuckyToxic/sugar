import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ErrorPayload {
  error: string;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

export const updateUserLangThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: ErrorPayload }
>("user/updateLang", async (langCode, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No auth token");
    }
    const response = await axios.post(
      `${baseUrl}/profile/lang`,
      { lang: langCode },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.status === 200) {
      return langCode;
    } else {
      return rejectWithValue({ error: "Failed to update language" });
    }
  } catch (error: any) {
    return rejectWithValue({ error: error.message || "Unknown error" });
  }
});
