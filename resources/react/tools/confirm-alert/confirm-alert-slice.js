import { createSlice } from "@reduxjs/toolkit"
//import store from '../../stores/new-projects-page-store'

const initialState = {
    'shown' : false,
    'confirmed': false,
    'content': {
        'title': "Are you sure?",
        'message': "You will not be able to recover this!",
        'confirmBtnText': "Yes, do it!"
    }
}

//define the thunk method to open alert
//dialog
export const openAlert = (store, content = {}) => {
    return (dispatch, getState) => {

        dispatch(show(content))

        //To define the Promise as return 
        return new Promise((resolve, reject = () => {}) => {

            function onStateChange(){
                const _confirmed = getState().ConfirmAlert.confirmed
                unsubscribe()

                if(_confirmed){
                    if(resolve || {}.toString.call(resolve) === '[object Function]')
                        resolve()
                }
                    
                dispatch(hide())
            }

            const unsubscribe = store.subscribe(onStateChange)
        })
    }
  }
  

const ConfirmAlertSlice = createSlice({
    name: 'ConfirmAlert',
    initialState,
    reducers:{

        //Show confirm alert popup
        show:{
            reducer(state, action){
                state.shown = true
                state.content = action.payload.content
            },
            prepare(content = {}){

                const _content = {
                    ...initialState.content,
                    ...content
                }

                return({
                    payload:{
                        content: _content
                    }
                })
            }
        },

        confirm(state, action){
            state.confirmed = true
        },

        reject(state, action){
            state.confirmed = false
        },

        /**
         * Function is to handle hide alert
         * @param {*} state 
         * @param {*} action 
         */
        hide(state, action){
            state.shown = false
        }

    }
})

export const { show, hide, confirm, reject } = ConfirmAlertSlice.actions
export default ConfirmAlertSlice.reducer