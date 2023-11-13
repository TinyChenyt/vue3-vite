/*
 * @Author: TinyChen 2454046178@qq.com
 * @Date: 2023-11-13 09:42:34
 * @LastEditors: TinyChen 2454046178@qq.com
 * @LastEditTime: 2023-11-13 16:10:31
 * @FilePath: \vue3-vite\src\utils\request.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict';

import axios, { AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import { errorCodeType } from './error-code-types';
import router from '@/router'

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: '/',
    timeout: 10000,
})

// 根据环境切换路径
if (process.env.NODE_ENV === 'production') {
    axiosInstance.defaults.baseURL = '';
} else if (process.env.NODE_ENV === 'development') {
    // axiosInstance.defaults.baseURL = 'http://localhost:3000' //本地的node服务
    axiosInstance.defaults.baseURL = 'http://175.178.222.176:9199' // 服务器接口
}

/**
 * 防止重复请求思路：
 * 建立一个请求队列，请求队列接收参数：请求的key值和一个控制器
 * 每次请求都在请求拦截里检测key值是否已经存在在请求队列
 * 请求key值：
 * 通过请求的方法，路径，参数进行生成
 */
// 请求队列
const requestQueue = new Map();
// 获取请求key值
const getRequestKey = (config: AxiosRequestConfig<any>): string => {
    let { url, method, data, params } = config;

    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        } catch (e) { }
    }
    const requestStr = `${method}_${url}_${params ? JSON.stringify(params) : JSON.stringify(data)}`;
    // // 设置请求key 通过md5加密
    const requestKey = btoa(encodeURIComponent(requestStr).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        // return String.fromCharCode(p1);
        return String.fromCharCode(parseInt('0x' + p1));
    }));

    return requestKey;
}

// 关闭全部请求
const cancelAllRequest = () => {
    requestQueue.forEach((controller: AbortController) => {
        controller.abort();
    });

    requestQueue.clear();

    return 'ok';
}

// 请求拦截
axiosInstance.interceptors.request.use((config) => {
    if (token) {
        config.headers.Authorization = "Bearer " + token
    }
    // const { allowDuplicateRequest = true } = config;
    // if(allowDuplicateRequest) {
    //     return config;
    // }
    // if(config.url === 'user/image') {
    //     config.responseType = 'blod';
    // }
    const requestKey = getRequestKey(config);
    const controller = new AbortController();
    config.signal = controller.signal;
    if (requestQueue.has(requestKey)) {
        controller.abort();
    } else {
        requestQueue.set(requestKey, controller);
    }
    return config;
}, error => {
    error.data = {
        code: 500,
        message: errorCodeType(500),
    };
    return Promise.reject(error);
})

// 响应拦截
axiosInstance.interceptors.response.use(
    response => {
        const config = response.config;
        const requestKey = getRequestKey(config);
        requestQueue.delete(requestKey);
        // const { restoreDataFormat = true, successText, errorText } = config;
        const { statusCode: code, msg, data } = response.data;
        // console.log(response,"code");
        if (code === 401) {
            cancelAllRequest();
            // 跳转回登录页
            router.push({
                path: '/login'
            })
        }
        if (code === 20000 || response.status === 200) {
            ElMessage({
                message: '请求成功',
                type: 'success',
            });
        } else {
            ElMessage({
                message: errorCodeType(code),
                type: 'error',
            })
            return Promise.reject(msg)
        }
        if(!data) {
            return response
        }
        return data;
    },
    error => {
        const config = error.config;
        if (error.message.indexOf('timeout') !== -1) {
            ElMessage({
                message: '请求超时',
                type: 'error',
            });
        }
        if (error.message.indexOf('timeout') !== -1 && config.method === 'get') {
            const requestKey = getRequestKey(config);
            requestQueue.delete(requestKey);
        }
        if (error.response.status) {
            switch (error.response.status) {
                case 401:
                    ElMessage({
                        message: errorCodeType(error.response.status),
                        type: 'error'
                    });
                    // 重定向回登录页
                    break;
                case 403:
                    ElMessage({
                        message: errorCodeType(error.response.status),
                        type: 'error'
                    });
                    // 清除token
                    break;
                case 404:
                    ElMessage({
                        message: errorCodeType(error.response.status),
                        type: 'error'
                    });
                    break;
                default:
                    ElMessage({
                        message: errorCodeType(error.response.status),
                        type: 'error'
                    });
            }
        }
        return Promise.reject(error);
    }
)

// 基础请求
const baseRequest = (config: AxiosRequestConfig<any>) => {
    return axiosInstance(config);
}

const get = (url: string, params?: object, config?: AxiosRequestConfig<any>) => {
    const newConfig = Object.assign({}, {
        method: 'get',
        url,
        params
    },config);

    return baseRequest(newConfig);
}

const getImg = (url: string, config?: AxiosRequestConfig<any>) => {
    const newConfig = Object.assign({}, {
        method: 'get',
        url,
        responseType: 'blob',
    }, config)

    return baseRequest(newConfig);
}

export default {
    axiosInstance,
    get,
    getImg,
    cancelAllRequest
}