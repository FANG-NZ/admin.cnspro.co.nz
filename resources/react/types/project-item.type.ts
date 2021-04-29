/**
 * define the TYPE od project image
 */
 export type TProjectImage = {
    id: number,
    name: string,
    project_id: number,
    url: string
}


/**
 * define the TYPE of project item
 */
export type TProjectItem = {
    id: number,
    title: string,
    street: string,
    city: string,

    is_new: boolean,

    bathrooms: string,
    bedrooms: string,
    livingrooms: string
    carpark: string
    land_area: string
    floor_area: string

    short_description: string
    description: string

    completed_on: string
    created_at:string

    images: Array<TProjectImage>
}