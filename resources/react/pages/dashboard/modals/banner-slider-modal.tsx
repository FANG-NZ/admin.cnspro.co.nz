import React, {useState} from 'react'
import { createPortal } from 'react-dom'
import {useForm, SubmitHandler, useFormContext, FormProvider} from 'react-hook-form'
import ImageUploading, { ImageListType } from 'react-images-uploading'

import Modal from 'react-bootstrap/Modal'
import {RootState, useAppDispatch , useAppSelector} from '../store/dashboard-store'
import {useDispatch} from 'react-redux'
import {hide} from '../slice/banner-slider-modal-slice'
import type {BannerSliderItem} from '../../../types/banner-slider-item.type'
import NoImageIcon from '../../../../images/no-image.png'



/**
 * TODO
 * define the Modal Header
 * @param param0 
 * @returns 
 */
const ModalHeader : React.FC<{title:string, onHandleClose:() => void}> 
        = ({title, onHandleClose}):JSX.Element => {

    return(
        <Modal.Header>
            <Modal.Title>
                <i className="mdi mdi-home-variant"></i>
                <span>{title}</span>
            </Modal.Title>

            <button type="button" className="close" onClick={onHandleClose}>
                <i className="mdi mdi-close"></i>
            </button>
        </Modal.Header>
    )
}


/**
 * TODO
 * define the Modal Footer
 * @param param0 
 * @returns 
 */
const ModalFooter:React.FC<{is_adding_new:boolean, onHandleClose:()=>void, isDirty:boolean }> 
        = ({is_adding_new, onHandleClose, isDirty}):JSX.Element => {

    return(
        <Modal.Footer>
            <button type="button" className="btn btn-light" onClick={onHandleClose}>
                    <i className="mdi mdi-cancel"></i>
                    <span>Close</span>
                </button>

                <button type="submit" className="btn btn-success" disabled={!isDirty}>
                    <i className="mdi mdi-database-plus"></i>
                    <span>{is_adding_new ? "Add new project" : "Edit"}</span>
                </button>
        </Modal.Footer>
    )
}

/**
 * TODO
 * define the modal body
 * @param param0 
 * @returns 
 */
const ModalBody:React.FC<{item:BannerSliderItem|null}> = ({item}):JSX.Element => {
    const {errors, register} = useFormContext()
    const [images, setImages] = useState([])

    const onHandleChange = (images : ImageListType):void => {

    }

    return(
        <Modal.Body>
            {/* Images field */}
            <div id="banner-slider-item-image" className="form-group row">

                <div className="image-box col-md-6">
                    <img src={NoImageIcon} />
                </div>

                <ImageUploading
                    value={images}
                    onChange={onHandleChange}
                    dataURLKey="data_url"
                    maxFileSize={3145728}
                >     
                {({  
                    onImageUpload,
                    isDragging,
                    dragProps,
                    errors
                }) => (
                    // START drop button
                    <div className="image-upload-box col-md-6">
                        <button
                            className="dropzone"
                            onClick={(e) => {
                                e.preventDefault()
                                onImageUpload()
                            }}
                            {...dragProps}
                        >
                            <div className="dz-message">
                                <i className="mdi mdi-cloud-upload text-muted"></i>
                                <h3>Drop or click</h3>
                            </div>

                            {errors && 
                                <span className="alert alert-danger">
                                    The file size cannot be greater than 3M
                                </span>
                            }       
                        </button>
                    </div>
                )}
                </ImageUploading>
            </div>

            {/* Title field */}
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input 
                    type="text"
                    id="title"
                    name="title" 
                    placeholder="Enter title" 
                    className="form-control" 
                    defaultValue={item?item.title:""}
                    ref={register({required: true})}
                />    
                {errors.title && 
                    <span className="error text-danger">Please enter title</span>
                }
            </div>
        </Modal.Body>
    )
}



/**
 * TODO
 * define the main banner slider modal
 * @returns 
 */
const BannerSliderModal = ():JSX.Element => {

    //To get modal data from MODAL STORE
    const _modal_data = useAppSelector((state:RootState) => state.BannerSliderModal)
    const _dispatch = useDispatch()

    const _form = useForm()
    const {register, handleSubmit, errors, reset, formState, control} = _form
    const { isDirty } = formState
    

    /**
     * Function is to handle close modal
     */
    const onHandleClose = () => {
        _dispatch(hide())
    }

    /**
     * Function is to define on handle enter
     */
    const onHandleEnter = () => {
        console.log("ON ENTER CALLED");
    }

    /**
     * Function is to handle form submit
     * @param data 
     */
    const onHandleSubmitted:SubmitHandler<{}> = (data) => {
        console.log(data)
    }

    return createPortal(
        <Modal
            id="main-banner-slider-modal" 
            show={_modal_data.shown} 
            onHide={onHandleClose} 
            onEnter={onHandleEnter}
        >
            <FormProvider {..._form} >
                <form onSubmit={handleSubmit(onHandleSubmitted)}>

                    <ModalHeader title={'Test Header'} onHandleClose={onHandleClose} />

                    <ModalBody item={_modal_data.item} />

                    <ModalFooter 
                        is_adding_new={_modal_data.is_adding_new} 
                        onHandleClose={onHandleClose} 
                        isDirty={isDirty} 
                    />

                </form>
            </FormProvider>
        </Modal>,
        document.getElementById("portal-box") as HTMLElement
    )
}
export default BannerSliderModal