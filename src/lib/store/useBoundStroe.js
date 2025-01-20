import { userSlice } from "./userSlice";
import { menuSlice } from "./menuSlice";

import { create } from "zustand";

export const useBoundStroe = create((...a) => ({
  ...userSlice(...a),
  ...menuSlice(...a),
}))