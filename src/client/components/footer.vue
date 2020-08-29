<template lang="pug">
footer 
  .container-medium 
    .grid
      .col-6_sm-12
        .link-collection 
          router-link(to="/static/about") About Mau Coding&nbsp;
          | |&nbsp;
          router-link(to="/static/terms-conditions") Terms and Conditions&nbsp;
          | |&nbsp;
          router-link(to="/static/privacy-policy") Privacy Policy&nbsp;
          | |&nbsp;
          a(
            href="https://docs.google.com/forms/d/e/1FAIpQLSeByAgx7GNG3YyH3vgAupKymlwfJ6mNNaGCQN0ZkG1KC8636A/viewform",
            target="_blank"
          ) Contact Us
        p
          strong Mau Coding&nbsp;
          | Tech from Engineer Perspective.
          br 
          | Powered by&nbsp;
          a(
            href="https://yussanmediagroup.com",
            rel="noreferer noopener",
            target="_blank"
          ) Yussan Media Group

      .col-6_sm-12
        .link-social
          a(
            href="https://wa.me/6285156934428?text=Ada%20pertanyaan%20seputar%20produk%20Yussan%20Media%20Group%2C%20bisa%20disini.",
            title="contact Whatsapp",
            target="_blank",
            rel="noopener noreferrer",
            style="margin-right: 10px"
          )
            span.icono-commentEmpty
          a(
            href="https://www.youtube.com/channel/UCKLQUv8n3OadK5mkYpmZiyA",
            title="Mau Coding Youtube",
            target="_blank",
            rel="noopener noreferrer",
            style="margin-right: 10px"
          )
            span.icono-youtube
          a(
            href="https://instagram.com/maucoding",
            title="Mau Coding Instagram",
            target="_blank",
            rel="noopener noreferrer",
            style="margin-right: 6px"
          )
            span.icono-instagram 
          a(
            href="https://twitter.com/maucoding",
            title="Mau Coding Twitter",
            target="_blank",
            rel="noopener noreferrer",
            style="margin-right: -2px"
          )
            span.icono-twitter 
          a(
            href="https://facebook.com/maucoding",
            title="Mau Coding Facebook",
            target="_blank",
            rel="noopener noreferrer"
          )
            span.icono-facebook
          a(
            href="/feed",
            target="_blank",
            title="Mau Coding Feed",
            rel="noopener noreferrer"
          )
            span.icono-rss 

  // go to top button
  a#button-gototop.button-gototop(
    href="javascript:;",
    v-on:click="goToTop",
    :class="!show_btngototop ? 'hide' : ''"
  )
    span.icono-caretUp
</template>

<script lang="ts">
import vue from "vue"

const defaultProps = ["route"]

// add SELECTED_LANG property on window
declare global {
  interface Window {
    SELECTED_LANG: string
  }
}

export default vue.extend({
  data() {
    return {
      show_btngototop: false,
      selected_lang: "",
    }
  },

  mounted() {
    this.selected_lang = window.SELECTED_LANG || "id"
    document.addEventListener("scroll", (e) => {
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
        behavior: "smooth",
      })
    },
  },

  props: defaultProps,
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

  a
    color: $color-gray-medium

  .change-language
    text-align: right
    margin-bottom: 20px
    a
      margin-left: 10px
    a.active
      border-bottom: 2px solid $color-gray-soft

  .link-social
    float: right
    [class*=icono]
      color: $color-gray-medium

.button-gototop
  bottom: 10px
  transition: all .5s ease
  position: fixed
  right: 10px
  border-radius: 20px
  padding: 5px
  cursor: pointer
  &.hide
    bottom: -200px
  span
    color: $color-gray-dark
</style>

