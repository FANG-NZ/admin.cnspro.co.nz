import {configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useSelector, useDispatch} from 'react-redux'
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

//Hook
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector 

export default store