import { createSlice } from "@reduxjs/toolkit";

let initMenuListArr = [
  {
    key: 0,
    name: '로스카츠',
    price: 9500,
    tag: 'popular',
    img: '/img/menu/menu_0.jpg'
  },
  {
    key: 1,
    name: '히레카츠',
    price: 12000,
    tag: 'new',
    img: '/img/menu/menu_1.jpg'
  },
  {
    key: 2,
    name: '치즈카츠',
    price: 11000,
    tag: 'soldout',
    img: '/img/menu/menu_2.jpg'
  },
  {
    key: 3,
    name: '고구마 치즈카츠',
    price: 12000,
    tag: '',
    img: '/img/menu/menu_3.jpg'
  },
  {
    key: 4,
    name: '치킨카츠',
    price: 8000,
    tag: '',
    img: '/img/menu/menu_4.jpg'
  },
  {
    key: 5,
    name: '모듬 카츠',
    price: 14000,
    tag: '',
    img: '/img/menu/menu_5.jpg'
  },
];
let initMenuCategoryList = [
  {
    key: 0,
    title: '메인메뉴'
  },
  {
    key: 1,
    title: '사이드'
  },
  {
    key: 2,
    title: '음료'
  },
]

// api 요청으로 메뉴 데이터 가져옴
const initialState = {
  menuCategory: '대표메뉴',
  selectedMenuCategoryKey: 0,
  menuList: initMenuListArr,
  menuCategoryList: initMenuCategoryList,
}
const menuStateSlice = createSlice({
  name: 'menuState',
  initialState,
  reducers: {
    changeMenuCategory: (state, action) => {
      const title = action.payload.title;
      return {
        ...state,
        menuCategory: title,
      }
    },
    changeMenuList: (state, action) => {
      const title = action.payload.title;
      switch (title) {
        case '메인메뉴': {
          const listArr = initMenuListArr;
          return {
            ...state,
            menuList: listArr,
          };
        }
        case '사이드': {
          const listArr = [
            {
              key: 7,
              name: '메밀 소바',
              price: 8000,
              tag: '',
              img: '/img/menu/menu_6.jpg'
            },
            {
              key: 8,
              name: '부산 어묵우동',
              price: 8000,
              tag: '',
              img: '/img/menu/menu_7.jpg'
            },
            {
              key: 9,
              name: '히레카츠 조각 1p',
              price: 4000,
              tag: '',
              img: '/img/menu/menu_8.jpg'
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
              key: 10,
              name: '사이다',
              price: 1500,
              tag: '',
              img: '/img/menu/icon.jpg',
            },
            {
              key: 11,
              name: '콜라',
              price: 1500,
              tag: '',
              img: '/img/menu/icon.jpg',
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
      const key = Number(action.payload.key);
      return {
        ...state,
        selectedMenuCategoryKey: key,
      }
    },
  }
})

export const { changeMenuCategory, changeMenuList, getSelectedMenuCategoryIdx } = menuStateSlice.actions;
export default menuStateSlice.reducer;