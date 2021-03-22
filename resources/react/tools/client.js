// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
//import store from '../store'
//import {show as showLoadingSpinner , hide as hideLoadingSpinner} from '../parts/spinner/loading-spinner-slice'

export async function Client(endpoint, { body, ...customConfig } = {}) {
    const headers = { 'Content-Type': 'application/json' }

    const config = {
      showloading: true,
      method: body ? 'POST' : 'GET',
      ...customConfig,
      headers: {
        ...headers,
        ...customConfig.headers,
      },
    }
  
    if (body) {
        config.body = JSON.stringify(body)
    }
  
    //To check if we need to show loading
    // if(config.showloading){
    //   store.dispatch(showLoadingSpinner())
    // }

    let data
    try {
        const response = await window.fetch(endpoint, config)
        data = await response.json()

        if (response.ok) {
            return {status: true, data: data}
        }
        throw new Error(response.statusText)
    } catch (err) {
        //return Promise.reject(data.message)
        return Promise.reject({status: false, message: data.message})
        //return Promise.reject(err.message ? err.message : data)
    }finally{
        //To check if we need to show loading
        // if(config.showloading){
        //   store.dispatch(hideLoadingSpinner())
        // }
    }
  }
  
  Client.get = function (endpoint, customConfig = {}) {
    return Client(endpoint, { ...customConfig, method: 'GET' })
  }
  
  Client.post = function (endpoint, body, customConfig = {}) {
    return Client(endpoint, { ...customConfig, body })
  }

  Client.put = (endpoint, body, customConfig = {}) => {
    return Client(endpoint, {...customConfig, method: "PUT", body})
  }

  Client.delete = (endpoint, body, customConfig = {}) => {
    return Client(endpoint, {...customConfig, method: "DELETE", body})
  }
  