import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import type {TProjectItem} from '../../../types/project-item.type'
import type {RootState} from '../store/projects-store'
import {Client} from '../../../tools/fetch-client'

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
 * Request for adding new project
 */
export const addNewProject = createAsyncThunk(
    'Projects/addNewProject',

    (data:Array<any>) => {
        const _url = process.env.REACT_APP_REQUEST_URL

        const response = Client.post(`${_url}projects/add`, data)
        return response
    }
)

/**
 * TODO
 * Request for updating project
 */
export const updateProject = createAsyncThunk(
    'Projects/updateProject',

    (data:{id:number, values:Array<any>}) => {
        const _url = process.env.REACT_APP_REQUEST_URL

        const response = Client.put(`${_url}projects/update/${data.id}`, data.values)
        return response
    }
)

/**
 * TODO
 * Rewquest for deleting project
 */
export const deleteProject = createAsyncThunk(
    'Projects/deleteProject',

    (id:number) => {
        const _url = process.env.REACT_APP_REQUEST_URL

        const response = Client.delete(`${_url}projects/delete/${id}`)
        return response
    }
)


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

    },

    //For extra reducers
    extraReducers: (builder) => {

        //addNewProject
        builder.addCase(addNewProject.fulfilled, (state, action) => {

            const _project = <TProjectItem>action.payload
            const _index = state.list.findIndex((item) => item.id === _project.id)

            //Check if project not existed, and then
            //add item into beginning of list
            if(_index === -1)
                state.list.unshift(_project)
        })

        //updateProject
        builder.addCase(updateProject.fulfilled, (state, action)=>{
            const _project = <TProjectItem>action.payload

            const _index = state.list.findIndex((item) => item.id === _project.id)
            if(_index > -1)
                state.list[_index] = _project
        })

        //deleteProject
        builder.addCase(deleteProject.fulfilled, (state, action)=>{
            const _project = <TProjectItem>action.payload

            const _newlist = state.list.filter((item) => item.id !== _project.id)
            state.list = _newlist
        })

    }
})


export const {setProjects} = ProjectsSlice.actions
export default ProjectsSlice.reducer

//Helper to get all NEW projects
export const getNewProjects = (state:RootState) => state.Projects.list.filter((item) => item.is_new == true)
//export const getNewProjects = (state:RootState) => state.Projects.list
//Helper to get not new projects
export const getNotNewProjects = (state:RootState) => state.Projects.list.filter((item) => item.is_new == false)