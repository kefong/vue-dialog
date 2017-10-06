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
	getComponent: function(dialogs, to, dialog){
		//判断是否为字符串
		if(typeof(to) === 'string'){
			dialogs.forEach(function(n, i){
				if(to == n.path){
					dialog.current.component = n.component;
					dialog.current.cpath = n.path;
					dialog.current.name = n.name;
				}
			});			
		}else{
			dialog.current.name = to.name;
			dialog.current.params = to.params;
			dialogs.forEach(function(n, i){
				if(to.name == n.name){
					dialog.current.component = n.component;
				}
			});
		}
		return dialog.current.component;
	}
}