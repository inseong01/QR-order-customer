const initialState = {
  tableState: {
    tableNum: null
  }
}

export const userSlice = process.env.NODE_ENV === 'development' ?
  (set) => ({
    ...initialState,
    setTableNumber: ({ table }) => set(() => ({ tableState: { tableNum: Number(table) } }), undefined, 'tableState/setTableNumber')
  }) :
  (set) => ({
    ...initialState,
    setTableNumber: ({ table }) => set(() => ({ tableState: { tableNum: Number(table) } }))
  })