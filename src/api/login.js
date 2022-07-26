import request from "@/api/index";

// 获取验证码
export function getCodeImg() {
    return request({
        url: '/system/getCodeImg',
        method: 'get'
    })
}

// 登录方法
export function login(username) {
    let data = new FormData();
    data.append('username', username);
    data.append('dept', "我是" + username);
    return request({
        url: '/login',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: data
    })
}

// 登出
export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    })
}

// 注册
export function register(user) {
    return request({
        url: '/user/register',
        method: 'post',
        data: user
    })
}


// 检查token
export function checkToken() {
    return request({
        url: '/system/checkToken',
        method: 'get'
    })
}
