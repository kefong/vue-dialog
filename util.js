/**
 * 基础方法
 */
export default {
	test: function(str){
		console.log(str);
	},
	/**
	 * 判断变量是否为空
	 * @param str
	 * @returns
	 */
	empty:function(str)
	{
		return typeof(str) == 'undefined' || str == null || str == undefined || str == '';
	},
	/**
	 * 通过地址获取component
	 */
	getComponentByPath: function(dialogs, path){
		var component;
		dialogs.forEach(function(n, i){
			if(path == n.path){
				component = n.component;
			}
		});
		return component;
	}
}