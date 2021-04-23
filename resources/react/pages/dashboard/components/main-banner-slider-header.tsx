import React from 'react'
import {useDispatch} from 'react-redux'
import {show} from '../slice/banner-slider-modal-slice'


/**
 * TODO
 * define the main banner image header
 * @returns
 */
 const MainBannerSliderHeader = () : JSX.Element => {
    const _dispatch = useDispatch()

    return(
        <div className="card-header ff-card-header">
            <div className="card-header-content">
                <h4 className="m-t-0 header-title">Main banner images</h4>
                <p className="text-muted font-13">
                    All items will be displayed on Home Page main SLIDER
                </p>
            </div>
            
            <div className="card-header-tools">

                <button className="btn btn-success" 
                    onClick={() => {
                        _dispatch(show())
                    }}
                >
                    <i className="mdi mdi-plus-circle"></i>
                    <span>New item</span>
                </button>   

            </div>
        </div>
    )
}
export default MainBannerSliderHeader