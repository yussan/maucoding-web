<template lang="pug">
.col-4_sm-12.card-post-popular(v-if="data")
  .thumb
    router-link(:to="'/post/' + data.nospace_title + '-' + data._id")
      .thumb-image(:style="`background-image:url(${data.image[600]})`")
        BtnPlay(v-if="data.video", size="big")
  .title
    router-link(:to="'/post/' + data.nospace_title + '-' + data._id")
      h2 {{ data.title }}
    small 
      router-link(:to="'/author/' + data.author.username") {{ data.author.username }}
      | &nbsp;
      span {{ data.lang == 'id' ? 'Bahasa Indonesia' : 'English' }}
</template>

<script lang="ts">
import vue from "vue"
import BtnPlay from "../buttons/BtnVideoPlay.vue"

export default vue.extend({
  name: "card-post-small",

  props: ["data"],
})
</script>

<style lang="sass">
.thumb-image
  position: relative
</style>
