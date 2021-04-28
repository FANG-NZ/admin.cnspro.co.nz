import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type{TProjectItem} from '../../../types/project-item.type'

type TProjectModalState = {
    shown: boolean,
    is_adding_new : boolean,
    item : TProjectItem
}

//TODO
//define the default initial state
const initialState:TProjectModalState = {
    shown: false,
    is_adding_new: true,
    item: {
        id: 0,
        title:  "",
        street: "",
        city:   "",

        is_new: true,

        bathrooms: "",
        bedrooms:  "",
        livingrooms: "",
        carpark: "",
        land_area: "",
        floor_area: "",

        short_description: "",
        description: "",

        completed_on: "",
        created_at: "",

        images: [] 
    }
}

const ProjectModalSlice = createSlice({
    name: 'ProjectModal',
    initialState,
    reducers: {

        /**
         * TODO
         * define the function to open the modal
         */
        show: {
            reducer(state, action:PayloadAction<{is_adding_new : boolean, item:TProjectItem}>){
                state.shown = true

                state.item = action.payload.item
                state.is_adding_new = action.payload.is_adding_new
            },
            prepare(_item:TProjectItem|null = null){

                const payload = {
                    item : _item?_item: initialState.item,
                    is_adding_new : _item ? false:true
                }
                return {payload}
            }
        },

        /**
         * TODO
         * Function is to close modal
         * @param state 
         */
        hide: (state) => {
            state.shown = false
            state.is_adding_new = true
            state.item = initialState.item
        }

    }
})

export const {show, hide} = ProjectModalSlice.actions
export default ProjectModalSlice.reducer