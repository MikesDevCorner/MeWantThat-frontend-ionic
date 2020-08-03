import Vue from 'vue'
import App from './App.vue'

import Ionic from "@ionic/vue"
import "@ionic/core/css/core.css"
import "@ionic/core/css/ionic.bundle.css"
import { IonicVueRouter } from "@ionic/vue";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faTrash, faTrashAlt, faList, faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import GlobalMixin from './components/GlobalMixin.vue'
import apiLib from "./shared/api.js";


Vue.config.productionTip = false;
Vue.use(Ionic);
Vue.use(IonicVueRouter);
Vue.mixin(GlobalMixin);
Vue.use(apiLib);
library.add(faPlus, faTrash, faTrashAlt, faList, faTag);
Vue.component('font-awesome-icon', FontAwesomeIcon);


const router = new IonicVueRouter({
  routes: [
    { path: "/", redirect: "/all-lists" },
    {
      path: "/all-lists",
      name: "all-lists",
      component: () =>
        import(/* webpackChunkName: "all-lists" */ "@/components/AllListsView"),
    },
    {
      path: "/new-list",
      name: "new-list",
      component: () =>
        import(/* webpackChunkName: "new-list" */ "@/components/NewListPage"),
    },
    {
      path: "/single-list-view",
      name: "single-list-view",
      props: true,
      component: () =>
        import(/* webpackChunkName: "single-list-view" */ "@/components/SingleListView"),
    },
    {
      path: "/new-entry",
      name: "new-entry",
      props: true,
      component: () =>
        import(/* webpackChunkName: "new-entry" */ "@/components/NewEntryPage"),
    }
  ]
});


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');