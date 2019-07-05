import {
    Storage
} from '../../common/yc_js/index.js'
import stateDefault from '../state.js'
// console.log(yc_js)
import config from '../../config'

export default {

    pages(state, pageName) {
        var pages = this.getters.pages || [];
        var pageUp = [pageName];
        if (pages.length > 10) {
            for (var i = 0; i < 10; i++) {
                pageUp.push(pages[i])
            }

        } else {
            pageUp = pages;
            pageUp.unshift(pageName)
        }

        this.commit('update', {
            pages: pageUp
        })
    },
    update(state, Obj) {

        for (let key in Obj) {
            if (typeof Obj[key] == 'object') {
                // console.log(Obj[key])
                if (typeof(Obj[key].length) == 'number') {
                    state[key] = Obj[key]
                } else {
                    state[key] = Object.assign({}, Obj[key]);
                }
            } else {
                state[key] = Obj[key]
            }
        }
        // console.log(state.msg)
    },
    friend(state, val) {
        // console.log(val)
        state.friend = null;
        state.friend = val
    },
    forcedLogin(state, val) {
        state.forcedLogin = val
    },
    longLogin(state, sate) {
        var sate = sate || true;
        Storage.Sync.set('longLogin', sate);
        state.longLogin = sate;
    },
    historyLogin(state, val) {
        // console.log(stateDefault)
        // return;
        var historyLogin = Storage.Sync.get('historyLogin') || [];
        // console.log(historyLogin)
        var lastuid = null;
        if (typeof historyLogin == 'object' && historyLogin.length) {
            lastuid = historyLogin[0].uid || null;
        }
        // console.log([lastuid, val])
        // if (lastuid != val.uid) {
        console.log('chear')
        // Storage.clear(); //清空缓存
        Storage.clear(); //清空缓存
        // 如果上次登录的用户id不等于当前登录的用户id 
        this.commit('clear'); //清除上次登录的缓存信息
        // Storage.init();
        console.log(this.getters)
        // }
        var val2 = [val];
        for (let i in historyLogin) {
            if (historyLogin[i].username != val.username) {
                val2.push(historyLogin[i])
            }
        }
        var data = [];

        if (val2.length > 5) {
            for (var i = 0; i < 5; i++) {
                data.unshift(val2[i])
            }
        } else {
            data = val2
        }
        state.historyLogin = data;
        // console.log(state.historyLogin);
        Storage.Sync.set('historyLogin', data);
    },
    login(state, historyLogin) {


        Storage.Sync.set('hasLogin', true);
        state.hasLogin = true;
        // console.log(state)
    },
    userInfo(state, val) {
        // console.log(state.userInfo)
        if (val.headimg) {
            val.headimg = config.getFileUrl(val.headimg);
        }
        let data = Object.assign({}, state.userInfo, val);
        state.userInfo = data;

        Storage.Sync.set('userInfo', data);
    },
    
    clear(state) {
        // Storage.clear(); //清空缓存
        state.msgList = null;
        state.chat = null;
        state.token = null;
        state.userInfo = null;
    },
    logOut(state) {
        Storage.Sync.set('hasLogin', false);
        this.commit('clear')
        state.hasLogin = false;
        this.commit('socketClose')
    },
    loginProvider(state, val) {
        state.loginProvider = val;
    },
    token(state, val) {
        state.token = val;
        if (state.longLogin) {

            Storage.Sync.set('token', val);
        } else {
            // Storage.Session.set('token',val);
        }
    },
    addressAll(state, val) {
        state.addressAll = val;
        Storage.Sync.set('addressAll', val);
    },
    isLogin(state) {

        var self = this;
        var hasLogin = state.hasLogin;
        // console.log(context)
        if (!hasLogin) {
            uni.showModal({
                title: "您还未登陆,立即登陆?",
                content: "请登陆后进行访问",
                success(e) {
                    if (e.confirm) {
                        //登陆
                        uni.navigateTo({
                            url: '../login/login'
                        })
                    } else {
                        self.commit('logOut', "退出")
                        console.log("放弃登陆")
                    }
                }
            })
            return false;
        } else {
            return true
        }

    }


}
