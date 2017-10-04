export default {
	name: 'dialog-view',
	//functional: true,//深度？
	data: function(){
		return {
			to: '',
			html: '',
			width: 0,
			height: 0,
			title: '无标题',
			model: true,
			openStatus: false
		}
	},
	computed: {
		ViewComponent: function(){
			//test = this;
			return this._dialog.options.dialogs[0].component;//已获取到传值，接下来就是设置 样式 啦！！！
		},
		Title: function(){
			return this.title;
		}
	},
	render: function(createElement){
		var that = this;
		return createElement('dialog',[
			createElement('div',{
				attrs: {
					class: 'dialog-title'
				}
			},this.Title),
			createElement(that.ViewComponent),
			createElement('button',{
				on: {
					click: that.close
				}
			},'关闭')
		]);
	},
	created: function(){
		var that = this;
		eventBus.$on('eventBusDialogOpen', function (data) {
			that.to = data.to;
			that.html = data.html;
			that.width = data.width;
			that.title = typeof(data.title) == 'undefined'?'无标题':data.title;
			that.model = data.model;
			that.openStatus = true;
			that.open();			
		});
	},
	methods: {
		open: function(){
			this.$el.showModal();
		},
		close: function(){
			this.$el.close();
		}
	},
}