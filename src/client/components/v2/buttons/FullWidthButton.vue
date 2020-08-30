<template lang="pug">
div
  router-link(v-if="!type", :to="to") {{ text }}
  button(v-if="type == 'button'", type="button", @click="onClick") {{ text }}
</template>

<style lang="sass" scoped>
@import '../../../../design/sass/color'

a, button
  color: $color-gray-dark
  display: block
  text-align: center
  padding: 10px 20px
  border: 1px solid $color-gray-verysoft
  font-size: 15px
  cursor: pointer

button
  width: 100%
</style>

<script>
const props = {
  to: {
    type: String,
  },
  text: {
    type: String,
    default: "Read More",
  },
  type: {
    type: String,
  },
  onClick: {
    type: Function,
  },
}

export default {
  props,
}
</script>