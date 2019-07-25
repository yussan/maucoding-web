<template lang='pug'>
  div 
    top-navbar
    navbar(:keyword='$route.query.q || \'\'')
    router-view
    bottom-navbar
    toast
</template>

<script lang='ts'>
import Vue from "vue"
import navbar from "../components/navbar.vue"
import header from "../components/headers/header.vue"
import footer from "../components/footer.vue"
import toast from "../components/toast.vue"
import { router } from "../index"
import { objToQuery } from "string-manager"

Vue.component("navbar", navbar)
Vue.component("top-navbar", header)
Vue.component("bottom-navbar", footer)
Vue.component("toast", toast)

interface ToInterface {
  path: string
  fullpath: string
  query: object
}

let NOT_REDIRECT_LANG: Array<String>
NOT_REDIRECT_LANG = [
  "super_login",
  "super_new_post",
  "super_post",
  "super_post_detail"
]

export default Vue.extend({
  name: "layout-default",

  mounted() {
    const { fullPath, params} = this.$route
    const { lang } = params
    if (!lang && !NOT_REDIRECT_LANG.includes(this.$route.name || "")) {
      location.href = `/id${fullPath}`
    }
    const win: any = window
    if (win.ga) {
      // ref : https://developers.google.com/analytics/devguides/collection/gajs/
      win.ga("send", "pageview", fullPath)
    }
  },

  watch: {
    $route(to: any) {
      const { fullPath, params, name: string = "" } = to
      const { lang } = params
      if (!lang && !NOT_REDIRECT_LANG.includes(name)) {
        router.push({ path: `/id${fullPath}` })
      }
      const win: any = window
      if (win.ga) {
        // ref : https://developers.google.com/analytics/devguides/collection/gajs/
        win.ga("send", "pageview", to.fullPath)
      }
    }
  }
})
</script>

<style lang='sass'>
  @import '../../design/sass/base'
  @import '../../design/sass/color'
  
  body
    color: $color-gray-dark
  a 
    color: $color-gray-medium
  pre 
    background: $color-gray-verydark
    color: $color-gray-verysoft
    padding: 20px
  .align-center 
    text-align: center 
  .text-muted 
    color: $color-gray-medium
  .no-padding
    padding: 0 !important

</style>
