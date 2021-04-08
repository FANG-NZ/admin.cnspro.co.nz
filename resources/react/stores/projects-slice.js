import {createSlice, createAsyncThunk, nanoid} from '@reduxjs/toolkit'
import {Client} from '../tools/client'

const initialState = {
    'projects':[],
    'allProjects':[]
}

//To get all new projects
export const allNewProjects = state => state.Projects.projects.filter((item) => item.is_new === 1)

/**
 * TODO
 * define the async function to add new project
 */
export const addNewProject = createAsyncThunk(
    'Projects/addNewProject',
    async (data) => {
        const response = await Client.post(
            "/projects/add", 
            data
        )
        return response
    }
)


/**
 * TODO
 * define the function to update project
 */
export const updateProject = createAsyncThunk(
    'Projects/updateProject',
    (data) => {
        const _id = data.id

        const response = Client.put(
            '/projects/update/' + _id,
            data
        )
        return response
    }
)


/**
 * TODO
 * define the function to delete project
 */
export const deleteProject = createAsyncThunk(
    'Projects/deleteProject',
    (data) => {
        const _id = data.id

        const response = Client.delete('/projects/delete/' + _id)
        return response
    }
)


/**
 * TODO
 * Function is to handle upload image into project
 */
export const uploadProjectImage = createAsyncThunk(
    'Projects/uploadProjectImage',
    async (data) => {
        const _id = data.id
        
        const response = await Client.post(
            `/projects/upload/${data.id}`, 
            data.image,
            {is_upload_file : true}
        )
        return response
    }
)


/**
 * create Projects Slice
 */
const ProjectsSlice = createSlice({
    name: "Projects",
    initialState,
    reducers:{

        /**
         * Function is to init new projects
         * @param {*} state 
         * @param {*} action 
         * @returns 
         */
        setProjects(state, action){
            state.projects = action.payload
        }

    },

    //START extra reducers
    extraReducers: {

        /**
         * TODO
         * Handle add new project done callback
         * @param {*} state 
         * @param {*} action 
         */
        [addNewProject.fulfilled]: (state, action) => {

            const _project = action.payload
            //To add new porject at the beginning of new list
            state.projects.unshift(_project)

        },


        /**
         * TODO
         * Handle update project callback
         * @param {*} state 
         * @param {*} action 
         */
        [updateProject.fulfilled]: (state, action) => {
            const _project = action.payload

            const _index = state.projects.findIndex((item) => item.id === _project.id)
            //To update project
            state.projects[_index] = {...state.projects[_index], ..._project}

        },


        /**
         * TODO
         * Handle project deleted callback
         * @param {*} state 
         * @param {*} action 
         */
        [deleteProject.fulfilled]: (state, action) => {
            const {id} = action.payload

            const _new_list = state.projects.filter((item) => item.id != id)
            state.projects = _new_list  
        },

        // [uploadProjectImage.pending]: (state, action) => {

        //     const _data = action.meta.arg
        //     const _pid = _data.id
        //     //To find the item index
        //     const _index = state.findIndex((item) => item.id == _pid)

        //     //To add new image into begining
        //     state[_index].images.unshift({
        //         id: nanoid(),
        //         is_uploading: true,
        //         url: _data.data_url
        //     })

        // },
    }
})


export const {setProjects} = ProjectsSlice.actions
export default ProjectsSlice.reducer