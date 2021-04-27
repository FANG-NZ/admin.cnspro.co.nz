import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Moment from 'react-moment'

import store from '../stores/new-projects-page-store'
import {allNewProjects, deleteProject} from '../stores/projects-slice'
import {openAlert} from '../tools/confirm-alert/confirm-alert-slice'
import {show as showModal} from '../tools/modals/project-modal-slice'
import { unwrapResult } from '@reduxjs/toolkit'
import PubSub from 'pubsub-js'
import {ToastState, EVENT_TOAST_BOX} from '../tools/toast-box/toast-box'


/**
 * define the project item 
 * @param {*} props 
 * @returns 
 */
const ProjectItem = (props) => {
    const _project = props.project
    const _dispatch = useDispatch()

    /**
     * Function is to handle delete project
     */
    function _handleDelete(_id){
        
        _dispatch(deleteProject({id:_id}))
            .then(unwrapResult)
            .then(result => {

                PubSub.publish(EVENT_TOAST_BOX, {
                    'title' : "Project removed",
                    'message' : 'The item has been removed successfully',
                    'state' : ToastState.SUCCESS
                })
                
            })

    }

    return(
        <tr>
            <td className="td-address">
                <a href="#view" 
                    onClick={(e) => {
                        e.preventDefault()
                        _dispatch(showModal(_project))
                    }}
                >
                    {_project.street}<br/>{_project.city}
                </a>

                <span className="text-muted">
                    <Moment format="DD MMM YYYY \at\ HH:mm">
                        {_project.created_at}
                    </Moment>
                </span>
            </td>
            <td className="td-title">{_project.title}</td>
            <td className='td-properties'>
                <div className="properties-box row">
                    <div className="col-6">
                        <span className="properties-item-label">
                            <i className="mdi mdi-bed-empty"></i>
                            <span>Bedrooms</span>
                        </span>
                        <span className="properties-item-value">
                            {_project.bedrooms}
                        </span>
                    </div>
                    <div className="col-6">
                        <span className="properties-item-label">
                            <i className="mdi mdi-hot-tub"></i>
                            <span>Bathrooms</span>
                        </span>
                        <span className="properties-item-value">
                            {_project.bathrooms}
                        </span>
                    </div>

                    <div className="col-6">
                        <span className="properties-item-label">
                            <i className="mdi mdi-car"></i>
                            <span>Carpark</span>
                        </span>
                        <span className="properties-item-value">
                            {_project.carpark}
                        </span>
                    </div>
                    <div className="col-6">
                        <span className="properties-item-label">
                            <i className="mdi mdi-youtube-tv"></i>
                            <span>Living rooms</span>
                        </span>
                        <span className="properties-item-value">
                            {_project.livingrooms}
                        </span>
                    </div>

                    <div className="col-6">
                        <span className="properties-item-label">
                            <i className="mdi mdi-grid"></i>
                            <span>Landarea</span>
                        </span>
                        <span className="properties-item-value">
                            {_project.land_area}
                        </span>
                    </div>
                    <div className="col-6">
                        <span className="properties-item-label">
                            <i className="mdi mdi-home"></i>
                            <span>Floorarea</span>
                        </span>
                        <span className="properties-item-value">
                            {_project.floor_area}
                        </span>
                    </div>
                </div>
            </td>
            <td className="td-completed-on">
                {_project.completed_on && 
                    <Moment format="MMM YYYY"> 
                        {_project.completed_on}
                    </Moment>
                }
            </td>
            <td className="td-btns">
                <button className="btn btn-icon btn-danger btn-sm"
                    onClick={() => 
                        _dispatch(openAlert(
                            store, 
                            {
                                'title': "Are you sure to delete this?",
                                'message': `You will NOT recover [${_project.street}, ${_project.city}]!`,
                            }
                        ))
                        .then(
                            () => _handleDelete(_project.id)
                        )
                    }
                >
                    <i className="mdi mdi-close"></i>
                </button>
            </td>
        </tr>
    )
}

/**
 * define the EMPTY project item
 * @returns 
 */
const EmptyProjectItem = (props) => {
    
    return(
        <tr>
            <td colSpan="5">
                <div className="alert alert-warning mb-0">
                    {props.message}
                </div>
            </td>
        </tr>
    )
}


/**
 * define the projects table 
 * @returns 
 */
const ProjectsTable = () => {
    const _projects = useSelector(allNewProjects)

    //define the warning message
    const _message = <>There is <strong>NO</strong> any new projects added</>

    return(
        <React.Fragment>
            <table className="table mb-0 projects-table">
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Title</th>
                        <th>Properties</th>
                        <th className="th-completed-on">Completed</th>
                        <th className="th-btns"></th>
                    </tr>
                </thead>

                <tbody>
                    {_projects.length === 0
                     ?  <EmptyProjectItem message={_message} />
                     :  <>
                            {_projects.map((item) => {
                                return <ProjectItem key={item.id} project={item} />
                            })}
                        </>
                    }
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default ProjectsTable