import postOrderList from "@/lib/supabase/function/postOrderList";
import postRequestList from "@/lib/supabase/function/postRequestList";

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

export const fetchOrderListResponse = createAsyncThunk(
  'submitState/fetchOrderListResponse',
  async ({ tableNum, pickUpList }) => {
    const result = await postOrderList(tableNum, pickUpList)
    await new Promise(res => setTimeout(() => res(), 500));
    return result;
  }
)

export const fetchRequestListResponse = createAsyncThunk(
  'submitState/fetchRequestListResponse',
  async ({ tableNum, requestStr }) => {
    const result = await postRequestList(tableNum, requestStr)
    await new Promise(res => setTimeout(() => res(), 500));
    return result;
  }
)

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
    builder.addCase(fetchOrderListResponse.pending, (state, action) => {
      // console.log('fetchOrderListResponse.pending')
      return {
        ...state,
        isSubmit: true,
      }
    })
    builder.addCase(fetchOrderListResponse.fulfilled, (state, action) => {
      console.log('fetchOrderListResponse.fulfilled')
      return {
        ...state,
        isSubmit: true,
        status: 'fulfilled'
      }
    })
    builder.addCase(fetchOrderListResponse.rejected, (state, action) => {
      console.log('fetchOrderListResponse.rejected')
      return {
        ...state,
        isSubmit: false,
        status: 'rejected'
      }
    })
    builder.addCase(fetchRequestListResponse.pending, (state, action) => {
      // console.log('fetchRequestListResponse.pending')
      return {
        ...state,
        isSubmit: true,
      }
    })
    builder.addCase(fetchRequestListResponse.fulfilled, (state, action) => {
      console.log('fetchRequestListResponse.fulfilled')
      return {
        ...state,
        isSubmit: true,
        status: 'fulfilled',
        modal: {
          ...state.modal,
          status: true
        }
      }
    })
    builder.addCase(fetchRequestListResponse.rejected, (state, action) => {
      console.log('fetchRequestListResponse.rejected')
      return {
        ...state,
        isSubmit: false,
        status: 'rejected'
      }
    })
  }
})


export const { resetSubmitState, changeModalId, clickToSubmit, changeModalStatus } = submitSlice.actions;
export default submitSlice.reducer;