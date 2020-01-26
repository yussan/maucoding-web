<template lang='pug'>
  div 
    navbar(:keyword='$route.query.q || \'\'')
    div(v-bind:class="isFullscreen ? '' : 'container'")
      router-view
      thanks-to
    bottom-navbar(:route='$route')
    toast
</template>

<script lang='ts'>
import Vue from "vue"
import navbar from "../components/v2/navigations/navbar.vue"
import header from "../components/headers/header.vue"
import footer from "../components/footer.vue"
import toast from "../components/toast.vue"
import thanksTo from "../components/boxs/thanks-to.vue"
import { router } from "../index"
import { objToQuery } from "string-manager"

Vue.component("navbar", navbar)
Vue.component("top-navbar", header)
Vue.component("bottom-navbar", footer)
Vue.component("toast", toast)
Vue.component("thanks-to", thanksTo)

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

const IS_FULLSCREEN = ["search", "a", "author", "tag", "posts", "apps", "app"]

export default Vue.extend({
  name: "layout-default",

  data() {
    return {
      isFullscreen: IS_FULLSCREEN.includes(this.$route.path.split("/")[2])
    }
  },

  mounted() {
    const { fullPath, params } = this.$route
    const { lang } = params
    if (!lang && !NOT_REDIRECT_LANG.includes(this.$route.name || "")) {
      location.href = `/${window.SELECTED_LANG || "id"}${fullPath}`
    }
    const win: any = window
    if (win.ga) {
      // ref : https://developers.google.com/analytics/devguides/collection/gajs/
      win.ga("send", "pageview", fullPath)
    }
  },

  watch: {
    $route(to: any) {
      const { path, fullPath, params, name: string = "" } = to
      const { lang } = params
      this.isFullscreen = IS_FULLSCREEN.includes(path.split("/")[2])
      if (!lang && !NOT_REDIRECT_LANG.includes(name)) {
        router.push({ path: `/${window.SELECTED_LANG || "id"}${fullPath}` })
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
  [class*=col-]
    padding-bottom: 0 !important
  // helpers
  .m-t-30
    margin-top: 30px
  .m-t-50
    margin-top: 50px

</style>
