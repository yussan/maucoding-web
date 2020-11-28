<template lang="pug">
  router-link.col-3_md-3_sm-6(:to="`/post/${data.nospace_title}-${data._id}`")
    .card-post-verysmall 
      .card-post-small_thumb(:style="`background-image:url(${data.image.small})`")
      h3 {{ data.title }}
      span.meta Posted {{ epochToRelative(data.created_on || 0) }}
</template>

<style lang="sass" scoped>
  @import '../../../../design/sass/color'

  .card-post-verysmall 
    margin-bottom: 30px
    font-size: 14px
    .card-post-small_thumb 
      height: 150px
      background-size: cover
      background-position: center
      border-radius: 10px
      border: 1px solid #f4f4f4
    h3 
      color: $color-gray-dark
      text-transform: capitalize
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