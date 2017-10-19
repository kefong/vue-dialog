<script>
export default {
	name: 'dialog-link',
	render: function(h){
		return h('a', {
			on: {
				click: this.show
			},
			domProps: {
				innerHTML: this.$slots.default[0].text
			},
			attrs: {
				
			}
		})
	},
	props: {
		to: {
			type: [String, Object],
			required: true
		}
	},
	data: function(){
		return {}
	},
	methods: {
		show: function(){
			this.$_dialog(this.to);
		}
	}
}
</script>