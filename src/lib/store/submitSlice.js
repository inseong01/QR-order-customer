import { fetchSubmitState } from "../function/fetchSubmitState";

const initialState = {
  submitState: {
    isSubmit: false,
    status: '',
  }
}

/*
  주문 패치 결과 (fulfilled)
  {
    "error": null,
    "data": [...],
    "count": null,
    "status": 201,
    "statusText": ""
  }
*/

export const submitSlice = process.env.NODE_ENV === 'development' ?
  (set, get) => ({
    ...initialState,
    resetSubmitState: () => set(initialState, undefined, 'submitState/resetSubmitState'),
    fetchOrderSubmitState: ({ pickUpList, submitError }) => {
      fetchSubmitState({ set, get, pickUpList, submitError })
    },
    fetchRequestSubmitState: ({ requestStr }) => {
      fetchSubmitState({ set, get, requestStr })
    }
  }) :
  (set, get) => ({
    ...initialState,
    resetSubmitState: () => set(initialState),
    fetchOrderSubmitState: ({ pickUpList, submitError }) => {
      fetchSubmitState({ set, get, pickUpList, submitError })
    },
    fetchRequestSubmitState: ({ requestStr }) => {
      fetchSubmitState({ set, get, requestStr })
    }
  })