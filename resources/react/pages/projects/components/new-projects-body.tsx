import React from 'react'

import ProjectsBodyHeader from './projects-body-header'
import ProjectsTable from './projects-table'
import {useAppSelector} from '../store/store-hook'
import {getNewProjects} from '../slice/projects-slice'
import type {TProjectItem} from '../../../types/project-item.type'


const NewProjectsBody = ():JSX.Element => {
    const newProjects:Array<TProjectItem> = useAppSelector(getNewProjects)

    return(
        <div className="card m-b-30">
            <ProjectsBodyHeader is_4_new={true} total={newProjects.length} />

            <ProjectsTable projects={newProjects} />
        </div>
    )
}
export default NewProjectsBody