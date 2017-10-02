<template>
	<dialog>
		<div>{{ html }}</div>
		<div><button v-on:click="close">关闭</button></div>
	</dialog>
</template>
<script>
import test1 from './test'
export default {
	name: 'dialog-view',
	data: function(){
		return {
			url: '',
			html: '',
			width: 0,
			height: 0,
			title: '',
			model: true,
			openStatus: false
		}
	},
	created: function(){
		var that = this;
		eventBus.$on('eventBusDialogOpen', function (data) {
			that.url = data.url;
			that.html = data.html;
			that.width = data.width;
			that.title = data.title;
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
</script>