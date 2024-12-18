import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "@/lib/features/userState/userSlice.js"
import menuStateSliceReducer from "@/lib/features/menuState/menuSlice.js"
import pickUpSlice from "@/lib/features/requestState/pickUpSlice.js"
import callSliceReducer from "@/lib/features/requestState/callSlice.js"
import countNumberSliceReducer from "@/lib/features/countNumberState/countNumberSlice.js"
import submitSliceReducer from "@/lib/features/submitState/submitSlice.js"

export function makeStore() {
  return configureStore({
    reducer: {
      userState: userSliceReducer,
      menuState: menuStateSliceReducer,
      pickUpState: pickUpSlice,
      callState: callSliceReducer,
      countNumberState: countNumberSliceReducer,
      submitState: submitSliceReducer,
    }
  })
}