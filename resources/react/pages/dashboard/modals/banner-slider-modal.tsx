import React, {useState} from 'react'
import { createPortal } from 'react-dom'
import {useForm, SubmitHandler, useFormContext, FormProvider} from 'react-hook-form'
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading'
import PubSub from 'pubsub-js'
import {EVENT_OPEN_CONFIRM_DIALOG} from '../../../tools/confirm-dialog/confirm-dialog'
import Modal from 'react-bootstrap/Modal'
import {useAppDispatch , useAppSelector} from '../store/store-hook'
import {addNewItem, updateItem, deleteItem} from '../slice/main-banner-slider-slice'
import {hide} from '../slice/banner-slider-modal-slice'
import type {BannerSliderItem} from '../../../types/banner-slider-item.type'
import NoImageIcon from '../../../../images/no-image.png'
import { unwrapResult } from '@reduxjs/toolkit'
import {ToastState, EVENT_TOAST_BOX} from '../../../tools/toast-box/toast-box'

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
                <i className="mdi mdi-camera-image"></i>
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
const ModalFooter:React.FC<{is_adding_new:boolean, onHandleClose:()=>void, onHandleDelete:()=>void}> 
        = ({is_adding_new, onHandleClose, onHandleDelete}):JSX.Element => {

    const {formState} = useFormContext()
    
    return(
        <Modal.Footer>
            {!is_adding_new && 
                <button type="button" className="btn btn-danger" onClick={onHandleDelete}>
                    <i className="mdi mdi-delete"></i>
                    <span>Delete</span>
                </button>
            }

            <button type="button" className="btn btn-light" onClick={onHandleClose}>
                <i className="mdi mdi-cancel"></i>
                <span>Close</span>
            </button>

            <button type="submit" className="btn btn-success" disabled={!formState.isDirty}>
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
const ModalBody:React.FC<{item:BannerSliderItem|null, image: string|null, onHandleImageSelected:(selected:ImageType) => void}> 
    = ({item, image, onHandleImageSelected}):JSX.Element => {
    const {errors, register} = useFormContext()

    /**
     * Function is to handle image selected
     * @param images 
     */
    const onHandleChange = (images : ImageListType):void => {
        onHandleImageSelected(images[0])
    }

    return(
        <Modal.Body>
            {/* Images field */}
            <div id="banner-slider-item-image" className="form-group row">

                <div className="image-box col-md-6">
                    <img src={image? image : NoImageIcon} />
                </div>

                <div className="image-upload-box col-md-6">
                    <ImageUploading
                        value={[]}
                        onChange={onHandleChange}
                        dataURLKey="data_url"
                        maxFileSize={3145728}
                    >     
                    {({  
                        onImageUpload,
                        dragProps,
                        errors
                    }) => (
                        // START drop button             
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
                    )}
                    </ImageUploading>

                    <input 
                        type="hidden" 
                        name="image_status"
                        ref={register({required:true})}
                    />
                    {errors.image_status && 
                        <span className="error text-danger">Please select one image</span>
                    }
                </div>

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
 * define the ImageSelectedStatus ENUM
 */
enum ImageSelectedStatue {
    NOT_CHANGED = "NOT_CHANGED",
    CHANGED = "CHANGED"
}

/**
 * TODO
 * define the FormValue
 */
type FormValue = {
    title: string,
    image_status?: ImageSelectedStatue|null,
    image?: File|null
}


/**
 * TODO
 * define the main banner slider modal
 * @returns 
 */
const BannerSliderModal = ():JSX.Element => {

    //To get modal data from MODAL STORE
    const _modal_data = useAppSelector((state) => state.BannerSliderModal)
    const _dispatch = useAppDispatch()

    //define the modal title
    const _title = _modal_data.is_adding_new? "Add new item" : "Update item"

    const _form = useForm<FormValue>()
    const {handleSubmit, reset, setValue} = _form
    
    //define the slected image
    const [selectedImage, setSelectedImage] = useState<ImageType|null>(null)

    //To hold image to display
    let _displayImage;
    if(selectedImage){
        _displayImage = selectedImage['data_url']
    }
    else{
        _displayImage = _modal_data.item?_modal_data.item.image.url:null
    }
    
    /**
     * Function is to handle update selected image
     * @param _image 
     */
    const onHandleImageSelected = (_image:ImageType) => {

        setSelectedImage(_image)
        //To update image selected status
        setValue(
            'image_status', 
            ImageSelectedStatue.CHANGED, 
            {
                shouldValidate:true,
                shouldDirty: true
            }
        )
    }

    /**
     * Function is to handle close modal
     */
    const onHandleClose = () => {
        //To clean up selected image
        setSelectedImage(null)

        _dispatch(hide())
    }

    /**
     * Function is to define on handle enter
     */
    const onHandleEnter = () => {

        reset({
            title: _modal_data.item? _modal_data.item.title:"",
            image_status: _modal_data.item?ImageSelectedStatue.NOT_CHANGED:null
        })

    }

    /**
     * Function is to handle form submit
     * @param data 
     */
    const onHandleSubmitted:SubmitHandler<FormValue> = (data) => {
        
        //we need to re-strucutr data for image
        if(data.image_status === ImageSelectedStatue.CHANGED){

            if(selectedImage)
                data.image = selectedImage['file']
        }
        delete data.image_status

        //call add new
        if(_modal_data.is_adding_new){
            _dispatch(addNewItem(data))
                    .then(unwrapResult)
                    .then((result)=> {
                        
                        PubSub.publish(EVENT_TOAST_BOX, {
                            'title' : "New item added",
                            'message' : "New slider item has been added successfully",
                            'state' : ToastState.SUCCESS
                        })

                    })
        }
        //call update
        else
        {

            if(_modal_data.item){
                _dispatch(updateItem({id: _modal_data.item.id, data:data}))
                    .then(unwrapResult)
                    .then((result)=> {
                        
                        PubSub.publish(EVENT_TOAST_BOX, {
                            'title' : "Item updated",
                            'message' : "The slider item has been updated successfully",
                            'state' : ToastState.SUCCESS
                        })

                    })
            }

        }
        
    }



    /**
     * Function is to handle confirm delete item 
     * request
     * @param id 
     */
    const confirmHandleDelete = (id:number):void => {

        _dispatch(deleteItem(id))
            .then(unwrapResult)
            .then((result) => {
                //call close model
                _dispatch(hide())

                //Trigger ToastBox
                PubSub.publish(EVENT_TOAST_BOX, {
                    'title' : "Item deleted",
                    'message' : "The slider item has been deleted successfully",
                    'state' : ToastState.SUCCESS
                })

            })

    }


    /**
     * Function is to handle delete
     */
    const onHandleDlete = ():void => {

        //Trigger open confirm dialog
        PubSub.publish(
            EVENT_OPEN_CONFIRM_DIALOG, 
            {
                shown:true,
                title: "Are you sure to REMOVE?",
                confirm_btn_text : "Yes, remove it",
                confirm_callback: () => {
                    const _id = _modal_data.item?.id
                    if(_id)
                        confirmHandleDelete(_id)
                }
            }
        )
        
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

                    <ModalHeader title={_title} onHandleClose={onHandleClose} />

                    <ModalBody 
                        item={_modal_data.item} 
                        image={_displayImage} 
                        onHandleImageSelected={onHandleImageSelected}    
                    />

                    <ModalFooter 
                        is_adding_new={_modal_data.is_adding_new} 
                        onHandleClose={onHandleClose} 
                        onHandleDelete={onHandleDlete}
                    />

                </form>
            </FormProvider>
        </Modal>,
        document.getElementById("portal-box") as HTMLElement
    )
}
export default BannerSliderModal