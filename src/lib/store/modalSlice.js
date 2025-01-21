const initialState = {
  modalState: {
    type: '',
    isOpen: false,
  }
}

export const modalSlice = process.env.NODE_ENV === 'development' ?
  (set) => ({
    ...initialState,
    setModalType: ({ type }) => set((state) => ({ modalState: { ...state.modalState, type } }), undefined, 'modalState/setModalType'),
    setModalOpen: ({ isOpen }) => set((state) => ({ modalState: { ...state.modalState, isOpen } }), undefined, 'modalState/setModalOpen')
  }) :
  (set) => ({
    ...initialState,
    setModalType: ({ type }) => set((state) => ({ modalState: { ...state.modalState, type } })),
    setModalOpen: ({ isOpen }) => set((state) => ({ modalState: { ...state.modalState, isOpen } }))
  })