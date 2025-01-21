const initialState = {
  callState: {
    isClicked: false,
    selectedItemArr: [],
  }
}

export const callSlice = process.env.NODE_ENV === 'development' ?
  (set) => ({
    ...initialState,
    // 요청 항목 상태 초기화
    resetCallState: () => set(initialState, undefined, 'callState/resetCallState'),
    // 요청 항목 선택
    selectCallBtn: ({ id, title, amount }) => set((state) => {
      const { callState } = state
      // 항목 선택 중복 여부
      const isIncludedItem = callState.selectedItemArr.some((item) => item.id === id);
      // 참, 항목 선택해제 상황
      if (isIncludedItem) {
        const updateItemArr = callState.selectedItemArr.filter(item => item.id !== id);
        // 팝업 사라짐
        if (updateItemArr.length === 0) return initialState;
        return {
          callState: {
            ...callState,
            selectedItemArr: updateItemArr
          }
        }
      }
      // 거짓, 항목 선택 상황
      return {
        callState: {
          isClicked: true,
          selectedItemArr: [...callState.selectedItemArr, { id, title, amount }]
        }
      }
    }, undefined, 'callState/selectCallBtn'),
    // 요청 항목 수량 변경
    changeItemAmount: ({ id, amount }) => set((state) => {
      const { callState } = state
      // 해당 항목 수량 수정 배열
      const updateItemArr = [...callState.selectedItemArr].map((item) => {
        if (item.id === id) return { ...item, amount }
        return { ...item }
      })
      return {
        callState: {
          ...callState,
          selectedItemArr: updateItemArr
        }
      }
    }, undefined, 'callState/changeItemAmount'),
  }) :
  (set) => ({
    ...initialState,
    // 요청 항목 상태 초기화
    resetCallState: () => set(initialState),
    // 요청 항목 선택
    selectCallBtn: ({ id, title, amount }) => set((state) => {
      const { callState } = state
      // 항목 선택 중복 여부
      const isIncludedItem = callState.selectedItemArr.some((item) => item.id === id);
      // 참, 항목 선택해제 상황
      if (isIncludedItem) {
        const updateItemArr = callState.selectedItemArr.filter(item => item.id !== id);
        // 팝업 사라짐
        if (updateItemArr.length === 0) return initialState;
        return {
          callState: {
            ...callState,
            selectedItemArr: updateItemArr
          }
        }
      }
      // 거짓, 항목 선택 상황
      return {
        callState: {
          isClicked: true,
          selectedItemArr: [...callState.selectedItemArr, { id, title, amount }]
        }
      }
    }),
    // 요청 항목 수량 변경
    changeItemAmount: ({ id, amount }) => set((state) => {
      const { callState } = state
      // 해당 항목 수량 수정 배열
      const updateItemArr = [...callState.selectedItemArr].map((item) => {
        if (item.id === id) return { ...item, amount }
        return { ...item }
      })
      return {
        callState: {
          ...callState,
          selectedItemArr: updateItemArr
        }
      }
    }),
  })