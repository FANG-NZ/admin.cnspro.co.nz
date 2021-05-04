import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import store from './store/dashboard-store'
import {setSliders} from './slice/main-banner-slider-slice'
import ToastBox from '../../tools/toast-box/toast-box'
import LoadingSpinner from '../../tools/loading-spinner/loading-spinner'
import MainBannerSlider from './components/main-banner-slider'
import {BannerSliderItem} from '../../types/banner-slider-item.type'
import BannerSliderModal from './modals/banner-slider-modal'
import ConfirmDialog from '../../tools/confirm-dialog/confirm-dialog'

//To get json string from DOM
try{
    const json_string = document.getElementById("root-dashboard")?.getAttribute("banner-sliders-data");
    if(!json_string){
        throw new Error("NOT FOUND JSON STRING")
    }

    //Try to load data from DOM attribute,
    //if there is NO data, we just send AJAX request to fetch from server
    const _data = JSON.parse(json_string)

    //call set sliders
    store.dispatch(setSliders(_data))

}catch(err){
    console.error("Init default banner sliders data ERROR")
}


ReactDOM.render(
    <Provider store={store}>
        <MainBannerSlider/>

        <BannerSliderModal />

        <ConfirmDialog />

        <ToastBox />

        {/* Loading Spinner */}
        <LoadingSpinner />

    </Provider>,
    document.getElementById("root-dashboard")
)