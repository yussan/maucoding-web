<template lang="pug">
  layout
    div(slot="main-content")

      slider(v-if="post.featured && post.featured.result && post.featured.result.length > 0" :total="post.featured && post.featured.result ? post.featured.result.length : 0")
        post-card-large.glide__slide(slot="slider-item" v-for="post, key in post.featured.result" :data="post" :key="key")
      
      .m-t-30(v-if="post.featured && post.featured.result && post.featured.result.length > 0")

      box-title(text="Latest Post")
      
      .m-t-50
      
      post-block(removeFirst="true" :postData="post.latest")

      full-button(v-if="post.latest.result && post.latest.result.length > 0" to="/posts" text="More Posts")

      .m-t-30

</template>

<script>
import Vue from "vue"
import DefaultMeta from "../../../../config/metainfo"
import * as TYPES from "../../../vuex/types"

// components
import Slider from "../../../components/v2/blocks/Slider"
import Layout from "../../../layouts/v2/public-layout"
import PostBlock from "../../../components/v2/blocks/PostBlock"
import PostCardLarge from "../../../components/v2/cards/PostLargeCard"
import BoxTitle from "../../../components/v2/headings/box-title"
import FullWidthButton from "../../../components/v2/buttons/FullWidthButton"
import GA from "../../../components/v2/cards/ads"

Vue.component("post-card-large", PostCardLarge)
Vue.component("post-block", PostBlock)
Vue.component("box-title", BoxTitle)
Vue.component("layout", Layout)
Vue.component("full-button", FullWidthButton)
Vue.component("ga", GA)
Vue.component("slider", Slider)

export default {
  metaInfo() {
    return {
      title: DefaultMeta.title,
      meta: [
        {
          vmid: "description",
          name: "description",
          content: DefaultMeta.description
        }
      ]
    }
  },

  created() {
    this.$store.dispatch(TYPES.GET_POSTS, {
      filter: "latest",
      query: {
        limit: 16,
        draft: false
      }
    })
  },

  computed: {
    post() {
      return this.$store.state.post.list || {}
    }
  }
}
</script>
