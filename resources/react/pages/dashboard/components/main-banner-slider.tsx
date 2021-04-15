import React from 'react'

/**
 * TODO
 * define the main banner image header
 * @returns
 */
const MainBannerSliderHeader = () : JSX.Element => {

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
                        alert("clicked")
                    }}
                >
                    <i className="mdi mdi-plus-circle"></i>
                    <span>New item</span>
                </button>   

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


    return(
        <div id="main-banner-slider" className="card">
            <MainBannerSliderHeader />
        </div>
    )
}
export default MainBannerSlider

