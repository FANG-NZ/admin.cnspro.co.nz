import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = []

export const allNewProjects = state => state.NewProjects

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