import {configureStore} from '@reduxjs/toolkit'
import ProjectsReducer from './projects-slice'
import ConfirmAlertReducer from '../tools/confirm-alert/confirm-alert-slice'
import ProjectModalReducer from '../tools/modals/project-modal-slice'

export default configureStore({
    reducer:{
        'Projects' : ProjectsReducer,
        'ConfirmAlert' : ConfirmAlertReducer,
        'ProjectModal' : ProjectModalReducer
    }
})