// 模拟数据请求部分 ————————————————————————————————————————————————————————————————————
// import ceshiData from './data/index.js';//测试数据代替远程服务器的请求返回数据
var ceshiData={}
import API from './api.js';
var runLocal=false;//是否运行模式 本地测试数据=true。非本地=false
import store from '../store/index.js'
import yc_js from "../common/yc_js/index.js"
var Time=yc_js.Time;
var Md5=yc_js.Md5;
var Id=yc_js.Id;
var Json=yc_js.Json;
var YKID=Id.Id();//游客的ID
var YKTOKEN=Id.Id();//游客的token
var Base64 = yc_js.Base64
// 设置请求apiName对应的请求参数
var apiObj =API;
if(runLocal){
	apiObj=ceshiData	
}

/**
 * 修补请求方法 发请求前自动根据需求添加token
 * urlName			string 		请求地址 name
 * successFun 		function 	请求成功回调函数；
 * dataObj			object		请求参数数据requeObj.data
 * requeObj			object		请求参数全部参数(含 method,data,header,dataType,responseType,fail等更多) 
 */
function ajax(apiNameStr,requeObj){
        // 请求密钥
    function configure() {
        var time = Time.toTimestamp(10);
        // console.log(store.getters)
        var token=store.getters.token || {};
        if(typeof token !='object' || !token.token){
            token.token=YKTOKEN;
            
        }
        var uid=token.uid || YKID;
        // source=store.getters.source
        return  uid+'.'+token.token+'.'+ store.getters.source
    }
    
    // console.log(requeObj)
	var apiNameStr=apiNameStr || "index";

	var requeObj =requeObj || {};
	var Obj=apiObj[apiNameStr];

	 return new Promise((resolve, reject) => {
	if(Obj){
         for (let i in Obj) {
            if (typeof requeObj[i] === 'object') {
                requeObj[i] = Object.assign(Obj[i], requeObj[i])
            } else {
                requeObj[i] = Obj[i];
            }
            if(typeof requeObj[i] === 'object'){
                for(let i2 in requeObj[i]){
                    if(!requeObj[i][i2]){
                        delete requeObj[i][i2];
                    }
                }
            }
            // console.log(requeObj[i])
            if (requeObj[i]['access_token']) {
                // config[i]['access_token']='101552115164859.a406e7603c4dbc29c71c8a5214696218.1553076341';
                // requeObj[i].access_token = configure();
                                // var acctoken = configure().uid + '.' + configure().token + '.' + configure().time;
                requeObj[i].access_token = Base64.urlDecoder(configure());
            }
            
        }
        requeObj.dataType=requeObj.dataType||"json";
            requeObj.success=function(res){
      
                if(requeObj.dataType=="text"){
                    var data=res.data;
                    try{
                        // 转成json对象，如果数字长度超过16位会转成字符串。防止js解析丢失精度
                        res.data=Json.getRealJsonData(res.data);
                      
                    }catch(e){
                         res.data=data;
                    }
                }
                if(res.code==441){
                    store.commit('loginOut');
                    store.commit('forcedLogin',true);
                    uni.reLaunch({
                        url: '/pages/login/login'
                    });
                }
                
                resolve(res)
            } 
            // console.log(requeObj)
           uni.request(requeObj)
// 			// 合并 用户请求参数+系统预置请求参数	
	}else{
        resolve(false)
        reject(false)
    }
    
})
}

export default ajax
// // 中断请求任务
// requestTask.abort();