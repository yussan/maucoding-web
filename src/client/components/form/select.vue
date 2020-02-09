<template lang="pug">
  .form-input(:class="validation.result && validation.result[name] != undefined && !validation.result[name].is_valid ? 'error' : ''")
    select(
      :id='name' 
      :name='name'
      :value="data[name] || options[0].value" 
      v-on:change='onchange')
      option(v-for="(n, key) in options" :key="key" :value="n.value") {{ n.name }}

    .message(v-if='validation.result && validation.result[name] != undefined && !validation.result[name].is_valid') 
      small {{ validation.result[name].message }}
</template>
<script>
import vue from "vue"

const props = {
  name: {
    type: String
  },
  options: {
    type: Array,
    default() {
      return []
    }
  },
  label: {
    type: String
  },
  data: {
    type: Object,
    default() {
      return {}
    }
  },
  validation: {
    type: Object,
    default() {
      return {}
    }
  },
  onchange: {
    type: Function,
    default() {
      console.log("changed")
    }
  }
}

export default vue.extend({
  name: "input-select",
  props
})
</script>

<style lang="sass" scoped>
@import '../../../design/sass/form'
@import '../../../design/sass/color'

.form-input
  select
    background-color: $color-white-main
    padding: .5em
    font-size: 1.5em
    width: -webkit-fill-available
    margin-bottom: .3em
    border: 1px solid $color-gray-soft
</style>

