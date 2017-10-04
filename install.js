import dialogLink from './components/dialog-link'
import dialogView from './components/dialog-view'

export function install(Vue, options){
	const isDef = v => v !== undefined;
	
	window.eventBus = new Vue();
	Vue.component(dialogView.name, dialogView);
	Vue.component(dialogLink.name, dialogLink);
	Vue.mixin({
		beforeCreate: function(){
			if(isDef(this.$options.dialog)){
				//this._dialogRoot = this;
		        Vue.prototype._dialog = this.$options.dialog;
			}
		},
		created: function(){
			//console.log('created');
			//console.log(this.$options.dialog);
		},
		destroyed: function(){
			console.log('destroyed');
		}
	});
	
	Object.defineProperty(Vue.prototype, '$dialog', {
		get () { return this._dialog }
	})
}