<template lang="pug">
.right-sidebar
  box-title(text="Popular Content")
  .right-sidebar_content(v-if="post.featured && post.featured.status == 200") 
    .right-sidebar_content_list(
      v-for="(data, key) in post.featured.result",
      :key="key"
    ) 
      router-link(:to="`/post/${data.nospace_title}-${data._id}`")
        .right-sidebar_content_list_thumb(
          :style="`background-image:url(${data.image.small})`"
        )
        strong {{ data.title }}
    router-link.more-link(:to="`/posts?featured=1`")
      | Show more popular content

  .m-t-30 

  box-title(text="Popular Tags")
  p
    tag-button(v-for="(tag, key) in popularTags", :key="key", :text="tag")
</template>

<style lang="sass" scoped>
@import '../../../../design/sass/color'

.right-sidebar
  padding: 0 10px
  .right-sidebar_content
    margin: 20px 0
    .right-sidebar_content_list
      width: 100%
      margin: 20px 0 -4px
      display: inline-block
      &:first-child
        margin-top: 0
      a
        font-weight: bold
        color: $color-gray-dark
      .right-sidebar_content_list_thumb
        background-size: cover
        background-position: center
        width: 90px
        height: 60px
        float: left
        margin: 0 20px 10px 0
        &.app_thumb
          width: 45px
          height: 45px
    a.more-link
      color: $color-gray-dark
      text-align: center
      display: block
      padding: 10px 0
      font-size: 14px
      border-top: 1px solid $color-gray-verysoft
      border-bottom: 1px solid $color-gray-verysoft
      margin: 20px 0
</style>

<script>
import vue from "vue"
import * as TYPES from "../../../vuex/types"

import TagButton from "../buttons/TagButton"
import BoxTitle from "../headings/box-title"

const DUMMY_POPULAR_TAGS = [
  "javascript",
  "python",
  "reactjs",
  "vuejs",
  "machine learning",
  "third party",
  "api",
  "tensorflow",
  "frontend",
  "progresive web app",
  "web core vite",
  "seo",
  "web assembly",
  "webpack",
  "rollup",
  "svelte",
  "brew",
  "mongodb",
  "redis",
]

vue.component("box-title", BoxTitle)
vue.component("tag-button", TagButton)

export default {
  name: "sidebar-right",
  data() {
    return {
      popularTags: DUMMY_POPULAR_TAGS,
    }
  },
  created() {
    this.$store.dispatch(TYPES.GET_POSTS, {
      filter: "featured",
      query: {
        featured: true,
        draft: false,
        limit: 8,
      },
    })
  },
  computed: {
    post() {
      return this.$store.state.post.list || {}
    },
  },
}
</script>