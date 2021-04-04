import {createSlice, createAsyncThunk, nanoid} from '@reduxjs/toolkit'
import {Client} from '../tools/client'
import store from './new-projects-page-store'
import {updateProject} from '../tools/modals/project-modal-slice'

const initialState = []

export const allNewProjects = state => state.NewProjects

/**
 * TODO
 * define the async function to add new project
 */
export const addNewProject = createAsyncThunk(
    'NewProjects/addNewProject',
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
 * Function is to handle upload image into project
 */
export const uploadProjectImage = createAsyncThunk(
    'NewProjects/uploadProjectImage',
    async (data) => {
        const _id = data.id
        console.log(data)
        const response = await Client.post(
            `/projects/upload/${data.id}`, 
            data.image
        )
        return response
    }
)


/**
 * create New Projects Slice
 */
const NewProjectsSlice = createSlice({
    name: "NewProjects",
    initialState,
    reducers:{

        /**
         * Function is to init new projects
         * @param {*} state 
         * @param {*} action 
         * @returns 
         */
        setNewProjects(state, action){
            return action.payload
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


export const {setNewProjects} = NewProjectsSlice.actions
export default NewProjectsSlice.reducer