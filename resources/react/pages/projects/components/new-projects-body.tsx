import React from 'react'

import ProjectsBodyHeader from './projects-body-header'
import ProjectsTable from './projects-table'


const NewProjectsBody = ():JSX.Element => {

    return(
        <div className="card m-b-30">
            <ProjectsBodyHeader />

            <ProjectsTable />
        </div>
    )
}
export default NewProjectsBody