/**
 * Created by lu on 2016/9/27.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import elmain from '../../components/frame/elmain.vue';
import {setTD} from './../util/index';

Vue.use(VueRouter);

// // 路由配置
var router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: function (resolve) {
        require(['./../../routers/login.vue'], resolve);
      }
    },
    {
      path: "/login2",
      component: function (resolve) {
        require(['./../../routers/login2.vue'], resolve);
      }

    },
    {
      path: "/newtab",
      component: function (resolve) {
        require(['./../../routers/newtab.vue'], resolve);
      }
    },
    {
      path: "*", redirect: "/newtab"
    }

  ]
});


//开启路由
export function routerStart() {
  new Vue({
    components: {app: elmain},
    router: router,
  }).$mount('#app');

}

