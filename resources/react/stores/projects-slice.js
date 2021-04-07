import {createSlice, createAsyncThunk, nanoid} from '@reduxjs/toolkit'
import {Client} from '../tools/client'

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

        /**
         * TODO
         * Handle add new project done callback
         * @param {*} state 
         * @param {*} action 
         */
        [addNewProject.fulfilled]: (state, action) => {

            const _project = action.payload

            if(_project.is_new){
                //To add new porject at the beginning of new list
                state.newProjects.unshift(_project)
            }
            else{
                state.allProjects.unshift(_project)
            }

        }

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