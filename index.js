import { install } from './install'

export default class VueDialog {	
	constructor(options){
		this.options = options;
		//console.log(options);
	}
}
VueDialog.install = install;