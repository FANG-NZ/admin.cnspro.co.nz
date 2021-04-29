import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import type {TProjectItem, TProjectImage} from '../../../types/project-item.type'
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
 * Request for uploading project image
 */
export const uploadProjectImage = createAsyncThunk(
    'Projects/uploadProjectImage',

    (data:{id:number, values:Array<any>}) => {
        const _url = process.env.REACT_APP_REQUEST_URL

        const response = Client.post(`${_url}projects/image/upload/${data.id}`, data.values, true)
        return response
    }
)

/**
 * TODO
 * Request for deleting project image
 */
export const deleteProjectImage = createAsyncThunk(
    'Projects/deleteProjectImage',

    (data:{project_id: number, image_id:number}) => {
        const _url = process.env.REACT_APP_REQUEST_URL

        const response = Client.delete(`${_url}projects/image/delete/${data.project_id}`, {'image_id' : data.image_id})
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

        //uploadProjectImage
        builder.addCase(uploadProjectImage.fulfilled, (state, action) => {
            const _image = <TProjectImage>action.payload

            const _index = state.list.findIndex((item) => item.id === _image.project_id)

            //To append image
            if(_index > -1)
                state.list[_index].images.unshift(_image)
        })

        //deleteProjectImage
        builder.addCase(deleteProjectImage.fulfilled, (state, action)=>{
            const _image = <TProjectImage>action.payload

            //Find project index
            const _index = state.list.findIndex((item) => item.id === _image.project_id)
            //If index not found, nothing to do
            if(_index < 0) return

            const _newimages:TProjectImage[] = state.list[_index].images.filter((item) => item.id !== _image.id)
            //To reset new image list
            state.list[_index].images = _newimages
        })

    }
})


export const {setProjects} = ProjectsSlice.actions
export default ProjectsSlice.reducer

//Helper to get all NEW projects
export const getNewProjects = (state:RootState) => state.Projects.list.filter((item) => item.is_new == true)
//Helper to get not new projects
export const getNotNewProjects = (state:RootState) => state.Projects.list.filter((item) => item.is_new == false)