// console.log(urlEncode(arr||obj).slice(1))//调用
var Arr = {


}
var Obj={
	update(oldobj,newobj){
		for(var p in oldobj){
			if(newobj[p]){
				oldobj[p]= newobj[p];
			}
		}
		return oldobj;
	},StrToJSON(str) {
        if (typeof str == 'string') {
            try {
                var obj=JSON.parse(str);
                if(typeof obj == 'object' && obj ){
                    return obj;
                }else{
                    return false;
                }

            } catch(e) {

                return false;
            }
        }
        return false;
    }
}
  export default {
    // CusBASE64: __BASE64,
	...Obj

	// encoder:base64decode
  }