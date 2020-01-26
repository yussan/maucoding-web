<template lang="pug">
  router-link(:to="`/post/${data.nospace_title}-${data._id}`")
    .card-post-small 
      .card-post-small_thumb(:style="`background-image:url(${data.image[600]})`")
      .card-post-small_meta 
        h3 {{ data.title }}
        p {{ data.plain_content }}
        .card-post-small_author
          router-link(:to="`/a/${data.author.username}`")
            img(:src="data.author.avatar.small" :alt="data.author.username")
            span.text {{ data.author.username }} · {{ epochToRelative(data.created_on || 0) }}
</template>

<style lang="sass" scoped>
  @import '../../../../design/sass/color'

  .card-post-small
    width: 100%
    margin-bottom: 30px
    display: inline-flex
    .card-post-small_thumb 
      margin-right: 30px
      width: 350px  
      height: 200px 
      background-size: cover 
      background-position: center  
    .card-post-small_meta 
      width: calc(100% - 400px)
      h3 
        margin-top: 0
        color: $color-gray-dark
        text-transform: capitalize
        line-height: 31.5px 
        font-size: 21px
      p
        max-height: 110px
        overflow: hidden
    .card-post-small_author 
      a
        color: $color-gray-medium !important
        span.text
          top: -5px
          position: relative
          font-size: 14px
      img 
        width: 20px
        height: 20px
        border-radius: 20px
        margin-right: 10px 

  // responsiveness
  // xs
  // @media (max-width: 36em)
   
  // sm
  @media (max-width: 48em)
    .card-post-small
      display: block
      .card-post-small_thumb  
        width: 100%
        margin-right: 0
        margin-bottom: 30px
      .card-post-small_meta 
        width: 100% 
</style>

<script>
import { epochToRelative } from "../../../modules/datetime"

const props = ["data"]
export default {
  props,
  methods: {
    epochToRelative(epochtime) {
      return epochToRelative(epochtime)
    }
  }
}
</script>