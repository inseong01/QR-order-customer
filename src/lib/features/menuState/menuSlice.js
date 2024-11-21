import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMenuCategoryKey: 0,
}
const menuStateSlice = createSlice({
  name: 'menuState',
  initialState,
  reducers: {
    getSelectedMenuCategoryKey: (state, action) => {
      const key = Number(action.payload.key);
      return {
        ...state,
        selectedMenuCategoryKey: key,
      }
    },
  }
})

export const { getSelectedMenuCategoryKey } = menuStateSlice.actions;
export default menuStateSlice.reducer;