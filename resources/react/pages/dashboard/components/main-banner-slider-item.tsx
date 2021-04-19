import React from 'react'
import type {BannerSliderItem} from '../../../types/banner-slider-item.type'
import {useAppDispatch} from '../store/dashboard-store'
import {show} from '../slice/banner-slider-modal-slice'
import PubSub from 'pubsub-js'
import ConfirmDialog, {EVENT_OPEN_CONFIRM_DIALOG} from '../../../tools/confirm-dialog/confirm-dialog'

/**
 * TODO
 * define the empty slider item
 * @returns 
 */
export const MainBannerSliderEmptyItem:React.FC = ():JSX.Element => {

    return(
        <div className="col-12">
            <div className="alert alert-warning mb-0">
                There is <strong>NO</strong> any SLIDER ITEM added
            </div>
        </div>
    )
}



/**
 * TODO
 * defien the slider item
 * @param BannerSliderItem item
 * @returns 
 */
const MainBannerSliderItem : React.FC<{item:BannerSliderItem}> = ({item}):JSX.Element => {
    const _dispatch = useAppDispatch()

    return(
        <div className="col-sm-4 col-md-3">
            <div className="card main-banner-slider-item">
                <img src={item.url} alt="" className="card-img-top img-fluid" />
                <div className="card-body">
                    <div className="card-title" aria-label="title">{item.title}</div>
                </div>
                <div className="card-body card-btns">
                    
                    <button className="btn btn-success btn-sm" 
                        onClick={(e) => {
                            e.preventDefault()
                            _dispatch(show(item))
                        }}
                    >
                        <i className="mdi mdi-database-plus"></i>
                        <span>Edit</span>
                    </button>

                    <button className="btn btn-danger btn-sm"
                        onClick={(e) => {
                            e.preventDefault()

                            //Trigger open confirm dialog
                            PubSub.publish(
                                EVENT_OPEN_CONFIRM_DIALOG, 
                                {
                                    shown:true,
                                    confirm_btn_text : "Yes, remove it",
                                    confirm_callback: () => {
                                        console.log("Handle delete request")
                                    }
                                }
                            )
                        }}
                    >
                        <i className="mdi mdi-delete"></i>
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default MainBannerSliderItem