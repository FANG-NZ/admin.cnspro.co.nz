import React from 'react'

import ProjectsBodyHeader from './projects-body-header'
import ProjectsTable from './projects-table'
import {useAppSelector} from '../store/store-hook'
import {getNotNewProjects} from '../slice/projects-slice'
import type {TProjectItem} from '../../../types/project-item.type'


const AllProjectsBody = ():JSX.Element => {
    const projects:Array<TProjectItem> = useAppSelector(getNotNewProjects)

    return(
        <div className="card m-b-30">
            <ProjectsBodyHeader is_4_new={false} />

            <ProjectsTable projects={projects} />
        </div>
    )
}
export default AllProjectsBody