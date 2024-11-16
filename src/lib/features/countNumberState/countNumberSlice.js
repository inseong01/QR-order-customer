import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentNum: 1
}

const countNumberSlice = createSlice({
  name: 'countNumberState',
  initialState,
  reducers: {
    countNumber: (state, action) => {
      const currentNum = state.currentNum;
      const receivedNum = Number(action.payload.num);
      let calcedNumber = currentNum + receivedNum
      if (calcedNumber <= 0) calcedNumber = 1;
      return {
        currentNum: calcedNumber
      }
    },
    resetCountNumberState: () => {
      return initialState;
    }
  }
})

export const { countNumber, resetCountNumberState } = countNumberSlice.actions;
export default countNumberSlice.reducer;