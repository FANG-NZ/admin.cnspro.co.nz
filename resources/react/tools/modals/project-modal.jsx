import React from 'react'
import Modal from 'react-bootstrap/Modal'
import {useSelector, useDispatch} from 'react-redux'
import {useForm, useFormContext, FormProvider} from 'react-hook-form'

import {hide} from './project-modal-slice'


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
                    ref={register({required: true})}
                />    
                {errors.title && 
                    <span className="error text-danger">Please enter title</span>
                }

            </div>

            <div className="col-5 checkbox-holder">
                <div className="checkbox checkbox-primary">
                    <input id="is_new" type="checkbox" name="is_new" defaultValue="true" />
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
                    ref={register({required: true})}
                />    
                {errors.city && 
                    <span className="error text-danger">Please enter project's city</span>
                }
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
                >
                </textarea>
                
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

    /**
     * Function is to handle form submit
     * request
     */
    function onHandleSubmit(data){
        console.log("Form submitted");
    }

    return(
        <Modal id="project-modal"  
            //show={_modalData.shown} 
            show={true} 
            onHide={onHandleClose} 
            onEnter={onHandleEnter}
        >
            <FormProvider {..._form}>
            <form onSubmit={handleSubmit(onHandleSubmit)}>
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

            {/* START body */}
            <Modal.Body>
                <div className="row">
                    {/* START project info fields */}
                    <div className="col-6">
                        <ProjectInfoFields 
                            project={_project}
                            register={register}
                        />
                    </div>
                    {/* START project images fields */}
                    <div className="col-6">
                        
                    </div>
                </div>
                
            </Modal.Body>

            {/* START footer */}
            <Modal.Footer>
                <button type="button" className="btn btn-light" onClick={onHandleClose}>
                    <i className="mdi mdi-cancel"></i>
                    <span>Close</span>
                </button>

                <button type="submit" className="btn btn-success" disabled={!isDirty}>
                    <i className="mdi mdi-database-plus"></i>
                    <span>{_modalData.isNew ? "Add new project" : "Edit"}</span>
                </button>
            </Modal.Footer>

            </form>
            </FormProvider>
        </Modal>
    )
}

export default ProjectModal