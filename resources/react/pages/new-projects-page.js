import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'

import store from '../stores/new-projects-page-store'
import ProjectsTable from '../components/projects-table'

ReactDom.render(
    <Provider store={store}>
        <h4 className="m-t-0 header-title">New projects list</h4>
        <ProjectsTable />
    </Provider>
    , 
    document.getElementById("root-new-projects")
)

