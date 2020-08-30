<template lang="pug">
.posts
  .grid-center.post-header
    .col-10_sm-12
      .grid
        .col-12
          h1 {{ title }}
  small-post-block(
    :postData="post.list[filter]",
    :loadMoreHandler="fetchMoreData"
  )
</template>

<script>
import vue from "vue"
import { router } from "../../../index"
import * as TYPES from "../../../vuex/types"

// components
import SmallPostBock from "../../../components/v2/blocks/SmallPostBlock"

vue.component("small-post-block", SmallPostBock)

export default {
  data() {
    const { title, description } = this.generateMeta(
      this.$route.params.tag_name
    )
    return {
      title,
      description,
      filter: "posts",
    }
  },

  created() {
    // first time load page, lets fetch some data
    this.fetchData()
  },

  watch: {
    $route(to) {
      const { params, query } = to
      const { title, description } = this.generateMeta(params.tag_name)
      this.title = title
      this.description = description

      // request new data
      const reqParams = this.generateParams(params.tag_name)
      return this.fetchData(reqParams)
    },
  },

  metaInfo() {
    const { title, description } = this.generateMeta(
      this.$route.params.tag_name
    )
    return {
      title,
      meta: [
        {
          vmid: "description",
          name: "description",
          content: description,
        },
      ],
    }
  },

  methods: {
    generateMeta(tag_name, q) {
      let meta = {
        title: "Available Posts - Mau Coding",
        description: "Available Mau Coding posts",
      }

      if (tag_name) {
        meta = {
          title: `Available Posts With Tag "${tag_name}" - Mau Coding`,
          description: `Available Mau Coding posts with tag "${tag_name}"`,
        }
      }

      return meta
    },

    generateParams(
      tag_name = this.$route.params.tag_name,
      q = this.$route.query.q
    ) {
      let params = { filter: this.filter, query: { draft: false, limit: 8 } }
      if (tag_name) params.query.tag = tag_name
      if (q) params.query.keyword = q
      return params
    },

    fetchData(params = this.generateParams()) {
      this.$store.dispatch(TYPES.GET_POSTS, params)
    },

    fetchMoreData() {
      const post = this.$store.state.post.list[this.filter].result
      let params = this.generateParams()
      params.query.lastupdatedon = post[post.length - 1].updated_on

      this.$store.dispatch(TYPES.GET_POSTS, params)
    },
  },

  computed: {
    post() {
      return this.$store.state.post || {}
    },
  },
}
</script>

<style lang="sass" scoped>
@import "../../../../design/sass/color"
.posts
  .post-header
    padding: 50px 0
    font-size: 20px
    h1
      font-size: 30px
      text-align: center
  // .posts-gray
  //   background-color: $color-gray-verysoft
</style>