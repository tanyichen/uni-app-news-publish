import yc_js from '../../common/yc_js/index.js'
export default {

    pages(state) {
        return state.pages
    },
    // 好友列表
    friend(state) {
        return state.friend;
    },
    source(state) {
        return state.source;
    },
    loginProvider(state) {
        return state.loginProvider;
    },
    forcedLogin(state) {
        return state.forcedLogin;
    },
    longLogin(state) {
        if (state.hasLogin) {
            return state.longLogin;
        } else {
            var longLogin = yc_js.Storage.Sync.get('longLogin') || false;
            // this.commit('longLogin', longLogin)
            return longLogin;
        }
    },
    hasLogin(state) {
        return state.hasLogin || yc_js.Storage.Sync.get('hasLogin') || false;
    },
    token(state) {
        if (state.hasLogin) {
            return state.token;
        } else if (state.longLogin) {
            var token = yc_js.Storage.Sync.get('token') || state.token;

            return token;
        } else {
            // return  yc_js.Storage.Session.get('token') || state.token;
        }
    },
    message(state) {
        return state.message;
    },
    userInfo(state) {
        if (state.hasLogin) {
            return state.userInfo;
        } else if (state.longLogin) {
            return yc_js.Storage.Sync.get('userInfo') || state.userInfo;
        } else {
            // return  yc_js.Storage.Session.get('userInfo')|| state.userInfo;
        }
    },
    addressAll(state) {
        // console.log(yc_js.Storage.Sync.get('addressAll'))
        return state.addressAll ? state.addressAll : yc_js.Storage.Sync.get('addressAll');
    },
    historyLogin(state) {
        if (state.historyLogin) {
            return state.historyLogin
        } else {
            return yc_js.Storage.Sync.get('historyLogin') || [];
        }

    }

}
