import React from 'react'

const ProjectsBodyHeader = ():JSX.Element => {

    return(
        <div className="card-header ff-card-header">
            <div className="card-header-content">
                <h4 className="m-t-0 header-title">Projects Header</h4>
                <p className="text-muted font-13">
                    Anything could be go here
                </p>
            </div>
            
            <div className="card-header-tools">

                <button className="btn btn-success" 
                    onClick={() => {
                        alert("CLICKED")
                    }}
                >
                    <i className="mdi mdi-plus-circle"></i>
                    <span>New project</span>
                </button>   

            </div>
        </div>
    )
}
export default ProjectsBodyHeader