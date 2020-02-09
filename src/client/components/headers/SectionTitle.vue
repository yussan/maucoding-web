<template lang="pug">
  h2.section-title(:style="style") {{ title }}
</template>

<script lang="ts">
import vue from "vue"
export default vue.extend({
  name: "section-title",
  props: ["title", "style"]
})
</script>


<style lang="sass" scoped>
.section-title
  text-transform: uppercase
  font-size: 2.5em
  letter-spacing: 1.5px
</style>
