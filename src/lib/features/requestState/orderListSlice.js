import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
}

const orderListSlice = createSlice({
  name: 'orderListState',
  initialState,
  reducers: {
    addOrderList: (state, action) => {
      return {
        ...state,
        list: [action.payload.list, ...state.list]
      }
    }
  }
})

export const { addOrderList } = orderListSlice.actions;
export default orderListSlice.reducer; 