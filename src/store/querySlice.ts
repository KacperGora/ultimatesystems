import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface QueryState {
  filterByActive: string;
  filterByName: string;
  refreshToken: string;
}

const initialState: QueryState = {
  filterByActive: "",
  filterByName: "",
  refreshToken: "",
};

export const QuerySlice = createSlice({
  name: "query",

  initialState,
  reducers: {
    setFilterByActive: (state, action: PayloadAction<string>) => {
      state.filterByActive = action.payload;
    },
    setFilterByName: (state, action: PayloadAction<string>) => {
      state.filterByName = action.payload;
    },

    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
  },
});

export const {
  setFilterByActive,
  setFilterByName,

  setRefreshToken,
} = QuerySlice.actions;

export default QuerySlice.reducer;
