<template lang="pug">
  .apps-block
    .grid-center
      .col-7_md-7_sm-12.apps-block__list
        app-card
        app-card
        div(style="margin:0 8px 30px")
          big-button(type="button" :onClick="loadMoreHandler" text="More Apps")
</template>

<style lang="sass">
  @import "../../../../design/sass/color"
  .apps-block
    padding: 32px

  .apps-block__list 
    background-color: $color-white-main
    padding: 20px
</style>

<script>

import Vue from "vue" 

import BigButton from "../buttons/FullWidthButton"
import AppCard from "../cards/App.vue"

Vue.component("app-card", AppCard)
Vue.component("big-button", BigButton)

const props = ["postData", "loadMoreHandler"]

export default {
  props
}
</script>