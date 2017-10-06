import link from './components/link'
import view from './components/view'

export function install(Vue, options){
	const isDef = v => v !== undefined;
	
	//用于不同组件中的事件中转
	window.bus = new Vue();
	
	Vue.component(view.name, view);
	Vue.component(link.name, link);
	Vue.mixin({
		beforeCreate: function(){
			//设置弹窗组件类
			if(isDef(this.$options.dialog)){
		        Vue.prototype._dialog = this.$options.dialog;
			}
		},
		created: function(){
			//console.log('created');
			//console.log(this.$options.dialog);
		},
		destroyed: function(){
			//console.log('destroyed');
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