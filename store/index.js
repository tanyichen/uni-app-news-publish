import Vue from 'vue'
import Vuex from 'vuex'


import user from "./user"

import yc_js from '../common/yc_js/index.js'
import yc from '../common/yc_js/index.js'
// const yc=yc_js;
Vue.use(Vuex)

     var storeA={
         state:{},
         getters:{},
         actions:{},
         mutations:{}
     };
     // Object.assign(storeA.state,user.state,win.state,websocket.state);
     for (let i in storeA) {
         Object.assign(storeA[i],user[i]);
         // Object.assign(storeA[i],user[i],win[i],websocket[i]);
     }
     // console.log(storeA)

const store = new Vuex.Store(storeA)

export default store