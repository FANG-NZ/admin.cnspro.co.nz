import React, {useEffect, useState} from 'react'
import Toast from 'react-bootstrap/Toast'
import PubSub from 'pubsub-js'

export enum ToastState{
    'SUCCESS' = "success",
    'ERROR' = "danger"
}

/**
 * define the type of 
 * Subscriber Data
 */
type ToastData = {
    show: boolean,
    message: string,
    state: ToastState
    title: string
}

//define the default toast data
const default_data = {
    show: false,
    message: '------',
    state: ToastState.SUCCESS,
    title: 'Request done'
}

const ToastBox = () => {
    const [status, setStatus] = useState(default_data)

    /**
     * Function is to handle on subpub
     * @param {*} msg 
     * @param {*} data 
     */
    function onHandleSubscriber(msg : string, data: ToastData){

        data.show = true
        setStatus(data)
    }

    //define the effect
    useEffect(() => {
        let _token = PubSub.subscribe("TOAST_BOX", onHandleSubscriber)

        return function(){
            PubSub.unsubscribe(_token)
        }
    }, [])

    return(
        <Toast show={status.show} delay={3000} autohide className={status.state}
            onClose={() => {
                setStatus({...status, show:false})
            }}
        >
             <Toast.Header>
                <strong className="mr-auto">{status.title}</strong>
             </Toast.Header>
            <Toast.Body>{status.message}</Toast.Body>
        </Toast>
    )
}

export default ToastBox