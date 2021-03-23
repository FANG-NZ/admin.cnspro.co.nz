import React from 'react'
import Modal from 'react-bootstrap/Modal'
import {useSelector, useDispatch} from 'react-redux'

import {hide} from './project-modal-slice'

const ProjectModal = () => {
    const _modalData = useSelector(state => state.ProjectModal)
    const _project = _modalData.project
    const _dispatch = useDispatch()

    /**
     * Function is to handle close modal
     */
    function onHandleClose(){
        _dispatch(hide())
    }

    /**
     * Function is to handle modal enter
     */
    function onHandleEnter(){

    }

    return(
        <Modal id="project-modal"  
            show={_modalData.shown} 
            onHide={onHandleClose} 
            onEnter={onHandleEnter}
        >
            {/** START header */}
            <Modal.Header className={"modal-header-lg"}>
                <Modal.Title style={{marginBottom: 0}}>
                    <i className="mdi mdi-clover"></i>
                    <span>TEST HEADER</span>
                </Modal.Title>
                <button type="button" className="close" onClick={onHandleClose}>
                    <i className="mdi mdi-close"></i>
                </button>
            </Modal.Header>

        </Modal>
    )
}

export default ProjectModal