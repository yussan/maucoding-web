<template lang="pug">
  .card-post-large 
    router-link(:to="`/post/${data.nospace_title}-${data._id}`")
      .card-post-large_thumb(:style="`background-image:url(${data.image.original})`")
      .card-post-large_meta
        .tag-post 
          router-link(v-for="tag, key in data.tags" :key="key"  :to="`/tag/${tag}`") {{ tag }}
        h2 {{ data.title }}
        .card-post-large_author
          router-link(:to="`/author/${data.author.username}`")
            img(:src="data.author.avatar.small" :alt="data.author.username")
            span.text {{ data.author.username }} · {{ epochToRelative(data.created_on || 0) }}

</template>

<style lang="sass" scoped>
  @import '../../../../design/sass/color'

  .card-post-large 
    margin-bottom: 40px
    // box-shadow: 0 2px 5px 1px rgba(0, 0, 0, .05)
    // &:hover 
    //   box-shadow: 0 3px 7px 2px rgba(0, 0, 0, .1)
    .card-post-large_thumb
      background-size: cover 
      background-position: center
      height: 450px
      width: 100% 
      border-radius: 15px
      border: 1px solid #f4f4f4
    .card-post-large_meta 
      padding: 20px 15px
      .tag-post 
        a 
          text-transform: uppercase
          color: $color-gray-medium
          border-bottom: 1px solid $color-red-main 
          margin-right: 10px
          padding-bottom: 5px 
          font-size: 14px
          line-height: 2
      h2 
        font-size: 37px
        font-weight: 700
        text-transform: capitalize


    .card-post-large_author 
      a
        color: $color-gray-medium !important
        span.text
          top: -9px;
          position: relative
      img 
        width: 30px
        height: 30px
        border-radius: 15px
        border: 1px solid #f4f4f4
        margin-right: 10px
    h2 
      color: $color-gray-dark
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