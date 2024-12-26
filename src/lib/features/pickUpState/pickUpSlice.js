import { createSlice } from "@reduxjs/toolkit";
import calculateAmount from "@/lib/function/calculateAmount";

const initialState = {
  isClicked: false,
  selectedMenu: {
    name: '',
    price: '0',
    amount: 1,
    id: null,
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
      const { name, price, id } = action.payload.menuData;
      // 동일 메뉴 선택 시 창 닫기, 창 닫혀있는 상태서는 적용 예외
      const isSame = state.isClicked && state.selectedMenu.id === id;
      return {
        ...state,
        selectedMenu: {
          ...state.selectedMenu,
          name,
          price,
          amount: 1,
          id
        },
        isClicked: !isSame && true,
      }
    },
    pickUpMenu: (state, action) => {
      const pickUpList = state.list;
      const selectedMenu = state.selectedMenu;
      // 동일 항목 있으면 덮어씌우기
      let isOverwrite = pickUpList.some(list => list.id === selectedMenu.id);
      const updateList = isOverwrite ?
        pickUpList.map(list => (
          list.id === selectedMenu.id ? { ...list, amount: selectedMenu.amount } : list
        )) : [...state.list, selectedMenu]

      return {
        ...initialState,
        list: updateList,
        isClicked: false,
      }
    },
    addMenuToPickUpList: (state, action) => {
      const selectedMenu = action.payload.menu;
      return {
        ...state,
        list: [...state.list, selectedMenu]
      }
    },
    resetPickUpState: (state, action) => {
      return initialState;
    },
    changeAmountInPickUpList: (state, action) => {
      const id = action.payload.id;
      const amount = action.payload.amount;
      const updateList = [...state.list].map((list) => {
        if (list.id !== id) return { ...list }
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
    changeSelectedMenuAmount: (state, action) => {
      const amount = action.payload.amount;
      return {
        ...state,
        selectedMenu: {
          ...state.selectedMenu,
          amount
        }
      }
    },
    deletePickUpList: (state, action) => {
      const id = action.payload.id;
      const updateList = state.list.filter((list) => list.id !== id)
      return {
        ...state,
        list: updateList
      }
    },
  },
})

export const { clickMenu, pickUpMenu, addMenuToPickUpList, resetPickUpState, changeAmountInPickUpList, deletePickUpList, changeSelectedMenuAmount } = pickUpSlice.actions;
export default pickUpSlice.reducer;