import { SliceCreator } from '@/types/common';

type InitialState = {
  requestState: {
    isClicked: boolean;
  };
};
const initialState: InitialState = {
  requestState: {
    isClicked: false,
  },
};

export interface RequestSlice {
  requestState: {
    isClicked: boolean;
  };
  resetRequestState: () => void;
  setRequestClick: ({ isClicked }: { isClicked: boolean }) => void;
}

export const requestSlice: SliceCreator<RequestSlice> =
  process.env.NODE_ENV === 'development'
    ? (set) => ({
        ...initialState,
        resetRequestState: () => set(initialState, undefined, 'requestState/resetRequestState'),
        setRequestClick: ({ isClicked }: { isClicked: boolean }) =>
          set(() => ({ requestState: { isClicked } }), undefined, 'requestState/setRequestClick'),
      })
    : (set) => ({
        ...initialState,
        resetRequestState: () => set(initialState),
        setRequestClick: ({ isClicked }: { isClicked: boolean }) =>
          set(() => ({ requestState: { isClicked } })),
      });
