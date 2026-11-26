import { createSlice } from "@reduxjs/toolkit";

const TOKEN_KEY = "userToken";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem(TOKEN_KEY),
  },
  reducers: {
    tokenSet(state, action) {
      state.token = action.payload;
    },
    tokenCleared(state) {
      state.token = null;
    },
  },
});

export const { tokenSet, tokenCleared } = authSlice.actions;

export const login = (token) => (dispatch) => {
  localStorage.setItem(TOKEN_KEY, token);
  dispatch(tokenSet(token));
};

export const logout = () => (dispatch) => {
  localStorage.removeItem(TOKEN_KEY);
  dispatch(tokenCleared());
};


export const selectToken = (state) => state.auth.token;
export const selectIsLoggedIn = (state) => Boolean(state.auth.token);

export default authSlice.reducer;
