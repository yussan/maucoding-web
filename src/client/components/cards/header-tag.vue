<template lang="pug">
.header-tag
  h1 {{ title }}
  .subtitle(v-html="subtitle")
</template>

<script lang="ts">
import Vue from "vue"

const props = {
  title: {
    type: String,
    default: ""
  },
  subtitle: {
    type: String,
    default: ""
  }
}

export default Vue.extend({
  name: "header-tag",
  props
})
</script>

<style lang="sass">
@import '../../../design/sass/color'

.header-tag 
  padding: 4em 0
  background-size: cover
  h1 
    font-size: 3em 
    text-transform: uppercase
  .subtitle 
    font-size: 1.5em
    text-transform: capitalize 
    a
      color: $color-gray-soft
  h1, .subtitle  
    font-weight: 300
</style>
