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
            prepare(_item:TProjectItem|null = null, _is_new:boolean = true){

                const payload = {
                    item : _item?_item: {...initialState.item, ...{is_new: _is_new}},
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
        },

        /**
         * TODO
         * Function is to setup project item, this is to update
         * current modal project item
         * @param state 
         * @param action 
         */
        setProject: (state, action:PayloadAction<TProjectItem>) => {
            state.item = action.payload

            //Check if project item is REAL object with values
            if(action.payload.id > 0)
                state.is_adding_new = false
        }

    }
})

export const {show, hide, setProject} = ProjectModalSlice.actions
export default ProjectModalSlice.reducer