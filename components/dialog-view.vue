<script>
import util from '../util'
export default {
	name: 'dialog-view',
	//functional: true,//深度？
	data: function(){
		return {
			to: '',
			html: '',
			width: 0,
			height: 0,
			title: '',
			model: true,
			openStatus: false,
			type: 'default'
		}
	},
	computed: {
		ViewComponent: function(){
			if(util.empty(this.to)){
				return null;
			}else{
				var component = util.getComponentByPath(this._dialog.options.dialogs, this.to);
				return component;
			}			
		},
		Title: function(){
			return this.title;
		}
	},
	render: function(h){
		var that = this;
		var element;
		switch(this.type){
			case 'alert':
				element = h('dialog', [
					h('div', {
						'class': 'dialog-body',
						domProps: {
							innerHTML: this.html
						}
					}),
					h('button', {
						'class': 'dialog-btn dialog-btn-ok',
						on: {
							click: this.close
						}
					},'OK')
				]);
				break;
			case 'confirm':
				break;
			default:
				element = h('dialog', [
					h('div', { 'class': 'dialog-header' }, [
						//标题
						h('div', { 'class': 'dialog-title' }, this.title),
						//按钮（如：关闭、最小化等）
						h('div', { 'class': 'dialog-buttons' }, [
							h('div', {
								'class': 'dialog-close',
								on: {
									click: this.close
								}
							})
						])
					]),
					h('div', { 'class': 'clearfix' }),
					//内容
					h('div', { 'class': 'dialog-body' }, [
						h(that.ViewComponent)
					])
				]);
				break;
		}
		return element;
	},
	created: function(){
		var that = this;
		bus.$on('busDialogOpen', function (options) {			
			that.open(options);			
		});
	},
	methods: {
		open: function(options){
			this.to = options.to;
			this.html = options.html;
			this.width = options.width;
			this.title = typeof(options.title) == 'undefined'?'':options.title;
			this.model = options.model;
			this.openStatus = true;
			this.type = options.type;
			
			this.$el.showModal();
		},
		close: function(){
			this.$el.close();
		}
	},
}
</script>
<style scoped>
.clearfix {
	clear: both;
}
.dialog-header {}
.dialog-title {
	float: left;
}
.dialog-buttons {
	float: right;
}
.dialog-close {
	cursor: pointer;
	color: #f3f3f3;
}
.dialog-close:after {
	content: "\2716";
	color: #f3f3f3;
}
.dialog-close:hover {
	background-color: #f3f3f3;
	color: #fff;
}
.dialog-body {
	min-width: 200px;
	margin-bottom: 6px;
}
.dialog-btn {
	display: inline-block;
	margin-bottom: 0;
	padding: 0.5em 1em;
	vertical-align: middle;
	line-height: 1.2;
	font-weight: normal;
	text-align: center;
	white-space: nowrap;
	background-image: none;
	border: 1px solid transparent;
	border-radius: 0;
	cursor: pointer;
	outline: none;
	-webkit-appearance: none;
	-webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
	-webkit-transition: background-color 300ms ease-out, border-color 300ms ease-out;
	transition: background-color 300ms ease-out, border-color 300ms ease-out;
}
.dialog-btn:hover {
	color: #444;
	text-decoration: none;
}
.dialog-btn-ok {
	color: #fff;
	background-color: #0e90d2;
	border-color: #0e90d2;
}
.dialog-btn-ok:hover {
	color: #fff;
	border-color: #0a6999;
	background-color: #0c79b1;
}
</style>