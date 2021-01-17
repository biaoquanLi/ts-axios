import JasmineCore from 'jasmine-core'
// @ts-ignore
global.getJasmineRequireObj = function () {
    return JasmineCore
}
require('jasmine-ajax')