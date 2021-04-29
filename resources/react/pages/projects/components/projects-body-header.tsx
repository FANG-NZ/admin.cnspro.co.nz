import React from 'react'
import {Link} from 'react-router-dom'
import {SUB_NAV_LINK} from './sub-nav'
import {useAppDispatch} from '../store/store-hook'
import {show} from '../slice/project-modal-slice'

const ProjectsBodyHeader:React.FC<{is_4_new:boolean, total:number}> = ({is_4_new, total}):JSX.Element => {
    const _dispatch = useAppDispatch()

    //To resetup vars
    let _header = "All projects"
    let _btnText = "Add project"

    if(is_4_new){
        _header = "New projects"
        _btnText = "New project"
    }

    return(
        <div className="card-header ff-card-header">
            <div className="card-header-content">
                <h4 className="m-t-0 header-title">{_header} <span>({total})</span></h4>
                <p className="text-muted font-13">
                    {is_4_new
                        ? <>There are ONLY for all NEW PROJECTS, if you want to see all projects click <Link to={SUB_NAV_LINK.ALL_PROJECTS}>ALL PROJECTS</Link></>
                        : <>There are ALL PROJECTS listed</>
                    }
                </p>
            </div>
            
            <div className="card-header-tools">

                <button className="btn btn-success" 
                    onClick={() => {

                        if(is_4_new){
                            _dispatch(show())
                        }else{
                            _dispatch(show(null, false))
                        }
                    }}
                >
                    <i className="mdi mdi-plus-circle"></i>
                    <span>{_btnText}</span>
                </button>   

            </div>
        </div>
    )
}
export default ProjectsBodyHeader