var YxStrUtil = {
	getTextWidth:(text, fontSize)=>{
		var len = YxStrUtil.getWordLen(text);
		var size = parseInt(fontSize);
		if (size == 0) {
			size = 1;
		}
		var width = len * size / 2;

		return width;
	},

	getWordLen:(str)=>{
		if(typeof(str) !== "string"){
			console.err("str not is a string")
			return 1
		}
		var jmz = {};
		jmz.GetLength = function(str) {
			return str.replace(/[\u0391-\uFFE5]/g,"aa").length;  //先把中文替换成两个字节的英文，在计算长度
		};
		return jmz.GetLength(str);
	},

	/**
	 *     判断对象是否为null
	 *   if(obj !== undefiend && null != obj)
	 *
	 * @param obj
	 * @returns {boolean}
	 */
	isNotNull:(obj)=>{
		var result = false;
		if (obj !== undefined && null != obj ) {
			result = true;
		}
		return result;
	},

	/**
	 *  支持一下判断
	 *    if(obj != undefiend && obj != null && obj != '')
	 *
	 * @param obj
	 * @returns {boolean}
	 */
	isNotEmpty:(obj)=>{
		var result = false;
		if (YxStrUtil.isNotNull(obj)) {
			if (typeof obj == "string") {
				if (obj.length > 0) {
					result = true;
				}
			} else if (typeof obj == "number") {
				result = true;
			} else if (typeof obj == "object") {
				if (obj instanceof Array) {
					if (obj.length > 0) {
						result = true;
					}
				} else {
					result = true;
				}
			} else {
				result = true;
			}
		}
		return result;
	},

	/**
	 * 将非空的对象原样返回，将空的对象转为默认值返回
	 * @param obj
	 * @param defaultValue
	 * @returns {*}
	 */
	objectFix:(obj, defaultValue)=>{
		var value = defaultValue;
		if (YxStrUtil.isNotNull(obj)) {
			value = obj;
		}
		return value;
	},

	//克隆对象
	clone:(obj)=>{
		var newObj = {};
		if (obj instanceof Array) {
			newObj = [];
		}
		for (var key in obj) {
			var val = obj[key];
			//newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; //arguments.callee 在哪一个函数中运行，它就代表哪个函数, 一般用在匿名函数中。
			newObj[key] = typeof val === 'object' ? this.clone(val) : val;
		}
		return newObj;
	},


	/**
	 *    把字符串替换为指定的字符串
	 * @param obj
	 * @returns {*}
	 */
	stringFix:(obj)=>{
		return YxStrUtil.objectFix(obj, "");
	},


	intFix:(obj)=>{
		var value = YxStrUtil.objectFix(obj, 0);
		return parseInt(value);
	},

	/**
	 *     把浮点数保留几位小数点
	 * @param obj
	 * @param fixNum
	 * @returns {number}
	 */
	floatFix:(obj, fixNum)=>{
		var value = 0.00;
		var fix = 2;
		if (YxStrUtil.isNotNull(fixNum)) {
			fix = parseInt(fixNum);
		}
		if (fix >= 0) {
			var tmp = YxStrUtil.objectFix(obj, 0.00);
			value = tmp * 1.00; //转带小数点的
			value = value.toFixed(fix);
		} else {
			value = YxStrUtil.intFix(obj);
		}
		return value;
	},


	/**
	 *    把日期和时间转换为指定的分隔符
	 * @param obj
	 * @param dateSpan:  日期分隔符
	 * @param dateAndTimeSpan：日期和时间分隔符
	 * @returns {string}
	 */
	timeFix:(obj, dateSpan)=>{
		var dSpan = ".";
		if (YxStrUtil.isNotEmpty(dateSpan)) {
			dSpan = dateSpan;
		}

		var time = "";
		if (YxStrUtil.isNotEmpty(obj)) {
			time = obj.replace(new RegExp("-", "g"), dSpan);
		}
		return time;
	}
}

export default YxStrUtil

