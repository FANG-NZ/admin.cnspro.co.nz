import React, {useState, useEffect} from 'react'
import { createPortal } from 'react-dom'
import SweetAlert from 'react-bootstrap-sweetalert'
import PubSub from 'pubsub-js'
import { SweetAlertType } from 'react-bootstrap-sweetalert/dist/types'

export const EVENT_OPEN_CONFIRM_DIALOG = "Open_Confirm_Dialog"

type ConfirmDialogType = {
    shown: boolean,
    type?: SweetAlertType,
    title?: string,
    confirm_btn_text?: string,
    message?: string,
    confirm_callback?: () => void|null
}


const defaultData:ConfirmDialogType = {
    shown: false,
    type: "warning",
    title: "Are you sure?",
    confirm_btn_text: "Yes, do it!",
    message: "You will NOT be able to recover this!",
    confirm_callback: () => {
        console.log("Not implemented yet")
    }
}


/**
 * TODO
 * define the Confirm Dialog
 * @returns 
 */
const ConfirmDialog = ():JSX.Element => {
    const [data, setData] = useState<ConfirmDialogType>(defaultData)

    /**
     * Function is to handle subscribe
     * @param msg 
     * @param data 
     */
    const onHandleSubscriber = (msg:string, data:ConfirmDialogType) => {
        //merge data
        data = {...defaultData, ...data}

        setData(data)
    }

    useEffect(() => {
        let _token = PubSub.subscribe(EVENT_OPEN_CONFIRM_DIALOG, onHandleSubscriber)

        return function(){
            PubSub.unsubscribe(_token)
        }
    },[])

    return createPortal(
        <React.Fragment>
            {data.shown &&
                <SweetAlert              
                    type={data.type}
                    
                    title={data.title}
                    confirmBtnText={data.confirm_btn_text}
                    confirmBtnBsStyle="danger"

                    onConfirm={ () => {
                        setData({shown: false})

                        if(data.confirm_callback)
                            data.confirm_callback()

                    }} 
                    onCancel={() => {
                        setData({shown:false})
                    }}
                
                    showCancel={true}
                    focusCancelBtn={true}
                >
                    {data.message}
                </SweetAlert>
            }
        </React.Fragment>,
        document.getElementById("portal-box") as HTMLElement
    )
}
export default ConfirmDialog