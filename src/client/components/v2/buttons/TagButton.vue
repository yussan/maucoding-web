<template lang="pug">
  router-link(:to="`/tag/${text}`") 
    | {{ text }}
</template>

<style lang="sass" scoped>
  @import '../../../../design/sass/color'
  a
    &:hover 
      background-color: $color-gray-verysoft
    padding: 5px 0
    margin-bottom: 5px
    border-bottom: 1px solid #9e9e9e
    display: inline-block
    margin-right: 10px
</style>

<script>
const props = ["text"]

export default {
  props
}
</script>