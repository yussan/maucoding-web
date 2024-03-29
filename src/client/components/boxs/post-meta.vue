<template lang="pug">
.post-meta
  router-link(:to="'/author/' + data.author.username")
    img.avatar(:src="data.author.avatar.small", alt="avatar user")
    .avatar-text
      | {{ toCamelCase(data.author.fullname) }}
      | &nbsp;•&nbsp;
      time {{ epochToRelative(data.created_on) }}
  .stats 
    span.stats-item
      a(href="javascript:;", @click="viewComments")
        span.icono-commentEmpty 
        span.disqus-comment-count(
          :data-disqus-identifier="'https://maucoding.com' + link",
          :data-disqus-url="'https://maucoding.com' + link"
        ) 0
        | &nbsp;
    span.stats-item
      span.icono-eye 
      | {{ data.views || 0 }}
    span.stats-item(
      v-if="typeof data.tags === 'object' && data.tags.length > 0"
    )
      span.icono-tag 
      span(v-for="(tag, key) in data.tags", :key="key") 
        router-link(:to="`/tag/${tag}`") {{ tag }}
        | {{ key < data.tags.length - 1 ? ', ' : '' }}
    span.stats-item
      span.icono-flag 
      | {{ data.lang == 'id' ? 'Bahasa Indonesia' : 'English' }}
</template>

<script lang="ts">
import vue from "vue"
import { injectScript } from "../../modules/dom"
import { epochToRelative } from "../../modules/datetime"
import { toCamelCase } from "string-manager"

// render disqus count
// see: https://help.disqus.com/developer/adding-comment-count-links-to-your-home-page
function renderDisqus(target: string = "") {
  console.log("render DISQUSWIDGETS :", target)
  setTimeout(() => {
    const { DISQUSWIDGETS }: any = window
    if (DISQUSWIDGETS) DISQUSWIDGETS.getCount({ reset: true })
  }, 1500)
}

export default vue.extend({
  name: "post-meta",

  props: ["data", "link"],

  methods: {
    toCamelCase(str) {
      return toCamelCase(str)
    },
    epochToRelative(epoch) {
      return epochToRelative(epoch)
    },
    viewComments() {
      const commentEl: any = document.getElementById("comment")
      commentEl.scrollIntoView({ behavior: "smooth" })
    }
  },

  watch: {
    link() {
      renderDisqus(`https://maucoding.com${this.link}`)
    }
  },

  created() {
    if (!(<any>window).DISQUSWIDGETS) {
      injectScript("//yussan-academy.disqus.com/count.js", {
        id: "dsq-count-scr",
        cb: () => {
          // waiting for DISQUS initialized
          renderDisqus(`https://maucoding.com${this.link}`)
        }
      })
    } else {
      renderDisqus(`https://maucoding.com${this.link}`)
    }
  }
})
</script>

<style lang="sass" scoped>
@import '../../../design/sass/color'
.post-meta
  color: $color-gray-dark !important
  [class*=icono-]
    color: $color-gray-dark !important
    margin-right: 10px
    zoom: 0.8
  img.avatar
    width: 35px
    height: 35px
    border-radius: 35px
    margin-bottom: -12.5px
    margin-right: 5px
    margin-bottom: 5px
    float: left
  .avatar-text
    padding: 5px 0
    time
      text-transform: capitalize
  .stats
    padding: 15px 0 10px
    .stats-item
      margin-right: 5px
</style>
