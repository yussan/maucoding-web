<template lang='pug'>
  div 
    top-navbar(size='small')
    navbar(:keyword='$route.query.q || \'\'')
    router-view
    bottom-navbar
</template>

<script lang='ts'>
import vue from "vue"
import navbar from "../components/navbar.vue"
import header from "../components/headers/header.vue"
import footer from "../components/footer.vue"

vue.component("navbar", navbar)
vue.component("top-navbar", header)
vue.component("bottom-navbar", footer)

export default vue.extend({
  name: "layout-error"
})
</script>

<style lang='sass'>
  @import '../../design/sass/base'
</style>
