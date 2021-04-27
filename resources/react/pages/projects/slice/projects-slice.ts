import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import type {TProjectItem} from '../../../types/project-item.type'

type TProjectsState = {
    projects: Array<TProjectItem>
}

/**
 * define the default initialState
 */
const initialState:TProjectsState = {
    projects: []
}


/**
 * TODO
 * define the projects slice
 */
const ProjectsSlice = createSlice({
    name: 'Projects',
    initialState,

    reducers: {

        /**
         * TODO
         * setup projects list
         * @param state 
         * @param action 
         */
        setProjects: (state, action:PayloadAction<Array<TProjectItem>>)=>{
            state.projects = action.payload
        }

    }
})


export const {setProjects} = ProjectsSlice.actions
export default ProjectsSlice.reducer

//Helper to get all sliders
//export const getNewProjects = (state) => state.Projects.