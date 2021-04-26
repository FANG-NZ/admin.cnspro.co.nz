import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import store from './dashboard/store/dashboard-store'
import {setSliders} from './dashboard/slice/main-banner-slider-slice'
import ToastBox from '../tools/toast-box/toast-box'
import LoadingSpinner from '../tools/loading-spinner/loading-spinner'
import MainBannerSlider from './dashboard/components/main-banner-slider'
import {BannerSliderItem} from '../types/banner-slider-item.type'
import BannerSliderModal from './dashboard/modals/banner-slider-modal'
import ConfirmDialog from '../tools/confirm-dialog/confirm-dialog'
import {Client} from '../tools/fetch-client'

// const banner_list : Array<BannerSliderItem> = [
//     {
//         id : 1,
//         url : "https://freebw.com/templates/tatee/images/slide-01.jpg",
//         title : "Canadian lake house features dark wood" 
//     },

//     {
//         id : 2,
//         url : "https://freebw.com/templates/tatee/images/slide-02.jpg",
//         title : "Future housein the Barvikha forest" 
//     }
// ];

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


//Test line
// Client.get("/dashboard/banner-slider/load").then(
//     (data)=>{
//         console.log(data)
//     },
//     (error) => {
//         console.log(error.message)
//     }
    
// )


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