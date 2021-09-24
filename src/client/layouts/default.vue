<template lang="pug">
  div 
    navbarV2(:keyword='$route.query.q || \'\'')
    div(v-bind:class="isFullscreen ? '' : 'container'")
      router-view
      thanks-to
    bottom-navbar(:route='$route')
    toast
</template>

<script lang="ts">
import vue from "vue"
import navbarV2 from "../components/v2/navigations/navbar.vue"
import footer from "../components/footer.vue"
import toast from "../components/toast.vue"
import thanksTo from "../components/boxs/thanks-to.vue"
import { router } from "../index"
import { objToQuery } from "string-manager"

vue.component("navbarV2", navbarV2)
vue.component("bottom-navbar", footer)
vue.component("toast", toast)
vue.component("thanks-to", thanksTo)

interface ToInterface {
  path: string
  fullpath: string
  query: object
}

const IS_FULLSCREEN = ["search", "a", "author", "tag", "posts", "apps", "app"]

export default vue.extend({
  name: "layout-default",

  data() {
    return {
      isFullscreen: IS_FULLSCREEN.includes(this.$route.path.split("/")[2])
    }
  },

  mounted() {
    const { fullPath, params } = this.$route
    const win: any = window
    if (win.ga) {
      // ref : https://developers.google.com/analytics/devguides/collection/gajs/
      win.ga("send", "pageview", fullPath)
    }
  },

  watch: {
    $route(to: any) {
      const { path, fullPath, params, name: string = "" } = to
      this.isFullscreen = IS_FULLSCREEN.includes(path.split("/")[2])

      const win: any = window
      if (win.ga) {
        // ref : https://developers.google.com/analytics/devguides/collection/gajs/
        win.ga("send", "pageview", to.fullPath)
      }
    }
  }
})
</script>

<style lang="sass">
@import '../../design/sass/base'
@import '../../design/sass/color'

body
  color: $color-gray-dark
  font-size: 1.1em
a
  color: $color-gray-medium
pre
  background: $color-gray-verydark
  color: $color-gray-verysoft
  padding: 20px
  code
    font-size: 1.1em !important
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
