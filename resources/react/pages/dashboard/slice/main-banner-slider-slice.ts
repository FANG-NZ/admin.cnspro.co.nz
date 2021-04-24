import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import type {BannerSliderItem} from '../../../types/banner-slider-item.type'
import type {RootState} from '../store/dashboard-store'

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


export const addNewItem = createAsyncThunk(
    'MainBannerSlider/addNewItem',
    (data:string) => {
        return "TEST"
    }
)



/**
 * TODO
 * define the MainBannerSliderSlice
 */
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
