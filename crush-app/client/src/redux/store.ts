import { configureStore } from '@reduxjs/toolkit'
import CrushReducer from './crushSlice'

export const store = configureStore({
    reducer: {
        crushes: CrushReducer
    },
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
