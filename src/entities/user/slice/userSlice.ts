import { createSlice } from "@reduxjs/toolkit";
import { getUserThunk } from "../api/userApi";
import type { User } from "../model";
import { updateUserLangThunk } from "../api/updateLang";

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
    },
  },
  extraReducers: (builder) => {
    builder
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
      })
      .addCase(updateUserLangThunk.fulfilled, (state, action) => {
        if (state.user && state.user.sub_data) {
          state.user.sub_data.lang = action.payload;
        }
      });
  },
});

export const { clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
