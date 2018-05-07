
// api调用封装
// 用户登录
export function login(param, successCallback, errorCallback) {
    post('/auth/login', param, successCallback, errorCallback, errorCallback)
}
// 退出登录
export function logout(param, successCallback, errorCallback) {
    post('/auth/logout', param, successCallback, errorCallback, errorCallback)
}