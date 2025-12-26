import {configureStore} from '@reduxjs/toolkit'
import stepsReducer from "./slices/steps"

export const store= configureStore({
    reducer:{
        steps:stepsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;