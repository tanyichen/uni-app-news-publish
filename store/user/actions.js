
export default {
    thirdLogin: async function(context, type) {
        return await new Promise((resolve, reject) => {
            var origin = false;
            switch (type) {
                case 'weixin':
                    origin = true;
                    break;
                default:
                    break;
            }
            if (origin) {
                resolve(context.dispatch(type + 'Login', type))
            } else {
                reject('不支持的登录方法')
            }

        })
    },
    weixinLogin: async function(context, type) {
        console.log('loginweixin')
        var self = this;
        return await new Promise((resolve, reject) => {
            uni.login({
                provider: type,
                success: (res) => {

                    uni.getUserInfo({
                        provider: type,
                        success: (res) => {
                            // console.log(res)
                            var userInfo = {
                                headimg: res.userInfo.avatarUrl,
                                nickname: res.userInfo.nickName,
                            }
                            context.commit('login');
                            context.commit('loginProvider', type);

                            //家里保持长期登录环境
                            context.commit('userInfo', userInfo);
                            /**
                             * 实际开发中，获取用户信息后，需要将信息上报至服务端。
                             * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
                             */
                            resolve(res)
                        }
                    });
                },
                fail: (err) => {
                    resolve(false)
                    reject(err)
                    console.error('授权登录失败：' + JSON.stringify(err));
                }
            });
        })
    }
}
