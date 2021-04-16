import React, {useState, useEffect} from 'react'
import { createPortal } from 'react-dom'
import PubSub from 'pubsub-js'

export const EVENT_LOADING_SPINNER = "Loading_Spinner"

//define the loading spinner
const LoadingSpinner = ():JSX.Element => {
    const _portalBox:HTMLElement = document.getElementById("portal-box")!
    const [show, setShow] = useState(false)
    
    /**
     * Function is to handle subscribe
     * @param msg 
     * @param data 
     */
    const onHandleSubscriber = (msg:string, data:boolean) => {
        setShow(data)
    }

    useEffect(() => {
        let _token = PubSub.subscribe(EVENT_LOADING_SPINNER, onHandleSubscriber)

        return function(){
            PubSub.unsubscribe(_token)
        }
    },[])


    return createPortal(
        show && 
            <div id="main-loader" className="ff-loader-container">
                <div className="ff-loader"></div>
            </div>
        , 
        _portalBox
    )
}

export default LoadingSpinner