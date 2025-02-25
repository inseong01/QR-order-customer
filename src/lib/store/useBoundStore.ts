import { tableSlice, TableSlice } from './tableSlice';
import { menuSlice, MenuSlice } from './menuSlice';
import { requestSlice, RequestSlice } from './requestSlice';
import { pickUpSlice, PickUpSlice } from './pickUpSlice';
import { callSlice, CallSlice } from './callSlice';
import { modalSlice, ModalSlice } from './modalSlice';
import { submitSlice, SubmitSlice } from './submitSlice';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type AllSlices = TableSlice &
  SubmitSlice &
  RequestSlice &
  PickUpSlice &
  ModalSlice &
  MenuSlice &
  CallSlice;

export const useBoundStore =
  process.env.NODE_ENV === 'development'
    ? create<AllSlices>()(
        devtools((...a) => ({
          ...tableSlice(...a),
          ...menuSlice(...a),
          ...requestSlice(...a),
          ...pickUpSlice(...a),
          ...callSlice(...a),
          ...modalSlice(...a),
          ...submitSlice(...a),
        }))
      )
    : create<AllSlices>((...a) => ({
        ...tableSlice(...a),
        ...menuSlice(...a),
        ...requestSlice(...a),
        ...pickUpSlice(...a),
        ...callSlice(...a),
        ...modalSlice(...a),
        ...submitSlice(...a),
      }));
