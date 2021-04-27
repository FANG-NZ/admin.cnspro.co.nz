import {configureStore} from '@reduxjs/toolkit'
import ProjectsReducer from '../slice/projects-slice'

const store = configureStore({
    reducer: {
        Projects : ProjectsReducer
    }
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
