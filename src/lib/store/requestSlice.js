const initialState = {
  requestState: {
    isClicked: false,
  }
}

export const requestSlice = process.env.NODE_ENV === 'development' ?
  (set) => ({
    ...initialState,
    resetRequestState: () => set(initialState, undefined, 'requestState/resetRequestState'),
    setRequestClick: ({ isClicked }) => set(() => ({ requestState: { isClicked } }), undefined, 'requestState/setRequestClick')
  }) :
  (set) => ({
    ...initialState,
    resetRequestState: () => set(initialState),
    setRequestClick: ({ isClicked }) => set(() => ({ requestState: { isClicked } }))
  }) 