import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSubmit: false,
  status: '',
  error: {
    isError: false,
    msg: ''
  },
  modal: {
    target: '',
    status: false,
  }
}

export const delayFetchOrderResponse = createAsyncThunk(
  'submitState/delayFetchOrderResponse',
  async (pickUpLists) => {
    await new Promise(res => setTimeout(() => res(pickUpLists), 500));
  })

const submitSlice = createSlice({
  name: 'submitState',
  initialState,
  reducers: {
    resetSubmitState: () => {
      return initialState;
    },
    changeModalId: (state, action) => {
      const target = action.payload.target;
      return {
        ...state,
        modal: {
          ...state.modal,
          target
        }
      }
    },
    clickToSubmit: (state, action) => {
      return {
        ...state,
        isSubmit: true,
      }
    },
    changeModalStatus: (state, action) => {
      const status = action.payload.status;
      return {
        ...state,
        modal: {
          ...state.modal,
          status
        }
      }
    }
  },
  extraReducers: builder => {
    // pickUpList
    builder.addCase(delayFetchOrderResponse.pending, (state, action) => {
      console.log('delayFetchOrderResponse.pending')
      return {
        ...state,
        isSubmit: true,
        status: 'pending'
      }
    })
    builder.addCase(delayFetchOrderResponse.fulfilled, (state, action) => {
      console.log('delayFetchOrderResponse.fulfilled')
      return {
        ...state,
        isSubmit: true,
        status: 'fulfilled'
      }
    })
  }
})


export const { resetSubmitState, changeModalId, clickToSubmit, changeModalStatus } = submitSlice.actions;
export default submitSlice.reducer;