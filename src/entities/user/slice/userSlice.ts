import { createSlice } from "@reduxjs/toolkit";
import { getUserThunk } from "../api/userApi";
import type { User } from "../model";

type UserState = {
  user: User | null;
  error: string | null;
  isLoading: boolean;
};

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.error = null;
      state.isLoading = false;
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      //getUserThunk
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.error || "Ошибка при загрузке пользователя";
      });
  },
});

export const { clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
