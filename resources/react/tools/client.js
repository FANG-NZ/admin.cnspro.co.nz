// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
import PubSub from 'pubsub-js'
import {EVENT_LOADING_SPINNER} from './loading-spinner/loading-spinner'

export async function Client(endpoint, { body, ...customConfig } = {}) {

  //define the default header
  let _headers = { 'Content-Type': 'application/json' }
  let _showloading = true
  let _is_upload_file = false

  if('is_show_loading' in customConfig){
    _showloading = customConfig.is_show_loading
    delete customConfig.is_show_loading
  }

  //To reset header to upload file
  if('is_upload_file' in customConfig && customConfig.is_upload_file){
    //_headers = {"Content-Type": "multipart/form-data"}
    _headers = {}
    _is_upload_file = true
    delete customConfig.upload_file
  }

  //To setup config
  const config = {
    ...customConfig,
    headers: {
      ..._headers,
      ...customConfig.headers,
    },
  }

  if(body && !_is_upload_file) {
      config.body = JSON.stringify(body)
  }else{
    config.body = body
  }

  //To check if we need to show loading
  if(_showloading){
    //trigger show loading spinner
    PubSub.publish(EVENT_LOADING_SPINNER, true)
  }

  let data
  try {
    const response = await window.fetch(endpoint, config)
    data = await response.json()

    if (response.ok) {
      return data
    }

    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject({message: data.message})
  }finally{
    //To check if we need to show loading
    if(_showloading){
      //trigger hide loading spinner
      PubSub.publish(EVENT_LOADING_SPINNER, false)
    }
  }
}

Client.get = function (endpoint, customConfig = {}) {
  return Client(endpoint, { ...customConfig, method: 'GET' })
}

Client.post = function (endpoint, body, customConfig = {}) {
  return Client(endpoint, { ...customConfig, method: 'POST', body })
}

Client.put = (endpoint, body, customConfig = {}) => {
  return Client(endpoint, {...customConfig, method: "PUT", body})
}

Client.delete = (endpoint, body, customConfig = {}) => {
  return Client(endpoint, {...customConfig, method: "DELETE", body})
}
  