import {createSlice, createAsyncThunk, nanoid} from '@reduxjs/toolkit'
import {Client} from '../tools/client'
import store from './new-projects-page-store'

const initialState = {
    'newProjects':[],
    'allProjects':[]
}

//To get all new projects
export const allNewProjects = state => state.Projects.newProjects

/**
 * TODO
 * define the async function to add new project
 */
export const addNewProject = createAsyncThunk(
    'Projects/addNewProject',
    async (data) => {
        const response = await Client.post(
                                            "/projects/add", 
                                            data, 
                                            //{store: store}
                                        )
        return response
    }
)


/**
 * TODO
 * define the function to update project
 */
export const updateProject = createAsyncThunk(
    'Projects/addNewProject',
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
        setNewProjects(state, action){
            state.newProjects = action.payload
        }

    },

    //START extra reducers
    extraReducers: {

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


export const {setNewProjects} = ProjectsSlice.actions
export default ProjectsSlice.reducer