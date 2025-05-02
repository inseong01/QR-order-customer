import { tableSlice, TableSlice } from "./table/table-slice";
import {
  menuCategorySlice,
  MenuCategorySlice,
} from "./table/menu-category-slice";
import { flagSlice, FlagSlice } from "./util/flag-slice";
import { orderSlice, OrderSlice } from "./(router)/order/order-slice";
import { callSlice, CallSlice } from "./(router)/call/call-slice";
import { modalSlice, ModalSlice } from "./table/modal/modal-slice";
import { submitSlice, SubmitSlice } from "./util/submit-slice";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type AllSlices = TableSlice &
  SubmitSlice &
  FlagSlice &
  OrderSlice &
  ModalSlice &
  MenuCategorySlice &
  CallSlice;

export const useBoundStore =
  process.env.NODE_ENV === "development"
    ? create<AllSlices>()(
        devtools((...a) => ({
          ...tableSlice(...a),
          ...menuCategorySlice(...a),
          ...flagSlice(...a),
          ...orderSlice(...a),
          ...callSlice(...a),
          ...modalSlice(...a),
          ...submitSlice(...a),
        })),
      )
    : create<AllSlices>((...a) => ({
        ...tableSlice(...a),
        ...menuCategorySlice(...a),
        ...flagSlice(...a),
        ...orderSlice(...a),
        ...callSlice(...a),
        ...modalSlice(...a),
        ...submitSlice(...a),
      }));
