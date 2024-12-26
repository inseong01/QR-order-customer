import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isClicked: false,
  selectedItemArr: [],
}

const callSlice = createSlice({
  name: 'callState',
  initialState,
  reducers: {
    selectCallBtn: (state, action) => {
      const id = action.payload.id;
      const title = action.payload.title;
      const amount = action.payload.amount;
      const isIncludedItem = state.selectedItemArr.some((item) => item.id === id);
      // 선택해제
      if (isIncludedItem) {
        const updateItemArr = state.selectedItemArr.filter(item => item.id !== id);
        // 팝업 사라짐
        if (updateItemArr.length === 0) return initialState;
        return {
          ...state,
          selectedItemArr: updateItemArr
        }
      }
      // 선택
      return {
        ...state,
        isClicked: true,
        selectedItemArr: [...state.selectedItemArr, { id, title, amount }]
      }
    },
    changeItemAmount: (state, action) => {
      const id = action.payload.id;
      const amount = action.payload.amount;
      const updateItemArr = [...state.selectedItemArr].map((item) => {
        if (item.id === id) return {
          ...item,
          amount,
        }
        return { ...item }
      })

      return {
        ...state,
        selectedItemArr: updateItemArr
      }
    },
    resetCallState: (state, action) => {
      return initialState;
    }
  },
})

export const { selectCallBtn, changeItemAmount, resetCallState } = callSlice.actions;
export default callSlice.reducer;