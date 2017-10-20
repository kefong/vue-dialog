<script>
require('../css/iconfont/iconfont.css')
export default {
	name: 'dialog-view',
	render: function(h){
		if(this.status === true) {
			var win = h('div', { 
				'class': 'kefong-vue-dialog',
				style: {
					width: (this.width === 0? null : (this.width + 'px')),
					top: this.top + 'px',
					left: this.left + 'px',
				}
			}, [
				h('div', { 
					'class': 'kefong-dialog-header',
					on: {
						mousedown: this.mousedown
					}
				}, [
					//标题
					h('div',{
						'class': 'kefong-dialog-title'							
					}, this.title),
					//按钮（如：关闭、最小化等）
					h('div', { 'class': 'kefong-dialog-buttons' }, [
						h('div', {
							'class': 'kefong-dialog-close',
							on: {
								click: this.hide
							}
						})
					])
				]),
				h('div', { 'class': 'clearfix' }),
				//内容
				h('div', { 'class': 'kefong-dialog-body' }, [
					h(this.component),
				])
			]);
			
			// backdrop
			if(this.backdrop === true){
				return h('transition', {
					attrs: {
						name: 'kefong-fade'
					}
				}, [					
					h('div', [
						h('div', {
							'class': 'kefong-vue-dialog-backdrop'
						}),
						win
					])
				]);
			}else{
				return win;
			}			
		} else {
			return null;
		}	
	},
	data: function(){
		return {
			to: {
				name: null,
				params: {}
			},
			status: true,
			title: 'title',
			component: null,
			backdrop: true,
			width: 0,
			top:10,
			left:0,
		}
	},
	created: function(){
	},
	mounted: function(){
		var that = this;
		// 必须在mounted获取title, created获取不到
		this.title = typeof(this.$children[0].title) === 'undefined'? '' : this.$children[0].title;
		this.width = typeof(this.to.width) === 'undefined'? 0 : this.to.width;
		
		// 窗口大小更改触发
		window.onresize = function(){
			if(that.status === true) that.refreshLeft();			
		}
	},
	updated: function(){
		// 整个视图都重绘完毕后执行
		this.$nextTick(function () {
			this.width = this.width === 0? this.$children[0].$el.offsetWidth : this.width;
			this.refreshLeft();
		})
	},
	methods: {
		hide: function(){
			this.status = false;
		},
		// 计算left
		refreshLeft: function(){
			var left = ((document.documentElement.clientWidth - this.width) / 2);		
			this.left = left > 0? left: 0;
		},
		// 移动
		mousedown: function(e){
			/*var that = this;
			//console.log(e);
			var event1 = e || window.event;
			var eventX = event1.offsetX || event1.layerX;
			var eventY = event1.offsetY || event1.layerY;
			
			var flag = true;
			var dialog = this.$el;
			
			// 按下鼠标并移动
			dialog.onmousemove = function(e) {				
				if(flag) {
					var event2 = e || window.event;
					var eveX = event2.clientX;
					var eveY = event2.clientY;
					that.top = eveY - eventY;
					that.left = eveX - eventX;
					//console.log(that.left);
				}
			}
			
			// 抬起鼠标
			dialog.onmouseup = function(e) {
				if(flag) {
					flag = false;
				}
			}*/
		}
	}
}
</script>
<style scoped>
.kefong-vue-dialog {
	background-color: #fff;
	border: 1px solid #ccc;
	border-radius: 3px;
	box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
	padding: 0px;
	position: absolute;
	top: 16px;
	left: 600px;
}
.kefong-vue-dialog-backdrop { /* native */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width:100%;
  height:100%;
}
.kefong-vue-dialog + .backdrop { /* polyfill */
  background-color: green;
}
.clearfix {
	clear: both;
}
.kefong-dialog-header {
	float: left;
	width: 100%;
	background-color: #f3f3f3;
	line-height: 26px;
	height: 28px;
}
.kefong-dialog-title {
	float: left;
	font-size: 1em;
	/*font-weight: bold;*/
	padding-left: 6px;
}
.kefong-dialog-title:BEFORE {
	font-family:"iconfont" !important;
	content: "\e61b";
	vertical-align:middle;
	display:inline-block;
	font-size: 1.5em;
	padding-right: 4px;
	margin-top: -2px;
	margin-left: -2px;
}
.kefong-dialog-buttons {
	float: right;
	padding-right: 4px;
}
.kefong-dialog-close {
	cursor: pointer;
	color: #f3f3f3;
	padding: 0px 5px 0px 5px;
	line-height: 20px;
	margin-top: 4px;
	font-family: "宋体";
}
.kefong-dialog-close:after {
	content: "\2716";
	color: #666;
}
.kefong-dialog-close:hover {
	background-color: #FF5722;
	color: #FF5722;	
}
.kefong-dialog-close:hover:after {
	content: "\2716";
	color: #fff;
}
.kefong-dialog-body {
	min-width: 200px;
	padding: 3px 6px 8px 6px;
}
.kefong-dialog-btn {
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
.kefong-dialog-btn:hover {
	color: #444;
	text-decoration: none;
}
.kefong-dialog-btn-ok {
	color: #fff;
	background-color: #0e90d2;
	border-color: #0e90d2;
}
.kefong-dialog-btn-ok:hover {
	color: #fff;
	border-color: #0a6999;
	background-color: #0c79b1;
}

.kefong-fade-enter-active, .kefong-fade-leave-active {
  transition: opacity 0.25s
}
.kefong-fade-enter, .kefong-fade-leave-to {
  opacity: 0
}
</style>