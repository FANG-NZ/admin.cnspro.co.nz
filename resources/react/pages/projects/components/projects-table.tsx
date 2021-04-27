import React from 'react'


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
 * Main projects table
 * @returns 
 */
const ProjectsTable = ():JSX.Element => {

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
                <ProjectEmptyItem />
            </tbody>
        </table>
    )
}
export default ProjectsTable