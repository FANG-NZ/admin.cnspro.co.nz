import React from 'react'
import { useSelector } from 'react-redux'
import { createPortal } from 'react-dom'

//define the loading spinner
const LoadingSpinner = (props) => {
    const _portalBox = document.getElementById("portal-box")
    const _loadingState = useSelector(state => state.LoadingSpinner)

    return createPortal(
        _loadingState.shown && 
            <div id="main-loader" className="ff-loader-container">
                <div className="ff-loader"></div>
            </div>
        , 
        _portalBox
    )
}

export default LoadingSpinner