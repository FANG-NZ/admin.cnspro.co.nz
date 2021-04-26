import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'

import PageHeader from './components/page-header'
import SubNav, {SUB_NAV_LINK} from './components/sub-nav'



ReactDOM.render(
    <HashRouter>
        <SubNav />
        <PageHeader />

        <Switch>
            <Route exact path={SUB_NAV_LINK.NEW_PROJECTS}>
                <h1>NEW PROJECTS</h1>
            </Route>

            <Route path={SUB_NAV_LINK.ALL_PROJECTS}>
                <h1>ALL projects</h1>
            </Route>

            <Route path="">
                <Redirect to={SUB_NAV_LINK.NEW_PROJECTS} />
            </Route>
        </Switch>

    </HashRouter>,
    document.getElementById('root-projects') as HTMLElement
)