import {createSlice} from '@reduxjs/toolkit'

export const NEW_PROJECT = {
    'ALL' : {'is_new' : 0},
    'NEW' : {'is_new': 1}
}


const initialState = {
    'shown': false,
    //To indicate if this is for ADDING NEW PROJECT
    'isAddingNew' : false,
    //'isNew': true, //to check if it is for ADDING NEW request
    'project': {
        is_new : 1,
        images: []
    }
}

/**
 * TODO
 * Check if this is to add new project
 * @param {*} state 
 * @returns 
 */
export const isAddingNewProject = state => state.ProjectModal.isAddingNew



const ProjectModalSlice = createSlice({
    name: 'ProjectModal',
    initialState,
    reducers:{

        //To show modal
        show: {
            reducer(state, actions){
                const {shown, isAddingNew, project} = actions.payload

                state.shown = shown
                state.isAddingNew = isAddingNew
                state.project = project
            },
            prepare(project){

                let _isAddingNew = true
                let _project = initialState.project


                if(project && 'id' in project){
                    _isAddingNew = false
                    _project = project
                }
                else{
                    //merge new project objecct 
                    _project = {..._project, ...project}
                }

                return{
                    payload:{
                        "shown": true,
                        "isAddingNew": _isAddingNew,
                        "project": _project
                    }
                }

            }
        },

        //To hide the modal
        hide(state, action){
            state.shown = false
            state.isAddingNew = true
            state.project = initialState.project
        },

        /**
         * Function is to setup Project object
         * @param {*} state 
         * @param {*} action 
         */
        setProject(state, action){
            const _project = action.payload

            state.project = {...state.project, ..._project}
            state.isAddingNew = false
        },

        /**
         * Function is to upload image
         * @param {*} state 
         * @param {*} action 
         */
        addImage(state, action){
            state.project.images.unshift(action.payload)
        },

        /**
         * Function is to delete image
         */
        deleteImage(state, action){
            const _id = action.payload

            const _new_images = state.project.images.filter((item) => item.id != _id)
            state.project.images = _new_images
        },

    }
})

export const { show, hide, setProject, addImage, deleteImage} = ProjectModalSlice.actions
export default ProjectModalSlice.reducer