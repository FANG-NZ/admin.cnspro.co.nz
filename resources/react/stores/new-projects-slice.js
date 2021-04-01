import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {Client} from '../tools/client'
import store from './new-projects-page-store'

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

    }
})


export const {setNewProjects} = NewProjectsSlice.actions
export default NewProjectsSlice.reducer