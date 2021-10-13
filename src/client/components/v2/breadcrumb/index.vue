<template lang="pug">
div.breadcrumb
    span(v-for="(n, key) in breadcrumbData")
        router-link(:to='n.link') {{ n.text }}
        span.divider(v-if="(key+1) < breadcrumbData.length ") /
</template>

<style lang="sass" scoped>
@import '../../../../design/sass/color'

.breadcrumb
    text-transform: capitalize
    .divider
        color: $color-gray-soft
        padding: 0 8px
        // &:last-child
        //     display: none
</style>

<script>
import vue from "vue"

export default vue.extend({
  name: "Breadcrumb",
  props: {
    breadcrumbData: {
      type: Array,
      default: () => []
    }
  }
})
</script>
