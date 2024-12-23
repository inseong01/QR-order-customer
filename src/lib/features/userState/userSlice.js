import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  who: 'visitor',
  tableNum: 1
}

const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setTableNum: (state, actions) => {
      return {
        ...state,
        tableNum: actions.payload.tableNum
      }
    }
  }
})

export const { setTableNum } = userSlice.actions;
export default userSlice.reducer;