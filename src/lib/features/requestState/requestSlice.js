import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pickUp: {
    isClicked: false,
    selectedMenu: {
      name: '',
      price: '0',
      count: 1,
    },
    list: [],
    error: {
      isError: false,
      msg: ''
    }
  },

}

const requestSlice = createSlice({
  name: 'requestState',
  initialState,
  reducers: {
    clickMenu: (state, action) => {
      const { name, price } = action.payload.menuData;
      // 동일 메뉴 선택 시 창 닫기, 창 닫혀있는 상태서는 적용 예외
      const isSame = state.pickUp.isClicked && state.pickUp.selectedMenu.name === name;
      return {
        ...state,
        pickUp: {
          ...state.pickUp,
          selectedMenu: {
            ...state.pickUp.selectedMenu,
            name,
            price,
            count: 1,
          },
          isClicked: !isSame && true,
        }
      }
    },
    calculateMenuAmounts: (state, action) => {
      const receivedNum = Number(action.payload.num);
      let count = Number(state.pickUp.selectedMenu.count) + receivedNum;
      if (count <= 1) count = 1;
      return {
        ...state,
        pickUp: {
          ...state.pickUp,
          selectedMenu: {
            ...state.pickUp.selectedMenu,
            count,
          },
        }
      }
    },
    pickUpMenu: (state, action) => {
      const pickUpList = state.pickUp.list;
      const selectedMenu = state.pickUp.selectedMenu;
      // 동일 항목 있으면 덮어씌우기
      let isOverwrite = pickUpList.some(list => list.name === selectedMenu.name);
      const updateList = isOverwrite ?
        pickUpList.map(list => (
          list.name === selectedMenu.name ? { ...list, count: selectedMenu.count } : list
        )) : [...state.pickUp.list, selectedMenu]

      return {
        ...initialState,
        pickUp: {
          ...initialState.pickUp,
          list: updateList,
          isClicked: false,
        }
      }
    },
    addMenuToPickUpList: (state, action) => {
      const selectedMenu = action.payload.menu;
      const pickUpList = state.pickUp.list;
      // 동일 항목 추가 방지
      for (let i = 0; i < pickUpList.length; i++) {
        if (selectedMenu.name !== pickUpList[i].name) continue;
        return {
          ...state,
          pickUp: {
            ...state.pickUp,
            error: {
              isError: true,
              msg: '이미 담은 메뉴입니다.'
            }
          }
        }
      }
      return {
        ...state,
        pickUp: {
          ...state.pickUp,
          list: [...state.pickUp.list, selectedMenu]
        }
      }
    },
    resetPickUpState: (state, action) => {
      return initialState;
    }
  }
})

export const { clickMenu, pickUpMenu, calculateMenuAmounts, addMenuToPickUpList, resetPickUpState } = requestSlice.actions;
export default requestSlice.reducer;