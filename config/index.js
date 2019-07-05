// var domain='cs.01film.cn/qiye';//默认前端域名
var domain='www.01film.cn';
var websockethost='www.01film.cn:9501';//ws连接服务器地址
// var websockethost='www.01film.cn:888';//ws连接服务器地址
var chathost='www.01film.cn:8880';//处理消息服务器地址
var API='api.01film.cn';
// var domain='dt.01film.cn';
// var API=domain+'/API/public';//API服务端域名
const config={
    chathost,
    websockethost,
    appid:101552115164859,
    runLocal:false,//本地模式，不发送ajax请求服务器
    domain:domain,//前端域名
    cdn:'http://dt.01film.cn',

    userAPI:'http://'+API+'/user.php',//用戶中心接口
    API:'http://'+API+'/home.php',//服务器API接口
    fileUrl:{
        image:'http://'+API+'/upload/',//文件服务器通用地址
        media:'http://'+API+'/media/',//图片服務器地址
        file:'http://'+API+'/file/',//媒体服务器地址
    },
    //获取附件服务器的url地址 如果图片地址有http开头就直接返回如果没有将会拼接接口地址
    getFileUrl(url,type){
        var type=type || 'image';
        var fileUrl=this.fileUrl[type] || '';
        if(url && url.slice(0, 4) != "http"){
               url=fileUrl+url;
        }
        return url;
    }
}
// console.log({...config})
// export config
export default config