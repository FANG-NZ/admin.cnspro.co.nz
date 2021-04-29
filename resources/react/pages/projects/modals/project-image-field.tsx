import React, {useState, useEffect} from 'react'
import type {TProjectItem, TProjectImage} from '../../../types/project-item.type'
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading'
import {uploadProjectImage, deleteProjectImage} from '../slice/projects-slice'
import {useAppDispatch} from '../store/store-hook'
import { unwrapResult } from '@reduxjs/toolkit'
import {ToastState, EVENT_TOAST_BOX} from '../../../tools/toast-box/toast-box'


/**
 * TODO
 * define the image item
 * @param param0 
 * @returns 
 */
const ProjectImageItem:React.FC<{image:TProjectImage, onHandleRemove:(image:TProjectImage)=>void}> 
    = ({image, onHandleRemove}):JSX.Element => {

    return(
        <div className="col-4">
            {/* <div className={`image-box ${image.is_uploading?'uploading': null}`}> */}
            <div className="image-box">
                <img src={image.url} />

                <button className="btn btn-icon btn-danger"
                    onClick={() => {
                        onHandleRemove(image)
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

    const [images, setImages] = useState<TProjectImage[]>([])
    const _dispatch = useAppDispatch()

    //To init images in state
    useEffect(() => {
        setImages(project.images)
    },[])


    /**
     * Function is to handle add image into state
     * @param image 
     */
    const addImage = (image:TProjectImage):void => {

        //Append image at the beginning of list
        const newlist:TProjectImage[] = [image].concat(images)
        // list.unshift(image)
        setImages(newlist)
    }


    /**
     * Function is to handle remove image
     * @param image 
     */
    const removeImage = (image:TProjectImage):void => {

        _dispatch(deleteProjectImage({project_id:image.project_id, image_id:image.id}))
            .then(unwrapResult)
            .then(() => {

                //To update images state
                const newlist:TProjectImage[] = images.filter((item) => item.id !== image.id)
                setImages(newlist)

                PubSub.publish(EVENT_TOAST_BOX, {
                    'title' : "Image removed",
                    'message' : 'The image has been removed successfully',
                    'state' : ToastState.SUCCESS
                })

            })

    }


    /**
     * Function is to handle image selected
     * @param images 
     */
    const onHandleChange = (images:ImageListType):void => {
        
        const data:{[key:string]: File} = {}
        if(images[0]['file'])
            data['image'] = images[0]['file']

        _dispatch(uploadProjectImage({id:project.id, values:data as any}))
            .then(unwrapResult)
            .then(result => {

                addImage(result as TProjectImage)

                PubSub.publish(EVENT_TOAST_BOX, {
                    'title' : "Image uploaded",
                    'message' : 'The image has been uploaded successfully',
                    'state' : ToastState.SUCCESS
                })

            })
    }


    return(
        <div className="col-image_fields">
            <div className="image-upload">
                <ImageUploading
                    value={[]}
                    onChange={onHandleChange}
                    dataURLKey="data_url"
                    maxFileSize={3145728} //3M size of file
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
                    {images.length === 0 
                        ? <div className="alert alert-warning col-12">
                            There is <strong>NO IMAGE</strong> found!
                        </div>
                        : images.map((image) => {
                            return <ProjectImageItem 
                                        key={`project_image_${image.id}`} 
                                        image={image} 
                                        onHandleRemove={removeImage}
                                />
                        })
                    }
                </div>
            </div>
        </div>
    )   
}
export default ProjectImageField