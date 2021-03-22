import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {allNewProjects} from '../stores/new-projects-slice'


/**
 * define the project item 
 * @param {*} props 
 * @returns 
 */
const ProjectItem = (props) => {
    const _project = props.project


    return(
        <React.Fragment>
            <td>{_project.street},{_project.city}</td>
            <td>{_project.title}</td>
            <td></td>
            <td></td>
            <td></td>
        </React.Fragment>
    )
}

/**
 * define the EMPTY project item
 * @returns 
 */
const EmptyProjectItem = () => {

    return(
        <td colSpan="5">
            <div className="alert alert-warning mb-0">
                There is <strong>NO</strong> any new projects added
            </div>
        </td>
    )
}



const ProjectsTable = () => {
    const _projects = useSelector(allNewProjects)

    return(
        <React.Fragment>
            <table className="table mb-0">
                <thead>
                    <th>Address</th>
                    <th>Title</th>
                    <th>Properties</th>
                    <th>Completed On</th>
                    <th></th>
                </thead>

                <tbody>
                    {_projects.length === 0
                     ?  <EmptyProjectItem />
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