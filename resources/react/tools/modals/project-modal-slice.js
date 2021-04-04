import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    //'shown': false,
    'shown' : true,
    'isNew' : false,
    //'isNew': true, //to check if it is for ADDING NEW request
    'project': {
        id: '1',
        title: "NONE",
        images: []
    }
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
        },

        /**
         * Function is to setup Project object
         * @param {*} state 
         * @param {*} action 
         */
        setProject(state, action){
            state.project = action.payload
            state.isNew = false
        },

        /**
         * Function is to update project
         * @param {*} state 
         * @param {*} action 
         */
        updateProject(state, action){
            state.project = action.payload
        }

    }
})

export const { show, hide, setProject, updateProject} = ProjectModalSlice.actions
export default ProjectModalSlice.reducer