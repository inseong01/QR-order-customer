const initialState = {
  selectedMenuCategoryId: 1,
}

export const menuSlice = (set) => ({
  ...initialState,
  getSelectedMenuCategoryId: ({ id }) => set(() => ({ selectedMenuCategoryId: id }))
})