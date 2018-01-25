/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author liupeng (529539000@qq.com) @kefong
*/
import Link from './components/link'
import View from './components/view'
var VueDialogConfig = {
		_vlist:[],
		_el: null,
		_opt: null,
		_to: null,
		
		_component: function(name){
			var component;
			
			this._opt.routes.forEach(function(n){
				if(name == n.name){
					component = n.component;
				}
			});
			return component;
		}
}

function VueDialog(opt) {
	VueDialogConfig._opt = opt;
}

VueDialog.install = function(Vue, options){
	// 初始化必要组件
	//Vue.component(view.name, view); //此组件需要在show窗口时再初始化
	Vue.component(Link.name, Link);
	// init
	for (var property in options) {
		VueDialogConfig._opt[property] = options[property];
    }
	
	// create [vue dialog package]
	if(VueDialogConfig._el === null){
		VueDialogConfig._el = document.createElement('div');
		VueDialogConfig._el.className = 'kefong-vue-dialog-package';
		document.body.appendChild(VueDialogConfig._el);
	}
	
	Vue.prototype.$_dialog = function(to){
		var view = Vue.component('dialog-view', View);
		var v = new view();
		
		v.to = to;
		v.component = VueDialogConfig._component(to.name);
		VueDialogConfig._to = to;
		//将每个弹出层都加到清单中
		VueDialogConfig._vlist.push(v);
		/**
		 * 关闭窗口
		 * 使用方法：this.$dialog.close();
		 */
		VueDialogConfig._to.close = function(){
			//v.hide();
			//关闭最后一个弹窗
			VueDialogConfig._vlist.slice(-1)[0].hide();
		}
		
		VueDialogConfig._el.appendChild(v.$mount().$el);
	}

	Vue.prototype.$_hide = function(){
		//将关闭的弹窗从列表中删除
		VueDialogConfig._vlist.pop();
	}
	
	Object.defineProperty(Vue.prototype, '$dialog', {
		get: function() {
			 return VueDialogConfig._to;
		}
	})
}

export default VueDialog;