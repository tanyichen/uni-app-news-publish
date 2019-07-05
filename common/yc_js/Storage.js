// // console.log(urlEncode(arr||obj).slice(1))//调用
// 
var Storage={
	/**
	 * 异步存入缓存 可对象可数组
	 * k 		string 				键
	 * val 		array|object|string	缓存的内容
	 * expires	int					有效期
	 */
	set(k,val,expires){
		var type= typeof val;
		var expires=expires || 300;
		return uni.setStorage({key:k,data:{data:val,expires:expires+(Date.parse(new Date())/1000),type:type},success: function () {
			// console.log('保存成功')
		}})
	},get(k,Func=function(){}){
		try{
			uni.getStorage({key: k,
			success: function (res) {
				var data=res.data;
				if(data.expires){
					if(data.expires> (Date.parse(new Date())/1000)){
						Func(data.data)
						return data.data;
					}
					// uni.removeStorage(k);
					try {
						uni.removeStorage(k);
						} catch (e) {
								// error
					}
				}
			}})
			
		}catch(e){
			// console.log(e)
			return false;
			//TODO handle the exception
		}
			return false;
		
	},remove(k){
		uni.removeStorage(k);
	},init(){
		// 获取本地说有缓存信息 删除过期的，超长的，净化系统
		uni.getStorageInfo({	
			    success: function (res) {
                    // console.log(res)
// 			        console.log(res.keys);
// 			        console.log(res.currentSize);
// 			        console.log(res.limitSize);
			    }
			});	
	}
}

var Sync={
	set(k,val,expires){
		var expires=expires || 300;
		var type= typeof val;
		if(type==='object'){
			val =JSON.stringify(val)
		}
		return uni.setStorageSync(k,{data:val,expires:expires+(Date.parse(new Date())/1000),type:type})
	},get(k){
		try{
			var data= uni.getStorageSync(k) || {};
			// console.log(data)
			if(data.expires){
				if(data.expires> (Date.parse(new Date())/1000)){
					if(data.type==='object'){
						return  JSON.parse(data.data)
					}
					return data.data;
				}
				uni.removeStorageSync(k);
				try {
							uni.removeStorageSync(k);
					} catch (e) {
							// error
					}
			}
		}catch(e){
			// console.log(e)
			return false;
			//TODO handle the exception
		}
	
			return false;
		
	},reset(){
		// 获取本地说有缓存信息 删除过期的，超长的，净化系统
		try {
			const res = uni.getStorageInfoSync();
		} catch (e) {
			// error
		}
	}
}
function clear() {
try {
    uni.clearStorageSync();
    // uni.clearStorage();
} catch (e) {
    // error
}
}
export default {
    Sync,
    ...Storage,
    clear,
  }