import dialogLink from './components/dialog-link'
import dialogView from './components/dialog-view'

export function install(Vue, options){
	const isDef = v => v !== undefined;
	
	//用于不同组件中的事件中转
	window.bus = new Vue();
	
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
	
	//打开窗口
	Vue.prototype.$open = function(options){
		//弹窗
		bus.$emit('busDialogOpen', {
			to: options.to,
			html: options.html,
			width: options.width,
			title: options.title,
			model: options.model,
			type: options.type
		});
	}
	
	Vue.prototype.$alert = function(text){
		var options = {
				type: 'alert',
				html: text
		}
		Vue.prototype.$open(options);
	}
	
	Object.defineProperty(Vue.prototype, '$dialog', {
		get () { return this._dialog }
	})
}