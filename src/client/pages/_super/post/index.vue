<template lang='pug'>
.super-posts-list
  header-tag(title="All Posts")
  //- searh post by title
  input-text(
    name="keyword",
    placeholder="search post",
    :data="formdata",
    :onchange="changeTextHandler",
    :onkeydown="keyDownTextHandler"
  )
  //- post list
  super-box-post(:data="post.list[filter] || {}") 
  br
  //- big button to load more post
  big-button(
    v-if="post.list[filter] && post.list[filter].status && post.list[filter].status === 200",
    :loading="post.list[filter].loading",
    :onclick="() => morePosts()",
    type="blue",
    text="more posts"
  )
</template>

<script>
import vue from "vue"
import { mapState } from "vuex"
import * as TYPES from "../../../vuex/types"

// components
import { router } from "../../../index"
import header from "../../../components/cards/header-tag.vue"
import superboxpost from "../../../components/boxs/super-post.vue"
import inputtext from "../../../components/form/input-text.vue"
import bigbutton from "../../../components/form/button-big.vue"

vue.component("header-tag", header)
vue.component("super-box-post", superboxpost)
vue.component("input-text", inputtext)
vue.component("big-button", bigbutton)

export default vue.extend({
  name: "super-posts-list",

  metaInfo() {
    return {
      title: "Posts - Mau Coding Super",
      meta: [
        {
          vmid: "description",
          name: "description",
          content: "List posts on Mau Coding super page",
        },
      ],
    }
  },

  data() {
    return {
      filter: "post_all",
      formdata: {
        keyword: this.$route.query.q || "",
      },
    }
  },

  methods: {
    changeTextHandler(e) {
      const { name, value } = e.target

      let nextformdata = this.formdata
      nextformdata[name] = value

      this.formdata = Object.assign({}, nextformdata)
    },

    keyDownTextHandler(e) {
      this.changeTextHandler(e)
      if (e.keyCode === 13) {
        // redirect
        if (this.formdata.keyword) {
          return router.push({
            path: `/super/posts?q=${this.formdata.keyword}`,
          })
        } else {
          return router.push({ path: `/super/posts` })
        }
      }
    },

    fetchPosts(force = false) {
      let params = this.generateParams()
      const posts = this.post[this.filter] || {}
      if (!posts.status || force) this.$store.dispatch(TYPES.GET_POSTS, params)
    },

    morePosts() {
      console.log("show more post...")
      const post = this.$store.state.post.list[this.filter].result
      let params = this.generateParams()
      params.lastupdatedon = post[post.length - 1].updated_on

      // fetch lattest created on
      this.$store.dispatch(TYPES.GET_POSTS, params)
    },

    generateParams() {
      const { q } = this.$route.query

      let params = {
        filter: this.filter,
      }
      if (q) params.keyword = q
      return params
    },
  },

  watch: {
    ["$route.query.q"]() {
      console.log("q", this.$route.query.q)
      return this.fetchPosts()
    },
  },

  mounted() {
    return this.fetchPosts()
  },

  computed: {
    post() {
      return this.$store.state.post || {}
    },
  },
})
</script>
