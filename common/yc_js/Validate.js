/**
数据验证（表单验证）
来自 grace.hcoder.net 
作者 hcoder tan
*/
export default {
    error: '',
    check: function(data, rule) {
        for (var i = 0; i < rule.length; i++) {
            if (!rule[i].checkType) {
                return true;
            }
            if (!rule[i].name) {
                return true;
            }
            if (!rule[i].errorMsg) {
                return true;
            }
            if (!data[rule[i].name]) {
                this.error = rule[i].errorMsg;
                return false;
            }
            switch (rule[i].checkType) {
                case 'string':
                    var reg = new RegExp('^.{' + rule[i].checkRule + '}$');
                    if (!reg.test(data[rule[i].name])) {
                        this.error = rule[i].errorMsg;
                        return false;
                    }
                    break;
                case 'int':
                    var reg = new RegExp('^(-[1-9]|[1-9])[0-9]{' + rule[i].checkRule + '}$');
                    if (!reg.test(data[rule[i].name])) {
                        this.error = rule[i].errorMsg;
                        return false;
                    }
                    break;
                    break;
                case 'between':
                    if (!this.isNumber(data[rule[i].name])) {
                        this.error = rule[i].errorMsg;
                        return false;
                    }
                    var minMax = rule[i].checkRule.split(',');
                    minMax[0] = Number(minMax[0]);
                    minMax[1] = Number(minMax[1]);
                    if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
                        this.error = rule[i].errorMsg;
                        return false;
                    }
                    break;
                case 'betweenD':
                    var reg = /^-?[1-9][0-9]?$/;
                    if (!reg.test(data[rule[i].name])) {
                        this.error = rule[i].errorMsg;
                        return false;
                    }
                    var minMax = rule[i].checkRule.split(',');
                    minMax[0] = Number(minMax[0]);
                    minMax[1] = Number(minMax[1]);
                    if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
                        this.error = rule[i].errorMsg;
                        return false;
                    }
                    break;
                case 'betweenF':
                    var reg = /^-?[0-9][0-9]?.+[0-9]+$/;
                    if (!reg.test(data[rule[i].name])) {
                        this.error = rule[i].errorMsg;
                        return false;
                    }
                    var minMax = rule[i].checkRule.split(',');
                    minMax[0] = Number(minMax[0]);
                    minMax[1] = Number(minMax[1]);
                    if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
                        this.error = rule[i].errorMsg;
                        return false;
                    }
                    break;
                    // 字符串长度 
                case 'betweenL':
                    var minMax = rule[i].checkRule.split(',');
                    var length = data[rule[i].name].length;
                    minMax[0] = Number(minMax[0]);
                    minMax[1] = Number(minMax[1]);
                    if (length > minMax[1]) {
                        this.error = rule[i].errorMsg + "不能超过" + minMax[1] + "个字符";
                        return false;
                    } else if (length < minMax[0]) {
                        this.error = rule[i].errorMsg + "不能少于" + minMax[0] + "个字符";
                        return false;
                    }
                    break;
                case 'same':
                    if (data[rule[i].name] != rule[i].checkRule) {
                        this.error = rule[i].errorMsg;
                        return false;
                    }
                    break;
                case 'notsame':
                    if (data[rule[i].name] == rule[i].checkRule) {
                        this.error = rule[i].errorMsg;
                        return false;
                    }
                    break;
                case 'email':
                    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                    if (!reg.test(data[rule[i].name])) {
                        this.error = rule[i].errorMsg;
                        return false;
                    }
                    break;
                case 'phoneno':
                    var reg = /^0?1[3|5|6|7|8][0-9]\d{8}$/;
                    if (!reg.test(data[rule[i].name])) {
                        this.error = rule[i].errorMsg;
                        return false;
                    }
                    break;
                case 'zipcode':
                    var reg = /^[0-9]{6}$/;
                    if (!reg.test(data[rule[i].name])) {
                        this.error = rule[i].errorMsg;
                        return false;
                    }
                    break;
                case 'reg':
                    var reg = new RegExp(rule[i].checkRule);
                    if (!reg.test(data[rule[i].name])) {
                        this.error = rule[i].errorMsg;
                        return false;
                    }
                    break;
                case 'in':
                    if (rule[i].checkRule.indexOf(data[rule[i].name]) == -1) {
                        this.error = rule[i].errorMsg;
                        return false;
                    }
                    break;
                case 'notnull':
                    if (data[rule[i].name] == null || data[rule[i].name].length < 1) {
                        this.error = rule[i].errorMsg;
                        return false;
                    }
                    break;
            }
        }
        return true;
    },
    isNumber: function(checkVal) {
        var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
        return reg.test(checkVal);
    },	checkName:function(name,min,max){
		var min=min||8;
		var max=max||12;
		var reg = /^[\w]{8,12}$/;//这个是正则表达式\w已经等效于[A-Za-z0-9_];
		if(!name.match(reg)){
			return {ok:false,message:"只能为8~18位数字/字母/下划线！"};
		} 
	return {ok:true,message:"验证通过"};
	},
}
