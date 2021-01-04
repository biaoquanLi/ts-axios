import Axios, { AxiosError } from '../../src/index'

// Axios({
//     method: 'get',
//     url: '/error/get1'
// }).then((res) => {
//     console.log(res)
// }).catch((e) => {
//     console.log(e)
// })

// Axios({
//     method: 'get',
//     url: '/error/get'
// }).then((res) => {
//     console.log(res)
// }).catch((e) => {
//     console.log(e)
// })

// setTimeout(() => {
//     Axios({
//         method: 'get',
//         url: '/error/get'
//     }).then((res) => {
//         console.log(res)
//     }).catch((e) => {
//         console.log(e)
//     })
// }, 5000)

// Axios({
//     method: 'get',
//     url: '/error/timeout',
//     timeout: 2000
// }).then((res) => {
//     console.log(res)
// }).catch((e: AxiosError) => {
//     console.log(e.message)
//     console.log(e.code, e.config, e.request, e.response)
// })