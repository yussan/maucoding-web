import vue from "vue"
import Vuex from "vuex"
import Meta from "vue-meta"
import VueRouter from "vue-router"
import routes from "./routes"
import storeModules from "./vuex/modules"

vue.use(VueRouter)
vue.use(Vuex)
vue.use(Meta)

// initial router
export const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// initial store
export const store = new Vuex.Store({
  modules: storeModules
})

// initial app
// runtime compiler: https://cli.vuejs.org/config/#runtimecompiler
export const app = new vue({
  router,
  store,
  render: h => h("router-view")
})

app.$mount("#app")
