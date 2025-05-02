import { SelectedMenu, SliceCreator, Status } from "@/types/common";
import { postSubmitState } from "../../function/fetch/fetch-submit-state";

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
    status: "",
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
  fetchOrderArr: ({
    pickUpList,
    submitError,
  }: {
    pickUpList: SelectedMenu[];
    submitError: boolean;
  }) => void;
  fetchRequest: ({ requestStr }: { requestStr: string }) => void;
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
  process.env.NODE_ENV === "development"
    ? (set, get) => ({
        ...initialState,
        resetSubmitState: () =>
          set(initialState, undefined, "submitState/resetSubmitState"),
        fetchOrderArr: ({
          pickUpList,
          submitError,
        }: {
          pickUpList: SelectedMenu[];
          submitError: boolean;
        }) => {
          postSubmitState({ pickUpList, submitError, set, get });
        },
        fetchRequest: ({ requestStr }: { requestStr: string }) => {
          postSubmitState({ requestStr, set, get });
        },
        setNexPageEnable: ({ isNext }: { isNext: boolean }) =>
          set(
            (state) => ({ submitState: { ...state.submitState, isNext } }),
            undefined,
            "submitState/setNexPageEnable",
          ),
      })
    : (set, get) => ({
        ...initialState,
        resetSubmitState: () => set(initialState),
        fetchOrderArr: ({
          pickUpList,
          submitError,
        }: {
          pickUpList: SelectedMenu[];
          submitError: boolean;
        }) => {
          postSubmitState({ set, get, pickUpList, submitError });
        },
        fetchRequest: ({ requestStr }: { requestStr: string }) => {
          postSubmitState({ set, get, requestStr });
        },
        setNexPageEnable: ({ isNext }: { isNext: boolean }) =>
          set((state) => ({ submitState: { ...state.submitState, isNext } })),
      });
