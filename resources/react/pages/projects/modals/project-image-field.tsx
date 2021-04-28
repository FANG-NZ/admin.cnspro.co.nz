import React from 'react'
import type {TProjectItem} from '../../../types/project-item.type'
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading'

const ProjectImageField:React.FC<{project:TProjectItem}> = ({project}):JSX.Element => {


    const onHandleChange = (images:ImageListType):void => {

    }


    return(
        <div className="col-image_fields">
            <div className="image-upload">
                <ImageUploading
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
        </div>
    )
}
export default ProjectImageField