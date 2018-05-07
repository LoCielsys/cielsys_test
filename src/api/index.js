import Vue from 'vue'
//import { vm } from '../../main'
import { Message } from 'element-ui'
import axios from 'axios'
import store from '../store'
import router from '../router'
// 引入去抖
import debounce from 'throttle-debounce/debounce';

// 新实例化vue
let new_vue = new Vue()
// 请求去抖延时周期，毫秒
new_vue.debounce = 500
// post 请求是否在请求中
new_vue.postRequesting = false

axios.defaults.timeout = 120000
// axios.defaults.baseURL = "http://lanhanba.net/api"
// axios.defaults.baseURL = "http://localhost/LinhuibaServer/public/api"
axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.maxContentLength = 102400
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        // 用户已登录，添加token信息到header
        if (store.state.token) {
            config.headers.Authorization = 'bearer' + store.state.token
            // 其他调用处理
        }

        if(config.configParams){
            // 版本号，默认为空，版本号为v1
            if(config.configParams.version){
                config.headers.Accept = 'application/vnd.linhuiba.' + config.configParams.version +'+json'
            }
        }

        // get请求时，过滤并移除空值参数
        if(config.method.toUpperCase() == "GET"){
            let data = config.params
            for (let item in config.params) {
                if(data[item] === ""){
                    Reflect.deleteProperty(data, item)
                }
            }
        }

        return config
    }
)

// http response 拦截器
axios.interceptors.response.use (
    response => {
        // 对response做判断，如果错误提示错误消息
        if (response.data.code == -99) {
            store.commit('LOGOUT')
            router.go(0)
        }
        return response
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                // 401 token失效
                case 401:
                    store.commit("LOGOUT")
                    router.push({
                        name: 'login',
                        query: { redirect : router.currentRouter.fullPath }
                    })
                    Message({
                        message: 'token已失效，请重新登录',
                        type: 'error'
                    })
            }
        }
    }
)

// 去抖延迟事件
new_vue.debouncedRequest = debounce(new_vue.debounce, callback => {
    callback()
})

// 如果返回验证消息，那么显示验证消息
function showValidator(response){
    let create_element = new_vue.$createElement;

    let arr_result = new Array()
    if(response.data.result){
        for(let item in response.data.result){
            if(response.data.result[item]){
                arr_result.push(create_element('div', { style: 'color: #eb9e05' }, response.data.result[item]))
            }
        }
    }
    else if(response.data.msg){
        if(typeof response.data.msg == "string"){
            arr_result.push(create_element('div', { style: 'color: #eb9e05' }, response.data.msg))
        }
        else if(typeof response.data.msg == "array" || typeof response.data.msg == "object"){
            for(let item in response.data.msg){
                if(response.data.msg[item] && response.data.msg[item][0]){
                    arr_result.push(create_element('div', { style: 'color: #eb9e05' }, response.data.msg[item][0]))
                }
            }
        }
    }
    Message({
        message: create_element('p', null, arr_result),
        type: 'warning',
        duration: 8000
    })
}

function post (url, param, successCallback, errorCallback, networkErrorCallback, configParams) {
    // post请求时进行去抖延迟，即默认300ms之后才能再次请求
    new_vue.debouncedRequest(() => {
        // 延迟结束后postRequesting = false，可以再次请求
        new_vue.postRequesting = false
    })
    if(new_vue.postRequesting){
        Message({
            type: 'warning',
            message: (new_vue.debounce / 1000) + 's内请勿重复请求'
        })
        if (errorCallback) {
            errorCallback((new_vue.debounce / 1000) + 's内请勿重复请求')
        }
        return false
    }
    else{
        new_vue.postRequesting = true
        axios.post(url, param, {
            configParams: configParams
        })
        .then(response => {
            if (response.data.code == 1) {
                if (successCallback) {
                    successCallback(response.data.result)
                }
            }
            else if(response.data.code == -1002){
                showValidator(response)
                if (errorCallback) {
                    errorCallback(response.data)
                }
            }
            else {
                Message({
                    message: response.data.msg,
                    type: 'error'
                })
                if (errorCallback) {
                    errorCallback(response.data)
                }
            }
        })
        .catch(error => {
            Message({
                type: 'error',
                message: url + ':网络连接失败'
            })
            if (networkErrorCallback) {
                networkErrorCallback(error)
            }
        })
    }
}

function get (url, param, successCallback, errorCallback, networkErrorCallback, configParams) {
    axios.get(url, {
        params: param,
        configParams: configParams
    })
    .then(response => {
        if (response.data.code == undefined) {
            if (successCallback) {
                successCallback(response.data)
            }
        } else if (response.data.code == 1) {
            if (successCallback) {
                successCallback(response.data.result)
            }
        }
        else if(response.data.code == -1002){
            showValidator(response)
            if (errorCallback) {
                errorCallback(response.data)
            }
        }
        else {
            Message({
                message: response.data.msg,
                type: 'error'
            })
            if (errorCallback) {
                errorCallback(response.data)
            }
        }
    })
    .catch(error => {
        Message({
            type: 'error',
            message: url + ':网络连接失败'
        })
        if (networkErrorCallback) {
            networkErrorCallback(error)
        }
    })
}

function put (url, param, successCallback, errorCallback, networkErrorCallback, configParams) {
    axios.put(url, {
        params: param,
    }, {
        configParams: configParams,
    })
    .then(response => {
        if (response.data.code == undefined) {
            if (successCallback) {
                successCallback(response.data)
            }
        } else if (response.data.code == 1) {
            if (successCallback) {
                successCallback(response.data.result)
            }
        }
        else if(response.data.code == -1002){
            showValidator(response)
            if (errorCallback) {
                errorCallback(response.data)
            }
        }
        else {
            Message({
                message: response.data.msg,
                type: 'error'
            })
            if (errorCallback) {
                errorCallback(response.data)
            }
        }
    })
    .catch(error => {
        Message({
            type: 'error',
            message: '网络连接失败'
        })
        if (networkErrorCallback) {
            networkErrorCallback(error)
        }
    })
}

function remove (url, param, successCallback, errorCallback, networkErrorCallback, configParams) {
    axios.delete(url, {
        params: param,
        configParams: configParams,
    })
    .then(response => {
        if (response.data.code == undefined) {
            if (successCallback) {
                successCallback(response.data)
            }
        } else if (response.data.code == 1) {
            if (successCallback) {
                successCallback(response.data.result)
            }
        } else {
            Message({
                message: response.data.msg,
                type: 'error'
            })
            if (errorCallback) {
                errorCallback(response.data)
            }
        }
    })
    .catch(error => {
        Message({
            type: 'error',
            message: '网络连接失败'
        })
        if (networkErrorCallback) {
            networkErrorCallback(error)
        }
    })
}

// 接口为put时，接口接收参数格式为地址参数格式
function jsonToUrlQuery(param){
    let par = ""
    for(let value in param){
        par += value + "=" + param[value] + "&"
    }
    par = par.substring(0, par.length - 1)
    return par
}

// api调用封装
// 用户登录
export function login(param, successCallback, errorCallback) {
    post('/auth/login', param, successCallback, errorCallback, errorCallback)
}
// 退出登录
export function logout(param, successCallback, errorCallback) {
    post('/auth/logout', param, successCallback, errorCallback, errorCallback)
}


import * from './login'