<template lang="pug">
.post-author
  .grid-center.post-author-header
    .col-6_sm-12
      .grid
        .col-8.post-author-header_author
          h1 {{ $route.params.username }}
          p Yogyakarta, Indonesia
        .col-4.post-author-header_avatar
          img(src="/v2/images/dummy-avatar.png", alt="this is avatar")
  .bg-soft-gray
    small-post-block(
      :postData="post.list[filter]",
      :loadMoreHandler="fetchMoreData"
    )
</template>

<style lang="sass" scoped>
@import "../../../../design/sass/color"
.post-author
  .post-author-header
    padding: 50px 0
    .post-author-header_author, .post-author-header_avatar
      padding: 0 32px
    .post-author-header_author
      h1
        margin: 0
      p
        margin-top: 10px
        color: $color-gray-soft
    .post-author-header_avatar
      text-align: right
      img
        width: 100px
        border-radius: 50%
  .post-author_list
    background-color: $color-white-main
</style>

<script>
import vue from "vue"
import * as TYPES from "../../../vuex/types"

import SmallPostBock from "../../../components/v2/blocks/SmallPostBlock"

vue.component("small-post-block", SmallPostBock)

export default {
  data() {
    return {
      filter: "posts-by-author",
    }
  },

  metaInfo() {
    return {
      title: `Post by "${this.$route.params.username}" - Mau Coding`,
      meta: [
        {
          vmid: "description",
          name: "description",
          content: `Post created by "${this.$route.params.username}" - Mau Coding`,
        },
      ],
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      const params = this.generateParams()
      return this.$store.dispatch(TYPES.GET_POSTS, params)
    },

    fetchMoreData() {
      const post = this.$store.state.post.list[this.filter].result
      let params = this.generateParams()
      params.lastupdatedon = post[post.length - 1].updated_on
      return this.$store.dispatch(TYPES.GET_POSTS, params)
    },

    generateParams() {
      return {
        filter: this.filter,
        query: {
          draft: false,
          username: this.$route.params.username,
        },
      }
    },
  },

  computed: {
    post() {
      return this.$store.state.post || {}
    },
  },
}
</script>