# vue-dialog
使用方法：
1、将<dialog-view></dialog-view>加到组件App.vue
2、在需要弹窗的地方，如下调用，有两种办法，
一种是使用自制<dialog-link>来调用
<dialog-link class="fo-btn fo-btn-secondary" to="/about" type="alert" html="<span style='color:#ff0000'>test</span>">111</dialog-link>
<dialog-link class="fo-btn fo-btn-secondary" to="/about/test">222</dialog-link>
第二种是：直接调用js方法：
<button class="fo-btn fo-btn-secondary" v-on:click="$alert('<span>1111423423411111</span>')">333</button>