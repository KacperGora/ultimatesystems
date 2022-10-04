import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface QueryState {
  filterByActive: string[];
  filterByName: string[];
  sortByName: string[];
  sortByLastName: string[];
}

const initialState: QueryState = {
  filterByActive: ["filter%5Bis_activated%5D=", ""],
  filterByName: ["search=", ""],
  sortByName: ["sort%5Bname%5D=", ""],
  sortByLastName: ["sort%5Bsurname%5D=", ""],
};

export const QuerySlice = createSlice({
  name: "query",

  initialState,
  reducers: {
    setFilterByActive: (state, action: PayloadAction<string>) => {
      state.filterByActive[1] = action.payload;
    },
    setFilterByName: (state, action: PayloadAction<string>) => {
      state.filterByName[1] = action.payload;
    },
    setSortByName: (state, action: PayloadAction<string>) => {
      state.sortByName[1] = action.payload;
    },
    setSortByLastName: (state, action: PayloadAction<string>) => {
      state.sortByLastName[1] = action.payload;
    },
  },
});

export const {
  setFilterByActive,
  setFilterByName,
  setSortByName,
  setSortByLastName,
} = QuerySlice.actions;

export default QuerySlice.reducer;
