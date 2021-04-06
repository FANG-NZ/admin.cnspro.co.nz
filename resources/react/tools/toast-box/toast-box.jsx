import React, {useEffect, useState} from 'react'
import Toast from 'react-bootstrap/Toast'
import PubSub from 'pubsub-js'

const defaultStatus = {
    show: false,
    message: '---',
    state: 'success',
    title: 'Request done'
}

const ToastBox = () => {
    const [status, setStatus] = useState(defaultStatus)

    /**
     * Function is to handle on subpub
     * @param {*} msg 
     * @param {*} data 
     */
    function onHandleSubscriber(msg, data){

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
        <Toast show={status.show} delay={3000} autohide className="success"
            onClose={() => setStatus(defaultStatus)}
        >
             <Toast.Header>
                <strong className="mr-auto">{status.title}</strong>
             </Toast.Header>
            <Toast.Body>{status.message}</Toast.Body>
        </Toast>
    )
}

export default ToastBox