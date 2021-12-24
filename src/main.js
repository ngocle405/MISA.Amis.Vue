import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
//import 
//import Home from "./view/home/Index.vue";
import Employee from "./view/employee/EmployeeList.vue";
const routers = [
  // {
  //   path: "/",
  //   component: Home,
  // },
  {
    path: "/employee",
    component: Employee,
  }

 
];
const router = new VueRouter({
  mode: "history",
  routes: routers// 
});
Vue.use(VueRouter);
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
