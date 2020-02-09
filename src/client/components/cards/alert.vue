<template lang="pug">
  .alert(:class='type')
   | {{ message }}
</template>

<script lang="ts">
import vue from "vue"
export default vue.extend({
  name: "alert",
  props: {
    type: {
      type: String
    },
    message: {
      type: String
    }
  }
})
</script>


<style lang="sass">
@import '../../../design/sass/color'

.alert 
  padding: 1em
  color: $color-white-main
  &.error 
    background-color: $color-red-main
</style>
