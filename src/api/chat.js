import request from "@/api/index";

// 获取在线用户
export function getOnlineUserList(username) {
    return request({
        url: '/chat/getOnlineUserList/' + username,
        method: 'get'
    })
}

// 获取聊天记录
export function getMsgData(fromName, toName) {
    let param = new FormData();
    param.append('fromName', fromName);
    param.append('toName', toName);
    return request({
        url: '/chat/getMsgData',
        method: 'post',
        data: param
    })
}