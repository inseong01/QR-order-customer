import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  who: 'visitor',
}

const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    changeUser: (state, actions) => {
      return {
        ...state,
        who: actions.payload.who
      }
    }
  }
})

export const { changeUser } = userSlice.actions;
export default userSlice.reducer;