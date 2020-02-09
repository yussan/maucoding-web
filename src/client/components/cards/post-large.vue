<template lang="pug">
  .col-8_sm-12.card-post-popular.card-post-popular--large(v-if="typeof data !== 'undefined'")
    .grid
      .thumb.col-6_sm-12
        router-link.link-thumb(:to="'/post/' + data.nospace_title + '-' + data._id")
          .thumb-image(:style="`background-image:url(${data.image[600]})`")
            BtnPlay(size="big" v-if="data.video")
      .title.col-6_sm-12
        router-link(:to="'/post/' + data.nospace_title + '-' + data._id")
          h2 {{ data.title }}
        small
          router-link(:to="'/author/' + data.author.username") {{ data.author.username }}
          | &nbsp;| 
          router-link(:to="data.lang == 'id' ? '/id' : '/en' ") {{ data.lang == 'id' ? "Bahasa Indonesia" : "English" }}
</template>

<script lang="ts">
import vue from "vue"
import BtnPlay from "../buttons/BtnVideoPlay.vue"

vue.component("BtnPlay", BtnPlay)

export default vue.extend({
  name: "card-post-large",
  props: ["data"]
})
</script>

<style lang="sass">
  .thumb-image 
    position: relative
</style>


