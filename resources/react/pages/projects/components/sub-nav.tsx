import React from 'react'
import { createPortal } from 'react-dom'
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom'

export enum SUB_NAV_LINK {
    NEW_PROJECTS = '/new-projects',
    ALL_PROJECTS = '/all-projects'
}

const SubNav:React.FC = ():JSX.Element => {

    return createPortal(
        <React.Fragment>
            <li>
                <NavLink 
                    to={SUB_NAV_LINK.NEW_PROJECTS} 
                    activeClassName="active"
                >
                    New projects
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to={SUB_NAV_LINK.ALL_PROJECTS} 
                    activeClassName="active"
                >
                    ALL projects
                </NavLink>
            </li>
        </React.Fragment>,
        document.getElementById('projects-page-sub-nav') as HTMLElement
    )
}
export default SubNav
