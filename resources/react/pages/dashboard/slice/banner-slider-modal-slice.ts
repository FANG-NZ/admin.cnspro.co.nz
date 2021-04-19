import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {BannerSliderItem} from '../../../types/banner-slider-item.type'


/**
 * define the TYPE of initial state
 */
type BannerSliderModalState = {
    shown: boolean,
    is_adding_new : boolean,
    item : BannerSliderItem | null
}

const initialState:BannerSliderModalState = {
    shown: false,
    is_adding_new: true,
    item: null
}


const BannerSliderModalSlice = createSlice({
    name: 'BannerSliderModal',
    initialState,
    reducers: {

        /**
         * TODO
         * define the function to open the modal
         */
        show: {
            reducer(state, action:PayloadAction<{item:BannerSliderItem|null, is_adding_new : boolean}>){
                state.shown = true
                state.item = action.payload.item
                state.is_adding_new = action.payload.is_adding_new
            },
            prepare(_item:BannerSliderItem|null){

                const payload = {
                    item : _item,
                    is_adding_new : _item?false:true
                }
                return {payload}
            }
        },

        /**
         * TODO
         * Function is to close modal
         * @param state 
         */
        hide: (state) => {
            state.shown = false
            state.is_adding_new = true
            state.item = null
        }
        
    }
})

export const {show, hide} = BannerSliderModalSlice.actions
export default BannerSliderModalSlice.reducer