import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import type {BannerSliderItem} from '../../../types/banner-slider-item.type'
import type {RootState} from '../store/dashboard-store'
import {Client} from '../../../tools/fetch-client'

/**
 * define the MainBannerSlider state
 * structure
 */
type MainBannerSliderState = {
    sliders : Array<BannerSliderItem>
}


//define the initial state here
const initialState : MainBannerSliderState = {
    sliders: []
}


/**
 * TODO
 * define the function is to handle add new slider item
 */
export const addNewItem = createAsyncThunk(
    'MainBannerSlider/addNewItem',

    (data:any) => {
        const _url = process.env.REACT_APP_REQUEST_URL

        const response = Client.post(`${_url}dashboard/banner-slider/add`, data, true)
        return response
    }
)

/**
 * TODO
 * define the function is to handle update slider item
 */
export const updateItem = createAsyncThunk(
    'MainBannerSlider/updateItem',

    (input:{id:number, data:any}) => {
        const _url = process.env.REACT_APP_REQUEST_URL

        const response = Client.put(`${_url}dashboard/banner-slider/update/${input.id}`, input.data, true)
        return response
    }
)

/**
 * TODO
 * define the function to handle delete item
 */
export const deleteItem = createAsyncThunk(
    'MainBannerSlider/deleteItem',

    (id:number) => {
        const _url = process.env.REACT_APP_REQUEST_URL

        const response = Client.delete(`${_url}dashboard/banner-slider/delete/${id}`)
        return response
    }
)



/**
 * TODO
 * define the MainBannerSliderSlice
 */
const MainBannerSliderSlice = createSlice({
    name: 'MainBannerSlider',
    initialState,
    reducers:{

        /**
         * TODO
         * init sliders list here
         * @param state 
         * @param action 
         */
        setSliders:(state, action:PayloadAction<Array<BannerSliderItem>>) => {
            state.sliders = action.payload
        }

    },

    //START extra reducers
    extraReducers: (builder) => {

        //addNewItem
        builder.addCase(addNewItem.fulfilled, (state, action) => {
            state.sliders.push(action.payload as BannerSliderItem)
        })

        //updateItem
        builder.addCase(updateItem.fulfilled, (state, action) => {
            const _updated_item = action.payload as BannerSliderItem

            const _index= state.sliders.findIndex((item) => item.id === _updated_item.id)
            state.sliders[_index] = _updated_item
        })

        //deleteItem
        builder.addCase(deleteItem.fulfilled, (state, action) => {
            const _deleted_item = action.payload as BannerSliderItem

            const _new_list = state.sliders.filter((item) => item.id !== _deleted_item.id )
            state.sliders = _new_list
        })

    }
})

export const {setSliders} = MainBannerSliderSlice.actions
export default MainBannerSliderSlice.reducer

//Helper to get all sliders
export const allSliders = (state:RootState) => state.MainBannerSlider.sliders
