<template lang="pug">
  .dropdown(v-bind:class="{show}")
    button(type="javascript:;" v-on:click="toggleDropdown()")
      i(class="icono-caretDown")
    div.dropdown-content
      span(v-for="(item, key) in items" :key="key")
        a(v-if="item.type === 'blank'"  :href="item.link || 'javascript:;'" target="_blank" ) {{ item.text }}
        BtnDelete(v-else-if="item.type === 'delete'" :action="item.action" :text="item.text")
        router-link(v-else :to="item.link || 'javascript:;'" target="_blank" ) {{ item.text }}
</template>

<script lang="ts">
import vue from "vue"
import BtnDelete from "./BtnDelete.vue"

vue.component("BtnDelete", BtnDelete)

const propTypes = {
  items: {
    type: Array,
    default: () => {
      return []
    }
  },
  type: {
    type: String,
    default: "self"
  }
}

export default vue.extend({
  name: "button-dropdown",
  data() {
    return {
      show: false
    }
  },
  props: propTypes,
  methods: {
    toggleDropdown() {
      this.show = !this.show
    }
  }
})
</script>

<style lang="sass">
  .dropdown 
    float: right 
    position: relative 
    display: inline-block

    &.show
      .dropdown-content
        opacity: 1
        height: auto

    button 
      background: transparent
      border: none
      outline: 0
      cursor: pointer

      [class*=icono-] 
        color: gray

    .dropdown-content
      opacity: 0
      height: 0
      position: absolute
      background-color: #f1f1f1
      min-width: 160px
      overflow: auto
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2)
      right: 0
      z-index: 1

      a 
        color: black
        padding: 12px 16px
        text-decoration: none
        display: block
</style>
