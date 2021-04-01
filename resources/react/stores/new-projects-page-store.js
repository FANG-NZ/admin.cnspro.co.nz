import {configureStore} from '@reduxjs/toolkit'
import NewProjectsReducer from './new-projects-slice'
import ConfirmAlertReducer from '../tools/confirm-alert/confirm-alert-slice'
import ProjectModalReducer from '../tools/modals/project-modal-slice'
import LoadingSpinnerReducer from '../tools/loading-spinner/loading-spinner-slice'

export default configureStore({
    reducer:{
        'NewProjects' : NewProjectsReducer,
        'ConfirmAlert' : ConfirmAlertReducer,
        'ProjectModal' : ProjectModalReducer,
        'LoadingSpinner' : LoadingSpinnerReducer
    }
})