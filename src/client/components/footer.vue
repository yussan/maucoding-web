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
            strong Id More Academy 
            | More things available
            br 
            | Powered by 
            a(href='https://byidmore.com' target='_blank') Id More
        
        .col-6_sm-12
          .change-language 
            span Change language : 
            strong 
              a(href="/id" v-bind:class="{active: this.selected_lang == 'id'}") ID
            strong 
              a(href="/en" v-bind:class="{active: this.selected_lang == 'en'}") EN
          .link-social
            a(href="https://facebook.com/oopsreview" target="_blank")
              span.icono-facebook
            a(href="https://twitter.com/oopsreview" target="_blank")
              span.icono-twitter 
            a(href="https://academy.byidmore.com/feed" target="_blank")
              span.icono-rss 

    // go to top button
    a#button-gototop.button-gototop(href="javascript:;" v-on:click="goToTop" :class='!show_btngototop ? "hide" : "" ')
      span.icono-caretUp
      small Back to Top
</template>

<script lang="ts">
import Vue from 'vue'

const defaultProps = ['route']

// add SELECTED_LANG property on window
declare global {
  interface Window { SELECTED_LANG: string; }
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
    document.addEventListener('scroll', (e) => {
      const position = window.scrollY
      if(position > 218) {
        // show navbar
        this.show_btngototop = true
      }else {
        // hide navbar
        this.show_btngototop = false
      }
    })
  },

  methods: {
    goToTop() {
      const target: any = document.getElementById("logo")
      target.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }
  },
  
  props: defaultProps
})
</script>


<style lang="sass" scoped>
  @import '../../design/sass/color'

  footer 
    border-top: 1px solid $color-gray-medium
    padding: 2em 0
    background-color: $color-black-main
    color: $color-gray-soft
    font-weight: 300
    a 
      color: $color-gray-soft
      &:hover
        color: $color-white-main

    .change-language 
      margin-bottom: 20px
      a 
        margin-left: 10px
      a.active 
        border-bottom: 2px solid $color-gray-soft 
      text-align: right

    .link-social 
      float: right

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
      &:hover 
        color: $color-gray-medium
      border-radius: 20px
      padding: 5px 15px 5px 5px
      cursor: pointer
</style>

