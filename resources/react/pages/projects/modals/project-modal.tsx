import React, {useState} from 'react'
import { createPortal } from 'react-dom'
import {useForm, SubmitHandler, useFormContext, FormProvider, Controller} from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

import PubSub from 'pubsub-js'
import {EVENT_OPEN_CONFIRM_DIALOG} from '../../../tools/confirm-dialog/confirm-dialog'
import Modal from 'react-bootstrap/Modal'
import {useAppDispatch , useAppSelector} from '../store/store-hook'
import {hide} from '../slice/project-modal-slice'
import type {TProjectItem} from '../../../types/project-item.type'
import ProjectImageField from './project-image-field'


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
 const ModalFooter:React.FC<{
        is_adding_new:boolean, 
        is_dirty:boolean, 
        onHandleClose:()=>void, 
        onHandleDelete:()=>void,
        onHandleSubmit:()=>void
    }> 
    = ({is_adding_new, is_dirty, onHandleClose, onHandleDelete, onHandleSubmit}):JSX.Element => {
    
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

            <button type="submit" className="btn btn-success" disabled={!is_dirty} onClick={onHandleSubmit}>
                <i className="mdi mdi-database-plus"></i>
                <span>{is_adding_new ? "Add new project" : "Edit"}</span>
            </button>
        </Modal.Footer>
    )
}


/**
 * TODO
 * define the componment of project form fields
 * @returns 
 */
const ProjectFields:React.FC<{project:TProjectItem}> = ({project}):JSX.Element => {
    const {errors, register, control} = useFormContext()

    return(
        <>
        <div className="row mb-2">
            <div className="col-7">
                <label>Title</label>

                <input 
                    type="text"
                    name="title" 
                    placeholder="Enter title" 
                    className="form-control" 
                    defaultValue={project.title}
                    ref={register({required: true})}
                />    
                {errors.title && 
                    <span className="error text-danger">Please enter title</span>
                }

            </div>

            <div className="col-5 checkbox-holder">
                <div className="checkbox checkbox-primary">
                    <input 
                        id="is_new"
                        type="checkbox" 
                        name="is_new" 
                        defaultChecked={project.is_new} 
                        ref={register}
                    />
                    <label htmlFor="is_new">is NEW project?</label>
                </div>
            </div>
        </div>

        {/* START address fields */}
        <div className="row mb-2">
            <div className="col-7">
                <label>Street</label>

                <input 
                    type="text"
                    name="street" 
                    placeholder="Enter project's street" 
                    className="form-control" 
                    defaultValue={project.street}
                    ref={register({required: true})}
                />    
                {errors.street && 
                    <span className="error text-danger">Please enter project's street</span>
                }

            </div>

            <div className="col-5">
                <label>City</label>

                <input 
                    type="text"
                    name="city" 
                    placeholder="Enter project's city" 
                    className="form-control" 
                    defaultValue={project.city}
                    ref={register({required: true})}
                />    
                {errors.city && 
                    <span className="error text-danger">Please enter project's city</span>
                }

            </div>
        </div>
        
        <div className="row mb-2">
            <div className="col-6">
                <label>Completed On</label>

                <Controller 
                    name="completed_on"
                    control={control}
                    defaultValue={project.completed_on? project.completed_on : null}
                    render={({ onChange, value }) => (

                        <div className="input-group datepicker-holder">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="mdi mdi-calendar-clock"></i>
                                </span>
                            </div>
                            <DatePicker
                                className="form-control"
                                placeholderText="Completed on"
                                selected={value ? moment(value).toDate() : null}
                                dateFormat="dd MMMM yyyy"
                                onChange={onChange}
                            />
                        </div>

                    )}
                />

            </div>
        </div>

        <h5 className="header-title">Properties</h5>

        <div className="row properties-holder">
            <div className="col-6 mb-2">
                <label>
                    <i className="mdi mdi-bed-empty"></i>
                    Bedrooms
                </label>

                <input 
                    type="text"
                    name="bedrooms" 
                    placeholder="Enter number of bedrooms" 
                    className="form-control" 
                    defaultValue={project.bedrooms}
                    ref={register}
                />   
                
            </div>
            <div className="col-6 mb-2">
                <label>
                    <i className="mdi mdi-hot-tub"></i>
                    Bathrooms
                </label>

                <input 
                    type="text"
                    name="bathrooms" 
                    placeholder="Enter number of bathroom" 
                    className="form-control" 
                    defaultValue={project.bathrooms}
                    ref={register}
                />   
            </div>
            <div className="col-6 mb-2">
                <label>
                    <i className="mdi mdi-car"></i>
                    Carpark
                </label>

                <input 
                    type="text"
                    name="carpark" 
                    placeholder="Enter number of carpark" 
                    className="form-control" 
                    defaultValue={project.carpark}
                    ref={register}
                />   
            </div>
            <div className="col-6 mb-2">
                <label>
                    <i className="mdi mdi-youtube-tv"></i>
                    Living rooms
                </label>

                <input 
                    type="text"
                    name="livingrooms" 
                    placeholder="Enter number of livingroom" 
                    className="form-control" 
                    defaultValue={project.livingrooms}
                    ref={register}
                />   
            </div>
            <div className="col-6 mb-2">
                <label>
                    <i className="mdi mdi-grid"></i>
                    Land area
                </label>

                <input 
                    type="text"
                    name="land_area" 
                    placeholder="Enter land area" 
                    className="form-control" 
                    defaultValue={project.land_area}
                    ref={register}
                />   
            </div>
            <div className="col-6 mb-2">
                <label>
                    <i className="mdi mdi-home"></i>
                    Floor area
                </label>

                <input 
                    type="text"
                    name="floor_area" 
                    placeholder="Enter floor area" 
                    className="form-control" 
                    defaultValue={project.floor_area}
                    ref={register}
                />   
            </div>
        </div>

        <div className="row mb-2">
            <div className="col-12">
                <label>Short description</label>

                <textarea 
                    className="form-control" 
                    ref={register}
                    name="short_description" 
                    rows={3}
                    placeholder="Enter short description"    
                    defaultValue={project.short_description}
                >
                </textarea>
                <span className="help-block">
                    <small>Please keep less than 50 words.</small>
                </span>
            </div>
        </div>

        <div className="row mb-2">
            <div className="col-12">
                <label>Full description</label>

                <textarea 
                    className="form-control" 
                    ref={register}
                    name="description" 
                    rows={6}
                    placeholder="Enter full description"    
                    defaultValue={project.description}
                >
                </textarea>
                
            </div>
        </div>
        </>
    )
}



/**
 * TODO
 * define the Project Modal
 * @returns 
 */
const ProjectModal = ():JSX.Element => {
    const _modal_data = useAppSelector((state) => state.ProjectModal)
    const _dispatch = useAppDispatch()

    //init hook form
    const _form = useForm()
    const {handleSubmit, reset, formState:{isDirty}} = _form


    //init modal variables
    let _classname:string = "modal-update_project",
        _title:string = _modal_data.item.title
    
    if(_modal_data.is_adding_new){
        _classname = "modal-new_project"
        _title = "Add new project"
    }


    /**
     * HELPER
     * Function is to reset form with data
     * @param data 
     */
    const resetForm = (data:TProjectItem):void => {

        reset({
            'title': data.title ,
            //we need to convert into boolean type for checkbox
            'is_new': data.is_new?true:false,
            'street': data.street,
            'city': data.city,
            'completed_on': data.completed_on,
            'bedrooms': data.bedrooms,
            'bathrooms': data.bathrooms,
            'carpark': data.carpark,
            'livingrooms': data.livingrooms,
            'land_area': data.land_area,
            'floor_area': data.floor_area,
            'short_description': data.short_description,
            'description': data.description 
        })
    }

    /**
     * Function is to handle on modal enter
     */
    const onHandleEnter = ():void => {
        //call reset form
        resetForm(_modal_data.item)
    }

    /**
     * Function is to handle close modal
     */
    const onHandleClose = ():void => {
        _dispatch(hide())
    }

    /**
     * Function is to handle delete
     */
    const onHandleDelete = ():void => {
        console.log("Handle delete request")
    }

    /**
     * Function is to handle form submitted
     */
    const onHandleSubmit:SubmitHandler<any> = (data):void => {
        console.log(data)
        alert("Handle form submitted")
    }

    return createPortal(
        <Modal
            id="project-modal" 
            show={_modal_data.shown} 
            className={_classname}
            onHide={onHandleClose} 
            onEnter={onHandleEnter}
        >

            <ModalHeader title={_title} onHandleClose={onHandleClose} />

            {/* START modal body */}
            <Modal.Body>
                <div className="row">
                    {/* Include form fields */}
                    <FormProvider {..._form}>
                        <div className="col-info_fields">
                            <form onSubmit={handleSubmit(onHandleSubmit)}>
                                <ProjectFields project={_modal_data.item} />
                            </form>
                        </div>
                    </FormProvider>

                    {/* Include image field */}
                    { !_modal_data.is_adding_new &&
                        <ProjectImageField project={_modal_data.item} />
                    }
                </div>
            </Modal.Body>

            <ModalFooter 
                is_adding_new={_modal_data.is_adding_new} 
                is_dirty={isDirty} 
                onHandleClose={onHandleClose} 
                onHandleDelete={onHandleDelete}
                onHandleSubmit={handleSubmit(onHandleSubmit)}
            />

        </Modal>,
        document.getElementById("portal-box") as HTMLElement
    )
}
export default ProjectModal