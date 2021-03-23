import {configureStore} from '@reduxjs/toolkit'
import NewProjectsReducer from './new-projects-slice'
import ConfirmAlertReducer from '../tools/confirm-alert/confirm-alert-slice'

export default configureStore({
    reducer:{
        'NewProjects' : NewProjectsReducer,
        'ConfirmAlert' : ConfirmAlertReducer
    }
})