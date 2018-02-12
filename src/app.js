import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue'
import VueProgress from 'vue-progress-path'

Vue.use(BootstrapVue);
Vue.use(VueProgress)

import App from './App.vue';

new Vue({
  el: '#app',
  render: h => h(App),
});
