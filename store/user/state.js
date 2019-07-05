export default {

    pages: [], //页面栈
    longLogin: true, //是否保持长登录状态//存入本地缓存。短登录仅存入session的临时缓存
    hasLogin: false, //登陆状态 是否已登录
    historyLogin: null, //历史登录账号
    forcedLogin: false, //是否强制登录
    loginProvider: "weixin", //登陆方式 如 微信

    source: "app", //登录设备标识
    token: {
        token: '',
        expires: 0
    },
    // msg: 0, //未读消息数量
    addressAll: null, //全部收货地址
    // 用户信息
    userInfo: {
        nickname: "未登录",
        headimg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555143304700&di=4c3a6f8700135d7f120a430414600417&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201305%2F15%2F20130515204443_cSZzP.thumb.700_0.png",
        id: Date.now(),
        individuality: "爱你一万年",
        address: "北京市西城区中南海大院1号",
        address_id: "",
        sex: "男",
        area: "北京-北京-东城区"
    },
    //好友列表
    friend: {

    }

}
