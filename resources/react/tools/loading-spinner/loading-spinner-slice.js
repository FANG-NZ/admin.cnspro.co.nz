import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    shown: false
}

const LoadingSpinnerSlice = createSlice({
    name: "LoadingSpinner",
    initialState,
    reducers:{

        show(state, action){
            state.shown = true
        },

        hide(state, action){
            state.shown = false
        }

    }
})

export const {show, hide} = LoadingSpinnerSlice.actions
export default LoadingSpinnerSlice.reducer