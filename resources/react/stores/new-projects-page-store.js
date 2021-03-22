import {configureStore} from '@reduxjs/toolkit'
import NewProjectsReducer from './new-projects-slice'

export default configureStore({
    reducer:{
        'NewProjects' : NewProjectsReducer
    }
})