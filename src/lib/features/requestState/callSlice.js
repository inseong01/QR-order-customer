import { createSlice } from "@reduxjs/toolkit";
import calculateAmount from "@/function/calculateAmount";

const initialState = {
  isClicked: false,
  selectedItemArr: [],
}

const callSlice = createSlice({
  name: 'callState',
  initialState,
  reducers: {
    selectCallBtn: (state, action) => {
      const idx = action.payload.idx;
      const name = action.payload.name;
      const amount = action.payload.amount;
      const isIncludedItem = state.selectedItemArr.some((item) => item.idx === idx);
      // 선택해제
      if (isIncludedItem) {
        const updateItemArr = state.selectedItemArr.filter(item => item.idx !== idx);
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
        selectedItemArr: [...state.selectedItemArr, { idx, name, amount }]
      }
    },
    countItemAmount: (state, action) => {
      const idx = action.payload.idx;
      const num = action.payload.num;
      const updateItemArr = state.selectedItemArr.map((item, i) => {
        const calcedAmount = calculateAmount(item.amount, num);
        if (i === idx) return {
          ...item,
          amount: calcedAmount,
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

export const { selectCallBtn, countItemAmount, resetCallState } = callSlice.actions;
export default callSlice.reducer;