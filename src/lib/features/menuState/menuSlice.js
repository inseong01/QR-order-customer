import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMenuCategoryTitle: '메인메뉴',
}
const menuStateSlice = createSlice({
  name: 'menuState',
  initialState,
  reducers: {
    getSelectedMenuCategoryTitle: (state, action) => {
      const title = action.payload.title;
      return {
        ...state,
        selectedMenuCategoryTitle: title,
      }
    },
  }
})

export const { getSelectedMenuCategoryTitle } = menuStateSlice.actions;
export default menuStateSlice.reducer;