<template lang="pug">
  layout
    .post-detail(slot="main-content")

      div(v-if="typeof post.detail[id] !== 'undefined'") 

        div(v-if="post.detail[id].status === 200")

          //- post detail 

          .post-detail_tags
            span(v-for="tag, key in post.detail[id].tags" :key="key") 
              router-link(:to="`/tag/${tag}`") {{ tag }}
              span.tag-divider(v-if="key < post.detail[id].tags.length - 1") /&nbsp;

          .m-t-50
          
          .grid-no-gutters.meta-box
            .col-6_sm-12.meta-box__left
              .post-detail_author 
                router-link(:to="`/author/${post.detail[id].author.username}`")
                  img(:src="post.detail[id].author.avatar.small" :alt="post.detail[id].author.username")
                  span.text {{ post.detail[id].author.username }} · {{ epochToRelative(post.detail[id].created_on) }}
            .col-6_sm-12.meta-box__right
              .post-detail_meta-icon
                span.post-detail_meta-icon_item(href="")
                  i.icono-eye 
                  | {{ post.detail[id].views }}
                a.post-detail_meta-icon_item(href="javascript:;" @click="jumpToDivId('comment')")
                  i.icono-commentEmpty
                  span.disqus-comment-count(:data-disqus-identifier="'https://yussanacademy.com' + link" :data-disqus-url="'https://yussanacademy.com' + link") 0
                a.post-detail_meta-icon_item(style="zoom:0.7" href="javascript:;" @click="jumpToDivId('share')")
                  i.icono-share
                  | &nbsp;
                  
          .post-detail_content
            h1 {{ post.detail[id].title }}
            .m-t-50

            .post-detail_content_thumb 
              img(:src="post.detail[id].image.original" :alt="post.detail[id].title")

            article.post-detail_content_html(v-if="post.detail[id].content" v-html="post.detail[id].content") 

            .m-t-50

            strong Related Apps :
            app

            br

            share-social(:url="`https://oopsreview.com${link}`") 

            .m-t-50

            box-title(text="Recommended Content")
            .m-t-30
            recommended-post(:data="post.list.related || {}")

            .m-t-50
            box-title(text="Comments")
            .m-t-30
            comment(:link="link") 

          //- end of post detail

        div(v-else)
          h1 {{ post.detail[id].message }}
      
      div(v-else)
        loading
      
        .m-t-50


</template>

<style lang="sass" scoped>
  @import '../../../../design/sass/color'

  .post-detail 

    .meta-box
      zoom: 0.9
      .meta-box__right 
        text-align: right

    .post-detail_tags 
      margin-bottom: 30px
      a 
        text-transform: uppercase
        color: $color-gray-dark
        border-bottom: 1px solid $color-gray-dark 
        margin-right: 10px
        padding-bottom: 5px 
        font-size: 14px
      span.tag-divider
        color: $color-gray-medium
    
    .post-detail_author 
      a
        color: $color-gray-medium !important
        span.text
          top: -9px;
          position: relative
      img 
        width: 30px
        height: 30px
        border-radius: 15px
        margin-right: 10px
    
    .post-detail_content 
      h1 
        margin-top: 10px
        margin-bottom: 50px
        font-size: 37px
      article.post-detail_content_html 
        margin-top: 50px
        font-size: 18px
        line-height: 1.8
        overflow-wrap: break-word 
        word-break: break-word
        text-size-adjust: 100%
        /deep/ pre
          white-space: pre-wrap
          white-space: -moz-pre-wrap
          white-space: -pre-wrap
          white-space: -o-pre-wrap
          word-wrap: break-word
          background: #f4f4f4
          padding: 10px
        /deep/ img
          display: block !important
          margin: 0 auto !important
          max-width: 100% !important
          
      .post-detail_content_thumb  
        img 
          width: 100%

    .post-detail_meta-icon_item
      margin-right: 10px
      color: $color-gray-medium
      // ref: https://stackoverflow.com/a/5110337/2780875
      i[class^="icono"]
        zoom: 0.8
        margin-right: 8px
        color: $color-gray-medium

    // responsiveness
    // sm
    @media (max-width: 48em)
      .meta-box 
        .meta-box__right 
          text-align: left
  
</style>

<script>
import vue from "vue"
import host from "../../../../config/host"
import * as TYPES from "../../../vuex/types"
import { injectScript } from "../../../modules/dom"
import { toCamelCase, truncate, stripTags } from "string-manager"
import { epochToRelative } from "../../../modules/datetime"

// components
import Layout from "../../../layouts/v2/public-layout"
import BoxTitle from "../../../components/v2/headings/box-title"
import RecommendedPost from "../../../components/v2/blocks/RecommendedPostBlock"
import Comment from "../../../components/boxs/comment"
import ShareSocial from "../../../components/v2/blocks/Share"
import Loading from "../../../components/cards/global-loader.vue"
import App from "../../../components/v2/cards/App"

vue.component("layout", Layout)
vue.component("box-title", BoxTitle)
vue.component("recommended-post", RecommendedPost)
vue.component("comment", Comment)
vue.component("share-social", ShareSocial)
vue.component("loading", Loading)
vue.component("app", App)

// render disqus count
// see: https://help.disqus.com/developer/adding-comment-count-links-to-your-home-page
function renderDisqus(target) {
  console.log("render DISQUSWIDGETS :", target)
  setTimeout(() => {
    const { DISQUSWIDGETS } = window
    if (DISQUSWIDGETS) DISQUSWIDGETS.getCount({ reset: true })
  }, 1500)
}

export default {
  data() {
    return {
      title: this.$route.params.title,
      link: `/post/${this.$route.params.title}`
    }
  },

  metaInfo() {
    if (typeof this.post.detail[this.id] !== "undefined") {
      if (this.post.detail[this.id].status === 200) {
        const description = truncate(
          stripTags(this.post.detail[this.id].content),
          500,
          "..."
        )
        return {
          title: toCamelCase(this.post.detail[this.id].title),
          meta: [
            {
              vmid: "description",
              name: "description",
              content: description
            }
          ]
        }
      } else {
        return {
          title: "Page Not Found",
          meta: [
            {
              vmid: "description",
              name: "description",
              content: "Are you lost, click link bellow to acccess other page"
            }
          ]
        }
      }
    } else {
      return {}
    }
  },

  mounted() {
    if (!window.DISQUSWIDGETS) {
      injectScript("//yussan-academy.disqus.com/count.js", {
        id: "dsq-count-scr",
        cb: () => {
          // waiting for DISQUS initialized
          renderDisqus(`https://yussanacademy.com${this.link}`)
        }
      })
    } else {
      renderDisqus(`https://yussanacademy.com${this.link}`)
    }
  },

  created() {
    const title_arr = this.$route.params.title.split("-")
    const id = title_arr[title_arr.length - 1]
    this.fetchPostDetail(id)
    this.fetchPostRelated(id)
  },

  watch: {
    $route() {
      const { title } = this.$route.params
      if (title != this.title) {
        this.title = title
        this.link = `/post/${title}`

        // request data
        const title_arr = this.$route.params.title.split("-")
        const id = title_arr[title_arr.length - 1]
        this.fetchPostDetail(id)
        this.fetchPostRelated(id)
      }
    }
  },

  methods: {
    jumpToDivId(targetId) {
      return document.getElementById(targetId).scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      })
    },

    toCamelCase(str) {
      return toCamelCase(str)
    },
    epochToRelative(epoch) {
      return epochToRelative(epoch)
    },
    fetchPostDetail(id) {
      this.id = id
      this.$store.dispatch(TYPES.GET_POST, id)
    },
    fetchPostRelated(id) {
      this.$store.dispatch(TYPES.GET_POSTS, {
        filter: "related",
        query: {
          limit: 4,
          draft: false,
          notid: id
        }
      })
    }
  },

  computed: {
    post() {
      return this.$store.state.post || {}
    }
  }
}
</script>
