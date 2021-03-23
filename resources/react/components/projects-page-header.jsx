import React from 'react'

const ProjectsPageHeader = () => {

    return(
        <React.Fragment>
            <div className="card-header-content">
                <h4 className="m-t-0 header-title">New projects</h4>
                <p className="text-muted font-13">
                    There is ONLY for all NEW PROJECTS, if you want to see all projects click <a href="#">All projects</a>
                </p>
            </div>
            
            <div className="card-header-tools">
                <button className="btn btn-success">
                    <i className="mdi mdi-plus-circle"></i>
                    <span>New project</span>
                </button>   
            </div>
        </React.Fragment>
    )
}

export default ProjectsPageHeader