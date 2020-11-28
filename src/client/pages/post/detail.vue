<template lang="pug">
  div(v-if="typeof post.detail[id] !== 'undefined'")

    .m-t-30

    div(v-if="post.detail[id].status === 200")
      .post-detail.bg-white
        .container
          .grid
            .col-8_md-12(data-push-left="off-2_md-0")
              h1 {{ toCamelCase(post.detail[id].title) }}
              box-meta(:data="post.detail[id]" :link='link')
          
          .grid 
            .col-8_md-12(data-push-left="off-2_md-0")
              app-card(v-if="post.detail[id].app._id" :data="post.detail[id]" :app="post.detail[id].app")
          
          .grid 
            .col-12.post-detail-mainimage
              .m-t-50

              //- if have video show iframe
              .post-detail-video(v-if="post.detail[id].video") 
                iframe(:src="post.detail[id].video")
              //- end of iframe

              //- main image
              img(v-if="!post.detail[id].video" :src="post.detail[id].image.original")
              //- end of main image

            .col-8_md-12(data-push-left="off-2_md-0")
              .m-t-50
              article.post-detail-content
                div(v-html="post.detail[id].content")

          .grid 
            .col-8_md-12(data-push-left="off-2_md-0")
              .m-t-50
              comment(:link='link') 

          .grid.p-t-2 
            .col-12
              box-title(text="Recommended Content")
              .p-t-2 
              recommended-post(:data="post.list.latest_detail || {}")
            
    div(v-else)
      .m-t-30
      error-box

  div(v-else)
    .m-t-30
    loader


</template>

<script>
import vue from "vue"
import host from "../../../config/host"
import * as TYPES from "../../vuex/types"
import { injectCss, injectScript } from "../../modules/dom"
import { mapState } from "vuex"
import { toCamelCase, truncate, stripTags } from "string-manager"
import { epochToRelative } from "../../modules/datetime"

// components
import BoxTitle from "../../components/v2/headings/box-title.vue"
import RecommendedPost from "../../components/v2/blocks/RecommendedPostBlock.vue"
import comment from "../../components/boxs/comment.vue"
import meta from "../../components/boxs/post-meta.vue"
import ErrorBox from "../error/index.vue"
import Loader from "../../components/loaders/index.vue"
import AppCard from "../../components/cards/post-app.vue"

vue.component("app-card", AppCard)
vue.component("comment", comment)
vue.component("box-meta", meta)
vue.component("error-box", ErrorBox)
vue.component("Loader", Loader)
vue.component("box-title", BoxTitle)
vue.component("recommended-post", RecommendedPost)

export default vue.extend({
  name: "post-detail",

  // metaInfo: this.meta,

  data() {
    // const title_arr = this.$route.params.title.split("-")
    return {
      link: `/post/${this.$route.params.title}`,
      meta: {
        title: "Tech from Engineer Perspective",
        description:
          "Here we are not only focused on making tech products. But it also makes technology accessible, affordable and easy for everyone to learn.",
      },
      id: 0,
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
              content: description,
            },
          ],
        }
      } else {
        return {
          title: "Page Not Found",
          meta: [
            {
              vmid: "description",
              name: "description",
              content: "Are you lost, click link bellow to acccess other page",
            },
          ],
        }
      }
    } else {
      let { title } = this.$route.params
      const title_arr = title.split("-")
      const id = title_arr[title_arr.length - 1]
      title = title.replace(/-/g, " ")
      return {
        title: `${title.replace(` ${id}`, "")} - Mau Coding`,
        meta: [
          {
            vmid: "description",
            name: "description",
            content: `Post detail on Mau Coding with title ${title}`,
          },
        ],
      }
    }
  },

  created() {
    // inject primsjs
    this.injectCss("/vendors/prismjs/prismjs.css")
    this.injectScript("/vendors/prismjs/prismjs.js")

    const title_arr = this.$route.params.title.split("-")
    const id = title_arr[title_arr.length - 1]
    this.fetchPostDetail(id)
    this.fetchPostRelated(id)
  },

  methods: {
    injectCss,
    injectScript,
    toCamelCase,
    epochToRelative,
    fetchPostDetail(id) {
      this.id = id
      this.$store.dispatch(TYPES.GET_POST, id)
    },
    fetchPostRelated(id) {
      this.$store.dispatch(TYPES.GET_POSTS, {
        filter: "latest_detail",
        limit: 4,
        draft: false,
        notid: id,
      })
    },
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
    },
  },

  computed: mapState(["post"]),
})
</script>

<style lang="sass">
@import '../../../design/sass/size'
@import '../../../design/sass/color'

.post-detail
  h1
    font-size: $size-text-large
  .post-detail-mainimage
    text-align: center
    img
      max-width: 100%
      border-radius: 15px
  .post-detail-video
    background: $color-black-main
    margin-bottom: 50px
    padding: 0
    height: 500px
    iframe
      border: none
      margin: 0
      height: 100%
      width: -webkit-fill-available
      width: -moz-available
  article.post-detail-content
    line-height: 1.8
    a
      color: $color-gray-soft
      text-decoration: underline
      word-wrap: break-word
    h2
      margin-top: 50px
      border-top: 1px solid gray
      border-bottom: 1px solid gray
      padding: 10px
      text-align: center
    h3
      margin-top: 50px
      // text-align: center
      line-height: 1.8
      letter-spacing: .3px
      font-size: 1.1em
    img
      max-width: 100%
      text-align: center
      display: block
      margin: 2.5em auto
      border-radius: 15px
    br
      display: block
      margin: 1em 0
</style>
