// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
import {show as showLoading , hide as hideLoading} from './loading-spinner/loading-spinner-slice'

export async function Client(endpoint, { body, ...customConfig } = {}) {

  //define the default header
  let _headers = { 'Content-Type': 'application/json' }
  let _showloading = false
  let _store
  let _is_upload_file = false

  if('store' in customConfig){
    _showloading = true
    _store = customConfig.store
    delete customConfig.store
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

    console.log(body)

    config.body = body
  }

  //To check if we need to show loading
  if(_showloading){
    _store.dispatch(showLoading())
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
      _store.dispatch(hideLoading())
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
  