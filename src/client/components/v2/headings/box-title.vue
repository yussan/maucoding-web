<template lang="pug">
    .box-title 
      h2 {{ text }}
</template>

<style lang="sass" scoped>
  .box-title
    h2 
      margin: 0
      padding: 20px 0
      font-size: 20px
      border-bottom: 2px solid #f4f4f4
</style>

<script>
const props = ["text"]

export default {
  props
}
</script>