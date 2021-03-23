import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Moment from 'react-moment'
import {allNewProjects} from '../stores/new-projects-slice'


/**
 * define the project item 
 * @param {*} props 
 * @returns 
 */
const ProjectItem = (props) => {
    const _project = props.project

    const date = new Date(_project.completed_on)

    return(
        <tr>
            <td className="td-address">
                <a href="#view" 
                    onClick={()=>alert("clicked")}
                >
                    {_project.street}<br/>{_project.city}
                </a>
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
                            {_project.bathrooms}
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
                <Moment format="MMM YYYY"> 
                    {_project.completed_on}
                </Moment>
            </td>
            <td className="td-btns">
                <button className="btn btn-icon btn-danger btn-sm">
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
                        <th>Completed On</th>
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