<template lang="pug">
  footer 
    .container-medium 
      .grid
        .col-6_sm-12
          .link-collection 
            router-link(to='/static/about') About Academy 
            | |&nbsp;
            router-link(to='/static/terms-conditions') Terms and Conditions 
            | |&nbsp;
            router-link(to='/static/privacy-policy') Privacy Policy 
            | |&nbsp;
            a(href='https://docs.google.com/forms/d/e/1FAIpQLSeByAgx7GNG3YyH3vgAupKymlwfJ6mNNaGCQN0ZkG1KC8636A/viewform' target="_blank") Contact Us
          p
            strong Yussan Academy 
            | Tech from Engineer Perspective.
            br 
            | Powered by 
            a(href='https://yussanmediagroup.com' rel='noreferer noopener' target='_blank') Yussan Media Group
        
        .col-6_sm-12
          .change-language 
            span Change language : 
            strong 
              a(href="/id" v-bind:class="{active: this.selected_lang == 'id'}") ID
            strong 
              a(href="/en" v-bind:class="{active: this.selected_lang == 'en'}") EN
          .link-social
            a(href="https://www.youtube.com/channel/UCKLQUv8n3OadK5mkYpmZiyA" title="Yussan Academy Youtube" target="_blank" rel="noopener noreferrer" style="margin-right: 10px")
              span.icono-youtube
            a(href="https://instagram.com/yussanacademy" title="Yussan Academy Instagram" target="_blank" rel="noopener noreferrer" style="margin-right: 6px")
              span.icono-instagram 
            a(href="https://twitter.com/yussanacademy" title="Yussan Academy Twitter" target="_blank" rel="noopener noreferrer" style="margin-right: -2px")
              span.icono-twitter 
            a(href="https://facebook.com/yussanacademy" title="Yussan Academy Facebook" target="_blank" rel="noopener noreferrer")
              span.icono-facebook
            a(href="/feed" target="_blank" title="Yussan Academy Feed" rel="noopener noreferrer")
              span.icono-rss 
              

    // go to top button
    a#button-gototop.button-gototop(href="javascript:;" v-on:click="goToTop" :class='!show_btngototop ? "hide" : "" ')
      span.icono-caretUp
      small Back to Top
</template>

<script lang="ts">
import Vue from "vue"

const defaultProps = ["route"]

// add SELECTED_LANG property on window
declare global {
  interface Window {
    SELECTED_LANG: string
  }
}

export default Vue.extend({
  data() {
    return {
      show_btngototop: false,
      selected_lang: ""
    }
  },

  mounted() {
    this.selected_lang = window.SELECTED_LANG || "id"
    document.addEventListener("scroll", e => {
      const position = window.scrollY
      if (position > 218) {
        // show navbar
        this.show_btngototop = true
      } else {
        // hide navbar
        this.show_btngototop = false
      }
    })
  },

  methods: {
    goToTop() {
      const target: any = document.getElementsByClassName("main-nav_logo")[0]
      target.scrollIntoView({
        behavior: "smooth"
      })
    }
  },

  props: defaultProps
})
</script>


<style lang="sass" scoped>
  @import '../../design/sass/color'

  footer 
    padding: 3em 0 2em
    background-color: $color-gray-verysoft
    color: $color-gray-medium
    font-weight: 300
    line-height: 1.6
    font-size: 13px

    a 
      color: $color-gray-medium

    .change-language 
      margin-bottom: 20px
      a 
        margin-left: 10px
      a.active 
        border-bottom: 2px solid $color-gray-soft 
      text-align: right

    .link-social 
      float: right
      [class*=icono]
        color: $color-gray-medium


    // button go to top
    .button-gototop
      &.hide
        bottom: -200px
      transition: all .5s ease
      position: fixed
      bottom: 10px
      right: 10px
      background: $color-white-main
      color: $color-gray-medium
      border-radius: 20px
      padding: 5px 15px 5px 5px
      cursor: pointer
</style>

