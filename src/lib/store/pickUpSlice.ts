import { SelectedMenu, SliceCreator } from '@/types/common';

type InitialState = {
  pickUpState: {
    isClicked: boolean;
    selectedMenu: SelectedMenu;
    list: SelectedMenu[];
    // error: {
    //   isError: boolean,
    //   msg: string
    // }
  };
};

const initialState: InitialState = {
  pickUpState: {
    isClicked: false,
    selectedMenu: {
      name: '',
      price: '0',
      amount: 1,
      id: null,
    },
    list: [],
    // error: {
    //   isError: false,
    //   msg: ''
    // }
  },
};

export interface PickUpSlice {
  pickUpState: {
    isClicked: boolean;
    selectedMenu: SelectedMenu;
    list: SelectedMenu[];
    // error: {
    //   isError: boolean,
    //   msg: string
    // }
  };
  clickMenu: ({ name, price, id }: { name: string; price: string; id: string }) => void;
  pickUpSelectedMenu: () => void;
  pickUpMenu: (menu: SelectedMenu) => void;
  removePickUpMenu: ({ id }: { id: SelectedMenu['id'] }) => void;
  changeSelectedMenuAmount: ({ amount }: { amount: SelectedMenu['amount'] }) => void;
  changeMenuAmountInPickUpList: ({
    id,
    amount,
  }: {
    id: SelectedMenu['id'];
    amount: SelectedMenu['amount'];
  }) => void;
}

export const pickUpSlice: SliceCreator<PickUpSlice> =
  process.env.NODE_ENV === 'development'
    ? (set) => ({
        ...initialState,
        resetPickUpState: () => set(initialState, undefined, 'pickUpState/resetPickUpState'),
        // 메뉴 항목 클릭
        clickMenu: ({ name, price, id }: { name: string; price: string; id: string }) =>
          set(
            (state) => {
              // 동일 메뉴 선택 여부, 참일 때 팝업 퇴장 설정
              const isSame = state.pickUpState.isClicked && state.pickUpState.selectedMenu.id === id;
              return {
                pickUpState: {
                  ...state.pickUpState,
                  // 클릭마다 데이터 뒤짚어 씌움(이전 클릭 메뉴 데이터 보존)
                  selectedMenu: {
                    name,
                    price,
                    amount: 1,
                    id,
                  },
                  // 클릭이 동일하면 항상 false
                  isClicked: !isSame && true,
                },
              };
            },
            undefined,
            'pickUpState/clickMenu'
          ),
        // 선택된 메뉴 담기
        pickUpSelectedMenu: () =>
          set(
            (state) => {
              const pickUpList = state.pickUpState.list;
              const selectedMenu = state.pickUpState.selectedMenu;
              // 동일 메뉴 항목 여부
              let isOverwrite = pickUpList.some((list) => list.id === selectedMenu.id);
              // 배열 최신화
              const updateList = isOverwrite
                ? pickUpList.map((list) =>
                    list.id === selectedMenu.id ? { ...list, amount: selectedMenu.amount } : list
                  )
                : [...state.pickUpState.list, selectedMenu];

              return {
                pickUpState: {
                  ...initialState.pickUpState,
                  list: updateList,
                  isClicked: false,
                },
              };
            },
            undefined,
            'pickUpState/pickUpSelectedMenu'
          ),
        // 바로 메뉴 담기
        pickUpMenu: (menu: SelectedMenu) =>
          set(
            (state) => ({ pickUpState: { ...state.pickUpState, list: [...state.pickUpState.list, menu] } }),
            undefined,
            'pickUpState/pickUpMenu'
          ),
        // 메뉴 삭제
        removePickUpMenu: ({ id }: { id: SelectedMenu['id'] }) =>
          set(
            (state) => {
              const updateList = state.pickUpState.list.filter((list) => list.id !== id);
              return {
                pickUpState: {
                  ...state.pickUpState,
                  list: updateList,
                },
              };
            },
            undefined,
            'pickUpState/removePickUpMenu'
          ),
        // 팝업에서 메뉴 수량 변경
        changeSelectedMenuAmount: ({ amount }: { amount: SelectedMenu['amount'] }) =>
          set(
            (state) => ({
              pickUpState: {
                ...state.pickUpState,
                selectedMenu: {
                  ...state.pickUpState.selectedMenu,
                  amount,
                },
              },
            }),
            undefined,
            'pickUpState/changeSelectedMenuAmount'
          ),
        // [table]/pickUpList에서 수량 변경
        changeMenuAmountInPickUpList: ({
          id,
          amount,
        }: {
          id: SelectedMenu['id'];
          amount: SelectedMenu['amount'];
        }) =>
          set(
            (state) => {
              // 해당 메뉴 수량 수정 배열
              const updateList = [...state.pickUpState.list].map((list) => {
                if (list.id !== id) return { ...list };
                return { ...list, amount };
              });
              return {
                pickUpState: {
                  ...state.pickUpState,
                  list: updateList,
                },
              };
            },
            undefined,
            'pickUpState/changeMenuAmountInPickUpList'
          ),
      })
    : (set) => ({
        ...initialState,
        resetPickUpState: () => set(initialState),
        // 메뉴 항목 클릭
        clickMenu: ({ name, price, id }: { name: string; price: string; id: string }) =>
          set((state) => {
            // 동일 메뉴 선택 여부, 참일 때 팝업 퇴장 설정
            const isSame = state.pickUpState.isClicked && state.pickUpState.selectedMenu.id === id;
            return {
              pickUpState: {
                ...state.pickUpState,
                // 클릭마다 데이터 뒤짚어 씌움(이전 클릭 메뉴 데이터 보존)
                selectedMenu: {
                  name,
                  price,
                  amount: 1,
                  id,
                },
                // 클릭이 동일하면 항상 false
                isClicked: !isSame && true,
              },
            };
          }),
        // 선택된 메뉴 담기
        pickUpSelectedMenu: () =>
          set((state) => {
            const pickUpList = state.pickUpState.list;
            const selectedMenu = state.pickUpState.selectedMenu;
            // 동일 메뉴 항목 여부
            let isOverwrite = pickUpList.some((list) => list.id === selectedMenu.id);
            // 배열 최신화
            const updateList = isOverwrite
              ? pickUpList.map((list) =>
                  list.id === selectedMenu.id ? { ...list, amount: selectedMenu.amount } : list
                )
              : [...state.pickUpState.list, selectedMenu];

            return {
              pickUpState: {
                ...initialState.pickUpState,
                list: updateList,
                isClicked: false,
              },
            };
          }),
        // 바로 메뉴 담기
        pickUpMenu: (menu: SelectedMenu) =>
          set((state) => ({
            pickUpState: { ...state.pickUpState, list: [...state.pickUpState.list, menu] },
          })),
        // 메뉴 삭제
        removePickUpMenu: ({ id }: { id: SelectedMenu['id'] }) =>
          set((state) => {
            const updateList = state.pickUpState.list.filter((list) => list.id !== id);
            return {
              pickUpState: {
                ...state.pickUpState,
                list: updateList,
              },
            };
          }),
        // 팝업에서 메뉴 수량 변경
        changeSelectedMenuAmount: ({ amount }: { amount: SelectedMenu['amount'] }) =>
          set((state) => ({
            pickUpState: {
              ...state.pickUpState,
              selectedMenu: {
                ...state.pickUpState.selectedMenu,
                amount,
              },
            },
          })),
        // [table]/pickUpList에서 수량 변경
        changeMenuAmountInPickUpList: ({
          id,
          amount,
        }: {
          id: SelectedMenu['id'];
          amount: SelectedMenu['amount'];
        }) =>
          set((state) => {
            // 해당 메뉴 수량 수정 배열
            const updateList = [...state.pickUpState.list].map((list) => {
              if (list.id !== id) return { ...list };
              return { ...list, amount };
            });
            return {
              pickUpState: {
                ...state.pickUpState,
                list: updateList,
              },
            };
          }),
      });
