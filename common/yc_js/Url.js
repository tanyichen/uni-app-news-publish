// console.log(urlEncode(arr||obj).slice(1))//调用
function objToUrl(param) {
    var paramStr = '';
		if(param instanceof Array){
			 for (let i=0; i< param.length;i++) {
				 for (var p in param[i]) {
				 	paramStr += p+'='+param[i][p]+'&';
				 }	
			 }
		}else if(param instanceof Object){
			for (var p in param) {
				paramStr += p+'='+param[p]+'&';
			}	
		}
		paramStr = paramStr.substring(0, paramStr.lastIndexOf('?'));
    return paramStr ;

}
function urlToObj(str){
　　var obj = {};
　　var arr1 = str.split("?");
　　var arr2 = arr1[1].split("&");
　　for(var i=0 ; i < arr2.length; i++){
　　　　var res = arr2[i].split("=");
　　　　obj[res[0]] = res[1];
　　}
　　return obj;
}
  export default {
    // CusBASE64: __BASE64,
	objToUrl:objToUrl,//
	urlToObj:urlToObj
	// encoder:base64decode
  }