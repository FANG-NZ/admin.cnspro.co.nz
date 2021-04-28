import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'

import PageHeader from './components/page-header'
import SubNav, {SUB_NAV_LINK} from './components/sub-nav'
import NewProjectsBody from './components/new-projects-body'
import AllProjectsBody from './components/all-projects-body'
import store from './store/projects-store'
import {setProjects} from './slice/projects-slice'
import ProjectModal from './modals/project-modal'


//To get json string from DOM
try{
    const json_string = document.getElementById("root-projects")?.getAttribute("projects-data");
    if(!json_string){
        throw new Error("NOT FOUND JSON STRING")
    }

    //Try to load data from DOM attribute,
    //if there is NO data, we just send AJAX request to fetch from server
    const _data = JSON.parse(json_string)
    //console.log(_data)
    store.dispatch(setProjects(_data))

}catch(err){
    console.error("Init default projects data ERROR")
}


ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <SubNav />
            <PageHeader />

            <Switch>
                {/* Show new projects */}
                <Route path={SUB_NAV_LINK.NEW_PROJECTS}>
                    <NewProjectsBody />
                </Route>

                {/* Show all projects */}
                <Route path={SUB_NAV_LINK.ALL_PROJECTS} component={AllProjectsBody} />

                <Route>
                    <Redirect to={SUB_NAV_LINK.NEW_PROJECTS} />
                </Route>
            </Switch>

            {/* Include Project Modal */}
            <ProjectModal />
        </HashRouter>
    </Provider>,
    document.getElementById('root-projects') as HTMLElement
)