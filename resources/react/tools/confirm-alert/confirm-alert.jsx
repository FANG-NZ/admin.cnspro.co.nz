import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import { useDispatch, useSelector } from 'react-redux'
import { hide, confirm, reject } from './confirm-alert-slice'

const ConfirmAlert = () => {
    const confirmAlert = useSelector(state => state.ConfirmAlert)
    const {title, confirmBtnText, message} = confirmAlert.content
    const dispatch = useDispatch()

    return(
        <React.Fragment>
            {confirmAlert.shown &&
                <SweetAlert
                    warning
                    
                    title={title}
                    confirmBtnText={confirmBtnText}
                    confirmBtnBsStyle="danger"
                    onConfirm={ () => {
                        dispatch(confirm())
                    }} 
                    onCancel={() => {
                        dispatch(reject())
                    }}
                
                    showCancel={true}
                    focusCancelBtn={true}
                >
                    {message}
                </SweetAlert>
            }
        </React.Fragment>
    )
}

export default ConfirmAlert