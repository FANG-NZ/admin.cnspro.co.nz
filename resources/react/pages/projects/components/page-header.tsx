import React from 'react'

const PageHeader = ():JSX.Element => {

    return(
        <div className="page-title-box">
            <ol className="breadcrumb float-right">
                <li className="breadcrumb-item">CMS.CNSPRO</li>
            </ol>
            <h4 className="page-title">Project(s)</h4>
        </div>
    )
}
export default PageHeader