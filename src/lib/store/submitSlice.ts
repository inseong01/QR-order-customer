import { SelectedMenu, SliceCreator, Status } from '@/types/common';
import { fetchSubmitState } from '../function/fetchSubmitState';
import { AllSlices } from './useBoundStore';

type InitialState = {
  submitState: {
    isSubmit: boolean;
    status: Status;
    isNext: boolean;
  };
};

const initialState: InitialState = {
  submitState: {
    isSubmit: false,
    status: '',
    isNext: false,
  },
};

export interface SubmitSlice {
  submitState: {
    isSubmit: boolean;
    status: Status;
    isNext: boolean;
  };
  resetSubmitState: () => void;
  fetchOrderSubmitState: ({
    pickUpList,
    submitError,
  }: {
    pickUpList: SelectedMenu;
    submitError: boolean;
  }) => void;
  fetchRequestSubmitState: ({ requestStr }: { requestStr: string }) => void;
  setNexPageEnable: ({ isNext }: { isNext: boolean }) => void;
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

export const submitSlice: SliceCreator<SubmitSlice> =
  process.env.NODE_ENV === 'development'
    ? (set, get) => ({
        ...initialState,
        resetSubmitState: () => set(initialState, undefined, 'submitState/resetSubmitState'),
        fetchOrderSubmitState: ({
          pickUpList,
          submitError,
        }: {
          pickUpList: SelectedMenu;
          submitError: boolean;
        }) => {
          fetchSubmitState({ pickUpList, submitError, set, get });
        },
        fetchRequestSubmitState: ({ requestStr }: { requestStr: string }) => {
          fetchSubmitState({ requestStr, set, get });
        },
        setNexPageEnable: ({ isNext }: { isNext: boolean }) =>
          set(
            (state) => ({ submitState: { ...state.submitState, isNext } }),
            undefined,
            'submitState/setNexPageEnable'
          ),
      })
    : (set, get) => ({
        ...initialState,
        resetSubmitState: () => set(initialState),
        fetchOrderSubmitState: ({
          pickUpList,
          submitError,
        }: {
          pickUpList: SelectedMenu;
          submitError: boolean;
        }) => {
          fetchSubmitState({ set, get, pickUpList, submitError });
        },
        fetchRequestSubmitState: ({ requestStr }: { requestStr: string }) => {
          fetchSubmitState({ set, get, requestStr });
        },
        setNexPageEnable: ({ isNext }: { isNext: boolean }) =>
          set((state) => ({ submitState: { ...state.submitState, isNext } })),
      });
