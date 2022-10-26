import {configureStore} from '@reduxjs/toolkit'
import reactFormReducer from './reactFormReducer'
export const store = configureStore({
    reducer:{
        // Nơi chứa reducer
        reactFormReducer
    }
})