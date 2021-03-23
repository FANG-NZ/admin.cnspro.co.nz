import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    'shown': false,
    'isNew': true, //to check if it is for ADDING NEW request
    'project': {}
}

const ProjectModalSlice = createSlice({
    name: 'ProjectModal',
    initialState,
    reducers:{

        //To show modal
        show: {
            reducer(state, actions){
                const {shown, isNew, project} = actions.payload

                state.shown = shown
                state.isNew = isNew
                state.project = project
            },
            prepare(project){

                let _isNew = true
                let _project = initialState.project
                if(project){
                    _isNew = false
                    _project = project
                }

                return{
                    payload:{
                        "shown": true,
                        "isNew": _isNew,
                        "project": _project
                    }
                }

            }
        },

        //To hide the modal
        hide(state, action){
            state.shown = false
            state._isNew = true
            state.project = initialState.project
        }

    }
})

export const { show, hide } = ProjectModalSlice.actions
export default ProjectModalSlice.reducer