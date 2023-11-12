/*
 * @Author: chenyt
 * @Date: 2023-11-11 12:11:32
 * @Description: axios封装 设置token，请求时间，拦截请求，响应拦截，请求方法的封装
 */
import axios from 'axios';
import QS from 'qs';
import { ElMessage } from 'element-plus';
import { errorCodeType } from './error-code-types.ts';

const token = localStorage.getItem('token');

// 环境切换
if(process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = ''
}else if(process.env.NODE_ENV === 'development') {
    // axios.defaults.baseURL = 'http://localhost:3000' // 本地node-ts的接口
    axios.defaults.baseURL = 'http://175.178.222.176:9199' // 辩论队系统的接口
}
// 请求超时
axios.defaults.timeout = 10000;

// 请求拦截
axios.interceptors.request.use(
    config => {
        if(token) {
            config.headers.Authorization = token;
        }
        return config;
    }, error => {
        error.data = {
            code: 500,
            message: errorCodeType(500)
        };
        return Promise.reject(error);
    }
)
// 响应拦截
axios.interceptors.response.use(
    response => {
        if(response.status === 200) {
            return Promise.resolve(response);
        } else {
            ElMessage({
                message: errorCodeType(response.status),
                type: 'error',
                showClose: true
            })
            return Promise.reject(response)
        }
    },
    error => {
        if(error.response.status) {
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
            return Promise.reject(error.response);
        }
    }
)

/**
 * get方法 对应get请求
 */
export function get(url: string, params: any) {
    return new Promise((resolve,reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    })
}

/**
 * post方法
 */
export function post(url: string, data: object) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(data))
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err.data)
        })
    })
}