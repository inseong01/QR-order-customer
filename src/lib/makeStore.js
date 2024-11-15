import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "@/lib/features/userState/userSlice.js"
import menuStateSliceReducer from "@/lib/features/menuState/menuSlice.js"
import requestSliceReducer from "@/lib/features/requestState/requestSlice.js"

export function makeStore() {
  return configureStore({
    reducer: {
      userState: userSliceReducer,
      menuState: menuStateSliceReducer,
      requestState: requestSliceReducer,
    }
  })
}