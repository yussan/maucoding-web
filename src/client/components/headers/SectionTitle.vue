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

</style>
