import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {BannerSliderItem} from '../../../types/banner-slider-item.type'
import {RootState} from '../store/dashboard-store'

/**
 * define the MainBannerSlider state
 * structure
 */
type MainBannerSliderState = {
    sliders : Array<BannerSliderItem>
}


//define the initial state here
const initialState : MainBannerSliderState = {
    sliders: []
}

const MainBannerSliderSlice = createSlice({
    name: 'MainBannerSlider',
    initialState,
    reducers:{

        /**
         * TODO
         * init sliders list here
         * @param state 
         * @param action 
         */
        setSliders:(state, action:PayloadAction<Array<BannerSliderItem>>) => {
            state.sliders = action.payload
        }

    }
})

export const {setSliders} = MainBannerSliderSlice.actions
export default MainBannerSliderSlice.reducer

//Helper to get all sliders
export const allSliders = (state:RootState) => state.MainBannerSlider.sliders
