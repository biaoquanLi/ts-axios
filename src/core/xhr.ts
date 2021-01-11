import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types/index'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout, cancelToken } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
      resolve(response)
    }

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }
    request.onerror = () => {
      reject(createError('Network Error', config, null, request))
    }

    if (timeout) {
      request.timeout = timeout
      request.ontimeout = () => {
        reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
      }
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
    function handleResponse(res: AxiosResponse) {
      if (res.status >= 200 && res.status < 300) {
        resolve(res)
      } else {
        reject(
          createError(`Request failed with status code ${res.status}`, config, null, request, res)
        )
      }
    }
  })
}
