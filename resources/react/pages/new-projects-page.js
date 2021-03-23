import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'

import store from '../stores/new-projects-page-store'
import ProjectsTable from '../components/projects-table'

import {setNewProjects} from '../stores/new-projects-slice'

//To get json string from DOM
const json_string = document.getElementById("root-new-projects").getAttribute("projects-data");
if(!json_string){
    throw new Error("NOT FOUND JSON STRING")
}

//Try to load data from DOM attribute,
//if there is NO data, we just send AJAX request to fetch from server
const _data = JSON.parse(json_string)
store.dispatch(setNewProjects(_data))

ReactDom.render(
    <Provider store={store}>
        <h4 className="m-t-0 header-title">New projects list</h4>
        <ProjectsTable />
    </Provider>
    , 
    document.getElementById("root-new-projects")
)
