<template lang="pug">
div
  .posts-block(v-if="postData.result && postData.result.length > 0")
    div(v-for="data, key in postData.result" :key="key")
      post-card-small(v-if="key == 0 || key % 3 != 0" :data="data")
      post-card-large(v-else :data="data")

  //- loading component
  div(v-if="!postData || !postData.status || postData.loading")
    loading

  //- if get status not 200 from api
  div(v-if="postData.status && postData.status.message && postData.status != 200")
    p {{ postData.status.message }}
</template>

<style lang="sass" scoped>

</style>

<script>
import vue from "vue"
import PostCardLarge from "../cards/PostLargeCard"
import PostCardSmall from "../cards/PostSmallCard"
import Loading from "../loaders/index"

const props = ["postData", "removeFirst"]

vue.component("post-card-large", PostCardLarge)
vue.component("post-card-small", PostCardSmall)
vue.component("loading", Loading)

export default {
  props

  // watch: {
  //   postData(val) {
  //   }
  // }
}
</script>
