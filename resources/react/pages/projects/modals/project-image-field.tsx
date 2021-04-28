import React from 'react'
import type {TProjectItem} from '../../../types/project-item.type'
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading'


/**
 * TODO
 * define the image item
 * @param param0 
 * @returns 
 */
const ProjectImageItem:React.FC<{image:{id:number, name:string, parent_id:number, url:string}}> 
    = ({image}):JSX.Element => {

    return(
        <div className="col-4">
            {/* <div className={`image-box ${image.is_uploading?'uploading': null}`}> */}
            <div className="image-box">
                <img src={image.url} />

                <button className="btn btn-icon btn-danger"
                    onClick={() => {
                        alert("Image remove clicked")
                    }}
                >
                    <i className="mdi mdi-delete-forever"></i>
                </button>

                {/* {image.is_uploading && 
                    <div className="ff-loader-container">
                        <div className="ff-loader"></div>
                    </div>
                } */}
            </div>
        </div>
    )
}


/**
 * TODO
 * define the project image field
 * @param param0 
 * @returns 
 */
const ProjectImageField:React.FC<{project:TProjectItem}> = ({project}):JSX.Element => {

    /**
     * Function is to handle image selected
     * @param images 
     */
    const onHandleChange = (images:ImageListType):void => {
        alert('handle image uploaded')
    }


    return(
        <div className="col-image_fields">
            <div className="image-upload">
                <ImageUploading
                    value={[]}
                    onChange={onHandleChange}
                    dataURLKey="data_url"
                    maxFileSize={3145728}
                >     
                    {({  
                        onImageUpload,
                        isDragging,
                        dragProps,
                        errors
                    }) => (

                        // START drop button
                        <button
                            className="dropzone"
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            <div className="dz-message">
                                <i className="mdi mdi-cloud-upload text-muted"></i>
                                <h3>Drop files or click to upload</h3>
                            </div>

                            {errors && 
                                <span className="alert alert-danger">
                                    The file size cannot be greater than 3M
                                </span>
                            }            
                        </button>

                    )}
                </ImageUploading>
            </div>
        
            {/* START images list */}
            <div className="images-list">
                <div className="row">
                    {project.images.length === 0 
                        ? <div className="alert alert-warning col-12">
                            There is <strong>NO IMAGE</strong> found!
                        </div>
                        : project.images.map((image) => {
                            return <ProjectImageItem key={`project_image_${image.id}`} image={image} />
                        })
                    }
                </div>
            </div>
        </div>
    )   
}
export default ProjectImageField