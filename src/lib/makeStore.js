import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "@/lib/features/userState/userSlice.js"

export function makeStore() {
  return configureStore({
    reducer: {
      userState: userSliceReducer
    }
  })
}