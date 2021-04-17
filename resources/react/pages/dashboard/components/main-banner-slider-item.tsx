import React from 'react'
import type {BannerSliderItem} from '../../../types/banner-slider-item.type'

/**
 * TODO
 * define the empty slider item
 * @returns 
 */
export const MainBannerSliderEmptyItem:React.FC = ():JSX.Element => {

    return(
        <div className="col-12">
            <div className="alert alert-warning mb-0">
                There is <strong>NO</strong> any SLIDER ITEM added
            </div>
        </div>
    )
}



/**
 * TODO
 * defien the slider item
 * @param BannerSliderItem item
 * @returns 
 */
const MainBannerSliderItem : React.FC<{item:BannerSliderItem}> = ({item}):JSX.Element => {

    return(
        <div className="col-md-3">
            <div className="card main-banner-slider-item">
                <img src={item.url} alt="" className="card-img-top img-fluid" />
                <div className="card-body">
                    <div className="card-title" aria-label="title">{item.title}</div>
                </div>
                <div className="card-body card-btns">
                    
                    <button className="btn btn-success btn-sm">
                        <i className="mdi mdi-database-plus"></i>
                        <span>Edit</span>
                    </button>

                    <button className="btn btn-danger btn-sm">
                        <i className="mdi mdi-delete"></i>
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default MainBannerSliderItem