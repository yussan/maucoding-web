<template lang="pug">
  .post-search
    .grid-center.post-header
      .col-7_md-7_sm-12
        .grid
          .col-12.post-header_search
            .post-header_search_input
              i.icono-search 
              input(type="search" placeholder="Search here..." v-model="keyword" v-on:keyup="onKeyUp" :disabled="post.list[filter] && post.list[filter].loading") 
    .post-search-gray
      small-post-block(:postData="post.list[filter]")
              
</template>

<style lang="sass" scoped>
  @import "../../../../design/sass/color" 
  .post-search
    .post-header
      padding: 50px 0  
      .post-header_search 
        border-bottom: 1px solid $color-gray-medium 
        position: relative
        .post-header_search_input
          i.icono-search 
            position: absolute
            bottom: 9px
            zoom: 0.8
            color: $color-gray-dark
          input[type="search"] 
            color: $color-gray-dark
            border: none
            outline: none 
            width: 100%
            padding: 10px 10px 10px 35px
            font-size: 20px
            &:disabled 
              opacity: .5
              cursor: not-allowed
    .post-search-gray
      background-color: $color-gray-verysoft
</style>

<script>
import vue from "vue"
import * as TYPES from "../../../vuex/types"

import SmallPostBock from "../../../components/v2/blocks/SmallPostBlock"
import { router } from "../../../index"

vue.component("small-post-block", SmallPostBock)

export default {
  data() {
    return {
      keyword: this.$route.query.q || "",
      filter: "search-post"
    }
  },

  created() {
    this.fetchData()
  },

  metaInfo() {
    return {
      title: `Result search "${this.keyword}" - Yussan Academy`,
      meta: [
        {
          vmid: "description",
          name: "description",
          content: `Result search "${this.keyword}" - Yussan Academy`
        }
      ]
    }
  },

  watch: {
    $route(to) {
      const { path, query } = to
      this.keyword = query.q || ""
      return this.fetchData()
    }
  },

  methods: {
    onKeyUp(e) {
      if (e.keyCode == 13 && this.keyword != "") {
        router.push({ path: `/search?q=${this.keyword}` })
      }
    },

    fetchData(params = this.generateParams()) {
      this.$store.dispatch(TYPES.GET_POSTS, params)
    },

    fetchMoreData() {
      const post = this.$store.state.post.list[this.filter].result
      let params = this.generateParams()
      params.lastupdatedon = post[post.length - 1].updated_on

      this.$store.dispatch(TYPES.GET_POSTS, params)
    },

    generateParams() {
      return {
        filter: this.filter,
        query: {
          draft: false,
          keyword: this.keyword
        }
      }
    }
  },

  computed: {
    post() {
      return this.$store.state.post || {}
    }
  }
}
</script>