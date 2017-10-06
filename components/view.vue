<script>
import util from '../util'
export default {
	name: 'dialog-view',
	//functional: true,//深度？
	data: function(){
		return {
			to: '',
			_id: null,
			html: '',
			width: 0,
			height: 0,
			title: '',
			model: true,
			openStatus: false,
			type: 'default',
			component:null
		}
	},
	computed: {
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
				test = that.component;
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
						h(that.component)
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
		bus.$on('busDialogInitialize', function(data){
			that.initialize(data);
		})
	},
	methods: {
		initialize: function(data){
			this.title = data.title;
		},
		open: function(options){
			this.to = options.to;
			this.html = options.html;
			this.width = options.width;
			this.title = typeof(options.title) == 'undefined'?'':options.title;
			this.model = options.model;
			this.openStatus = true;
			this.type = options.type;
			this.component = this.getComponent();
			
			this.$el.showModal();
		},
		close: function(){
			this.component = null;
			this.$el.close();
		},
		getComponent: function(){
			util.getComponent(this._dialog.options.dialogs, this.to, this.$dialog);
			return this.$dialog.current.component;
		}
	},
}
</script>
<style scoped>
.clearfix {
	clear: both;
}
.dialog-header {
	float: left;
	width: 100%;
	margin-bottom: 0.3em;
}
.dialog-title {
	float: left;
	font-size: 1.2em;
	font-weight: bold;
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