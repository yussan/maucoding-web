<template lang="pug">
  .grid(v-if="data.result && data.result.length > 0") 
    post-card(v-for="n, key in data.result" :key="key" :data="n")
</template>

<style language="sass" scoped>
</style>

<script>
import vue from "vue"

import PostVerySmallCard from "../cards/PostVerySmallCard"

const props = ["data"]

vue.component("post-card", PostVerySmallCard)

export default {
  props
}
</script>