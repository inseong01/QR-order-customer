const initialState = {
  menuState: {
    selectedMenuCategoryId: 1,
  }
}

export const menuSlice = process.env.NODE_ENV === 'development' ?
  (set) => ({
    ...initialState,
    getSelectedMenuCategoryId: ({ id }) => set(() => ({ menuState: { selectedMenuCategoryId: id } }), undefined, 'menuSlice/getSelectedMenuCategoryId')
  }) :
  (set) => ({
    ...initialState,
    getSelectedMenuCategoryId: ({ id }) => set(() => ({ menuState: { selectedMenuCategoryId: id } }))
  })