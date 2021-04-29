import {configureStore} from '@reduxjs/toolkit'
import ProjectsReducer from '../slice/projects-slice'
import ProjectModalReducer from '../slice/project-modal-slice'

const store = configureStore({
    reducer: {
        Projects : ProjectsReducer,
        ProjectModal: ProjectModalReducer
    }
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
