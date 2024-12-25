import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isClicked: false,
}

const requestSlice = createSlice({
  name: 'requestState',
  initialState,
  reducers: {
    resetRequestState: () => {
      return initialState
    },
    setRequestClick: (state, action) => {
      return {
        ...state,
        isClicked: action.payload.isClicked
      }
    }
  }
})

export const { resetRequestState, setRequestClick } = requestSlice.actions;
export default requestSlice.reducer