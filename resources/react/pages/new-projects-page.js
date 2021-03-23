import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'

import store from '../stores/new-projects-page-store'
import ProjectsTable from '../components/projects-table'
import ProjectsPageHeader from '../components/projects-page-header'
import ConfirmAlert from '../tools/confirm-alert/confirm-alert'

import {setNewProjects} from '../stores/new-projects-slice'

//To get json string from DOM
try{
    const json_string = document.getElementById("root-new-projects").getAttribute("projects-data");
    if(!json_string){
        throw new Error("NOT FOUND JSON STRING")
    }

    //Try to load data from DOM attribute,
    //if there is NO data, we just send AJAX request to fetch from server
    const _data = JSON.parse(json_string)
    store.dispatch(setNewProjects(_data))

}catch(err){
    console.error("Init default projects data ERROR")
}

ReactDom.render(
    <Provider store={store}>
        <div className="card-header ff-card-header">
            <ProjectsPageHeader />
        </div>
        <div className="card-body">
            <ProjectsTable />
        </div>

        {/* Confirm Alert */}
        <ConfirmAlert />
    </Provider>
    , 
    document.getElementById("root-new-projects")
)
