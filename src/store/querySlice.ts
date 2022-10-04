import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface QueryState {
  byActive: string;
  byName: string;
}


const initialState: QueryState = {
  byActive: "",
  byName: "",
};

export const QuerySlice = createSlice({
  name: "query",
 
  initialState,
  reducers: {
    setFilterByActive: (state, action: PayloadAction<string>) => {
      state.byActive = action.payload;
    },
    setFilterByName: (state, action: PayloadAction<string>) => {
      state.byName = action.payload;
    },
  
  },
});

export const { setFilterByActive, setFilterByName } = QuerySlice.actions;



export default QuerySlice.reducer;
