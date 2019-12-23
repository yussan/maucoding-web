<template lang="pug">
  .col-12.card-post
    .thumb
      router-link.link-thumb(:to="'/post/' + data.nospace_title + '-' + data._id")
        BtnPlay(v-if="data.video")
        img(:src="data.image['600']" :alt="data.title")
    .title
      router-link.p-b-10(style="display:block" :to="'/post/' + data.nospace_title + '-' + data._id")
        | {{ data.title }}
      .meta 
        | By  
        router-link(:to="'/author/' + data.author.username") {{ data.author.fullname }} 
        | | 
        | {{ epochToRelative(data.created_on || 0) }}
        | | 
        | {{ data.views || 0 }} Views
        | | 
        | {{ data.comments || 0 }} Comments
        | | 
        | {{ data.lang == "id" ? "Bahasa Indonesia" : "English" }}
</template>

<script lang="ts">
import Vue from "vue"
import BtnPlay from "../buttons/BtnVideoPlay.vue"
import { epochToRelative } from "../../modules/datetime"

Vue.component("BtnPlay", BtnPlay)

export default Vue.extend({
  props: ["data"],

  methods: {
    epochToRelative(epochtime) {
      return epochToRelative(epochtime)
    }
  }
})
</script>

<style lang="sass" scoped>
  @import '../../../design/sass/color'

  .card-post 
    border-top: 1px solid $color-gray-soft
    padding: 0 0 1em 0
    display: inline-flex
    padding-bottom: 0
    margin-bottom: 1em
    a.link-thumb 
      display:  block 
      position: relative
    .thumb
      img 
        width: 300px
    .title 
      line-height: 1.5
      padding: 1em
      text-transform: uppercase
      text-decoration: none
      a
        font-size: 1.5em
        font-weight: bold
        color: $color-black-medium
      .meta 
        font-size: 1em
        a 
          font-size: 1em
          color: $color-gray-medium
        color: $color-gray-medium


  // responsiveness
  @media screen and (max-width: 600px)
    .card-post 
      display: block
      .thumb
        img 
          width: 100%
</style>
