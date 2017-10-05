import { install } from './install'

export default class VueDialog {	
	constructor(options){
		this.options = options;
		//console.log(options);
	}
	test(){
		console.log(test);
	}
}
VueDialog.install = install;