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
    
    let headers;

    const _csrf = document.getElementsByName('csrf-token')[0].getAttribute('content')
    // @ts-ignore
    config.body['_token'] = _csrf
    

    //If attached file, we just need to update Content-Type
    if(attached_file){
        //headers = { 'Content-Type': 'multipart/form-data' }
        //headers = {'Content-Type': "application/x-www-form-urlencoded"}

        //To rebuild formdata
        if(config.body){
            const _formdata = new FormData()

            for (const [key, value] of Object.entries(config.body)) {
                _formdata.append(key, value)
            }
            
            config.body = _formdata
        }

    }else{
        headers = { 'Content-Type': 'application/json' };
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

    //Laravel can't handle PUT method with FormData
    //Check https://stackoverflow.com/questions/50691938/patch-and-put-request-does-not-working-with-form-data
    body._method = "PUT";

    return Client(endpoint, {...customConfig, method: "POST", body:body}, attached_file, show_loading)
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