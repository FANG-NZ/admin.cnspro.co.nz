import {configureStore} from '@reduxjs/toolkit'
import MainBannerSliderReducer from '../slice/main-banner-slider-slice'
import BannerSliderModalReducer from '../slice/banner-slider-modal-slice'

const store = configureStore({
    reducer: {
        MainBannerSlider : MainBannerSliderReducer,
        BannerSliderModal : BannerSliderModalReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store