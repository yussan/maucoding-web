<template lang="pug">
#oopsreview-slider.glide
  .glide__track(data-glide-el='track')
    .glide__slides
      slot(name="slider-item")
  .glide__bullets(v-if="total > 1" data-glide-el='controls[nav]')
    button.glide__bullet(v-for="(n, index) in total" :data-glide-dir="`=${n - 1}`")
</template>

<script>
import { injectScript, injectCss } from "../../../modules/dom"

export default {
  mounted() {
    injectScript("/vendors/glide/glide.min.js", {
      cb: () => {
        setTimeout(() => {
          this.renderSlider()
        }, 1000)
      }
    })
    injectCss("/vendors/glide/css/glide.core.min.css")
    injectCss("/vendors/glide/css/glide.theme.min.css")
  },

  props: ["total"],

  methods: {
    renderSlider() {
      new Glide("#oopsreview-slider").mount()
    }
  }
}
</script>

<style lang="sass">
  @import '../../../../design/sass/color'

  #oopsreview-slider.glide
    .card-post-large
      box-shadow: none 
      background: $color-gray-verysoft
    .glide__bullets
      bottom: 0 
      button.glide__bullet
        box-shadow: none
        border: 1px solid $color-gray-soft
        padding: 6px
        &.glide__bullet--active
          background-color: $color-gray-soft
</style>