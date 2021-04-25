import PubSub from 'pubsub-js'
import {EVENT_LOADING_SPINNER} from './loading-spinner/loading-spinner'
/**
 * TODO
 * deifne the client 
 * @param endpoint 
 * @param config 
 * @param body 
 * @returns 
 */
export async function Client<T>(
    endpoint:string, 
    config:RequestInit,
    //Flag to indicate if there is file attached 
    attached_file:boolean = false,
    show_loading:boolean = true
):Promise<T> {
    
    let headers = { 'Content-Type': 'application/json' };

    //If attached file, we just need to update Content-Type
    if(attached_file){
        headers = { 'Content-Type': 'multipart/form-data' }
    }else{
        config.body = JSON.stringify(config.body)
    }

    //To rebuild config
    const _config:RequestInit = {
        ...config,
        headers: {
            ...headers,
            ...config.headers
        }
    }


    //To trigger show loading icon event
    if(show_loading){
        PubSub.publish(EVENT_LOADING_SPINNER, true)
    }


    let data;
    //Try to make request
    try{
        const response = await window.fetch(endpoint, _config)
        data = await response.json()

        if (response.ok) {
            return data
        }

        throw new Error(response.statusText)

    }catch(error)
    {
        return Promise.reject({message: data.message})
    }finally
    {
        if(show_loading){
            PubSub.publish(EVENT_LOADING_SPINNER, false)
        }
    }

}

/**
 * define the GET method
 * @param endpoint 
 * @returns 
 */
Client.get = (endpoint:string, customConfig:RequestInit = {}, show_loading:boolean = true) => {
    return Client(endpoint, {...customConfig, method:'GET'}, false, show_loading)
}

/**
 * define the POST method
 * @param endpoint 
 * @param body 
 * @param customConfig 
 * @returns 
 */
Client.post = (
    endpoint:string, 
    body:any, 
    attached_file:boolean = false, 
    customConfig:RequestInit = {},
    show_loading:boolean = true
) => {
    return Client(endpoint, {...customConfig, method: "POST", body:body}, attached_file, show_loading);
}

/**
 * define the PUT method
 * @param endpoint 
 * @param body 
 * @param attached_file 
 * @param customConfig 
 * @param show_loading 
 */
Client.put = (
    endpoint:string, 
    body:any, 
    attached_file:boolean = false, 
    customConfig:RequestInit = {},
    show_loading:boolean = true
) => {
    return Client(endpoint, {...customConfig, method: "PUT", body:body}, attached_file, show_loading)
}


/**
 * define the PUT method
 * @param endpoint 
 * @param body 
 * @param attached_file 
 * @param customConfig 
 * @param show_loading 
 */
 Client.delete = (
    endpoint:string, 
    body?:any, 
    customConfig:RequestInit = {},
    show_loading:boolean = true
) => {
    return Client(endpoint, {...customConfig, method: "DELETE", body:body}, false, show_loading)
}