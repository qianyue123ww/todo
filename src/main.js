import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ListCard from './components/listCard'

Vue.config.productionTip = false

Vue.component('todo-list',ListCard);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
