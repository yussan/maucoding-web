<template lang='pug'>
div
  top-navbar
  .grid(style="border-top: 7px solid #F4F4F4") 
    .col-2_sm-12(style="padding-top:60px")
      super-sidebar
    .col-10_sm-12.bg-white
      router-view
  bottom-navbar
  toast
</template>

<script lang='ts'>
import vue from "vue"
import sidebar from "../components/super-sidebar.vue"
import header from "../components/headers/header.vue"
import footer from "../components/footer.vue"
import toast from "../components/toast.vue"

vue.component("super-sidebar", sidebar)
vue.component("top-navbar", header)
vue.component("bottom-navbar", footer)
vue.component("toast", toast)

export default vue.extend({
  name: "layout-super"
})
</script>

<style lang='sass'>
  @import '../../design/sass/base'
  .disabled
    opacity: 0.5
    pointer-events: none
    filter: blur(2px)
</style>
