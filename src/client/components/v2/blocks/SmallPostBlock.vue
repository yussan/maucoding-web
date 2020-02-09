<template lang="pug">
  .small-post-block
    
    .grid-center(v-if="postData.result && postData.result.length > 0")
      .col-8_md-8_sm-12.post-search_header
        h2(style="font-size:20px") Found {{ postData.result.length || 0 }} of Many Posts
    
    .grid-center
      .col-8_md-8_sm-12.post-search_list
        //- looping post results
        .post-list(v-if="postData.result && postData.result.length > 0")  
          post-small-card(v-for="data, key in postData.result" :key="key" :data="data")
        
        //- load more button
        div
          big-button(
            v-if="typeof loadMoreHandler == 'function' && postData.status == 200 && !postData.loading" 
            type="button" 
            :onClick="loadMoreHandler" 
            text="More Posts")
        
        //- if get status not 200 from api
        div(v-if="postData.status && postData.status != 200 && !postData.loading")
          p.text-static {{ postData.message || "Post Not Available" }}

        //- loading component
        div(v-if="!postData.status || postData.loading")
          loader

        .m-t-30
    
</template>

<style lang="sass" scoped>
  @import "../../../../design/sass/color"
  .small-post-block
    padding: 32px
    .post-search_list, .post-search_header
      background-color: $color-white-main
      padding: 20px
    .post-search_header 
      padding-bottom: 20px !important 
      border-bottom: 1px solid $color-gray-verysoft
  
  p.text-static
    text-align: center
    margin: 0
    color: $color-gray-medium
  
  // responsiveness
  // xs
  @media (max-width: 36em)
    .small-post-block
      padding: 32px 0
  // sm
  @media (max-width: 48em)
    .small-post-block
      padding: 32px 0
</style>

<script>
import vue from "vue"
import PostSmallCard from "../cards/PostSmallCard"
import BigButton from "../buttons/FullWidthButton"
import Loader from "../loaders/index"

vue.component("post-small-card", PostSmallCard)
vue.component("big-button", BigButton)
vue.component("loader", Loader)

const props = ["postData", "loadMoreHandler"]

export default {
  props
}
</script>