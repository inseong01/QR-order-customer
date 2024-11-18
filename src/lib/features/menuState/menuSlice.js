import { createSlice } from "@reduxjs/toolkit";

let initMenuListArr = [
  {
    name: '음식 이름 1',
    price: 1000,
    tag: 'popular',
  },
  {
    name: '음식 이름 2',
    price: 1000,
    tag: 'new',
  },
  {
    name: '음식 이름 3',
    price: 1000,
    tag: 'soldout',
  },
  {
    name: '음식 이름 4',
    price: 1000,
    tag: '',
  },
  {
    name: '음식 이름 5',
    price: 1000,
    tag: '',
  },
  {
    name: '음식 이름 6',
    price: 1000,
    tag: '',
  },
  {
    name: '음식 이름 1',
    price: 1000,
    tag: 'popular',
  },
  {
    name: '음식 이름 2',
    price: 1000,
    tag: 'new',
  },
  {
    name: '음식 이름 3',
    price: 1000,
    tag: 'soldout',
  },
  {
    name: '음식 이름 4',
    price: 1000,
    tag: '',
  },
  {
    name: '음식 이름 5',
    price: 1000,
    tag: '',
  },
  {
    name: '음식 이름 6',
    price: 1000,
    tag: '',
  },
];
let initMenuCategoryList = [
  {
    title: '대표메뉴'
  },
  {
    title: '메인메뉴'
  },
  {
    title: '사이드'
  },
  {
    title: '음료'
  },
  {
    title: '주류'
  },
]

// api 요청으로 메뉴 데이터 가져옴
const initialState = {
  menuCategory: '대표메뉴',
  selectedMenuCategoryIdx: 0,
  menuList: initMenuListArr,
  menuCategoryList: initMenuCategoryList,
}
const menuStateSlice = createSlice({
  name: 'menuState',
  initialState,
  reducers: {
    changeMenuCategory: (state, action) => {
      const menuCategory = action.payload.category;
      return {
        ...state,
        menuCategory,
      }
    },
    changeMenuList: (state, action) => {
      const menuCategory = action.payload.category;
      switch (menuCategory) {
        case '대표메뉴': {
          const listArr = [
            {
              name: '음식 이름 1',
              price: 1000,
              tag: 'popular',
            },
            {
              name: '음식 이름 2',
              price: 1000,
              tag: 'new',
            },
            {
              name: '음식 이름 3',
              price: 1000,
              tag: 'soldout',
            },
            {
              name: '음식 이름 4',
              price: 1000,
              tag: '',
            },
            {
              name: '음식 이름 5',
              price: 1000,
              tag: '',
            },
            {
              name: '음식 이름 6',
              price: 1000,
              tag: '',
            },
            {
              name: '음식 이름 1',
              price: 1000,
              tag: 'popular',
            },
            {
              name: '음식 이름 2',
              price: 1000,
              tag: 'new',
            },
            {
              name: '음식 이름 3',
              price: 1000,
              tag: 'soldout',
            },
            {
              name: '음식 이름 4',
              price: 1000,
              tag: '',
            },
            {
              name: '음식 이름 5',
              price: 1000,
              tag: '',
            },
            {
              name: '음식 이름 6',
              price: 1000,
              tag: '',
            },
          ];
          return {
            ...state,
            menuList: listArr,
          };
        }
        case '메인메뉴': {
          const listArr = [
            {
              name: '음식 이름 1',
              price: 10,
              tag: 'popular',
            },
          ];
          return {
            ...state,
            menuList: listArr,
          };
        }
        case '사이드': {
          const listArr = [
            {
              name: '음식 이름 2',
              price: 20,
              tag: 'popular',
            },
          ];
          return {
            ...state,
            menuList: listArr,
          };
        }
        case '음료': {
          const listArr = [
            {
              name: '음식 이름 1',
              price: 400,
              tag: 'popular',
            },
            {
              name: '음식 이름 1',
              price: 1000,
              tag: 'popular',
            },
          ];
          return {
            ...state,
            menuList: listArr,
          };
        }
        case '주류': {
          const listArr = [
            {
              name: '음식 이름 1',
              price: 1000,
              tag: 'popular',
            },
            {
              name: '음식 이름 2',
              price: 1100,
              tag: 'popular',
            },
            {
              name: '음식 이름 3',
              price: 2000,
              tag: 'popular',
            },
          ];
          return {
            ...state,
            menuList: listArr,
          };
        }
      }
    },
    getSelectedMenuCategoryIdx: (state, action) => {
      const idx = Number(action.payload.idx);
      return {
        ...state,
        selectedMenuCategoryIdx: idx,
      }
    },
  }
})

export const { changeMenuCategory, changeMenuList, getSelectedMenuCategoryIdx } = menuStateSlice.actions;
export default menuStateSlice.reducer;