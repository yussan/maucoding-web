<template lang="pug">
  h2.section-title {{ title }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "section-title",
  props:["title"]
})
</script>


<style lang="sass" scoped>
.section-title
  text-transform: uppercase
  font-size: 2.5em
  letter-spacing: 1.5px
</style>
