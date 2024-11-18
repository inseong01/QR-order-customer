import { createSlice } from "@reduxjs/toolkit";
import { countNumber } from "../countNumberState/countNumberSlice";
import calculateAmount from "@/function/calculateAmount";

const initialState = {
  isClicked: false,
  selectedMenu: {
    name: '',
    price: '0',
    amount: 1,
  },
  list: [],
  error: {
    isError: false,
    msg: ''
  }
}

const pickUpSlice = createSlice({
  name: 'pickUpState',
  initialState,
  reducers: {
    clickMenu: (state, action) => {
      const { name, price } = action.payload.menuData;
      // 동일 메뉴 선택 시 창 닫기, 창 닫혀있는 상태서는 적용 예외
      const isSame = state.isClicked && state.selectedMenu.name === name;
      return {
        ...state,
        selectedMenu: {
          ...state.selectedMenu,
          name,
          price,
          amount: 1,
        },
        isClicked: !isSame && true,
      }
    },
    pickUpMenu: (state, action) => {
      const pickUpList = state.list;
      const selectedMenu = state.selectedMenu;
      // 동일 항목 있으면 덮어씌우기
      let isOverwrite = pickUpList.some(list => list.name === selectedMenu.name);
      const updateList = isOverwrite ?
        pickUpList.map(list => (
          list.name === selectedMenu.name ? { ...list, amount: selectedMenu.amount } : list
        )) : [...state.list, selectedMenu]

      return {
        ...initialState,
        list: updateList,
        isClicked: false,
      }
    },
    addMenuToPickUpList: (state, action) => {
      const selectedMenu = action.payload.menu;
      const pickUpList = state.list;
      // 동일 항목 추가 방지
      for (let i = 0; i < pickUpList.length; i++) {
        if (selectedMenu.name !== pickUpList[i].name) continue;
        return {
          ...state,
          error: {
            isError: true,
            msg: '이미 담은 메뉴입니다.'
          }
        }
      }
      return {
        ...state,
        list: [...state.list, selectedMenu]
      }
    },
    resetPickUpState: (state, action) => {
      return initialState;
    },
    calculateAmountInPickUpList: (state, action) => {
      const idx = action.payload.idx;
      const num = action.payload.num;
      const updateList = state.list.map((list, i) => {
        if (i !== idx) return { ...list }
        const amount = calculateAmount(list.amount, num);
        return {
          ...list,
          amount
        }
      })

      return {
        ...state,
        list: updateList
      }
    },
    deletePickUpList: (state, action) => {
      const idx = action.payload.idx;
      const updateList = state.list.filter((list, i) => idx !== i)
      return {
        ...state,
        list: updateList
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(countNumber, (state, action) => {
      // countNumber dispatch 동작 연동
      console.log(state, action)
      const calcedNumber = calculateAmount(state.selectedMenu.amount, action.payload.num);
      return {
        ...state,
        selectedMenu: {
          ...state.selectedMenu,
          amount: calcedNumber
        }
      }
    })
  }
})

export const { clickMenu, pickUpMenu, addMenuToPickUpList, resetPickUpState, calculateAmountInPickUpList, deletePickUpList } = pickUpSlice.actions;
export default pickUpSlice.reducer;