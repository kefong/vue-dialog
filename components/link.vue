<script>
export default {
	name: 'dialog-link',
	render: function(h){
		return h('a', {
			on: {
				click: this.open
			},
			domProps: {
				innerHTML: this.$slots.default[0].text
			},
			attrs: {
				
			}
		})
	},
	props: ['width','height','title','model','to','html','type'],
	data: function(){
		return {}
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