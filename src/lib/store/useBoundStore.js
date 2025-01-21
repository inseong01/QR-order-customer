import { userSlice } from "./userSlice";
import { menuSlice } from "./menuSlice";
import { requestSlice } from "./requestSlice";
import { pickUpSlice } from "./pickUpSlice";
import { callSlice } from "./callSlice";
import { modalSlice } from "./modalSlice";
import { submitSlice } from "./submitSlice";

import { create } from "zustand";
import { devtools } from 'zustand/middleware'

export const useBoundStore = process.env.NODE_ENV === 'development' ?
  create()(
    devtools((...a) => ({
      ...userSlice(...a),
      ...menuSlice(...a),
      ...requestSlice(...a),
      ...pickUpSlice(...a),
      ...callSlice(...a),
      ...modalSlice(...a),
      ...submitSlice(...a),
    }))) :
  create((...a) => ({
    ...userSlice(...a),
    ...menuSlice(...a),
    ...requestSlice(...a),
    ...pickUpSlice(...a),
    ...callSlice(...a),
    ...modalSlice(...a),
    ...submitSlice(...a),
  }))
