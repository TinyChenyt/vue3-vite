export const errorCodeType = function(code: number): string {
    let errMessage = "未知错误"
    switch (code) {
        case 400:
            errMessage = "请求错误"
            break
        case 401:
            errMessage = "未授权，请重新登录"
            break
        case 403:
            errMessage = "拒绝访问"
            break
        case 404:
            errMessage = "请求错误，未找到该资源"
            break
        case 405:
            errMessage = "请求方法未允许"
            break
        case 408:
            errMessage = "请求超时"
            break
        case 500:
            errMessage = "服务器内部错误"
            break
        case 501:
            errMessage = "服务未实现"
            break
        case 502:
            errMessage = "网关错误"
            break
        case 503:
            errMessage = "服务不可用"
            break
        case 504:
            errMessage = "网关超时"
            break
        case 505:
            errMessage = "HTTP版本不受支持"
            break
        default:
            errMessage = `其他链接错误 -- ${code}`
            break
    }
    return errMessage
}