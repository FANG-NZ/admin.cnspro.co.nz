import React, { ReactHTMLElement } from 'react'


const PageHeader:React.FC = ():JSX.Element => {
    return(
        <div className="page-title-box">
            <ol className="breadcrumb float-right">
                <li className="breadcrumb-item">CMS.CNSPRO</li>
            </ol>
            <h4 className="page-title">Project</h4>
        </div>
    )
}
export default PageHeader