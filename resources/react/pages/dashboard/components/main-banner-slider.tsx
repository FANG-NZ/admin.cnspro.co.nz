import React from 'react'
import MainBannerSliderHeader from './main-banner-slider-header'
import MainBannerSliderItem, {MainBannerSliderEmptyItem} from './main-banner-slider-item'
import type {BannerSliderItem} from '../../../types/banner-slider-item.type'
import {allSliders} from '../slice/main-banner-slider-slice'
import {useAppDispatch , useAppSelector} from '../store/store-hook'


type BannerSliderListProps = {
    sliders : Array<BannerSliderItem>
}

const MainBannerSliderList : React.FC<BannerSliderListProps> = ({sliders}):JSX.Element => {

    return(
        <div className="card-body">
            <div className="row">

                {sliders.length === 0 
                    ? <MainBannerSliderEmptyItem />
                    : sliders.map((item) => <MainBannerSliderItem item={item} key={`banner_slider_item_${item.id}`} />)
                }

            </div>
        </div>
    )
}




/**
 * TODO
 * defien the MainBannerSlider
 * @returns 
 */
const MainBannerSlider = ():JSX.Element => {
    //To load sliders from STORE
    const _sliders : Array<BannerSliderItem> = useAppSelector(allSliders)

    return(
        <div id="main-banner-slider" className="card">
            <MainBannerSliderHeader />

            <MainBannerSliderList sliders={_sliders} />
        </div>
    )
}
export default MainBannerSlider

