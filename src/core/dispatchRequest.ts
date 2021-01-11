import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types/index'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { falttenHeaders, processHeaders } from '../helpers/headers'
import transform from './transform'
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  //   config.headers = transformRequestHeaders(config)
  //   config.data = transformRequestData(config)
  config.headers = falttenHeaders(config.headers, config.method!)
}
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
function transformRequestHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  //   res.data = transformResponse(res.data)
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
