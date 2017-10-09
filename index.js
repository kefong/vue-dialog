import { install } from './install'

function VueDialog(options){
	this.options = options;
	this.current = {
			name: '',
			params: {},
			path: null,
			query: null,
			fullPath: null,
			component: null,
			title: ''
	}
}

VueDialog.install = install;
export default VueDialog;
