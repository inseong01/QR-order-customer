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

  }
}

export const asyncFetchOrderList = createAsyncThunk(
  'submitState/asyncFetchOrderList',
  async (pickUpLists) => {
    const a = await new Promise(res => setTimeout(() => res(pickUpLists), 200));
    console.log(pickUpLists);
    return a;
  })
export const asyncFetchRequestList = createAsyncThunk(
  'submitState/asyncFetchRequestList',
  async (request) => {
    const a = await new Promise(res => setTimeout(() => res(request), 200));
    console.log(request);
    return a;
  })

const submitSlice = createSlice({
  name: 'submitState',
  initialState,
  reducers: {
    resetSubmitState: () => {
      return initialState;
    },
    changeSubmitStatus: (state, action) => {
      const status = action.payload.status;
      return {
        ...state,
        status
      }
    },
    changeModalTarget: (state, action) => {
      const target = action.payload.target;
      return {
        ...state,
        modal: {
          ...state.modal,
          target
        }
      }
    }
  },
  extraReducers: builder => {
    // pickUpList
    builder.addCase(asyncFetchOrderList.pending, (state, action) => {
      console.log('action.pending', action)
      return {
        ...state,
        isSubmit: true,
      }
    })
    builder.addCase(asyncFetchOrderList.fulfilled, (state, action) => {
      console.log('action.fulfilled', action)
      return {
        ...state,
        isSubmit: true,
        status: 'OK'
      }
    })
    // requestList
    builder.addCase(asyncFetchRequestList.pending, (state, action) => {
      console.log('action.pending', action)
      return {
        ...state,
        isSubmit: true,
      }
    })
    builder.addCase(asyncFetchRequestList.fulfilled, (state, action) => {
      console.log('action.fulfilled', action)
      return {
        ...state,
        isSubmit: true,
        status: 'OK'
      }
    })
  }
})


export const { changeSubmitStatus, resetSubmitState, changeModalTarget } = submitSlice.actions;
export default submitSlice.reducer;