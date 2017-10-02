import dialogLink from './components/dialog-link'
import dialogView from './components/dialog-view'

var vueDialog = {};
vueDialog.install = function (Vue, options) {
	window.eventBus = new Vue();
	Vue.component(dialogView.name, dialogView);
	Vue.component(dialogLink.name, dialogLink);
}
export default vueDialog;