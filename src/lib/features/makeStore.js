import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "@/lib/features/userState/userSlice.js"
import menuStateSliceReducer from "@/lib/features/menuState/menuSlice.js"
import pickUpSlice from "@/lib/features/pickUpState/pickUpSlice.js"
import callSliceReducer from "@/lib/features/callState/callSlice.js"
import submitSliceReducer from "@/lib/features/submitState/submitSlice.js"
import requestSliceReducer from '@/lib/features/requestState/requestSlice.js'

export function makeStore() {
  return configureStore({
    reducer: {
      // userState: userSliceReducer,
      // menuState: menuStateSliceReducer,
      pickUpState: pickUpSlice,
      callState: callSliceReducer,
      submitState: submitSliceReducer,
      requestState: requestSliceReducer,
    }
  })
}