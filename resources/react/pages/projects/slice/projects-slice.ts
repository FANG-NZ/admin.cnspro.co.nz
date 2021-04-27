import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import type {TProjectItem} from '../../../types/project-item.type'
import type {RootState} from '../store/projects-store'

type TProjectsState = {
    list: Array<TProjectItem>
}

/**
 * define the default initialState
 */
const initialState:TProjectsState = {
    list: []
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
            state.list = action.payload
        }

    }
})


export const {setProjects} = ProjectsSlice.actions
export default ProjectsSlice.reducer

//Helper to get all NEW projects
export const getNewProjects = (state:RootState) => state.Projects.list.filter((item) => item.is_new == true)
//export const getNewProjects = (state:RootState) => state.Projects.list
//Helper to get not new projects
export const getNotNewProjects = (state:RootState) => state.Projects.list.filter((item) => item.is_new == false)