const initialState = {
  table: null
}

export const userSlice = (set) => ({
  ...initialState,
  setTableNumber: ({ table }) => set(() => ({ table }))
})