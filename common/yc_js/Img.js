var Img = {
    canvasToBase64(res) {
        // console.log(JSON.stringify(res))
        var fileType = res.fileType || 'jpeg';
        return new Promise((resolve, reject) => {
            //#ifdef MP-WEIXIN
            wx.getFileSystemManager().readFile({
                filePath: res.tempFilePath, //选择图片返回的相对路径
                encoding: 'base64', //编码格式
                success: res => { //成功的回调
                    resolve('data:image/' + fileType + ';base64,' + res.data);
                }
            })
            //#endif
            //#ifdef APP-PLUS
             // console.log("app_plus")
            plus.io.resolveLocalFileSystemURL(res.tempFilePath, function(entry) {
                // 可通过entry对象操作test.html文件
                entry.file(function(file) {
                    var fileReader = new plus.io.FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.onloadend = function(evt) {
                        // console.log(JSON.stringify(evt))
                        resolve(evt.target.result); ////base64字符串  
                    }
                })
            })
            //#endif
            //#ifdef H5
             // console.log("H5")
            resolve(res.tempFilePath)
            // reject({message:'yc_js.Img暂不支持h5端使用，请下载app进行操作'})
            //#endif
        })
    },
    arrayBufferToImg(val) {
        var captcha = false;
        //  #ifdef MP-WEIXIN
        let base64 = wx.arrayBufferToBase64(val);
        captcha = 'data:image/jpg;base64,' + base64;
        //  #endif
        // #ifdef H5 || APP-PLUS
        var bytes = new Uint8Array(val);
        var data = "";
        var len = bytes.byteLength;
        for (var i = 0; i < len; ++i) {
            data += String.fromCharCode(bytes[i]);
        }
        captcha = "data:image/png;base64," + window.btoa(data);
        // #endif
        return captcha
    }
}
export default Img
