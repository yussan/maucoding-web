<template lang="pug">
  header(:class="size == 'small' ? 'small' : ''")
    .container-medium
      .grid-noGutter
        .col.align-center
          router-link(to='/')
            img.logo#logo(src='/images/logo-wide-2.1.png')
</template>

<script lang="ts">
import Vue from "vue"

function drawWave() {}

export default Vue.extend({
  name: "navbar",
  props: {
    size: {
      type: String,
      default: "large"
    }
  }
})
</script>

<style lang="sass" scoped>
header 
  &.small 
    padding: 1em 0
    img.logo 
      height: 80px
  background: #fff
  padding: 4em 0
  img.logo
    max-width: 100%
    height: 80px

// responsiveness
@media screen and (max-width: 600px)
  header
    padding: 1em
    img.logo 
      height: 50px

</style>
