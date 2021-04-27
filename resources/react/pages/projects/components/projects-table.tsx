import React, {useEffect} from 'react'
import Moment from 'react-moment'
import type {TProjectItem} from '../../../types/project-item.type'


/**
 * TODO
 * Defien the Empty project item
 * @returns 
 */
const ProjectEmptyItem = ():JSX.Element => {
    return(
        <tr>
            <td colSpan={5}>
                <div className="alert alert-warning mb-0">
                    There is <strong>NO</strong> any <strong>PROJECTS</strong> found
                </div>
            </td>
        </tr>
    )
}

/**
 * TODO
 * define the project item
 */
const ProjectItem:React.FC<{item:TProjectItem}> = ({item}):JSX.Element => {

    return(
        <tr>
            <td className="td-address">
                <a href="#view" 
                    onClick={(e) => {
                        e.preventDefault()
                        alert("view clicked")
                    }}
                >
                    {item.street}<br/>{item.city}
                </a>

                <span className="text-muted">
                    <Moment format="DD MMM YYYY \at\ HH:mm">
                        {item.created_at}
                    </Moment>
                </span>
            </td>
            <td className="td-title">{item.title}</td>
            <td className='td-properties'>
                <div className="properties-box row">
                    <div className="col-6">
                        <span className="properties-item-label">
                            <i className="mdi mdi-bed-empty"></i>
                            <span>Bedrooms</span>
                        </span>
                        <span className="properties-item-value">
                            {item.bedrooms}
                        </span>
                    </div>
                    <div className="col-6">
                        <span className="properties-item-label">
                            <i className="mdi mdi-hot-tub"></i>
                            <span>Bathrooms</span>
                        </span>
                        <span className="properties-item-value">
                            {item.bathrooms}
                        </span>
                    </div>

                    <div className="col-6">
                        <span className="properties-item-label">
                            <i className="mdi mdi-car"></i>
                            <span>Carpark</span>
                        </span>
                        <span className="properties-item-value">
                            {item.carpark}
                        </span>
                    </div>
                    <div className="col-6">
                        <span className="properties-item-label">
                            <i className="mdi mdi-youtube-tv"></i>
                            <span>Living rooms</span>
                        </span>
                        <span className="properties-item-value">
                            {item.livingrooms}
                        </span>
                    </div>

                    <div className="col-6">
                        <span className="properties-item-label">
                            <i className="mdi mdi-grid"></i>
                            <span>Landarea</span>
                        </span>
                        <span className="properties-item-value">
                            {item.land_area}
                        </span>
                    </div>
                    <div className="col-6">
                        <span className="properties-item-label">
                            <i className="mdi mdi-home"></i>
                            <span>Floorarea</span>
                        </span>
                        <span className="properties-item-value">
                            {item.floor_area}
                        </span>
                    </div>
                </div>
            </td>
            <td className="td-completed-on">
                {item.completed_on && 
                    <Moment format="MMM YYYY"> 
                        {item.completed_on}
                    </Moment>
                }
            </td>
            <td className="td-btns">
                <button className="btn btn-icon btn-danger btn-sm"
                    onClick={() => 
                        alert("delete clicked")
                    }
                >
                    <i className="mdi mdi-close"></i>
                </button>
            </td>
        </tr>
    )
}



/**
 * define the type of projects table
 */
type TProjectsTable = {
    projects : Array<TProjectItem>
}

/**
 * Main projects table
 * @returns 
 */
const ProjectsTable:React.FC<TProjectsTable> = ({projects}):JSX.Element => {

    return(
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
                {projects.length === 0 
                    ? <ProjectEmptyItem />
                    : <>
                        {
                            projects.map((item) => {
                                return <ProjectItem item={item} key={`project_${item.id}`} />
                            })
                        }
                      </>
                }
            </tbody>
        </table>
    )
}
export default ProjectsTable