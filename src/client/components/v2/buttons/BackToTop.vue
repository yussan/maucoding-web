<template lang="pug">
  button.back-to-top#back-to-top(@click="goToTop" type="button") 
    span.icono-caretUp
</template>

<style lang="sass" scoped>
  @import '../../../../design/sass/color'

  button.back-to-top
    position: fixed 
    bottom: 20px
    right: 20px
    border: 1px solid $color-gray-medium
    color: $color-gray-medium
    background: transparent
    border-radius: 100%
    height: 50px
    width: 50px
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    outline: none
    opacity: 0
    transition: opacity 1s ease
    .icono-caretUp 
      color: $color-gray-medium
      margin-bottom: 10px
</style>

<script>
export default {
  data() {
    return {
      btnEl: null,
      lastScrollTop: 0
    }
  },

  mounted() {
    // save btn to top element to state
    this.btnEl = document.getElementById("back-to-top")

    let { btnEl, lastScrollTop } = this

    // scroll listener
    document.addEventListener("scroll", function(e) {
      // check scroll direction
      // ref: https://stackoverflow.com/a/31223774/2780875
      // get scrolltop
      const st = window.pageYOffset || document.documentElement.scrollTop
      // show button if downscroll and scrolldown > 300px
      if (st > lastScrollTop && st > 300) {
        // downscroll
        btnEl.style.opacity = 1
      } else {
        // upscroll
        btnEl.style.opacity = 0
      }
      lastScrollTop = st <= 0 ? 0 : st // For Mobile or negative scrolling
    })
  },

  methods: {
    goToTop() {
      document.getElementById("main-nav").scrollIntoView({
        behavior: "smooth"
      })
    }
  }
}
</script>
