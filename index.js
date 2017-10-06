import { install } from './install'

export default class VueDialog {	
	constructor(options){
		this.options = options;
		this.current = {
				name: '',
				params: {},
				path: null,
				query: null,
				fullPath: null,
				component: null
		}
	}
	//获取当前窗口
	//记录弹窗历史
}
VueDialog.install = install;