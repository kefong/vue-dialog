<template>
	<a v-on:click="open" href="javascript:void(0)">{{ text }}</a>
</template>
<script>
export default {
	name: 'dialog-link',
	props: ['width','height','title','model','to','html','type'],
	data: function(){
		return {
			text: typeof(this.$slots.default) == 'undefined'?'':this.$slots.default[0].text
		}
	},
	methods: {
		open: function(){
			this.$open({
				to: this.to,
				html: this.html,
				width: this.width,
				title: this.title,
				model: this.model,
				type: this.type
			});
		}
	}
}
</script>