import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import {useSelector, useDispatch} from 'react-redux'
import {unwrapResult, nanoid} from '@reduxjs/toolkit'
import {useForm, useFormContext, FormProvider} from 'react-hook-form'
import ImageUploading from 'react-images-uploading'

import {hide, setProject, addImage} from './project-modal-slice'
import {addNewProject, uploadProjectImage} from '../../stores/projects-slice'


/**
 * TODO
 * define the project info fields block
 * @returns 
 */
const ProjectInfoFields = ({project, register}) => {
    const {errors} = useFormContext()

    return(
        <React.Fragment>

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

                <input 
                    type="text"
                    name="completed_on" 
                    placeholder="The project will be completed on" 
                    className="form-control" 
                    defaultValue={project.completed_on}
                    ref={register}
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
                    rows="3"
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
                    rows="6"
                    placeholder="Enter full description"    
                    defaultValue={project.description}
                >
                </textarea>
                
            </div>
        </div>
        
        </React.Fragment>
    )
}


/**
 * TODO
 * define the image block element
 * @param {*} param0 
 * @returns 
 */
const ImageBlock = ({image, onRemoveCallback}) => {

    return(
        <div className="col-4">
            <div className={`image-box ${image.is_uploading?'uploading': null}`}>
                <img src={image.url} />

                <button className="btn btn-icon btn-danger"
                    onClick={() => onRemoveCallback(image)}
                >
                    <i className="mdi mdi-delete-forever"></i>
                </button>

                {image.is_uploading && 
                    <div className="ff-loader-container">
                        <div className="ff-loader"></div>
                    </div>
                }
            </div>
        </div>
    )
}


/**
 * TODO
 * define the image fields block
 * @returns 
 */
const ImageFields = (props) => {
    const _project = props.project
    const _dispatch = useDispatch()

    // const [images, setImages] = useState([])
    // useEffect(() => {
    //     setImages(_project.images)
    // }, [images])
    
    
    /**
     * Function is to handle image upload
     * @param {*} image 
     * @param {*} addUpdateIndex 
     */
    const onChange = (image, addUpdateIndex) => {
        
        //init form data
        let _formData = new FormData()
        _formData.append('image', image[0]['file'])

        const _data = {
            id: _project.id,
            data_url: image[0]['data_url'],
            image: _formData
        }

        //Update changes into Modal project
        _dispatch(addImage({
            id: nanoid(),
            is_uploading: true,
            url: image[0]['data_url']
        }))

        //call upload image
        _dispatch(uploadProjectImage(_data))
    };

    function onRemove(_id){
        alert("Image removed call");
    }

    return(
        <React.Fragment>
        <div className="image-upload">
            <ImageUploading
                onChange={onChange}
                dataURLKey="data_url"
            >     
            {({  
                onImageUpload,
                isDragging,
                dragProps,
            }) => (

                // START drop button
                <button
                    className="dropzone"
                    onClick={onImageUpload}
                    {...dragProps}
                >
                    <div className="dz-message">
                        <i className="mdi mdi-cloud-upload text-muted"></i>
                        <h3>Drop files or click to upload</h3>
                    </div>
                </button>
            )}
            </ImageUploading>
        </div>

        {/* START images list */}
        <div className="images-list">
            <div className="row">

                {/* {images.length === 0  */}
                {_project.images.length === 0 
                    ? <div className="alert alert-warning col-12">
                        There is <strong>NO IMAGE</strong> found!
                      </div>
                    : _project.images.map((image) => {
                        return <ImageBlock key={image.id} image={image} onRemoveCallback={onRemove} />
                    })
                }

                {/* <div className="col-4">
                    <div className="image-box uploading">
                        <img src="https://freebw.com/templates/tatee/images/post-05.jpg" />

                        <div className="ff-loader-container">
                            <div className="ff-loader"></div>
                        </div>
                    </div>
                </div> */}

                {/*<div className="col-4">
                    <div className="image-box">
                        <img src="https://freebw.com/templates/tatee/images/post-05.jpg" />

                        <button className="btn btn-icon btn-danger"
                            onClick={() => onRemove()}
                        >
                            <i className="mdi mdi-delete-forever"></i>
                        </button>
                    </div>
                </div>

                <div className="col-4">
                    <div className="image-box">
                        <img src="https://freebw.com/templates/tatee/images/post-06.jpg" />

                        <button className="btn btn-icon btn-danger">
                            <i className="mdi mdi-delete-forever"></i>
                        </button>
                    </div>
                </div>

                <div className="col-4">
                    <div className="image-box">
                        <img src="https://freebw.com/templates/tatee/images/post-07.jpg" />
                    </div>
                </div>

                <div className="col-4">
                    <div className="image-box">
                        <img src="https://freebw.com/templates/tatee/images/post-08.jpg" />
                    </div>
                </div> */}

            </div>
        </div>
        </React.Fragment>
    )
}


/**
 * TODO
 * define the main project modal
 * @returns 
 */
const ProjectModal = () => {
    const _modalData = useSelector(state => state.ProjectModal)
    const _project = _modalData.project
    const _dispatch = useDispatch()

    const _form = useForm()
    const {register, handleSubmit, errors, reset, formState} = _form
    const { isDirty } = formState

    //setup modal vars
    //FOR classname
    const _modalCalssname = _modalData.isNew? 'modal-new_project' : 'modal-update_project'
    //FOR title
    const _title = _modalData.isNew? "Add new project" : `${_project.title}`

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

        //reset default values with PROJECT
        reset({
            'title': _project.title,
            //we need to convert into boolean type for checkbox
            'is_new': _project.is_new === 1?true:false,
            'street': _project.street,
            'city': _project.city,
            'completed_on': _project.completed_on,
            'bedrooms': _project.bedrooms,
            'bathrooms': _project.bathrooms,
            'carpark': _project.carpark,
            'livingrooms': _project.livingrooms,
            'land_area': _project.land_area,
            'floor_area': _project.floor_area,
            'short_description': _project.short_description,
            'description': _project.description
        })
        
    }

    /**
     * Function is to handle form submit
     * request
     */
    function onHandleSubmit(data){
        console.log("Form submitted");

        console.log(data)
    }


    return(
        <Modal id="project-modal"  
            show={_modalData.shown} 
            onHide={onHandleClose} 
            onEnter={onHandleEnter}
            className={_modalCalssname}
        >
            
            {/** START header */}
            <Modal.Header className={"modal-header-lg"}>
                <Modal.Title style={{marginBottom: 0}}>
                    <i className="mdi mdi-home-variant"></i>
                    <span>{_title}</span>
                </Modal.Title>

                <button type="button" className="close" onClick={onHandleClose}>
                    <i className="mdi mdi-close"></i>
                </button>
            </Modal.Header>
            

            {/* START body */}
            <Modal.Body>
                <div className="row">
                    {/* START project info fields */}
                    
                    <div className="col-info_fields">
                        <FormProvider {..._form}>
                        <form onSubmit={handleSubmit(onHandleSubmit)}>
                            <ProjectInfoFields 
                                project={_project}
                                register={register}
                            />
                        </form>
                        </FormProvider>
                    </div>
                    
                    {/* START project images fields */}
                    {!_modalData.isNew &&
                        <div className="col-image_fields">
                            <ImageFields project={_project} />
                        </div>
                    }                   
                </div>         
            </Modal.Body>

            {/* START footer */}
            <Modal.Footer>
                <button type="button" className="btn btn-light" onClick={onHandleClose}>
                    <i className="mdi mdi-cancel"></i>
                    <span>Close</span>
                </button>

                <button type="button" className="btn btn-success" disabled={!isDirty}
                    onClick={handleSubmit(onHandleSubmit)}
                >
                    <i className="mdi mdi-database-plus"></i>
                    <span>{_modalData.isNew ? "Add new project" : "Edit"}</span>
                </button>
            </Modal.Footer>

        </Modal>
    )
}

export default ProjectModal